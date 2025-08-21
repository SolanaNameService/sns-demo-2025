import Image from "next/image";

import { WalletConnect } from "./wallet-connect";

export const Navbar = () => {
  return (
    <div className="flex h-16 w-screen items-center justify-between border-b-2 border-b-white/20 px-4">
      <div className="flex items-center gap-2">
        <Image
          className="size-10"
          src="brand.svg"
          height={40}
          width={40}
          alt="logo"
        />
        <span className="text-2xl font-semibold">SNS</span>
      </div>
      <WalletConnect />
    </div>
  );
};
