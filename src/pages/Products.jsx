import { useEffect, useState } from 'react';

const Products = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/products')
      .then(res => res.json())
      .then(data => setProdutos(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        Produtos
      </h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
        <table className="w-full text-left">
          <thead className="text-sm text-gray-500 dark:text-gray-400 border-b">
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Estoque</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 dark:text-gray-200">
            {produtos.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="py-2">{p.id}</td>
                <td>{p.nome}</td>
                <td>{p.preco}</td>
                <td>{p.estoque}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
