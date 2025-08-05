import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Mail, LogIn } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary rounded-full">
              <Mail className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">Welcome to Email</CardTitle>
          <CardDescription>
            Sign in to access your email account
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <Button 
            onClick={onLogin}
            className="w-full bg-primary hover:bg-primary/90"
            size="lg"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Log in
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            This is a demo email application
          </p>
        </CardContent>
      </Card>
    </div>
  );
}