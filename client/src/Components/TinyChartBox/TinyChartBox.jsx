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
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./TinyChartBox.scss";

const TinyChartBox = ({
  icon,
  title,
  total,
  color,
  chartData,
  myDataKey,
  money,
}) => {
  return (
    <div className="tiny-chart-box-container">
      <div className="tiny-chart-box-title">
        <img src={icon} alt="" />
        <span>{title}</span>
      </div>

      <div className="chart">
        <ResponsiveContainer width="99%" height={125}>
          <LineChart data={chartData}>
            {/* <YAxis domain={[0, 20000]} />
             */}
            <XAxis dataKey="day" />
            <Tooltip
              contentStyle={{ background: "transparent", border: "none" }}
              labelStyle={{ display: "none" }}
              position={{ x: 10, y: 50 }}
            />
            <Line
              type="monotone"
              dataKey={myDataKey}
              stroke={color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bottom-tiny-chart-box">
        <Link style={{ color: color }}>View All</Link>
        {money ? (
          <span>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(total)}
          </span>
        ) : (
          <span>{total}</span>
        )}
      </div>
    </div>
  );
};

TinyChartBox.propTypes = {
  icon: PropTypes.string.isRequired,
  myDataKey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  chartData: PropTypes.array.isRequired,
  money: PropTypes.bool.isRequired,
};

export default TinyChartBox;
