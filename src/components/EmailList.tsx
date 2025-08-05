import React from 'react';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Star, Paperclip, Archive, Trash2 } from 'lucide-react';
import { Email } from './EmailLayout';

interface EmailListProps {
  emails: Email[];
  selectedEmail: Email | null;
  onSelectEmail: (email: Email) => void;
}

export function EmailList({ emails, selectedEmail, onSelectEmail }: EmailListProps) {
  const [selectedEmails, setSelectedEmails] = React.useState<Set<string>>(new Set());

  const toggleEmailSelection = (emailId: string) => {
    const newSelected = new Set(selectedEmails);
    if (newSelected.has(emailId)) {
      newSelected.delete(emailId);
    } else {
      newSelected.add(emailId);
    }
    setSelectedEmails(newSelected);
  };

  const formatTime = (timestamp: string) => {
    // Simple time formatting for demo
    return timestamp;
  };

  return (
    <div className="flex flex-col h-full">
      {/* List Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg">Inbox</h2>
          <div className="flex items-center gap-2">
            {selectedEmails.size > 0 && (
              <>
                <Button variant="ghost" size="icon">
                  <Archive className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Email List */}
      <ScrollArea className="flex-1">
        <div className="divide-y">
          {emails.map((email) => (
            <div
              key={email.id}
              className={`p-4 hover:bg-accent/50 cursor-pointer transition-colors ${
                selectedEmail?.id === email.id ? 'bg-accent' : ''
              } ${
                !email.isRead ? 'bg-accent/20' : ''
              }`}
              onClick={() => onSelectEmail(email)}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={selectedEmails.has(email.id)}
                  onCheckedChange={() => toggleEmailSelection(email.id)}
                  onClick={(e) => e.stopPropagation()}
                />
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Toggle starred state
                  }}
                >
                  <Star 
                    className={`w-4 h-4 ${
                      email.isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                    }`}
                  />
                </Button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-sm truncate ${!email.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {email.sender}
                    </span>
                    <div className="flex items-center gap-1 ml-auto shrink-0">
                      {email.hasAttachment && (
                        <Paperclip className="w-3 h-3 text-muted-foreground" />
                      )}
                      <span className="text-xs text-muted-foreground">
                        {formatTime(email.timestamp)}
                      </span>
                    </div>
                  </div>
                  
                  <div className={`text-sm mb-1 ${!email.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {email.subject}
                  </div>
                  
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {email.preview}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}