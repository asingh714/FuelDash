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

import "./SimpleLineChart.scss";
const SimpleLineChart = ({ data, dataKey, xaxis, color }) => {
  console.log(data);
  console.log(dataKey);
  console.log(xaxis);
  console.log(color);
  return (
    <div className="simple-line-chart-box-container">
      <div className="chart">
        <ResponsiveContainer width="99%" height="100%">
          <LineChart
            // width={500}
            // height={3000}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xaxis} />
            <YAxis />

            <Tooltip />
            <Legend />

            <Line type="linear" dataKey={dataKey} stroke={color} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

SimpleLineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  xaxis: PropTypes.string.isRequired,
  dataKey: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default SimpleLineChart;
