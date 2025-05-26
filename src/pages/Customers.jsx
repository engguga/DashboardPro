import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const Customers = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/customers')
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
            Clientes
          </h1>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
            <table className="w-full text-left">
              <thead className="text-sm text-gray-500 dark:text-gray-400 border-b">
                <tr>
                  <th className="py-2">ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700 dark:text-gray-200">
                {clientes.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-2">{c.id}</td>
                    <td>{c.nome}</td>
                    <td>{c.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Customers;
