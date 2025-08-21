"use client";

import { BackpackWalletAdapter } from "@solana/wallet-adapter-backpack";
import {
  WalletAdapter,
  WalletAdapterNetwork,
} from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  CloverWalletAdapter,
  Coin98WalletAdapter,
  CoinbaseWalletAdapter,
  HuobiWalletAdapter,
  MathWalletAdapter,
  NekoWalletAdapter,
  NightlyWalletAdapter,
  PhantomWalletAdapter,
  SalmonWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  TrustWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { type ReactNode, useEffect, useMemo, useState } from "react";

import { NetWorthProvider } from "./net-worth";

export function Providers({ children }: { children: ReactNode }) {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = process.env.NEXT_PUBLIC_RPC_URL;

  const coreWallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new BackpackWalletAdapter(),
    ],
    [network],
  );

  const [wallets, setWallets] = useState<WalletAdapter[]>(coreWallets);

  useEffect(() => {
    const loadOtherWallets = async () => {
      const { WalletConnectWalletAdapter } = await import(
        "@solana/wallet-adapter-walletconnect"
      );

      // Alawys include other adapters even if they support wallet standard
      // Otherwise, they would ocassionally be missing on the wallet selection
      // popup.

      const otherWallets = [
        new TorusWalletAdapter(),
        new MathWalletAdapter(),
        new Coin98WalletAdapter(),
        new CloverWalletAdapter(),
        new HuobiWalletAdapter(),
        new CoinbaseWalletAdapter(),
        new NekoWalletAdapter(),
        new TrustWalletAdapter(),
        new NightlyWalletAdapter(),
        new SalmonWalletAdapter(),
      ];

      setWallets([...coreWallets, ...otherWallets]);
    };

    loadOtherWallets();
  }, [network]);

  return (
    <ConnectionProvider
      config={{
        commitment: "processed",
        confirmTransactionInitialTimeout: 15 * 1_000,
      }}
      endpoint={endpoint!}
    >
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <NetWorthProvider>{children}</NetWorthProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
