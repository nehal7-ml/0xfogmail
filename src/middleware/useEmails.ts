import { useState, useEffect } from 'react';

export interface EmailData {
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

export function useEmails(emailAddress?: string, mailBox?: string) {
  const [emails, setEmails] = useState<EmailData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!emailAddress || !mailBox) {
      setEmails([]);
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
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
      setIsLoading(false);
    }, 500);
  }, [emailAddress, mailBox]);

  return { emails, isLoading };
}