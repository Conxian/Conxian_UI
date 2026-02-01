'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Tokens } from '@/lib/contracts';
import { FungibleTokenBalance } from '@/lib/coreApi';
import TokenIcon from './TokenIcon';
import { cn, formatAmount } from '@/lib/utils';

interface TokenSelectProps {
  tokens: typeof Tokens;
  selectedToken: string;
  onSelect: (tokenId: string) => void;
  balances: FungibleTokenBalance[];
  className?: string;
}

const TokenSelect: React.FC<TokenSelectProps> = ({ tokens, selectedToken, onSelect, balances, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedTokenInfo = tokens.find(t => t.id === selectedToken);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref]);

  const handleSelect = (tokenId: string) => {
    onSelect(tokenId);
    setIsOpen(false);
  };

  const formatBalance = (tokenId: string) => {
    const balance = balances.find(b => b.asset_identifier === tokenId);
    const tokenInfo = tokens.find(t => t.id === tokenId);
    if (balance && tokenInfo) {
      return formatAmount(balance.balance, tokenInfo.decimals);
    }
    return '0';
  };

  return (
    <div className={cn('relative', className)} ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="flex items-center justify-between w-full px-4 py-2 rounded-md border border-accent/20 bg-background-light text-text hover:bg-accent/10 transition-colors"
      >
        <div className="flex items-center">
          {selectedTokenInfo && <TokenIcon token={selectedTokenInfo.label} className="w-6 h-6 mr-3" />}
          <span>{selectedTokenInfo?.label}</span>
        </div>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-background-light border border-accent/20 rounded-md shadow-lg">
          <ul className="py-1">
            {tokens.map(token => (
              <li
                key={token.id}
                onClick={() => handleSelect(token.id)}
                className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-accent/10 text-text"
              >
                <div className="flex items-center">
                  <TokenIcon token={token.label} className="w-6 h-6 mr-3" />
                  <span>{token.label}</span>
                </div>
                <span className="text-text-secondary">{formatBalance(token.id)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TokenSelect;
