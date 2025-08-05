import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from './ui/sheet';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { 
  Inbox, 
  Send, 
  Archive, 
  Trash2, 
  Star, 
  Menu, 
  Search, 
  Settings,
  Plus,
  User,
  Check
} from 'lucide-react';
import { EmailList } from './EmailList';
import { EmailDetail } from './EmailDetail';
import { ReplyData } from './ComposeScreen';
import { UserAccount } from '../middleware/useAccount';
import { Footer } from './Footer';

export interface Email {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  preview: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  hasAttachment: boolean;
  folder: string;
}

interface EmailAddress {
  id: string;
  address: string;
  displayName: string;
  isPrimary: boolean;
  isVerified: boolean;
}

interface MailBox {
  id: string;
  name: string;
  type: 'inbox' | 'starred' | 'sent' | 'archive' | 'trash' | 'custom';
  numberOfEmails: number;
  numberOfUnreadEmails: number;
}

interface EmailData {
  id: string;
  from: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  body: string;
  datetime: string;
  attachments?: any[];
  read: boolean;
}

interface EmailLayoutProps {
  onLogout: () => void;
  onCompose: (replyData?: ReplyData) => void;
  onSettings: () => void;
  account: UserAccount | null;
  onFooterNavigate?: (screen: 'privacy' | 'terms' | 'support') => void;
}

const folders = [
  { id: 'inbox', name: 'Inbox', icon: Inbox },
  { id: 'starred', name: 'Starred', icon: Star },
  { id: 'sent', name: 'Sent', icon: Send },
  { id: 'archive', name: 'Archive', icon: Archive },
  { id: 'trash', name: 'Trash', icon: Trash2 },
];

