// Multi-payment method account rotation utility
interface PaymentAccount {
  id: string;
  name: string;
  method: 'ach' | 'zelle' | 'paypal' | 'venmo' | 'cashapp' | 'wire';
  accountInfo: {
    identifier: string; // Account number, email, phone, etc.
    displayName: string;
    instructions: string;
  };
  isActive: boolean;
  transactionCount: number;
  maxTransactions: number;
}

interface TransactionData {
  amount: number;
  participantInfo: {
    parentName: string;
    childName: string;
    email: string;
    phone: string;
  };
  paymentMethod: string;
  referenceId: string;
}

class PaymentRouter {
  private accounts: PaymentAccount[] = [
    {
      id: 'acc_001',
      name: 'Primary Account',
      method: 'ach',
      accountInfo: {
        identifier: 'Routing: 123456789, Account: 987654321',
        displayName: 'Athlos Training LLC',
        instructions: 'Use your child\'s name as the reference'
      },
      isActive: true,
      transactionCount: 0,
      maxTransactions: 6
    },
    {
      id: 'acc_002',
      name: 'Digital Payments',
      method: 'zelle',
      accountInfo: {
        identifier: 'payments@athlostraining.com',
        displayName: 'Coach Mike',
        instructions: 'Include child\'s name and program in memo'
      },
      isActive: true,
      transactionCount: 0,
      maxTransactions: 6
    },
    {
      id: 'acc_003',
      name: 'Online Processing',
      method: 'paypal',
      accountInfo: {
        identifier: 'mike.athlos@gmail.com',
        displayName: 'Mikael Frey',
        instructions: 'Send as Friends & Family with child\'s name'
      },
      isActive: true,
      transactionCount: 0,
      maxTransactions: 6
    },
    {
      id: 'acc_004',
      name: 'Mobile Payments',
      method: 'venmo',
      accountInfo: {
        identifier: '@CoachMike-Athlos',
        displayName: 'Coach Mike',
        instructions: 'Include child\'s name and "Fitness Camp"'
      },
      isActive: true,
      transactionCount: 0,
      maxTransactions: 6
    },
    {
      id: 'acc_005',
      name: 'Quick Pay',
      method: 'cashapp',
      accountInfo: {
        identifier: '$AthlosFitness',
        displayName: 'Athlos Fitness',
        instructions: 'Add child\'s name in the note'
      },
      isActive: true,
      transactionCount: 0,
      maxTransactions: 6
    },
    {
      id: 'acc_006',
      name: 'Secure Transfer',
      method: 'wire',
      accountInfo: {
        identifier: 'Bank: First National, Account: 1122334455',
        displayName: 'Athlos Training Services',
        instructions: 'Wire transfer with participant details'
      },
      isActive: true,
      transactionCount: 0,
      maxTransactions: 6
    }
  ];

  private currentAccountIndex: number = 0;
  private transactionLog: Array<{
    accountId: string;
    timestamp: Date;
    amount: number;
    status: string;
    method: string;
    referenceId: string;
  }> = [];

  constructor() {
    this.loadState();
  }

  // Get the next available account for processing
  getNextAccount(): PaymentAccount {
    const currentAccount = this.accounts[this.currentAccountIndex];
    
    // Check if current account has reached its limit
    if (currentAccount.transactionCount >= currentAccount.maxTransactions) {
      this.rotateToNextAccount();
      return this.accounts[this.currentAccountIndex];
    }
    
    return currentAccount;
  }

  // Rotate to the next account
  private rotateToNextAccount(): void {
    // Reset current account transaction count
    this.accounts[this.currentAccountIndex].transactionCount = 0;
    
    // Move to next account
    this.currentAccountIndex = (this.currentAccountIndex + 1) % this.accounts.length;
    
    // If we've cycled through all accounts, reset all counters
    if (this.currentAccountIndex === 0) {
      this.resetAllCounters();
    }
    
    this.saveState();
  }

  // Get payment instructions for the next account
  getPaymentInstructions(amount: number, participantInfo: any): {
    account: PaymentAccount;
    instructions: {
      method: string;
      recipient: string;
      amount: string;
      reference: string;
      steps: string[];
    };
    referenceId: string;
  } {
    const account = this.getNextAccount();
    const referenceId = `ATHLOS-${Date.now()}-${account.id}`;
    
    const methodInstructions = this.getMethodSpecificInstructions(account, amount, participantInfo, referenceId);
    
    return {
      account,
      instructions: methodInstructions,
      referenceId
    };
  }

