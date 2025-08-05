import { ArrowLeft, Mail, Shield, Zap, Globe, Users, Check, Server, Cloud, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface LearnMoreScreenProps {
  onBack: () => void;
}

export function LearnMoreScreen({ onBack }: LearnMoreScreenProps) {
  const features = [
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Military-grade encryption, two-factor authentication, and advanced threat protection keep your communications secure.',
      details: ['End-to-end encryption', 'Advanced spam filtering', 'Malware protection', 'Data loss prevention']
    },
    {
      icon: Zap,
      title: 'Lightning Performance',
      description: 'Optimized infrastructure ensures instant email delivery and real-time synchronization across all devices.',
      details: ['Sub-second delivery', 'Real-time sync', 'Global CDN', '99.9% uptime SLA']
    },
    {
      icon: Globe,
      title: 'Global Infrastructure',
      description: 'Distributed servers worldwide provide reliable access and optimal performance from anywhere.',
      details: ['Multi-region deployment', 'Automatic failover', 'Edge caching', 'Local data centers']
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Advanced collaboration tools designed for modern teams and organizations.',
      details: ['Shared mailboxes', 'Team calendars', 'Contact sharing', 'Delegation features']
    }
  ];

  const stats = [
    { number: '10M+', label: 'Active Users' },
    { number: '99.9%', label: 'Uptime' },
    { number: '150+', label: 'Countries' },
    { number: '24/7', label: 'Support' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="web3-button glow-primary hover:bg-accent"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Mail className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Learn More</h1>
              <p className="text-sm text-muted-foreground">Discover ProMail capabilities</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            The Future of Professional Email
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            ProMail combines cutting-edge technology with intuitive design to deliver 
            the most advanced email platform for businesses and professionals.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center web3-card">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features */}
        <div className="space-y-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="web3-card">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                      <CardDescription className="text-base">{feature.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {feature.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Technical Specs */}
        <div className="mt-16">
          <Card className="web3-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-5 h-5 text-primary" />
                Technical Specifications
              </CardTitle>
              <CardDescription>
                Built on enterprise-grade infrastructure for maximum reliability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Cloud className="w-4 h-4 text-primary" />
                    Infrastructure
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Multi-cloud deployment</li>
                    <li>• Auto-scaling architecture</li>
                    <li>• Load balancing</li>
                    <li>• CDN acceleration</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-primary" />
                    Security
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• AES-256 encryption</li>
                    <li>• SOC 2 compliance</li>
                    <li>• GDPR compliant</li>
                    <li>• Regular security audits</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    Performance
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 99.9% uptime guarantee</li>
                    <li>• Sub-100ms response times</li>
                    <li>• Real-time synchronization</li>
                    <li>• Offline capability</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Card className="web3-card bg-primary/5">
            <CardContent className="pt-8 pb-8">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join millions of professionals who trust ProMail for their email communication needs.
              </p>
              <Button 
                onClick={onBack}
                size="lg"
                className="web3-button glow-primary gradient-primary"
              >
                Back to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}