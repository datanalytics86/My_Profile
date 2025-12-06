'use client';

import { Plus, Edit, Trash2, Eye, MoreVertical, Copy, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function PagesManagement() {
  const pages = [
    { id: 1, title: 'Home', slug: '/', published: true, updated: '2025-11-25', views: 1234 },
    {
      id: 2,
      title: 'Features',
      slug: '/features',
      published: true,
      updated: '2025-11-24',
      views: 456,
    },
    {
      id: 3,
      title: 'Pricing',
      slug: '/pricing',
      published: false,
      updated: '2025-11-23',
      views: 89,
    },
    {
      id: 4,
      title: 'Contact',
      slug: '/contact',
      published: true,
      updated: '2025-11-22',
      views: 234,
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
            Pages Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create and manage your website pages
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all shadow-lg"
        >
          <Plus className="h-5 w-5" />
          New Page
        </motion.button>
      </motion.div>

      {/* Stats Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'Total Pages', value: pages.length },
          { label: 'Published', value: pages.filter((p) => p.published).length },
          { label: 'Drafts', value: pages.filter((p) => !p.published).length },
          { label: 'Total Views', value: pages.reduce((acc, p) => acc + p.views, 0) },
        ].map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02, y: -2 }}
            className="backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Pages Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Title
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Slug
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Views
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Last Updated
                </th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {pages.map((page, index) => (
                <motion.tr
                  key={page.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ backgroundColor: 'rgba(99, 102, 241, 0.05)' }}
                  className="transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {page.title[0]}
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {page.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      {page.slug}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        page.published
                          ? 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${page.published ? 'bg-green-500' : 'bg-gray-400'}`}
                      />
                      {page.published ? 'Published' : 'Draft'}
                    </motion.span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{page.views}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{page.updated}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        title="View Page"
                      >
                        <Eye className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg transition-colors"
                        title="Edit Page"
                      >
                        <Edit className="h-4 w-4 text-primary" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-lg transition-colors"
                        title="Duplicate Page"
                      >
                        <Copy className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
                        title="Delete Page"
                      >
                        <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Page Editor Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Quick Edit</h2>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-sm text-primary hover:text-primary/80"
            >
              <ExternalLink className="h-4 w-4" />
              Preview Live
            </motion.button>
          </Link>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Page Title
            </label>
            <input
              type="text"
              placeholder="Enter page title"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Enter page description"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400"
            />
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all"
            >
              Save Changes
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
            >
              Cancel
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
