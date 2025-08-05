import { useState, useEffect } from 'react';

export interface EmailAddress {
  id: string;
  address: string;
  displayName: string;
  isPrimary: boolean;
  isVerified: boolean;
}

export function useEmailAddresses(account?: string) {
  const [emailAddresses, setEmailAddresses] = useState<EmailAddress[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!account) {
      setEmailAddresses([]);
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const addresses: EmailAddress[] = [
        {
          id: '1',
          address: `${account}@0xfog.com`,
          displayName: account,
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
      setIsLoading(false);
    }, 500);
  }, [account]);

  return { emailAddresses, isLoading };
}