import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  ArrowLeft, 
  Reply, 
  ReplyAll, 
  Forward, 
  Star, 
  Archive, 
  Trash2, 
  MoreHorizontal,
  Paperclip,
  Download
} from 'lucide-react';
import { Email } from './EmailLayout';

interface EmailDetailProps {
  email: Email;
  onBack: () => void;
  onReply: (replyData: any) => void;
}

export function EmailDetail({ email, onBack, onReply }: EmailDetailProps) {
  const getSelectedText = () => {
    const selection = window.getSelection();
    return selection ? selection.toString().trim() : '';
  };

  const handleReply = (type: 'reply' | 'replyAll' | 'forward') => {
    const selectedText = getSelectedText();
    onReply({
      type,
      originalEmail: {
        id: email.id,
        sender: email.sender,
        senderEmail: email.senderEmail,
        subject: email.subject,
        content: email.content,
        timestamp: email.timestamp,
        cc: [], // Add cc data if available
        to: [email.senderEmail] // Add to data if available
      },
      selectedText: selectedText || undefined
    });
  };
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatFullDate = (timestamp: string) => {
    // Simple date formatting for demo
    return `${timestamp} • 10:30 AM`;
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center gap-3 mb-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden"
            onClick={onBack}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          
          <div className="flex-1" />
          
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon">
              <Star className={`w-4 h-4 ${email.isStarred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
            </Button>
            <Button variant="ghost" size="icon">
              <Archive className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Trash2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => handleReply('reply')}>
            <Reply className="w-4 h-4 mr-2" />
            Reply
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleReply('replyAll')}>
            <ReplyAll className="w-4 h-4 mr-2" />
            Reply All
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleReply('forward')}>
            <Forward className="w-4 h-4 mr-2" />
            Forward
          </Button>
        </div>
      </div>

      {/* Email Content */}
      <ScrollArea className="flex-1">
        <div className="p-6 max-w-4xl">
          {/* Subject */}
          <h1 className="text-2xl mb-6">{email.subject}</h1>

          {/* Sender Info */}
          <div className="flex items-start gap-4 mb-6">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                {getInitials(email.sender)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span>{email.sender}</span>
                <span className="text-muted-foreground text-sm">&lt;{email.senderEmail}&gt;</span>
              </div>
              <div className="text-sm text-muted-foreground">
                to me • {formatFullDate(email.timestamp)}
              </div>
            </div>

            {!email.isRead && (
              <Badge variant="secondary" className="text-xs">
                Unread
              </Badge>
            )}
          </div>

          {/* Attachments */}
          {email.hasAttachment && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Paperclip className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">1 attachment</span>
              </div>
              <div className="border border-border rounded-lg p-3 flex items-center gap-3 bg-card">
                <div className="w-8 h-8 bg-accent rounded flex items-center justify-center">
                  <Paperclip className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="text-sm">Campaign_Report_Q4.pdf</div>
                  <div className="text-xs text-muted-foreground">2.4 MB</div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          <Separator className="mb-6" />

          {/* Email Body */}
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-wrap leading-relaxed">
              {email.content}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}