  // Get method-specific payment instructions
  private getMethodSpecificInstructions(
    account: PaymentAccount, 
    amount: number, 
    participantInfo: any, 
    referenceId: string
  ) {
    const baseReference = `${participantInfo.childName} - Fitness Camp`;
    
    switch (account.method) {
      case 'ach':
        return {
          method: 'ACH Bank Transfer',
          recipient: account.accountInfo.displayName,
          amount: `$${amount}.00`,
          reference: `${baseReference} - ${referenceId}`,
          steps: [
            'Log into your online banking',
            `Add new payee: ${account.accountInfo.displayName}`,
            `Account details: ${account.accountInfo.identifier}`,
            `Send $${amount}.00`,
            `Reference: ${baseReference} - ${referenceId}`,
            'Email confirmation to payments@athlostraining.com'
          ]
        };
      
      case 'zelle':
        return {
          method: 'Zelle',
          recipient: account.accountInfo.identifier,
          amount: `$${amount}.00`,
          reference: baseReference,
          steps: [
            'Open your banking app',
            'Select Zelle',
            `Send to: ${account.accountInfo.identifier}`,
            `Amount: $${amount}.00`,
            `Memo: ${baseReference}`,
            'Confirm and send'
          ]
        };
      
      case 'paypal':
        return {
          method: 'PayPal',
          recipient: account.accountInfo.identifier,
          amount: `$${amount}.00`,
          reference: baseReference,
          steps: [
            'Open PayPal app or website',
            'Select "Send Money"',
            `Send to: ${account.accountInfo.identifier}`,
            `Amount: $${amount}.00`,
            'Select "Friends & Family"',
            `Note: ${baseReference}`,
            'Complete payment'
          ]
        };
      
      case 'venmo':
        return {
          method: 'Venmo',
          recipient: account.accountInfo.identifier,
          amount: `$${amount}.00`,
          reference: baseReference,
          steps: [
            'Open Venmo app',
            `Search for: ${account.accountInfo.identifier}`,
            `Amount: $${amount}.00`,
            `Note: ${baseReference}`,
            'Set to Private',
            'Pay'
          ]
        };
      
      case 'cashapp':
        return {
          method: 'Cash App',
          recipient: account.accountInfo.identifier,
          amount: `$${amount}.00`,
          reference: baseReference,
          steps: [
            'Open Cash App',
            'Tap "Pay"',
            `Enter: ${account.accountInfo.identifier}`,
            `Amount: $${amount}.00`,
            `Note: ${baseReference}`,
            'Confirm payment'
          ]
        };
      
      case 'wire':
        return {
          method: 'Wire Transfer',
          recipient: account.accountInfo.displayName,
          amount: `$${amount}.00`,
          reference: `${baseReference} - ${referenceId}`,
          steps: [
            'Contact your bank for wire transfer',
            `Recipient: ${account.accountInfo.displayName}`,
            `Bank details: ${account.accountInfo.identifier}`,
            `Amount: $${amount}.00`,
            `Reference: ${baseReference} - ${referenceId}`,
            'Provide wire confirmation to us'
          ]
        };
      
      default:
        return {
          method: 'Payment',
          recipient: account.accountInfo.displayName,
          amount: `$${amount}.00`,
          reference: baseReference,
          steps: ['Contact us for payment instructions']
        };
    }
  }

  // Confirm payment received (manual process)
  confirmPayment(referenceId: string, amount: number): {
    success: boolean;
    message: string;
  } {
    const account = this.accounts[this.currentAccountIndex];
    
    // Increment transaction count
    account.transactionCount++;
    
    // Log the transaction
    this.logTransaction(account.id, amount, 'confirmed', account.method, referenceId);
    
    // Save state
    this.saveState();
    
    return {
      success: true,
      message: `Payment confirmed for ${account.accountInfo.displayName} via ${account.method.toUpperCase()}`
    };
  }

  // Log transaction for audit purposes
  private logTransaction(
    accountId: string, 
    amount: number, 
    status: string, 
    method: string, 
    referenceId: string
  ): void {
    this.transactionLog.push({
      accountId,
      timestamp: new Date(),
      amount,
      status,
      method,
      referenceId
    });
    
    // Keep only last 100 transactions in memory
    if (this.transactionLog.length > 100) {
      this.transactionLog = this.transactionLog.slice(-100);
    }
  }

  // Reset all account counters
  private resetAllCounters(): void {
    this.accounts.forEach(account => {
      account.transactionCount = 0;
    });
  }

  // Save state to localStorage
  private saveState(): void {
    const state = {
      currentAccountIndex: this.currentAccountIndex,
      accounts: this.accounts.map(acc => ({
        id: acc.id,
        transactionCount: acc.transactionCount
      })),
      transactionLog: this.transactionLog
    };
    
    localStorage.setItem('paymentRouterState', JSON.stringify(state));
  }

  // Load state from localStorage
  private loadState(): void {
    try {
      const savedState = localStorage.getItem('paymentRouterState');
      if (savedState) {
        const state = JSON.parse(savedState);
        this.currentAccountIndex = state.currentAccountIndex || 0;
        this.transactionLog = state.transactionLog || [];
        
        // Update account transaction counts
        if (state.accounts) {
          state.accounts.forEach((savedAcc: any) => {
            const account = this.accounts.find(acc => acc.id === savedAcc.id);
            if (account) {
              account.transactionCount = savedAcc.transactionCount || 0;
            }
          });
        }
      }
    } catch (error) {
      console.warn('Failed to load payment router state:', error);
    }
  }

  // Get current account status for debugging
  getAccountStatus(): Array<{
    name: string;
    method: string;
    transactionCount: number;
    maxTransactions: number;
    isActive: boolean;
  }> {
    return this.accounts.map(acc => ({
      name: acc.name,
      method: acc.method,
      transactionCount: acc.transactionCount,
      maxTransactions: acc.maxTransactions,
      isActive: acc.isActive
    }));
  }

  // Get transaction history
  getTransactionHistory(): typeof this.transactionLog {
    return [...this.transactionLog];
  }

  // Get all available payment methods
  getAvailablePaymentMethods(): string[] {
    return [...new Set(this.accounts.map(acc => acc.method))];
  }
}

// Export singleton instance
export const paymentRouter = new PaymentRouter();
export default PaymentRouter;