import React from 'react';
import { LineChart, Line } from 'recharts';

class StatisticsCharts extends React.Component {
  render() {
    return (
      <div>
        Charts!!!
        <LineChart width={300} height={200}>
          <Line type="monotone" dataKey="uv" stroke="#eee" />
        </LineChart>
      </div>
    );
  }
}

export default StatisticsCharts;
