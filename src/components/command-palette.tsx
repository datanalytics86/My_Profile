'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import {
  Search,
  Home,
  FileText,
  Settings,
  Users,
  BarChart,
  Shield,
  Book,
  Github,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const navigate = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-colors bg-white dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-400"
      >
        <Search className="h-4 w-4" />
        <span>Search...</span>
        <kbd className="ml-auto px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Command Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50"
            >
              <Command className="rounded-xl border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden bg-white dark:bg-gray-900">
                <div className="flex items-center border-b border-gray-200 dark:border-gray-700 px-4">
                  <Search className="h-5 w-5 text-gray-400 mr-2" />
                  <Command.Input
                    placeholder="Type a command or search..."
                    className="flex-1 py-4 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
                  />
                </div>

                <Command.List className="max-h-96 overflow-y-auto p-2">
                  <Command.Empty className="py-6 text-center text-sm text-gray-500">
                    No results found.
                  </Command.Empty>

                  <Command.Group heading="Navigation" className="text-xs text-gray-500 px-2 py-1">
                    <CommandItem icon={Home} onSelect={() => navigate('/')}>
                      Home
                    </CommandItem>
                    <CommandItem icon={BarChart} onSelect={() => navigate('/admin')}>
                      Dashboard
                    </CommandItem>
                    <CommandItem icon={FileText} onSelect={() => navigate('/admin/pages')}>
                      Pages
                    </CommandItem>
                    <CommandItem icon={Settings} onSelect={() => navigate('/admin/settings')}>
                      Settings
                    </CommandItem>
                  </Command.Group>

                  <Command.Separator className="my-2 h-px bg-gray-200 dark:bg-gray-700" />

                  <Command.Group heading="Documentation" className="text-xs text-gray-500 px-2 py-1">
                    <CommandItem icon={Book} onSelect={() => navigate('/docs/qaqc-standards')}>
                      QAQC Standards
                    </CommandItem>
                    <CommandItem icon={Shield} onSelect={() => navigate('/docs/security')}>
                      Security Guide
                    </CommandItem>
                    <CommandItem icon={Users} onSelect={() => navigate('/docs/contributing')}>
                      Contributing
                    </CommandItem>
                  </Command.Group>

                  <Command.Separator className="my-2 h-px bg-gray-200 dark:bg-gray-700" />

                  <Command.Group heading="External" className="text-xs text-gray-500 px-2 py-1">
                    <CommandItem
                      icon={Github}
                      onSelect={() => window.open('https://github.com/datanalytics86/My_Profile', '_blank')}
                    >
                      GitHub Repository
                    </CommandItem>
                  </Command.Group>
                </Command.List>
              </Command>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function CommandItem({
  icon: Icon,
  children,
  onSelect,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors text-gray-900 dark:text-gray-100"
    >
      <Icon className="h-4 w-4 text-gray-400" />
      <span>{children}</span>
    </Command.Item>
  );
}
