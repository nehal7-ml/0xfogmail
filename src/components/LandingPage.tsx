import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Mail, LogIn, Shield, Zap, Globe, Users, Check } from 'lucide-react';
import { landingContent } from '../data/landing-content';

interface LandingPageProps {
  onLogin: () => void;
  onNavigate: (screen: 'learn-more' | 'privacy' | 'terms' | 'support') => void;
}

// Icon mapping for dynamic icon rendering
const iconMap = {
  Shield,
  Zap,
  Globe,
  Users,
} as const;

export function LandingPage({ onLogin, onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Banner */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
              <Mail className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">{landingContent.branding.title}</h1>
              <p className="text-sm text-muted-foreground">{landingContent.branding.subtitle}</p>
            </div>
          </div>
          
          <Button 
            onClick={onLogin}
            className="bg-primary hover:bg-primary/90 web3-button glow-primary"
            size="lg"
          >
            <LogIn className="w-4 h-4 mr-2" />
            {landingContent.hero.loginButton}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              {landingContent.hero.title}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {landingContent.hero.description}
            </p>
            <Button 
              onClick={onLogin}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 web3-button glow-primary"
            >
              {landingContent.hero.primaryButton}
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {landingContent.features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon];
            return (
              <Card key={index} className="text-center web3-card">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="bg-muted/50 rounded-2xl p-8 mb-16 web3-card">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8">
              {landingContent.benefits.title}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {landingContent.benefits.items.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-primary/5 rounded-2xl p-12 web3-card">
          <h3 className="text-3xl font-bold mb-4">
            {landingContent.cta.title}
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {landingContent.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onLogin}
              size="lg"
              className="bg-primary hover:bg-primary/90 web3-button glow-primary"
            >
              <LogIn className="w-4 h-4 mr-2" />
              {landingContent.cta.primaryButton}
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => onNavigate('learn-more')}
              className="web3-button"
            >
              {landingContent.cta.secondaryButton}
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Mail className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">
                {landingContent.branding.copyright}
              </span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              {landingContent.footer.links.map((link, index) => (
                <button 
                  key={index}
                  onClick={() => onNavigate(link.screen)}
                  className="hover:text-foreground"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}