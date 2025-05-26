import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#2563eb', '#facc15', '#f87171'];

const SocialPieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/orders.json')
      .then((res) => res.json())
      .then((orders) => {
        const statusGroup = orders.reduce((acc, order) => {
          acc[order.status] = (acc[order.status] || 0) + 1;
          return acc;
        }, {});

        const chartData = Object.keys(statusGroup).map((status) => ({
          name: status,
          value: statusGroup[status],
        }));

        setData(chartData);
      });
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow h-96">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Pedidos por Status
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={40}
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SocialPieChart;
