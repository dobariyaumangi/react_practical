import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Alert, Col, Row, Typography } from "antd";
const { Title, Text } = Typography;
export const OverspendingAlert = (props) => {
  const { overSpendingAlert } = props;
  return (
    <Row style={{ padding: "0px", margin: "0px" }}>
      <Col span={24}>
        <Alert
          showIcon
          icon={<ExclamationCircleOutlined />}
          message="Overspending alert"
          description={
            <>
              You have exceeded your budget in the{" "}
              <Text strong>{overSpendingAlert?.category}</Text> category by
              <Text strong>
                {" "}
                ₹ {overSpendingAlert?.difference?.toFixed(2) || 0}
              </Text>
              . Please review your spending
            </>
          }
          type="error"
        />
      </Col>
    </Row>
  );
};
