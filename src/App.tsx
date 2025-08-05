import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { updateSettings } from './store/settingsSlice';
import type { Theme, FontSize } from './store/settingsSlice';
import { EmailLayout } from './components/EmailLayout';
import { LandingPage } from './components/LandingPage';
import { ComposeScreen, ReplyData } from './components/ComposeScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { LearnMoreScreen } from './components/LearnMoreScreen';
import { PrivacyScreen } from './components/PrivacyScreen';
import { TermsScreen } from './components/TermsScreen';
import { SupportScreen } from './components/SupportScreen';

type Screen = 'landing' | 'email' | 'compose' | 'settings' | 'learn-more' | 'privacy' | 'terms' | 'support';

interface AppSettings {
  theme: Theme;
  fontSize: FontSize;
  desktopAlerts: boolean;
}

interface UserAccount {
  id: string;
  account: string;
  primaryEmail: string;
  createdAt: string;
  isConnected: boolean;
}

// Helper function to generate random wallet address
function generateRandomaccount(): string {
  const chars = '0123456789abcdef';
  let address = '0x';
  for (let i = 0; i < 40; i++) {
    address += chars[Math.floor(Math.random() * chars.length)];
  }
  return address;
}

// Helper function to generate random account
function generateRandomAccount(): UserAccount {
  const account = generateRandomaccount();
  return {
    id: Math.random().toString(36).substr(2, 9),
    account,
    primaryEmail: `${account}@0xfog.com`,
    createdAt: new Date().toISOString(),
    isConnected: true,
  };
}

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [replyData, setReplyData] = useState<ReplyData | undefined>(undefined);
  
  // Account state - temporarily inline to fix import issues
  const [account, setAccount] = useState<UserAccount | null>(null);
  
  // Use Redux for settings
  const settings = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  // Apply theme and font size changes
  useEffect(() => {
    // Apply theme
    document.documentElement.classList.toggle('dark', settings.theme === 'dark');
    
    // Apply font size
    const fontSizes = {
      small: '12px',
      medium: '14px',
      large: '16px',
    };
    
    document.documentElement.style.setProperty('--font-size', fontSizes[settings.fontSize]);
  }, [settings.theme, settings.fontSize]);

  const handleLogin = () => {
    // Generate a random account and navigate to email
    try {
      const newAccount = generateRandomAccount();
      setAccount(newAccount);
      setCurrentScreen('email');
    } catch (error) {
      console.error('Error generating account:', error);
    }
  };

  const handleLogout = () => {
    // Clear account and go back to landing
    try {
      setAccount(null);
      setCurrentScreen('landing');
      setReplyData(undefined);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleCompose = (data?: any) => {
    // Transform the reply data from EmailDetail to the format expected by ComposeScreen
    if (data && data.originalEmail) {
      const { type, originalEmail, selectedText } = data;
      
      let subject = originalEmail.subject;
      let to: string[] = [];
      let cc: string[] = [];
      
      if (type === 'reply') {
        subject = subject.startsWith('Re: ') ? subject : `Re: ${subject}`;
        to = [originalEmail.senderEmail];
      } else if (type === 'replyAll') {
        subject = subject.startsWith('Re: ') ? subject : `Re: ${subject}`;
        to = [originalEmail.senderEmail];
        // Add cc recipients if they exist
        if (originalEmail.cc) {
          cc = originalEmail.cc;
        }
      } else if (type === 'forward') {
        subject = subject.startsWith('Fwd: ') ? subject : `Fwd: ${subject}`;
        to = [];
      }
      
      const quotedBody = selectedText || originalEmail.content;
      const body = `\n\n------- Original Message -------\nFrom: ${originalEmail.sender} <${originalEmail.senderEmail}>\nDate: ${originalEmail.timestamp}\nSubject: ${originalEmail.subject}\n\n${quotedBody}`;
      
      setReplyData({
        type,
        to,
        cc: cc.length > 0 ? cc : undefined,
        subject,
        body,
        originalSender: originalEmail.senderEmail,
      });
    } else {
      setReplyData(data);
    }
    
    setCurrentScreen('compose');
  };

  const handleSettings = () => {
    setCurrentScreen('settings');
  };

  const handleBackToEmail = () => {
    setCurrentScreen('email');
    setReplyData(undefined);
  };

  const handleBackToLanding = () => {
    setCurrentScreen('landing');
  };

  const handleBackToAppropriateScreen = () => {
    // If user is logged in, go back to email, otherwise go to landing
    if (account) {
      setCurrentScreen('email');
    } else {
      setCurrentScreen('landing');
    }
  };

  const handleSettingsChange = (newSettings: Partial<AppSettings>) => {
    dispatch(updateSettings(newSettings));
  };

  const handleNavigateToInfo = (screen: 'learn-more' | 'privacy' | 'terms' | 'support') => {
    setCurrentScreen(screen);
  };

  const handleFooterNavigate = (screen: 'privacy' | 'terms' | 'support') => {
    setCurrentScreen(screen);
  };

  return (
    <div className="size-full">
      {currentScreen === 'landing' && (
        <LandingPage 
          onLogin={handleLogin} 
          onNavigate={handleNavigateToInfo}
        />
      )}
      
      {currentScreen === 'email' && (
        <EmailLayout 
          onLogout={handleLogout}
          onCompose={handleCompose}
          onSettings={handleSettings}
          account={account}
          onFooterNavigate={handleFooterNavigate}
        />
      )}
      
      {currentScreen === 'compose' && (
        <ComposeScreen 
          onBack={handleBackToEmail}
          replyData={replyData}
          onFooterNavigate={handleFooterNavigate}
        />
      )}
      
      {currentScreen === 'settings' && (
        <SettingsScreen 
          onBack={handleBackToEmail}
          onLogout={handleLogout}
          settings={settings}
          onSettingsChange={handleSettingsChange}
          account={account}
          onFooterNavigate={handleFooterNavigate}
        />
      )}

      {currentScreen === 'learn-more' && (
        <LearnMoreScreen onBack={handleBackToLanding} />
      )}

      {currentScreen === 'privacy' && (
        <PrivacyScreen onBack={handleBackToAppropriateScreen} />
      )}

      {currentScreen === 'terms' && (
        <TermsScreen onBack={handleBackToAppropriateScreen} />
      )}

      {currentScreen === 'support' && (
        <SupportScreen onBack={handleBackToAppropriateScreen} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}