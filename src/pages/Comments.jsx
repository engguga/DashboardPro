import { useEffect, useState } from 'react';

const Comments = () => {
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/comments')
      .then(res => res.json())
      .then(data => setComentarios(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        Comentários
      </h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
        <table className="w-full text-left">
          <thead className="text-sm text-gray-500 dark:text-gray-400 border-b">
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Comentário</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 dark:text-gray-200">
            {comentarios.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="py-2">{c.id}</td>
                <td>{c.clienteId}</td>
                <td>{c.mensagem}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comments;
