import { ArrowUpOutlined, DollarCircleOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic, Typography } from "antd";
const { Title, Text } = Typography;
export const OverallSpendCard = (props) => {
  const { totalSpend, totalBudget } = props;
  return (
    <Row gutter={[10, 10]} style={{ padding: "0px", margin: "0px" }}>
      {/* Total Spend */}
      <Col span={8}>
        <Card className="dashboard-card">
          <Statistic
            title={<Text>Total Spend</Text>}
            value={totalSpend}
            precision={2}
            prefix={<DollarCircleOutlined />}
            valueStyle={{ color: "#285cbf" }}
          />
        </Card>
      </Col>

      {/* Total Budget */}
      <Col span={8}>
        <Card className="dashboard-card">
          <Statistic
            title={<Text>Total Budget</Text>}
            value={totalBudget}
            precision={2}
            prefix={<DollarCircleOutlined />}
            valueStyle={{ color: "#257920" }}
          />
        </Card>
      </Col>

      {/* Total Difference */}
      <Col span={8}>
        <Card className="dashboard-card">
          <Statistic
            title={<Text>Total Difference</Text>}
            value={parseFloat(totalSpend - totalBudget).toFixed(2)}
            precision={2}
            prefix={<ArrowUpOutlined />}
            suffix={
              totalSpend > totalBudget
                ? "(Overspent)"
                : totalSpend < totalBudget
                ? "(Saved)"
                : "(On budget)"
                ? " (Overspent)"
                : " (Saved)"
            }
            valueStyle={{
              color:
                totalSpend > totalBudget
                  ? "#ff0000"
                  : totalSpend < totalBudget
                  ? "#1c8325"
                  : "#000",
            }}
          />
        </Card>
      </Col>
    </Row>
  );
};
