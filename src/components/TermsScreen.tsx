import { ArrowLeft, FileText, Users, Shield, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface TermsScreenProps {
  onBack: () => void;
}

export function TermsScreen({ onBack }: TermsScreenProps) {
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
            <h1 className="text-xl font-semibold text-foreground">Terms of Service</h1>
            <p className="text-sm text-muted-foreground">Last updated: December 2024</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-8">
          {/* Introduction */}
          <Card className="web3-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Agreement to Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                These Terms of Service govern your use of ProMail email services. 
                By accessing or using our services, you agree to be bound by these Terms. 
                If you do not agree to these Terms, please do not use our services.
              </p>
            </CardContent>
          </Card>

          {/* Account Terms */}
          <Card className="web3-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Account Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Account Creation</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• You must provide accurate and complete information</li>
                  <li>• You are responsible for maintaining account security</li>
                  <li>• One person may not maintain multiple free accounts</li>
                  <li>• You must be at least 13 years old to create an account</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Account Responsibilities</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Keep your password secure and confidential</li>
                  <li>• Notify us immediately of any unauthorized access</li>
                  <li>• You are responsible for all activity under your account</li>
                  <li>• Maintain current contact information</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Acceptable Use */}
          <Card className="web3-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 w-5 text-primary" />
                Acceptable Use Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Permitted Uses</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Personal and business communication</li>
                  <li>• Legitimate marketing and promotional emails</li>
                  <li>• File sharing and collaboration</li>
                  <li>• Calendar and scheduling activities</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Prohibited Uses</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Sending spam or unsolicited emails</li>
                  <li>• Distributing malware or viruses</li>
                  <li>• Harassment or abusive content</li>
                  <li>• Illegal activities or content</li>
                  <li>• Violating others intellectual property rights</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Service Terms */}
          <Card className="web3-card">
            <CardHeader>
              <CardTitle>Service Availability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Service Levels</h4>
                <p className="text-sm text-muted-foreground">
                  We strive to maintain 99.9% uptime for our services. However, we do not guarantee 
                  uninterrupted service and may experience occasional downtime for maintenance or 
                  technical issues.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Modifications</h4>
                <p className="text-sm text-muted-foreground">
                  We reserve the right to modify, suspend, or discontinue any part of our services 
                  at any time. We will provide reasonable notice for significant changes.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Billing & Cancellation */}
          <Card className="web3-card">
            <CardHeader>
              <CardTitle>Billing and Cancellation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Payment Terms</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Subscription fees are billed in advance</li>
                  <li>• All fees are non-refundable unless required by law</li>
                  <li>• We may change pricing with 30 days notice</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Cancellation</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• You may cancel your subscription at any time</li>
                  <li>• Service continues until the end of the billing period</li>
                  <li>• We may terminate accounts for Terms violations</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimers */}
          <Card className="web3-card border-warning/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warning">
                <AlertTriangle className="w-5 h-5" />
                Important Disclaimers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                OUR SERVICES ARE PROVIDED AS IS WITHOUT WARRANTIES OF ANY KIND. 
                WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY 
                AND FITNESS FOR A PARTICULAR PURPOSE. YOUR USE OF OUR SERVICES IS AT YOUR OWN RISK.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="web3-card bg-primary/5">
            <CardContent className="pt-6">
              <h3 className="font-medium mb-2">Questions About These Terms?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                If you have any questions about these Terms of Service, 
                please contact our legal team at legal@promail.com
              </p>
              <Button 
                onClick={onBack}
                className="web3-button"
                variant="outline"
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