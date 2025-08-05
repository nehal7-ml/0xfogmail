import { ArrowLeft, Shield, Eye, Lock, Database } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface PrivacyScreenProps {
  onBack: () => void;
}

export function PrivacyScreen({ onBack }: PrivacyScreenProps) {
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
            <h1 className="text-xl font-semibold text-foreground">Privacy Policy</h1>
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
                <Shield className="w-5 h-5 text-primary" />
                Our Commitment to Privacy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                At ProMail, we take your privacy seriously. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our email services. We are 
                committed to protecting your personal information and your right to privacy.
              </p>
            </CardContent>
          </Card>

          {/* Data Collection */}
          <Card className="web3-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Personal Information</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Email address and account credentials</li>
                  <li>• Name and contact information</li>
                  <li>• Profile information you choose to provide</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Usage Information</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Email sending and receiving patterns</li>
                  <li>• Device and browser information</li>
                  <li>• IP address and location data</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Email Content</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Email messages and attachments</li>
                  <li>• Contacts and address book information</li>
                  <li>• Calendar events and appointments</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Data Usage */}
          <Card className="web3-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• <strong>Service Provision:</strong> To provide, operate, and maintain our email services</li>
                <li>• <strong>Communication:</strong> To deliver emails and enable communication features</li>
                <li>• <strong>Security:</strong> To protect against spam, abuse, and security threats</li>
                <li>• <strong>Improvement:</strong> To understand usage patterns and improve our services</li>
                <li>• <strong>Support:</strong> To provide customer support and respond to inquiries</li>
                <li>• <strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Protection */}
          <Card className="web3-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                Data Protection & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Encryption</h4>
                <p className="text-sm text-muted-foreground">
                  All emails are encrypted in transit using TLS and at rest using AES-256 encryption. 
                  Your data is protected with industry-standard security measures.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Access Controls</h4>
                <p className="text-sm text-muted-foreground">
                  We implement strict access controls and authentication measures. Only authorized 
                  personnel have access to user data, and all access is logged and monitored.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Data Retention</h4>
                <p className="text-sm text-muted-foreground">
                  We retain your data only as long as necessary to provide our services and comply 
                  with legal obligations. You can delete your account and data at any time.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* User Rights */}
          <Card className="web3-card">
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Under applicable privacy laws, you have the following rights:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Access your personal data</li>
                <li>• Correct inaccurate or incomplete data</li>
                <li>• Delete your account and personal data</li>
                <li>• Export your data in a portable format</li>
                <li>• Object to certain processing activities</li>
                <li>• Withdraw consent at any time</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="web3-card bg-primary/5">
            <CardContent className="pt-6">
              <h3 className="font-medium mb-2">Questions About Privacy?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                If you have any questions about this Privacy Policy or our data practices, 
                please contact our Privacy Officer at privacy@promail.com
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