import { useEffect, useState } from 'react';
import MetricCard from '../components/MetricCard';
import {
  EyeIcon,
  ShoppingBagIcon,
  ChatBubbleBottomCenterTextIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import SalesBarChart from '../charts/SalesBarChart';
import SocialPieChart from '../charts/SocialPieChart';

const Dashboard = () => {
  const [clientes, setClientes] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetch('/customers.json')
      .then(res => res.json())
      .then(data => setClientes(data));

    fetch('/orders.json')
      .then(res => res.json())
      .then(data => setPedidos(data));
  }, []);

  const totalClientes = clientes.length;
  const totalPedidos = pedidos.length;
  const totalComentarios = 1234;
  const totalReceita = pedidos.reduce((acc, pedido) => {
    const valor = parseFloat(
      pedido.valor.replace('R$', '').replace('.', '').replace(',', '.')
    );
    return acc + (isNaN(valor) ? 0 : valor);
  }, 0);

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
        Dashboard
      </h1>

      {/* 🔥 Cards de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard title="Visualizações" value="12.8K" icon={EyeIcon} />
        <MetricCard
          title="Pedidos"
          value={totalPedidos}
          icon={ShoppingBagIcon}
          color="bg-green-100"
          text="text-green-800"
        />
        <MetricCard
          title="Clientes"
          value={totalClientes}
          icon={UserGroupIcon}
          color="bg-blue-100"
          text="text-blue-800"
        />
        <MetricCard
          title="Comentários"
          value={totalComentarios}
          icon={ChatBubbleBottomCenterTextIcon}
          color="bg-yellow-100"
          text="text-yellow-800"
        />
        <MetricCard
          title="Receita"
          value={`R$ ${totalReceita.toFixed(2)}`}
          icon={CurrencyDollarIcon}
          color="bg-purple-100"
          text="text-purple-800"
        />
      </div>

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

export default Dashboard;
