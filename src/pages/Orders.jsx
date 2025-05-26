import { useEffect, useState } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

const Orders = () => {
  const [pedidos, setPedidos] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/orders.json') // 🔥 Pegando do public direto, sem backend
      .then((res) => res.json())
      .then((data) => {
        setPedidos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 🔍 Filtro por busca e status
  const filteredOrders = pedidos.filter((p) => {
    const matchesSearch =
      p.produto.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toString().includes(search);
    const matchesStatus = statusFilter ? p.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  // 📤 Exportar CSV
  const exportCSV = () => {
    const headers = ['ID', 'Produto', 'Valor', 'Status'];
    const rows = filteredOrders.map((p) => [
      p.id,
      p.produto,
      p.valor,
      p.status,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers, ...rows].map((e) => e.join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'pedidos.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
        Pedidos
      </h1>

      {/* 🔥 Barra de ferramentas */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por produto ou ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-xl bg-white dark:bg-gray-800 dark:text-white"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded-xl bg-white dark:bg-gray-800 dark:text-white"
        >
          <option value="">Todos os Status</option>
          <option value="Enviado">Enviado</option>
          <option value="Pendente">Pendente</option>
          <option value="Cancelado">Cancelado</option>
          <option value="Entregue">Entregue</option>
        </select>

        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
        >
          <ArrowDownTrayIcon className="h-5 w-5" />
          Exportar CSV
        </button>
      </div>

      {/* ⏳ Loading */}
      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Carregando...</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
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
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-4 text-center">
                    Nenhum pedido encontrado.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="py-2">{p.id}</td>
                    <td>{p.produto}</td>
                    <td>{p.valor}</td>
                    <td>{p.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
