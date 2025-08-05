import { useState } from 'react';

export interface UserAccount {
  id: string;
  account: string;
  primaryEmail: string;
  createdAt: string;
  isConnected: boolean;
}

export function useAccount() {
  const [account, setAccount] = useState<UserAccount | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate random wallet address for demo
      const account = '0x' + Math.random().toString(16).substr(2, 40);
      
      const newAccount: UserAccount = {
        id: Math.random().toString(36).substr(2, 9),
        account,
        primaryEmail: `${account}@0xfog.com`,
        createdAt: new Date().toISOString(),
        isConnected: true,
      };

      setAccount(newAccount);
    } catch (err) {
      console.error('Failed to connect wallet:', err);
      setError('Failed to connect wallet');
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setError(null);
  };

  return {
    account,
    isLoading,
    error,
    connectWallet,
    disconnectWallet,
  };
}