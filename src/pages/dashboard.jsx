import {
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Row,
  Table,
  Tabs,
  Typography,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import * as XLSX from "xlsx";
import { primaryColor } from "../config/config";
import { CategoryPaymentMethod } from "./component/category-payment-method";
import { HeighlightOverspending } from "./component/heighlight-overspending";
import { OverallSpendCard } from "./component/overall-spend-card";
import { OverspendingAlert } from "./component/overspending-alert";
import {
  EditOutlined,
  LoadingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
const { Title, Text } = Typography;

export const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [filterList, setFilterList] = useState({});

  const [totalSpend, setTotalSpend] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const [overSpendingAlert, setOverSpendingAlert] = useState({});
  const [mostUsedCategory, setMostUsedCategory] = useState({
    usedCategory: [],
    allCategory: {},
  });
  const [mostUsedPayment, setMostUsedPayment] = useState({
    usedPayment: [],
    allPayment: {},
  });
  const [breakdownData, setbreakdownData] = useState([]);

  const handleFileUpload = (file) => {
    setLoading(true);

    setTimeout(() => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log(jsonData, "-----JSON Data");
        setOriginalData(jsonData);
        SetLogicAndUpdatePage(jsonData);
        setLoading(false);
      };

      reader.readAsArrayBuffer(file);
    }, 3000);

    return false;
  };

  const breakdownColumns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Total Amount (₹)",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (value) => value.toFixed(2),
    },
    {
      title: "Total Budget (₹)",
      dataIndex: "totalBudget",
      key: "totalBudget",
      render: (value) => value.toFixed(2),
    },
    {
      title: "Difference (₹)",
      dataIndex: "difference",
      key: "difference",
      render: (value, data) => {
        const isBudget =
          data?.totalAmount > data?.totalBudget
            ? "Overspent"
            : data?.totalAmount < data?.totalBudget
            ? "Saved"
            : "On budget";
        return (
          <span
            style={{
              color:
                isBudget === "Overspent"
                  ? "red"
                  : isBudget === "Saved"
                  ? "green"
                  : "black",
            }}
          >
            {isBudget === "Overspent" ? "+" : isBudget === "Saved" ? "-" : ""}
            {Math.abs(value).toFixed(2)} ({isBudget})
          </span>
        );
      },
    },
  ];

  const items = [
    {
      key: "1",
      label: "Table",
      children: (
        <Table
          dataSource={breakdownData}
          columns={breakdownColumns}
          pagination={false}
        />
      ),
    },
    {
      key: "2",
      label: "Graph",
      children:
        breakdownData?.length > 0 ? (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              data={breakdownData}
              margin={{ top: 20, right: 40, left: 20, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [`₹${value.toFixed(2)}`, name]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="totalAmount"
                stroke="#8884d8"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="totalBudget"
                stroke="#82ca9d"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <Empty style={{ marginTop: "20px" }} />
        ),
    },
  ];

  const SetLogicAndUpdatePage = (updatedData) => {
    setData(updatedData);
    // Get Total Spend,Budget ------------------------------------------
    const totalSpend = updatedData.reduce((acc, item) => {
      const amount = parseFloat(item.Amount);
      acc += amount;
      return acc;
    }, 0);

    setTotalSpend(totalSpend);

    const totalBudget = updatedData.reduce((acc, item) => {
      const amount = parseFloat(item.Budget);
      acc += amount;
      return acc;
    }, 0);
    setTotalBudget(totalBudget);
    // Get Total Spend,Budget End ------------------------------------------

    //  Most-used categories/payment methods ------------------------------------------
    const BudgetAmountBreakdown = updatedData.reduce((acc, item) => {
      const category = item.Category;
      const amount = parseFloat(item.Amount);
      const budget = parseFloat(item.Budget);

      const existing = acc.find((entry) => entry.category === category);

      if (existing) {
        existing.totalAmount += amount;
        existing.totalBudget += budget;
      } else {
        acc.push({
          category,
          totalAmount: amount,
          totalBudget: budget,
          difference: amount - budget,
        });
      }
      return acc;
    }, []);
    setbreakdownData(BudgetAmountBreakdown);
    //  Most-used categories/payment methods End ------------------------------------------

    //  Overspending alerts or insights ------------------------------------------
    const sortedByDifference = BudgetAmountBreakdown.sort(
      (a, b) => b.difference - a.difference
    );
    setOverSpendingAlert(sortedByDifference[0]);
    //  Overspending alerts or insights End------------------------------------------

    // Most-used Category ------------------------------------------
    const mostUsedCategoryList = updatedData.reduce((acc, item) => {
      const key = item.Category;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const usedCategories = Object.entries(mostUsedCategoryList)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));

    setMostUsedCategory({
      ...mostUsedCategory,
      usedCategory: usedCategories,
      allCategory: mostUsedCategoryList,
    });
    // Most-used Category End ------------------------------------------

    // Most-used Payment Method ------------------------------------------
    const mostUsedPaymentList = updatedData.reduce((acc, item) => {
      const key = item["Payment Method"];
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const usedPayment = Object.entries(mostUsedPaymentList)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));

    setMostUsedPayment({
      ...mostUsedCategory,
      usedPayment: usedPayment,
      allPayment: mostUsedPaymentList,
    });
    // Most-used Payment Method End ------------------------------------------
  };
  console.log(data, "-data");
  return (
    <>
      <Row style={{ padding: "0px", margin: "0px" }}>
        <Col span={24} style={{ padding: "30px" }}>
          <Title level={2} style={{ margin: "0px", color: primaryColor }}>
            Dashboard
          </Title>
        </Col>
      </Row>
      <Row style={{ padding: "0px", margin: "0px" }}>
        <Col span={24}>
          <Card
            style={{
              marginBottom: "2rem",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              borderRadius: "16px",
              background:
                "linear-gradient(135deg, rgb(175 138 231 / 19%), #00000012)",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <Title level={5} style={{ color: "#555", marginTop: "0px" }}>
                Upload your Excel file to analyzes your spending
              </Title>

              <Typography.Paragraph
                style={{
                  color: "#777",
                  maxWidth: "600px",
                  margin: "0 auto 2rem",
                }}
              >
                Once uploaded, the data from the Excel file is read and
                displayed in a below section.It helps in quickly visualizing and
                analyzing the uploaded data without need to open the file
                separately.
              </Typography.Paragraph>

              <Upload
                beforeUpload={handleFileUpload}
                accept=".xlsx, .xls"
                showUploadList={false}
                disabled={loading}
              >
                <Button
                  type="primary"
                  icon={loading ? <LoadingOutlined /> : <UploadOutlined />}
                  size="large"
                  style={{
                    backgroundColor: "#7e57c2",
                    borderColor: "#7e57c2",
                    borderRadius: "8px",
                    padding: "0 2rem",
                  }}
                >
                  {loading ? "Uploading" : "Upload"} Excel File
                </Button>
              </Upload>
            </div>
          </Card>
        </Col>
      </Row>
      <OverallSpendCard totalSpend={totalSpend} totalBudget={totalBudget} />
      <Divider
        orientation="left"
        style={{ borderColor: "#b4a2d5", marginTop: "40px" }}
      >
        <Title level={5} style={{ color: "#545355", margin: 0 }}>
          Overspending alerts or insights
        </Title>
      </Divider>
      <OverspendingAlert overSpendingAlert={overSpendingAlert} />
      <Divider
        orientation="left"
        style={{ borderColor: "#b4a2d5", marginTop: "40px" }}
      >
        <Title level={5} style={{ color: "#545355", margin: 0 }}>
          Most-used categories/payment methods
        </Title>
      </Divider>
      <CategoryPaymentMethod
        mostUsedCategory={mostUsedCategory}
        mostUsedPayment={mostUsedPayment}
      />
      <Divider
        orientation="left"
        style={{ borderColor: "#b4a2d5", marginTop: "40px" }}
      >
        <Title level={5} style={{ color: "#545355", margin: 0 }}>
          Budget vs. Actual breakdown
        </Title>
      </Divider>
      <Row style={{ padding: "0px", margin: "0px" }}>
        <Col span={24} style={{ padding: "0px" }}>
          <Tabs defaultActiveKey="1" items={items} />
        </Col>
      </Row>
      {/* ------------------------------------------------------------------------------------------------------- */}
      <Divider
        orientation="left"
        style={{ borderColor: "#b4a2d5", marginTop: "40px" }}
      >
        <Title level={5} style={{ color: "#545355", margin: 0 }}>
          Highlighting areas of overspending
        </Title>
      </Divider>
      <HeighlightOverspending
        data={data}
        setData={setData}
        originalData={originalData}
        filterList={filterList}
        setFilterList={setFilterList}
      />
    </>
  );
};
