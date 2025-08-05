import { useState, useRef } from 'react';
import { ArrowLeft, Send, Save, Bold, Italic, Underline, AlignLeft, AlignCenter, List, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Footer } from './Footer';

export interface ReplyData {
  type: 'reply' | 'replyAll' | 'forward';
  to: string[];
  cc?: string[];
  subject: string;
  body: string;
  originalSender?: string;
}

interface ComposeScreenProps {
  onBack: () => void;
  replyData?: ReplyData;
  onFooterNavigate?: (screen: 'privacy' | 'terms' | 'support') => void;
}

export function ComposeScreen({ onBack, replyData, onFooterNavigate }: ComposeScreenProps) {
  const [to, setTo] = useState(replyData?.to.join(', ') || '');
  const [cc, setCc] = useState(replyData?.cc?.join(', ') || '');
  const [bcc, setBcc] = useState('');
  const [subject, setSubject] = useState(replyData?.subject || '');
  const [body, setBody] = useState(replyData?.body || '');
  const [showCc, setShowCc] = useState(!!replyData?.cc?.length);
  const [showBcc, setShowBcc] = useState(false);


  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    console.log('Sending email:', { to, cc, bcc, subject, body });
    onBack();
  };

  const handleSaveDraft = () => {
    console.log('Saving draft:', { to, cc, bcc, subject, body });
  };

  const formatText = (command: string) => {
    const textarea = bodyRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = body.substring(start, end);
    
    if (selectedText) {
      let formattedText = selectedText;
      
      switch (command) {
        case 'bold':
          formattedText = `**${selectedText}**`;
          break;
        case 'italic':
          formattedText = `*${selectedText}*`;
          break;
        case 'underline':
          formattedText = `<u>${selectedText}</u>`;
          break;
      }
      
      const newBody = body.substring(0, start) + formattedText + body.substring(end);
      setBody(newBody);
      
      // Restore selection
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start, start + formattedText.length);
      }, 0);
    }
  };

  const alignText = (alignment: string) => {
    const textarea = bodyRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    
    // Find the start of the current line
    const lines = body.split('\n');
    let lineStart = 0;
    let currentLine = 0;
    
    for (let i = 0; i < lines.length; i++) {
      if (lineStart + lines[i].length >= start) {
        currentLine = i;
        break;
      }
      lineStart += lines[i].length + 1; // +1 for newline
    }
    
    const line = lines[currentLine];
    let alignedLine = line;
    
    switch (alignment) {
      case 'left':
        alignedLine = line.replace(/^[\s]*/, '');
        break;
      case 'center':
        alignedLine = `<center>${line.replace(/^[\s]*/, '')}</center>`;
        break;
    }
    
    lines[currentLine] = alignedLine;
    setBody(lines.join('\n'));
  };

  const addBulletPoint = () => {
    const textarea = bodyRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const beforeCursor = body.substring(0, start);
    const afterCursor = body.substring(start);
    
    const bulletPoint = start === 0 || beforeCursor.endsWith('\n') ? '• ' : '\n• ';
    const newBody = beforeCursor + bulletPoint + afterCursor;
    setBody(newBody);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + bulletPoint.length, start + bulletPoint.length);
    }, 0);
  };



  const hideCc = () => {
    if (!cc.trim()) {
      setShowCc(false);
      setCc('');
    }
  };

  const hideBcc = () => {
    if (!bcc.trim()) {
      setShowBcc(false);
      setBcc('');
    }
  };

  const getTitle = () => {
    if (replyData) {
      switch (replyData.type) {
        case 'forward':
          return 'Forward Message';
        case 'replyAll':
          return 'Reply All';
        case 'reply':
          return 'Reply';
        default:
          return 'New Message';
      }
    }
    return 'New Message';
  };

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
          <span className="text-xl font-medium text-foreground">{getTitle()}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-4xl space-y-6">
            {/* Recipients */}
            <div className="space-y-4">
              {/* To Field */}
              <div className="space-y-2">
                <Label htmlFor="to">To</Label>
                <div className="relative">
                  <Input
                    id="to"
                    type="email"
                    placeholder="Enter recipients..."
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="web3-input border border-border pr-24"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-1">
                    {!showCc && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowCc(true)}
                        className="h-7 px-2 text-xs hover:bg-accent"
                      >
                        Cc
                      </Button>
                    )}
                    {!showBcc && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowBcc(true)}
                        className="h-7 px-2 text-xs hover:bg-accent"
                      >
                        Bcc
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Cc Field */}
              {showCc && (
                <div className="space-y-2">
                  <Label htmlFor="cc">Cc</Label>
                  <div className="relative">
                    <Input
                      id="cc"
                      type="email"
                      placeholder="Enter Cc recipients..."
                      value={cc}
                      onChange={(e) => setCc(e.target.value)}
                      className="web3-input border border-border pr-10"
                    />
                    {!cc.trim() && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={hideCc}
                        className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 hover:bg-accent"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* Bcc Field */}
              {showBcc && (
                <div className="space-y-2">
                  <Label htmlFor="bcc">Bcc</Label>
                  <div className="relative">
                    <Input
                      id="bcc"
                      type="email"
                      placeholder="Enter Bcc recipients..."
                      value={bcc}
                      onChange={(e) => setBcc(e.target.value)}
                      className="web3-input border border-border pr-10"
                    />
                    {!bcc.trim() && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={hideBcc}
                        className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 hover:bg-accent"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Enter subject..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="web3-input border border-border"
                />
              </div>
            </div>

            {/* Rich Text Toolbar */}
            <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card p-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => formatText('bold')}
                className="web3-button hover:bg-accent"
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => formatText('italic')}
                className="web3-button hover:bg-accent"
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => formatText('underline')}
                className="web3-button hover:bg-accent"
              >
                <Underline className="h-4 w-4" />
              </Button>
              <div className="h-6 w-px bg-border" />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => alignText('left')}
                className="web3-button hover:bg-accent"
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => alignText('center')}
                className="web3-button hover:bg-accent"
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
              <div className="h-6 w-px bg-border" />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={addBulletPoint}
                className="web3-button hover:bg-accent"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Message Body */}
            <div className="space-y-2">
              <Label htmlFor="body">Message</Label>
              <Textarea
                id="body"
                ref={bodyRef}
                placeholder="Type your message..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="web3-input border border-border min-h-96 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between border-t border-border bg-card p-4">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            className="web3-button hover:bg-accent"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          
          <Button
            onClick={handleSend}
            className="web3-button glow-primary gradient-primary hover:opacity-90"
            disabled={!to.trim() || !subject.trim()}
          >
            <Send className="mr-2 h-4 w-4" />
            Send
          </Button>
        </div>
      </div>

      {/* Footer */}
      <Footer onNavigate={onFooterNavigate} compact />
    </div>
  );
}