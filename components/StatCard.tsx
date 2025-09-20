import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'yellow' | 'purple' | 'orange' | 'teal';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  // This map is necessary because Tailwind's JIT compiler cannot parse
  // dynamically constructed class names like `bg-${color}-100`.
  const styleMap: Record<typeof color, { bg: string, iconBg: string }> = {
    blue: { bg: 'bg-blue-100 dark:bg-blue-900/50', iconBg: 'bg-blue-500' },
    green: { bg: 'bg-green-100 dark:bg-green-900/50', iconBg: 'bg-green-500' },
    yellow: { bg: 'bg-yellow-100 dark:bg-yellow-900/50', iconBg: 'bg-yellow-500' },
    purple: { bg: 'bg-purple-100 dark:bg-purple-900/50', iconBg: 'bg-purple-500' },
    orange: { bg: 'bg-orange-100 dark:bg-orange-900/50', iconBg: 'bg-orange-500' },
    teal: { bg: 'bg-teal-100 dark:bg-teal-900/50', iconBg: 'bg-teal-500' },
  };

  const styles = styleMap[color];

  return (
    <div className={`p-6 rounded-lg shadow-md flex items-center space-x-6 ${styles.bg}`}>
      <div className={`p-4 rounded-full ${styles.iconBg}`}>
        {icon}
      </div>
      <div>
        <p className="text-4xl font-bold text-gray-800 dark:text-gray-100">{value}</p>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{title}</p>
      </div>
    </div>
  );
};

export default StatCard;