import { useState } from 'react';

const allOrders = [
  { id: '#001', produto: 'Fone Bluetooth', valor: 'R$ 199,90', status: 'Enviado' },
  { id: '#002', produto: 'Monitor 24"', valor: 'R$ 899,00', status: 'Pendente' },
  { id: '#003', produto: 'Teclado Mecânico', valor: 'R$ 350,00', status: 'Entregue' },
  { id: '#004', produto: 'Mouse Gamer', valor: 'R$ 180,00', status: 'Cancelado' },
];

const statusOptions = ['Todos', 'Enviado', 'Pendente', 'Entregue', 'Cancelado'];

const OrdersTable = () => {
  const [filtro, setFiltro] = useState('Todos');

  const pedidosFiltrados = filtro === 'Todos'
    ? allOrders
    : allOrders.filter((order) => order.status === filtro);

  const exportCSV = () => {
    const headers = ['ID', 'Produto', 'Valor', 'Status'];
    const rows = pedidosFiltrados.map((o) => [o.id, o.produto, o.valor, o.status]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers, ...rows].map((row) => row.join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'pedidos.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Pedidos Recentes</h2>

        <div className="flex items-center gap-2">
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="border rounded-md text-sm p-1 text-gray-700 dark:text-gray-300 dark:bg-gray-700"
          >
            {statusOptions.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
          <button
            onClick={exportCSV}
            className="bg-blue-600 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-700 transition"
          >
            Exportar CSV
          </button>
        </div>
      </div>

      <table className="w-full text-left">
        <thead className="text-sm text-gray-500 dark:text-gray-400 border-b">
          <tr>
            <th>ID</th>
            <th>Produto</th>
            <th>Valor</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700 dark:text-gray-200">
          {pedidosFiltrados.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="py-2">{order.id}</td>
              <td>{order.produto}</td>
              <td>{order.valor}</td>
              <td>
                <span className={`px-2 py-1 rounded-full text-xs font-medium
                  ${order.status === 'Enviado' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'Pendente' ? 'bg-yellow-100 text-yellow-700' :
                    order.status === 'Entregue' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'}`}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
