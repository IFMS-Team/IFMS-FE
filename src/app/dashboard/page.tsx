export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Overview of your inventory management system.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Products" value="0" change="+0%" />
        <StatCard title="Low Stock Items" value="0" change="0%" variant="warning" />
        <StatCard title="Pending Orders" value="0" change="+0%" />
        <StatCard title="Total Suppliers" value="0" change="+0%" />
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  change,
  variant = 'default',
}: {
  title: string;
  value: string;
  change: string;
  variant?: 'default' | 'warning';
}) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
      <p
        className={`mt-1 text-sm ${
          variant === 'warning' ? 'text-yellow-600' : 'text-green-600'
        }`}
      >
        {change}
      </p>
    </div>
  );
}
