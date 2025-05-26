import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const SalesBarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/orders.json')
      .then((res) => res.json())
      .then((orders) => {
        const grouped = orders.reduce((acc, order) => {
          const produto = order.produto;
          acc[produto] = (acc[produto] || 0) + 1;
          return acc;
        }, {});

        const chartData = Object.keys(grouped).map((produto) => ({
          name: produto,
          vendas: grouped[produto],
        }));

        setData(chartData);
      });
  }, []);

  // 🔥 Calcular máximo das vendas para escalar o YAxis corretamente
  const maxVendas = Math.max(...data.map((item) => item.vendas), 1);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow h-96">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Vendas por Produto
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis domain={[0, Math.ceil(maxVendas + 4)]} />
          <Tooltip />
          <Bar dataKey="vendas" fill="#2563eb" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesBarChart;
