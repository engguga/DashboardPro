import { useEffect, useState } from 'react';
import SalesBarChart from '../charts/SalesBarChart';
import SocialPieChart from '../charts/SocialPieChart';

const Reports = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetch('/orders.json')
      .then((res) => res.json())
      .then((data) => setPedidos(data));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
        Relatórios
      </h1>

      {/* 🔥 Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <SalesBarChart />
        <SocialPieChart />
      </div>

      {/* 🔥 Pedidos Recentes */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Pedidos Recentes
        </h2>

        {/* 📱 Mobile - Cards */}
        <div className="space-y-4 md:hidden">
          {pedidos.map((p) => (
            <div
              key={p.id}
              className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm bg-white dark:bg-gray-900"
            >
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Pedido #{p.id}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    p.status === 'Enviado'
                      ? 'bg-green-100 text-green-800'
                      : p.status === 'Pendente'
                      ? 'bg-yellow-100 text-yellow-800'
                      : p.status === 'Cancelado'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {p.status}
                </span>
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-200">
                <p>
                  <span className="font-semibold">Produto:</span> {p.produto}
                </p>
                <p>
                  <span className="font-semibold">Valor:</span> {p.valor}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 🖥️ Desktop - Tabela */}
        <div className="hidden md:block">
          <table className="w-full text-left">
            <thead className="text-sm text-gray-500 dark:text-gray-400 border-b">
              <tr>
                <th className="py-2">ID</th>
                <th>Produto</th>
                <th>Valor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700 dark:text-gray-200">
              {pedidos.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="py-2">{p.id}</td>
                  <td>{p.produto}</td>
                  <td>{p.valor}</td>
                  <td>{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
