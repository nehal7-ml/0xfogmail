import { ArrowLeft, User, Bell, Palette, Type } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import type { UserAccount } from '../middleware';
import { Footer } from './Footer';

type Theme = 'dark' | 'light';
type FontSize = 'small' | 'medium' | 'large';

interface AppSettings {
  theme: Theme;
  fontSize: FontSize;
  desktopAlerts: boolean;
}

interface SettingsScreenProps {
  onBack: () => void;
  onLogout: () => void;
  settings: AppSettings;
  onSettingsChange: (settings: Partial<AppSettings>) => void;
  account: UserAccount | null;
  onFooterNavigate?: (screen: 'privacy' | 'terms' | 'support') => void;
}

export function SettingsScreen({ onBack, onLogout, settings, onSettingsChange, account, onFooterNavigate }: SettingsScreenProps) {
  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-card p-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="web3-button glow-primary hover:bg-accent"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <span className="text-xl font-medium text-foreground">Settings</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-2xl space-y-6">
          {/* Account Section */}
          <Card className="web3-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-primary" />
                <span>Account</span>
              </CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  {account ? (
                    <>
                      <p className="font-medium">{account.account}</p>
                      <p className="text-sm text-muted-foreground">{account.primaryEmail}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Connected: {new Date(account.createdAt).toLocaleDateString()}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-medium">No account connected</p>
                      <p className="text-sm text-muted-foreground">Please log in to view account details</p>
                    </>
                  )}
                </div>
              </div>
              
              <Separator />
              
              <div className="pt-2">
                <Button 
                  variant="destructive" 
                  onClick={onLogout}
                  className="web3-button"
                  disabled={!account}
                >
                  Log out
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Appearance Section */}
          <Card className="web3-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5 text-primary" />
                <span>Appearance</span>
              </CardTitle>
              <CardDescription>Customize the look and feel of the app</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Theme Selection */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Theme selection</Label>
                <RadioGroup
                  value={settings.theme}
                  onValueChange={(value: Theme) => onSettingsChange({ theme: value })}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="dark" />
                    <Label htmlFor="dark" className="cursor-pointer">Dark theme</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light" className="cursor-pointer">Light theme</Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              {/* Font Size */}
              <div className="space-y-3">
                <Label className="text-base font-medium flex items-center space-x-2">
                  <Type className="h-4 w-4" />
                  <span>Font size</span>
                </Label>
                <Select
                  value={settings.fontSize}
                  onValueChange={(value: FontSize) => onSettingsChange({ fontSize: value })}
                >
                  <SelectTrigger className="web3-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notifications Section */}
          <Card className="web3-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-primary" />
                <span>Notifications</span>
              </CardTitle>
              <CardDescription>Control your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label className="text-base font-medium">Desktop alerts</Label>
                <RadioGroup
                  value={settings.desktopAlerts ? "yes" : "no"}
                  onValueChange={(value) => onSettingsChange({ desktopAlerts: value === "yes" })}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="alerts-yes" />
                    <Label htmlFor="alerts-yes" className="cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="alerts-no" />
                    <Label htmlFor="alerts-no" className="cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* Footer */}
      <Footer onNavigate={onFooterNavigate} compact />
    </div>
  );
}