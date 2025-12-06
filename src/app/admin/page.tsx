'use client';

import {
  FileText,
  Users,
  Eye,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function AdminDashboard() {
  const stats = [
    {
      icon: FileText,
      label: 'Total Pages',
      value: '12',
      change: '+2',
      changeText: 'this week',
      trend: 'up',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Eye,
      label: 'Page Views',
      value: '1,234',
      change: '+12%',
      changeText: 'vs last week',
      trend: 'up',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Users,
      label: 'Active Users',
      value: '45',
      change: '+5',
      changeText: 'this month',
      trend: 'up',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: TrendingUp,
      label: 'Conversions',
      value: '89%',
      change: '+3%',
      changeText: 'improvement',
      trend: 'up',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const activities = [
    {
      action: 'Page updated',
      page: 'Home',
      time: '2 hours ago',
      user: 'Admin User',
      type: 'edit',
    },
    {
      action: 'New section added',
      page: 'Features',
      time: '5 hours ago',
      user: 'Admin User',
      type: 'create',
    },
    {
      action: 'Settings changed',
      page: 'Global',
      time: '1 day ago',
      user: 'Admin User',
      type: 'update',
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div initial="initial" animate="animate" variants={fadeInUp}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome to the QAQC Framework Admin Panel
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            <span>Last updated: Just now</span>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={stagger}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            whileHover={{ y: -5, scale: 1.02 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
            <div className="relative backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary transition-all">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`h-12 w-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}
                >
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div
                  className={`flex items-center gap-1 text-xs font-medium ${
                    stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600'
                  }`}
                >
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">{stat.changeText}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
        </div>
        <div className="p-6 space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ x: 5 }}
              className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-800 last:border-0 cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {activity.user[0]}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{activity.page}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500 dark:text-gray-500">{activity.time}</span>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    activity.type === 'create'
                      ? 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400'
                      : activity.type === 'edit'
                        ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400'
                        : 'bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400'
                  }`}
                >
                  {activity.type}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          className="relative group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600 rounded-2xl" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="relative text-white p-8 rounded-2xl shadow-lg">
            <Sparkles className="h-8 w-8 mb-4 text-white/90" />
            <h3 className="text-2xl font-bold mb-2">Create New Page</h3>
            <p className="mb-6 text-white/90">Start building a new landing page</p>
            <Link href="/admin/pages">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white text-primary rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-2"
              >
                Create Page
                <ArrowUpRight className="h-4 w-4" />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          className="relative group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="relative text-white p-8 rounded-2xl shadow-lg">
            <FileText className="h-8 w-8 mb-4 text-white/90" />
            <h3 className="text-2xl font-bold mb-2">Edit Homepage</h3>
            <p className="mb-6 text-white/90">Customize your main landing page</p>
            <Link href="/admin/pages">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white text-green-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-2"
              >
                Edit Content
                <ArrowUpRight className="h-4 w-4" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
