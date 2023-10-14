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
import { useParams } from "react-router-dom";

import "./TinyChartBox.scss";

const TinyChartBox = ({
  icon,
  title,
  total,
  color,
  chartData,
  myDataKey,
  money,
  lineDataKey,
  detailedPage,
  propertyId,
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
            <XAxis dataKey={lineDataKey} />
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
        <Link
          style={{ color: color }}
          to={`/dashboard/${propertyId}/details/${detailedPage}`}
        >
          View All
        </Link>
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
  icon: PropTypes.string,
  myDataKey: PropTypes.string,
  title: PropTypes.string,
  total: PropTypes.number,
  color: PropTypes.string,
  chartData: PropTypes.array,
  money: PropTypes.bool,
  lineDataKey: PropTypes.string,
  detailedPage: PropTypes.string,
  propertyId: PropTypes.string,
};

export default TinyChartBox;
