import {
  Col,
  Flex,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
const { Title, Text } = Typography;
export const AddUpadteCategory = (props) => {
  const { show, onHide, isFlag, selectedData, data, setData } = props;
  const [message, setMessage] = useState("");
  const [categoryData, setCategoryData] = useState({
    Category: "",
    "Sub-Category": "",
    Description: "",
    Amount: "",
    Budget: "",
    "Payment Method": "",
    Merchant: "",
  });

  useEffect(() => {
    setCategoryData({
      Category: selectedData?.Category || "",
      "Sub-Category": selectedData?.["Sub-Category"] || "",
      Description: selectedData?.Description || "",
      Amount: selectedData?.Amount || "",
      Budget: selectedData?.Budget || "",
      "Payment Method": selectedData?.["Payment Method"] || null,
      Merchant: selectedData?.Merchant || "",
    });
  }, []);
  console.log(selectedData, "-selectedData");
  const UpdateInputValue = (key, value) => {
    setCategoryData({ ...categoryData, [key]: value });
  };
  const handleSubmit = () => {
    if (isFlag === "add") {
      const finalData = {
        ...categoryData,
        Date: dayjs().format("DD MMM, YYYY"),
      };
      setData([...data, finalData]);
    } else {
      const updatedData = data?.map((item, i) => {
        if (item?.id === selectedData?.id) {
          return { ...item, ...categoryData };
        }
        return item;
      });
      setData(updatedData);
    }
    onHide();
  };

  useEffect(() => {
    if (
      !categoryData?.Category ||
      !categoryData?.["Sub-Category"] ||
      !categoryData?.Description ||
      !categoryData?.Amount ||
      !categoryData?.Budget ||
      !categoryData?.["Payment Method"] ||
      !categoryData?.Merchant
    ) {
      setMessage("Please fill all the fields");
    } else {
      setMessage("");
    }
  }, [categoryData]);

  return (
    <Modal
      title={isFlag === "update" ? "Update Category" : "Add Category"}
      closable={false}
      open={show}
      onOk={() => {
        if (
          !categoryData?.Category ||
          !categoryData?.["Sub-Category"] ||
          !categoryData?.Description ||
          !categoryData?.Amount ||
          !categoryData?.Budget ||
          !categoryData?.["Payment Method"] ||
          !categoryData?.Merchant
        ) {
          setMessage("Please fill all the fields");
          return;
        }
        handleSubmit();
      }}
      onCancel={onHide}
    >
      <Row gutter={[10, 10]}>
        {message && (
          <Col span={24}>
            <Text style={{ color: "red" }}>{message}</Text>
          </Col>
        )}
        <Col span={24}>
          <Text>
            Category
            <span style={{ color: "red" }}>*</span>
          </Text>{" "}
          <Input
            placeholder="Category"
            value={categoryData?.Category}
            onChange={(e) => UpdateInputValue("Category", e.target.value)}
          />
        </Col>{" "}
        <Col span={24}>
          <Text>
            Sub-Category <span style={{ color: "red" }}>*</span>
          </Text>{" "}
          <Input
            placeholder="Sub-Category"
            value={categoryData["Sub-Category"]}
            onChange={(e) => UpdateInputValue("Sub-Category", e.target.value)}
          />
        </Col>{" "}
        <Col span={24}>
          <Text>
            Description <span style={{ color: "red" }}>*</span>
          </Text>{" "}
          <Input
            placeholder="Description"
            value={categoryData?.Description}
            onChange={(e) => UpdateInputValue("Description", e.target.value)}
          />
        </Col>
        <Col span={24}>
          <Text>
            Amount <span style={{ color: "red" }}>*</span>
          </Text>{" "}
          <Input
            placeholder="Amount"
            value={categoryData?.Amount}
            onChange={(e) => {
              const checkValue = /^\d+(\.\d{0,2})?$/;
              checkValue.test(e.target.value) &&
                UpdateInputValue("Amount", e.target.value);
            }}
          />
        </Col>{" "}
        <Col span={24}>
          <Text>
            Budget <span style={{ color: "red" }}>*</span>
          </Text>{" "}
          <Input
            placeholder="Budget"
            value={categoryData?.Budget}
            onChange={(e) => {
              const checkValue = /^\d+(\.\d{0,2})?$/;
              checkValue.test(e.target.value) &&
                UpdateInputValue("Budget", e.target.value);
            }}
          />
        </Col>
        <Col span={24}>
          <Text>
            Payment Method <span style={{ color: "red" }}>*</span>
          </Text>{" "}
          <Select
            placeholder="Select Payment Method"
            style={{ width: "100%" }}
            value={categoryData["Payment Method"]}
            onChange={(e) => UpdateInputValue("Payment Method", e)}
            options={[
              { label: "UPI", value: "UPI" },
              { label: "Credit Card", value: "Credit Card" },
              { label: "Debit Card", value: "Debit Card" },
              { label: "Cash", value: "Cash" },
            ]}
          />
        </Col>
        <Col span={24}>
          <Text>
            Merchant <span style={{ color: "red" }}>*</span>
          </Text>{" "}
          <Input
            placeholder="Merchant"
            value={categoryData?.Merchant}
            onChange={(e) => UpdateInputValue("Merchant", e.target.value)}
          />
        </Col>
      </Row>
    </Modal>
  );
};
