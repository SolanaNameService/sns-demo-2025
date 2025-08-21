"use client";

import { useDisplayName } from "@/hooks/use-display-name";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

export const WalletConnect = () => {
  const { connected, disconnect } = useWallet();
  const displayName = useDisplayName();
  const { setVisible } = useWalletModal();

  return (
    <button
      className="h-12 w-48 cursor-pointer rounded-xl border border-white font-semibold text-white"
      onClick={() => {
        connected ? disconnect() : setVisible(true);
      }}
    >
      <div className="flex h-10 items-center justify-center">
        {!connected ? <span>Connect Wallet</span> : <span>{displayName}</span>}
      </div>
    </button>
  );
};
