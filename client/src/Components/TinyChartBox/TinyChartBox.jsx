import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { Link } from "react-router-dom";

import "./TinyChartBox.scss";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 2800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const TinyChartBox = (props) => {
  return (
    <div className="tiny-chart-box-container">
      <div className="left-tiny-chart-box">
        <div className="tiny-chart-box-title">
          <img src={props.icon} alt="" />
          <span>{props.title}</span>
        </div>
        <span>$ {props.revenue}</span>
        <Link style={{ color: props.color }}>View All</Link>
      </div>

      <div className="right-tiny-chart-box">
        <div className="chart">
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={props.chartData}>
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 10, y: 50 }}
              />
              <Line
                type="monotone"
                dataKey="pv"
                stroke={props.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="texts">
          <span
            className="percentage"
            style={{ color: props.revenue < 0 ? "#dc2626" : "#22c55e" }}
          >
            45%
          </span>
          <span className="duration">this month</span>
        </div>
      </div>
    </div>
  );
};

export default TinyChartBox;
