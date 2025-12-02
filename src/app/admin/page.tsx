import { FileText, Users, Eye, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to the QAQC Framework Admin Panel</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: FileText, label: 'Total Pages', value: '12', change: '+2 this week' },
          { icon: Eye, label: 'Page Views', value: '1,234', change: '+12% vs last week' },
          { icon: Users, label: 'Active Users', value: '45', change: '+5 this month' },
          { icon: TrendingUp, label: 'Conversions', value: '89%', change: '+3% improvement' },
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-green-600">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Recent Activity</h2>
        </div>
        <div className="p-6 space-y-4">
          {[
            { action: 'Page updated', page: 'Home', time: '2 hours ago' },
            { action: 'New section added', page: 'Features', time: '5 hours ago' },
            { action: 'Settings changed', page: 'Global', time: '1 day ago' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
              <div>
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.page}</p>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-primary to-purple-600 text-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold mb-2">Create New Page</h3>
          <p className="mb-4 text-white/90">Start building a new landing page</p>
          <button className="px-6 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Create Page
          </button>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold mb-2">Edit Homepage</h3>
          <p className="mb-4 text-white/90">Customize your main landing page</p>
          <button className="px-6 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Edit Content
          </button>
        </div>
      </div>
    </div>
  );
}
