import { EditOutlined } from "@ant-design/icons";
import {
  Tooltip as AntdTooltip,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Flex,
  Row,
  Select,
  Table,
  Tag,
  Typography,
} from "antd";
import { primaryColor } from "../../config/config";
import dayjs from "dayjs";
import { useState } from "react";
import { AddUpadteCategory } from "./modals/add-upadte-category";

const { Title, Text } = Typography;
export const HeighlightOverspending = (props) => {
  const { data, setData, originalData, filterList, setFilterList } = props;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isFlag, setIsFlag] = useState("add");
  const [selectedCategoryData, setSelectedCategoryData] = useState({});
  const dataTablecolumns = [
    {
      title: "Action",
      align: "center",
      render: (record) => (
        <AntdTooltip title="Edit">
          <EditOutlined
            style={{ color: primaryColor, cursor: "pointer", fontSize: "20px" }}
            onClick={() => {
              setIsOpenModal(true);
              setIsFlag("update");
              setSelectedCategoryData(record);
            }}
          />
        </AntdTooltip>
      ),
    },
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
      render: (text) => dayjs(text).format("DD MMM, YYYY"),
    },
    {
      title: "Category",
      dataIndex: "Category",
      key: "Category",
    },
    {
      title: "Sub-Category",
      dataIndex: "Sub-Category",
      key: "Sub-Category",
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
      render: (value) => (
        <Tag color="error">₹{parseFloat(value).toFixed(2)}</Tag>
      ),
    },
    {
      title: "Budget",
      dataIndex: "Budget",
      key: "Budget",
      render: (value) => (
        <Tag color="success">₹{parseFloat(value).toFixed(2)}</Tag>
      ),
    },
    {
      title: "Payment Method",
      dataIndex: "Payment Method",
      key: "Payment Method",
    },
    {
      title: "Merchant",
      dataIndex: "Merchant",
      key: "Merchant",
    },
  ];

  const rowClassName = (record) => {
    const amount = parseFloat(record.Amount);
    const budget = parseFloat(record.Budget);
    return amount > budget ? "over-budget-row" : "";
  };

  const applyFilters = (filters) => {
    let filtered = originalData;

    if (filters.category) {
      filtered = filtered?.filter((item) => item.Category === filters.category);
    }

    if (filters.paymentMethod) {
      filtered = filtered?.filter(
        (item) => item["Payment Method"] === filters.paymentMethod
      );
    }
    if (filters.isAmountGraterThanBudget) {
      filtered = filtered?.filter(
        (item) => parseFloat(item?.Amount) > parseFloat(item?.Budget)
      );
    }
    if (filters.isAmountLessThanBudget) {
      filtered = filtered?.filter(
        (item) => parseFloat(item?.Amount) < parseFloat(item?.Budget)
      );
    }

    if (filters.date) {
      filtered = filtered?.filter(
        (item) =>
          dayjs(item?.Date).format("YYYY-MM-DD") ===
          dayjs(filters.date).format("YYYY-MM-DD")
      );
    }

    setData(filtered);
  };

  return (
    <>
      <Row style={{ padding: "0px", margin: "0px" }}>
        <Col span={24} style={{ marginBottom: "20px" }}>
          <Flex align="center" gap={8}>
            {" "}
            <DatePicker
              style={{ width: "150px" }}
              placeholder="Select Date"
              format={"DD MMM, YYYY"}
              value={filterList?.date ? dayjs(filterList.date) : null}
              onChange={(date, dateString) => {
                const updated = { ...filterList, date: date };
                setFilterList(updated);
                applyFilters(updated);
              }}
            />
            <Select
              style={{ width: "150px" }}
              options={[
                { label: "Travel", value: "Travel" },
                { label: "Entertainment", value: "Entertainment" },
                { label: "Transport", value: "Transport" },
                { label: "Bills", value: "Bills" },
                { label: "Food", value: "Food" },
                { label: "Shopping", value: "Shopping" },
              ]}
              value={filterList?.category || null}
              onChange={(e) => {
                const filter = { ...filterList, category: e };
                setFilterList(filter);
                applyFilters(filter);
              }}
              placeholder="Select Category"
              allowClear
            />
            <Select
              style={{ width: "150px" }}
              options={[
                { label: "Netbanking", value: "Netbanking" },
                { label: "Debit Card", value: "Debit Card" },
                { label: "UPI", value: "UPI" },
                { label: "Credit Card", value: "Credit Card" },
              ]}
              value={filterList?.paymentMethod || null}
              onChange={(e) => {
                const filter = { ...filterList, paymentMethod: e };
                setFilterList(filter);
                applyFilters(filter);
              }}
              placeholder="Select Payment Method"
              allowClear
            />
            <Tag style={{ fontSize: "15px", padding: "3px 5px" }}>
              <Checkbox
                size="large"
                style={{ marginRight: "5px" }}
                checked={filterList?.isAmountGraterThanBudget}
                onChange={(e) => {
                  if (e.target.checked) {
                    const filter = {
                      ...filterList,
                      isAmountGraterThanBudget: true,
                    };
                    setFilterList(filter);
                    applyFilters(filter);
                  } else {
                    const filter = {
                      ...filterList,
                      isAmountGraterThanBudget: false,
                    };
                    setFilterList(filter);
                    applyFilters(filter);
                  }
                }}
              />
              Amount {">"} Budget
            </Tag>
            <Tag style={{ fontSize: "15px", padding: "3px 5px" }}>
              <Checkbox
                size="large"
                style={{ marginRight: "5px" }}
                checked={filterList?.isAmountLessThanBudget}
                onChange={(e) => {
                  if (e.target.checked) {
                    const filter = {
                      ...filterList,
                      isAmountLessThanBudget: true,
                    };
                    setFilterList(filter);
                    applyFilters(filter);
                  } else {
                    const filter = {
                      ...filterList,
                      isAmountLessThanBudget: false,
                    };
                    setFilterList(filter);
                    applyFilters(filter);
                  }
                }}
              />
              Amount {"<"} Budget
            </Tag>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                setFilterList({});
                applyFilters({});
              }}
            >
              Reset
            </Button>
          </Flex>
        </Col>
        <Col span={24} style={{ padding: "0px", overflowX: "auto" }}>
          {" "}
          <Flex justify="space-between">
            <Text style={{ color: "red" }}>
              Heighlight rows where the amount is greater than the budget
            </Text>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                setIsOpenModal(true);
                setIsFlag("add");
              }}
            >
              Add Category
            </Button>
          </Flex>
          <Table
            dataSource={data}
            columns={dataTablecolumns}
            rowClassName={rowClassName}
            scroll={{ x: "max-content" }}
          />
        </Col>
      </Row>
      {isOpenModal && (
        <AddUpadteCategory
          show={isOpenModal}
          selectedData={selectedCategoryData}
          isFlag={isFlag}
          onHide={() => {
            setSelectedCategoryData({});
            setIsOpenModal(false);
          }}
          data={data}
          setData={setData}
        />
      )}
    </>
  );
};