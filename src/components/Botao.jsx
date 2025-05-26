const Botao = ({ children, onClick, color = 'bg-blue-600', hover = 'hover:bg-blue-700' }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-white font-medium ${color} ${hover} 
      shadow-md hover:shadow-xl active:scale-[0.98] 
      transition-all duration-200`}
    >
      {children}
    </button>
  );
};

export default Botao;
