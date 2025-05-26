const MetricCard = ({ title, value, icon: Icon, color = 'bg-blue-100', text = 'text-blue-800' }) => {
  return (
    <div
      className={`flex items-center space-x-4 p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-md
      hover:shadow-xl hover:scale-[1.03] transition-all duration-200`}
    >
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className={`h-6 w-6 ${text}`} />
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-xl font-semibold text-gray-700 dark:text-white">{value}</p>
      </div>
    </div>
  );
};

export default MetricCard;
