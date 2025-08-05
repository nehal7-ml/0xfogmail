import { ArrowLeft, HelpCircle, MessageCircle, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface SupportScreenProps {
  onBack: () => void;
}

export function SupportScreen({ onBack }: SupportScreenProps) {
  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      availability: '24/7',
      action: 'Start Chat'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us a detailed message',
      availability: 'Response within 4 hours',
      action: 'Send Email'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our experts',
      availability: 'Mon-Fri 9AM-6PM EST',
      action: 'Call Now'
    }
  ];

  const faqs = [
    {
      question: 'How do I set up my email account?',
      answer: 'You can set up your account by clicking the "Log in" button and following the setup wizard. We support IMAP, POP3, and Exchange protocols.'
    },
    {
      question: 'What is the storage limit for my account?',
      answer: 'Free accounts include 15GB of storage. Premium accounts start at 100GB with unlimited options available for enterprise customers.'
    },
    {
      question: 'Can I use my own domain?',
      answer: 'Yes, premium accounts support custom domains. You can add multiple domains and create unlimited email addresses.'
    },
    {
      question: 'How secure is my data?',
      answer: 'We use enterprise-grade security including AES-256 encryption, two-factor authentication, and regular security audits.'
    },
    {
      question: 'Can I access my email offline?',
      answer: 'Yes, our desktop and mobile apps support offline access. Your recent emails will be available even without an internet connection.'
    }
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
          <div>
            <h1 className="text-xl font-semibold text-foreground">Support Center</h1>
            <p className="text-sm text-muted-foreground">Get help with ProMail</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-8">
          {/* Contact Methods */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Support</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <Card key={index} className="web3-card">
                    <CardHeader className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-3 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{method.title}</CardTitle>
                      <CardDescription>{method.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
                        <Clock className="w-4 h-4" />
                        {method.availability}
                      </div>
                      <Button className="w-full web3-button" variant="outline">
                        {method.action}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-primary" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="web3-card">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed pl-7">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Additional Resources */}
          <Card className="web3-card">
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
              <CardDescription>
                Helpful links and documentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Documentation</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <a href="#" className="hover:text-foreground">Getting Started Guide</a></li>
                    <li>• <a href="#" className="hover:text-foreground">Email Setup Instructions</a></li>
                    <li>• <a href="#" className="hover:text-foreground">Mobile App Guide</a></li>
                    <li>• <a href="#" className="hover:text-foreground">Security Best Practices</a></li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Community</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <a href="#" className="hover:text-foreground">User Forums</a></li>
                    <li>• <a href="#" className="hover:text-foreground">Video Tutorials</a></li>
                    <li>• <a href="#" className="hover:text-foreground">Feature Requests</a></li>
                    <li>• <a href="#" className="hover:text-foreground">System Status</a></li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card className="web3-card bg-destructive/5 border-destructive/20">
            <CardHeader>
              <CardTitle className="text-destructive">Emergency Support</CardTitle>
              <CardDescription>
                For critical security issues or account compromises
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                If you believe your account has been compromised or you are experiencing 
                a security issue, please contact our emergency support line immediately.
              </p>
              <div className="flex gap-4">
                <Button variant="destructive" className="web3-button">
                  Emergency Contact
                </Button>
                <Button 
                  onClick={onBack}
                  variant="outline"
                  className="web3-button"
                >
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}