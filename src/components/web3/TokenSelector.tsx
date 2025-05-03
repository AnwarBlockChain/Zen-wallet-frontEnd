import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Token } from '@/types/web3';

interface TokenSelectorProps {
  tokens: Token[];
  selectedToken?: Token;
  onSelect: (token: Token) => void;
  trigger?: React.ReactNode;
}

export function TokenSelector({ 
  tokens, 
  selectedToken, 
  onSelect,
  trigger
}: TokenSelectorProps) {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  
  // Filter tokens based on search
  const filteredTokens = tokens.filter(token => 
    token.symbol.toLowerCase().includes(search.toLowerCase()) || 
    token.name.toLowerCase().includes(search.toLowerCase()) ||
    token.address.toLowerCase().includes(search.toLowerCase())
  );
  
  // Handle token selection
  const handleSelect = (token: Token) => {
    onSelect(token);
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="premium-card flex items-center gap-2 h-12 border-gold/30">
            {selectedToken ? (
              <>
                <div className="h-6 w-6 rounded-full bg-gold/10 flex items-center justify-center text-xs">
                  {selectedToken.symbol.charAt(0)}
                </div>
                <span>{selectedToken.symbol}</span>
              </>
            ) : (
              <span>Select Token</span>
            )}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="premium-card border-gold/20 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Select a Token</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          {/* Search input */}
          <Input
            placeholder="Search by name or address"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="premium-input"
          />
          
          {/* Token list */}
          <div className="max-h-80 overflow-y-auto pr-1">
            {filteredTokens.length > 0 ? (
              <div className="space-y-1">
                {filteredTokens.map((token) => (
                  <button
                    key={`${token.address}-${token.chainId}`}
                    className={`w-full flex items-center p-3 rounded-lg hover:bg-gold/5 transition-colors ${
                      selectedToken?.address === token.address ? 'bg-gold/10 border border-gold/30' : ''
                    }`}
                    onClick={() => handleSelect(token)}
                  >
                    <div className="h-8 w-8 rounded-full bg-gold/10 flex items-center justify-center mr-3">
                      {token.symbol.charAt(0)}
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{token.symbol}</span>
                      <span className="text-xs text-foreground/60">{token.name}</span>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="font-medium">{token.formatted}</div>
                      <div className="text-xs text-foreground/60">
                        ${(parseFloat(token.formatted) * token.price).toFixed(2)}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-foreground/60">No tokens found</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 