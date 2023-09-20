import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import PropTypes from "prop-types";

import "./pieChartBox.scss";

const colors = {
  Midgrade: "#c084fc",
  Regular: "#a5b4fc",
  Premium: "#22d3ee",
  Diesel: "#fb7185",
  E85: "#fca5a5",
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
  title: PropTypes.string.isRequired,
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PieChartBox;
