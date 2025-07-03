import { Alert, Col, Empty, Row, Typography } from "antd";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const { Title, Text } = Typography;

const COLORS = [
  "#f77f00",
  "#247ba0",
  "#fcbf49",
  "#a7973a",
  "#59c3c3",
  "#d62828",
];
export const CategoryPaymentMethod = (props) => {
  const { mostUsedCategory, mostUsedPayment } = props;
  return (
    <Row gutter={[10, 10]} style={{ padding: "0px", margin: "0px" }}>
      <Col span={12}>
        <Alert
          message={
            <>
              <Text style={{ color: "#434343" }} strong>
                Most Used Category -
              </Text>
              <Text> {mostUsedCategory?.usedCategory?.[0]?.name}</Text>
            </>
          }
          type="success"
        />
        {Object?.entries(mostUsedCategory?.allCategory)?.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                dataKey="value"
                data={Object?.entries(mostUsedCategory?.allCategory)?.map(
                  (d) => {
                    return {
                      name: d[0],
                      value: d[1],
                    };
                  }
                )}
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {Object?.entries(mostUsedCategory?.allCategory)
                  ?.map((d) => {
                    return {
                      name: d[0],
                      value: d[1],
                    };
                  })
                  .map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <Empty style={{ marginTop: "20px" }} />
        )}
      </Col>
      <Col span={12}>
        {" "}
        <Alert
          message={
            <>
              <Text style={{ color: "#434343" }} strong>
                Most Used Payment Method -
              </Text>
              <Text> {mostUsedPayment?.usedPayment?.[0]?.name}</Text>
            </>
          }
          type="info"
        />
        {Object?.entries(mostUsedPayment?.allPayment)?.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={Object?.entries(mostUsedPayment?.allPayment)?.map((d) => {
                return {
                  name: d[0],
                  value: d[1],
                };
              })}
              margin={{ top: 20, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-15} textAnchor="end" />
              <YAxis />
              <Tooltip />
              {/* <Legend /> */}
              <Bar dataKey="value" barSize={50}>
                {Object?.entries(mostUsedPayment?.allPayment)
                  ?.map((d) => {
                    return {
                      name: d[0],
                      value: d[1],
                    };
                  })
                  .map((entry, index) => (
                    <Cell
                      key={`bar-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <Empty style={{ marginTop: "20px" }} />
        )}
      </Col>
    </Row>
  );
};
