'use client';

import React, { createContext, useContext, useState } from 'react';
import { EmailModal } from '@/components/email-modal';

interface EmailModalContextType {
  openModal: (triggerText?: string) => void;
}

const EmailModalContext = createContext<EmailModalContextType | undefined>(undefined);

export function EmailModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerText, setTriggerText] = useState('Get Early Access');

  const openModal = (text?: string) => {
    setTriggerText(text || 'Get Early Access');
    setIsOpen(true);
  };

  return (
    <EmailModalContext.Provider value={{ openModal }}>
      {children}
      <EmailModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        triggerText={triggerText}
      />
    </EmailModalContext.Provider>
  );
}

export function useEmailModal() {
  const context = useContext(EmailModalContext);
  if (context === undefined) {
    throw new Error('useEmailModal must be used within an EmailModalProvider');
  }
  return context;
}