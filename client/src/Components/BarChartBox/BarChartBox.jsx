import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import PropTypes from "prop-types";

import "./BarChartBox.scss";

const BarChartBox = ({ title, chartData, color, bar, xaxis }) => {
  return (
    <div className="bar-chart-box-container">
      <h2>{title}</h2>
      <div className="chart">
        <ResponsiveContainer width="99%" height={150}>
          <BarChart data={chartData}>
            <Tooltip
              contentStyle={{ background: "#030712", borderRadius: "5px" }}
              labelStyle={{ display: "none" }}
              cursor={{ fill: "none" }}
            />
            <Bar dataKey={bar} fill={color} />
            <XAxis dataKey={xaxis} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

BarChartBox.propTypes = {
  title: PropTypes.string,
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string,
      revenue: PropTypes.number,
    })
  ),
  color: PropTypes.string,
  bar: PropTypes.string,
  xaxis: PropTypes.string,
};

export default BarChartBox;
