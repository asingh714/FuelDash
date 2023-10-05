import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import PropTypes from "prop-types";

import "./pieChartBox.scss";

const colors = {
  Midgrade: "#84cc16",
  Regular: "#3b82f6",
  Premium: "#7c3aed",
  Diesel: "#0d9488",
  E85: "#c026d3",
};

const PieChartBox = ({ title, chartData }) => {
  return (
    <div className="pie-box-container">
      <h2>{title}</h2>
      <div className="pie-box-chart">
        <ResponsiveContainer width="99%" height={200}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
            />
            <Pie
              data={chartData}
              innerRadius={"70%"}
              outerRadius={"90%"}
              paddingAngle={5}
              dataKey="percentageOfTotal"
            >
              {chartData?.map((item) => (
                <Cell key={item.gasType} fill={colors[item.gasType]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="pie-box">
        {chartData?.map((item) => (
          <div className="option" key={item.id}>
            <div className="title">
              <div
                className="dot"
                style={{ backgroundColor: colors[item.gasType] }}
              />
              <span>{item.gasType}</span>
            </div>
            <span>{item.percentageOfTotal} %</span>
          </div>
        ))}
      </div>
    </div>
  );
};

PieChartBox.propTypes = {
  title: PropTypes.string,
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.number,
      color: PropTypes.string,
    })
  ),
};

export default PieChartBox;