// Helper function to shorten wallet addresses
function shortenAddress(address: string, startChars = 6, endChars = 4): string {
  if (!address || address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

// Hook to get email addresses for the account
function useEmailAddresses(accountaccount?: string): EmailAddress[] {
  const [emailAddresses, setEmailAddresses] = useState<EmailAddress[]>([]);

  useEffect(() => {
    if (!accountaccount) {
      setEmailAddresses([]);
      return;
    }

    const addresses: EmailAddress[] = [
      {
        id: '1',
        address: `${accountaccount}@0xfog.com`,
        displayName: shortenAddress(accountaccount),
        isPrimary: true,
        isVerified: true,
      },
      {
        id: '2',
        address: 'my.eth@0xfog.com',
        displayName: 'my.eth',
        isPrimary: false,
        isVerified: true,
      },
      {
        id: '3',
        address: 'crypto.wallet@0xfog.com',
        displayName: 'crypto.wallet',
        isPrimary: false,
        isVerified: false,
      },
    ];

    setEmailAddresses(addresses);
  }, [accountaccount]);

  return emailAddresses;
}

// Hook to get mailboxes for the selected email address
function useMailBoxes(emailAddress?: string): MailBox[] {
  const [mailBoxes, setMailBoxes] = useState<MailBox[]>([]);

  useEffect(() => {
    if (!emailAddress) {
      setMailBoxes([]);
      return;
    }

    const defaultMailBoxes: MailBox[] = [
      {
        id: 'inbox',
        name: 'Inbox',
        type: 'inbox',
        numberOfEmails: 156,
        numberOfUnreadEmails: 12,
      },
      {
        id: 'starred',
        name: 'Starred',
        type: 'starred',
        numberOfEmails: 23,
        numberOfUnreadEmails: 3,
      },
      {
        id: 'sent',
        name: 'Sent',
        type: 'sent',
        numberOfEmails: 89,
        numberOfUnreadEmails: 0,
      },
      {
        id: 'archive',
        name: 'Archive',
        type: 'archive',
        numberOfEmails: 234,
        numberOfUnreadEmails: 0,
      },
      {
        id: 'trash',
        name: 'Trash',
        type: 'trash',
        numberOfEmails: 23,
        numberOfUnreadEmails: 0,
      },
    ];

    setMailBoxes(defaultMailBoxes);
  }, [emailAddress]);

  return mailBoxes;
}

// Hook to get emails for the selected email address and mailbox
function useEmails(emailAddress?: string, mailBox?: string): EmailData[] {
  const [emails, setEmails] = useState<EmailData[]>([]);

  useEffect(() => {
    if (!emailAddress || !mailBox) {
      setEmails([]);
      return;
    }

    const baseEmails: EmailData[] = [
      {
        id: '1',
        from: 'alice@example.com',
        to: ['user@0xfog.com'],
        subject: 'Q4 Planning Meeting',
        body: `Hi team,

I wanted to schedule our Q4 planning meeting for next week. Please let me know your availability for the following times:

- Tuesday, 3:00 PM - 4:00 PM
- Wednesday, 2:00 PM - 3:00 PM  
- Thursday, 10:00 AM - 11:00 AM

We will be discussing:
1. Q4 goals and objectives
2. Resource allocation
3. Timeline and milestones

Looking forward to hearing from you.

Best regards,
Alice`,
        datetime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        read: false,
        attachments: [],
      },
      {
        id: '2',
        from: 'marketing@company.com',
        to: ['user@0xfog.com'],
        cc: ['team@company.com'],
        subject: 'New Campaign Performance Report',
        body: `Hi everyone,

The latest campaign metrics are in! Overall performance exceeded expectations with a 23% increase in engagement compared to last quarter.

Key highlights:
- 23% increase in engagement
- 15% growth in conversions
- 8% improvement in click-through rates

Detailed report is attached.

Thanks,
Marketing Team`,
        datetime: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        read: true,
        attachments: [
          {
            id: 'att1',
            name: 'Q4-Report.pdf',
            size: 2456789,
            type: 'application/pdf',
          },
        ],
      },
      {
        id: '3',
        from: 'support@blockchain.com',
        to: ['user@0xfog.com'],
        subject: 'Your Transaction is Complete',
        body: `Hello,

Your recent transaction has been successfully processed on the Ethereum blockchain.

Transaction Details:
- Hash: 0x742d35cc6bf8543f5c8e5c4d2c2f8c6f5d2c2f8c742d35cc6bf8543f5c8e5c4d
- Amount: 0.5 ETH
- Gas Fee: 0.003 ETH
- Confirmation: 12 blocks

You can view the transaction details on Etherscan.

Best regards,
Blockchain Support`,
        datetime: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        read: true,
        attachments: [],
      },
    ];

    // Filter emails based on mailbox type
    let filteredEmails: EmailData[] = [];
    switch (mailBox) {
      case 'inbox':
        filteredEmails = baseEmails;
        break;
      case 'starred':
        filteredEmails = baseEmails.slice(0, 2);
        break;
      case 'sent':
        filteredEmails = [
          {
            id: 'sent1',
            from: 'user@0xfog.com',
            to: ['alice@example.com'],
            subject: 'Re: Q4 Planning Meeting',
            body: 'I can make it on Thursday, 10:00 AM - 11:00 AM. Thanks!',
            datetime: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
            read: true,
            attachments: [],
          },
        ];
        break;
      case 'archive':
        filteredEmails = baseEmails.slice(2, 3);
        break;
      case 'trash':
        filteredEmails = [
          {
            id: 'trash1',
            from: 'spam@example.com',
            to: ['user@0xfog.com'],
            subject: 'You won the lottery!',
            body: 'Congratulations! You have won $1,000,000...',
            datetime: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
            read: false,
            attachments: [],
          },
        ];
        break;
      default:
        filteredEmails = [];
    }

    setEmails(filteredEmails);
  }, [emailAddress, mailBox]);

  return emails;
}

export function EmailLayout({ onCompose, onSettings, account, onFooterNavigate }: EmailLayoutProps) {
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmailAddress, setSelectedEmailAddress] = useState<string>('');

  // Get email addresses for the current account
  const emailAddresses = useEmailAddresses(account?.account);
  
  // Get mailboxes for the selected email address
  const mailBoxes = useMailBoxes(selectedEmailAddress);
  
  // Get emails for the selected email address and folder
  const emails = useEmails(selectedEmailAddress, selectedFolder);

  // Set default email address when available (defaults to first email address)
  useEffect(() => {
    if (emailAddresses.length > 0 && !selectedEmailAddress) {
      setSelectedEmailAddress(emailAddresses[0].address);
    }
  }, [emailAddresses, selectedEmailAddress]);

  // Convert middleware emails to EmailLayout email format
  const convertedEmails: Email[] = React.useMemo(() => {
    if (!emails.length) return [];
    
    return emails.map(email => ({
      id: email.id,
      sender: email.from.split('@')[0] || 'Unknown',
      senderEmail: email.from,
      subject: email.subject,
      preview: email.body.substring(0, 100) + '...',
      content: email.body,
      timestamp: new Date(email.datetime).toLocaleString(),
      isRead: email.read,
      isStarred: selectedFolder === 'starred',
      hasAttachment: !!(email.attachments && email.attachments.length > 0),
      folder: selectedFolder,
    }));
  }, [emails, selectedFolder]);

  const filteredEmails = convertedEmails.filter(email => 
    email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Email Addresses Panel Content
  const EmailAddressesPanel = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h3 className="text-sm text-muted-foreground uppercase tracking-wide">Email Addresses</h3>
      </div>
      
      <ScrollArea className="flex-1 p-2">
        <div className="space-y-1">
          {emailAddresses.map((emailAddr) => (
            <Button
              key={emailAddr.id}
              variant={selectedEmailAddress === emailAddr.address ? "secondary" : "ghost"}
              className="w-full justify-start h-auto p-3 text-left"
              onClick={() => {
                setSelectedEmailAddress(emailAddr.address);
                setSelectedEmail(null);
              }}
            >
              <div className="flex items-start gap-2 flex-1 min-w-0">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-3 h-3 text-primary" />
                </div>
                <div className="flex flex-col items-start min-w-0 flex-1">
                  <div className="flex items-center gap-1 w-full">
                    <span className="text-xs truncate flex-1">{emailAddr.displayName}</span>
                    {emailAddr.isPrimary && (
                      <Badge variant="secondary" className="text-xs px-1 py-0">P</Badge>
                    )}
                    {emailAddr.isVerified && (
                      <Check className="w-3 h-3 text-primary flex-shrink-0" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground truncate w-full">{shortenAddress(emailAddr.address, 12, 8)}</span>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
      
      {/* Settings button at bottom of email addresses panel */}
      <div className="p-4 border-t">
        <Button 
          variant="ghost" 
          className="w-full justify-start"
          onClick={onSettings}
        >
          <Settings className="w-4 h-4 mr-3" />
          Settings
        </Button>
      </div>
    </div>
  );

  // Mailboxes Panel Content
  const MailboxesPanel = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 space-y-3">
        <Button 
          onClick={() => onCompose()}
          className="w-full bg-primary hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Compose
        </Button>
      </div>
      
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1">
          {folders.map((folder) => {
            const IconComponent = folder.icon;
            const mailBox = mailBoxes?.find(mb => mb.id === folder.id);
            const count = mailBox?.numberOfUnreadEmails || 0;
            
            return (
              <Button
                key={folder.id}
                variant={selectedFolder === folder.id ? "secondary" : "ghost"}
                className="w-full justify-start h-10"
                onClick={() => {
                  setSelectedFolder(folder.id);
                  setSelectedEmail(null);
                  setIsMobileSidebarOpen(false);
                }}
              >
                <IconComponent className="w-4 h-4 mr-3" />
                <span className="flex-1 text-left">{folder.name}</span>
                {count > 0 && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {count}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );

  // Mobile Sidebar Content (combines both panels)
  const MobileSidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 space-y-3">
        <Button 
          onClick={() => onCompose()}
          className="w-full bg-primary hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Compose
        </Button>
      </div>

      {/* Email Addresses Section */}
      <div className="px-4 pb-2">
        <h4 className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Email Addresses</h4>
        <div className="space-y-1">
          {emailAddresses.slice(0, 2).map((emailAddr) => (
            <Button
              key={emailAddr.id}
              variant={selectedEmailAddress === emailAddr.address ? "secondary" : "ghost"}
              className="w-full justify-start h-auto p-2 text-left"
              onClick={() => {
                setSelectedEmailAddress(emailAddr.address);
                setSelectedEmail(null);
                setIsMobileSidebarOpen(false);
              }}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <User className="w-4 h-4 text-primary flex-shrink-0" />
                <div className="flex flex-col items-start min-w-0 flex-1">
                  <span className="text-xs truncate w-full">{emailAddr.displayName}</span>
                  <span className="text-xs text-muted-foreground truncate w-full">{shortenAddress(emailAddr.address, 12, 8)}</span>
                </div>
                {emailAddr.isPrimary && (
                  <Badge variant="secondary" className="text-xs px-1 py-0">P</Badge>
                )}
              </div>
            </Button>
          ))}
        </div>
      </div>

      <Separator className="mx-4" />
      
      {/* Folders Section */}
      <ScrollArea className="flex-1 px-2 pt-2">
        <div className="space-y-1">
          {folders.map((folder) => {
            const IconComponent = folder.icon;
            const mailBox = mailBoxes?.find(mb => mb.id === folder.id);
            const count = mailBox?.numberOfUnreadEmails || 0;
            
            return (
              <Button
                key={folder.id}
                variant={selectedFolder === folder.id ? "secondary" : "ghost"}
                className="w-full justify-start h-10"
                onClick={() => {
                  setSelectedFolder(folder.id);
                  setSelectedEmail(null);
                  setIsMobileSidebarOpen(false);
                }}
              >
                <IconComponent className="w-4 h-4 mr-3" />
                <span className="flex-1 text-left">{folder.name}</span>
                {count > 0 && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {count}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t">
        <Button 
          variant="ghost" 
          className="w-full justify-start"
          onClick={() => {
            onSettings();
            setIsMobileSidebarOpen(false);
          }}
        >
          <Settings className="w-4 h-4 mr-3" />
          Settings
        </Button>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-background">
      <div className="flex-1 flex min-h-0">
        {/* Desktop: Email Addresses Panel - now visible from medium screens */}
        <div className="hidden md:flex md:w-56 xl:w-64 border-r bg-card">
          <EmailAddressesPanel />
        </div>

        {/* Desktop: Mailboxes Panel */}
        <div className="hidden md:flex md:w-56 border-r bg-card">
          <MailboxesPanel />
        </div>

        {/* Mobile Sidebar */}
        <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
          <SheetContent side="left" className="w-80 p-0">
            <div className="sr-only">
              <SheetTitle>Email Navigation</SheetTitle>
              <SheetDescription>Navigate between email addresses, folders and compose new messages</SheetDescription>
            </div>
            <MobileSidebarContent />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <div className="border-b bg-card px-4 py-3">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={() => setIsMobileSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              <div className="flex-1 max-w-md relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search emails..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Current email indicator for mobile */}
              <div className="block md:hidden text-sm text-muted-foreground">
                {selectedEmailAddress && (
                  <span>{emailAddresses.find(addr => addr.address === selectedEmailAddress)?.displayName || 'Email'}</span>
                )}
              </div>
            </div>
          </div>

          {/* Email Content */}
          <div className="flex-1 flex min-h-0">
            {/* Email List */}
            <div className={`${selectedEmail ? 'hidden lg:block lg:w-96' : 'flex-1'} border-r bg-card`}>
              <EmailList 
                emails={filteredEmails}
                selectedEmail={selectedEmail}
                onSelectEmail={setSelectedEmail}
              />
            </div>

            {/* Email Detail */}
            {selectedEmail && (
              <div className="flex-1 min-w-0">
                <EmailDetail 
                  email={selectedEmail}
                  onBack={() => setSelectedEmail(null)}
                  onReply={(data: ReplyData) => onCompose(data)}
                />
              </div>
            )}

            {/* Empty State */}
            {!selectedEmail && (
              <div className="hidden lg:flex lg:flex-1 items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Inbox className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Select an email to read</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer onNavigate={onFooterNavigate} compact />
    </div>
  );
}