import Link from 'next/link';
import {
  Shield,
  Code,
  Zap,
  CheckCircle,
  ArrowRight,
  Github,
  BookOpen,
  Users,
  TrendingUp,
} from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container-custom py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">QAQC Framework</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="#features" className="hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#docs" className="hover:text-primary transition-colors">
              Documentation
            </Link>
            <Link href="#stats" className="hover:text-primary transition-colors">
              Stats
            </Link>
            <Link
              href="/admin"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 -z-10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5 -z-10" />

        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                Production Ready Framework
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="gradient-text">Quality Assurance</span>
              <br />
              Made Simple
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive framework for software quality assurance and quality control.
              Includes standards, best practices, CI/CD templates, and security guidelines.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="#features"
                className="px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-primary/20"
              >
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="https://github.com/datanalytics86/My_Profile"
                className="px-8 py-4 border-2 border-gray-300 rounded-lg hover:border-primary transition-all flex items-center gap-2"
                target="_blank"
              >
                <Github className="h-5 w-5" />
                View on GitHub
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12">
              {[
                { label: 'Files', value: '35+' },
                { label: 'Lines of Code', value: '10.5K+' },
                { label: 'OWASP Coverage', value: '100%' },
                { label: 'Templates', value: '25+' },
              ].map((stat) => (
                <div key={stat.label} className="space-y-2">
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A complete toolkit for maintaining high-quality, secure software
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border-2 border-gray-100 hover:border-primary/50 transition-all hover:shadow-lg group"
              >
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Section */}
      <section id="docs" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Comprehensive Documentation</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Detailed guides covering every aspect of software quality
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {docs.map((doc, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{doc.title}</h3>
                    <p className="text-gray-600 mb-4">{doc.description}</p>
                    <Link
                      href={doc.href}
                      className="text-primary hover:underline inline-flex items-center gap-2"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-purple-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  OWASP Top 10
                  <br />
                  <span className="gradient-text">100% Covered</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Complete coverage of all OWASP Top 10 vulnerabilities with practical
                  examples and prevention strategies.
                </p>
                <div className="space-y-3">
                  {[
                    'Broken Access Control',
                    'Cryptographic Failures',
                    'Injection Prevention',
                    'Insecure Design',
                    'Security Misconfiguration',
                    'Vulnerable Components',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl p-8 shadow-2xl">
                  <div className="h-full w-full bg-white rounded-xl p-6 flex items-center justify-center">
                    <Shield className="h-32 w-32 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-purple-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Start using the QAQC Framework today and improve your software quality
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/admin"
              className="px-8 py-4 bg-white text-primary rounded-lg hover:bg-gray-100 transition-all hover:scale-105 font-semibold shadow-lg"
            >
              Access Admin Panel
            </Link>
            <Link
              href="https://github.com/datanalytics86/My_Profile"
              className="px-8 py-4 border-2 border-white rounded-lg hover:bg-white/10 transition-all font-semibold"
              target="_blank"
            >
              View Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6" />
                <span className="font-bold">QAQC Framework</span>
              </div>
              <p className="text-gray-400 text-sm">
                Comprehensive quality assurance framework for modern software development
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Documentation</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">QAQC Standards</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Security Guide</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Code Review</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Templates</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">CI/CD Workflows</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Project Structure</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">GitHub</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contributing</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">License</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>&copy; 2025 QAQC Framework. All rights reserved. MIT License.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

const features = [
  {
    icon: Shield,
    title: 'Security First',
    description: 'Complete OWASP Top 10 coverage with practical examples and prevention strategies.',
  },
  {
    icon: Code,
    title: 'Clean Code',
    description: 'Standards and best practices for writing maintainable, readable code.',
  },
  {
    icon: Zap,
    title: 'CI/CD Ready',
    description: 'Production-ready workflows for GitHub Actions with comprehensive testing.',
  },
  {
    icon: CheckCircle,
    title: 'Code Review',
    description: 'Detailed checklists ensuring thorough and effective code reviews.',
  },
  {
    icon: TrendingUp,
    title: 'Quality Metrics',
    description: 'Track and measure code quality with defined targets and thresholds.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Templates and guidelines for better team collaboration and communication.',
  },
];

const docs = [
  {
    title: 'QAQC Standards',
    description: '15,000+ words covering clean code, security, testing, and documentation standards.',
    href: '/docs/qaqc-standards',
  },
  {
    title: 'Security Guide',
    description: 'Comprehensive security guide with OWASP Top 10 and practical code examples.',
    href: '/docs/security-guide',
  },
  {
    title: 'Code Review Checklist',
    description: 'Step-by-step checklist for effective code reviews covering all quality aspects.',
    href: '/docs/code-review',
  },
  {
    title: 'Project Structure',
    description: 'Recommended structures for Node.js, Python, React, and microservices projects.',
    href: '/docs/project-structure',
  },
];
