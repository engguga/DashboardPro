import { useState } from 'react';

const Profile = () => {
  const defaultUser = {
    nome: 'Gustavo',
    email: 'admin@example.com',
    avatar: 'https://i.pravatar.cc/150?img=12',
  };

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : defaultUser;
  });

  const [nomeEditado, setNomeEditado] = useState(user.nome);
  const [emailEditado, setEmailEditado] = useState(user.email);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar);

  const handleSave = () => {
    const novoUser = {
      nome: nomeEditado,
      email: emailEditado,
      avatar: avatarPreview,
    };
    setUser(novoUser);
    localStorage.setItem('user', JSON.stringify(novoUser));
    alert('Perfil atualizado e salvo!');
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
        Perfil do Usuário
      </h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow max-w-xl w-full mx-auto">
        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-6 mb-6">
          <img
            src={avatarPreview}
            alt="Avatar"
            className="h-24 w-24 rounded-full border-2 border-blue-600 object-cover mb-4 sm:mb-0"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              {user.nome}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {user.email}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Foto de Perfil
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="w-full text-sm text-gray-600 dark:text-gray-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nome
            </label>
            <input
              type="text"
              value={nomeEditado}
              onChange={(e) => setNomeEditado(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={emailEditado}
              onChange={(e) => setEmailEditado(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white"
            />
          </div>

          <button
            onClick={handleSave}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
