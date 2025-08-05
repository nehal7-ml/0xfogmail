import { Mail } from 'lucide-react';

interface FooterProps {
  onNavigate?: (screen: 'privacy' | 'terms' | 'support') => void;
  compact?: boolean;
}

export function Footer({ onNavigate, compact = false }: FooterProps) {
  return (
    <footer className={`border-t bg-card ${compact ? 'py-3' : 'py-8'} mt-auto`}>
      <div className="container mx-auto px-4">
        <div className={`flex ${compact ? 'flex-row items-center justify-between' : 'flex-col md:flex-row items-center justify-between gap-4'}`}>
          <div className="flex items-center gap-3">
            <div className={`${compact ? 'w-6 h-6' : 'w-8 h-8'} bg-primary rounded-lg flex items-center justify-center`}>
              <Mail className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} text-primary-foreground`} />
            </div>
            <span className={`${compact ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
              © 2024 ProMail Server. All rights reserved.
            </span>
          </div>
          
          {onNavigate && (
            <div className={`flex gap-6 ${compact ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
              <button 
                onClick={() => onNavigate('privacy')}
                className="hover:text-foreground transition-colors"
              >
                Privacy
              </button>
              <button 
                onClick={() => onNavigate('terms')}
                className="hover:text-foreground transition-colors"
              >
                Terms
              </button>
              <button 
                onClick={() => onNavigate('support')}
                className="hover:text-foreground transition-colors"
              >
                Support
              </button>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}