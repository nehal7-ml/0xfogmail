import { useState, useEffect } from 'react';

export interface MailBox {
  id: string;
  name: string;
  type: 'inbox' | 'starred' | 'sent' | 'archive' | 'trash' | 'custom';
  numberOfEmails: number;
  numberOfUnreadEmails: number;
}

export function useMailBoxes(emailAddress?: string) {
  const [mailBoxes, setMailBoxes] = useState<MailBox[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!emailAddress) {
      setMailBoxes([]);
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
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
      setIsLoading(false);
    }, 300);
  }, [emailAddress]);

  return { mailBoxes, isLoading };
}