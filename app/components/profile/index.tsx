"use client";

import { useNetWorth } from "@/context/net-worth";
import { useDisplayName } from "@/hooks/use-display-name";

import { Divider } from "../common/divider";
import { Socials } from "./socials";

export const Profile = () => {
  const displayName = useDisplayName();
  const { netWorth } = useNetWorth();

  return (
    <div className="flex h-fit w-3/4 flex-col items-center justify-center gap-3 border-2 border-white/20 p-5">
      <div className="flex min-h-10 items-center justify-center">
        <span className="text-4xl font-semibold">{displayName}</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <span className="text-lg text-white/80">$$Net Worth$$</span>
        <span className="text-2xl">${netWorth.toLocaleString("en-US")}</span>
      </div>
      <Divider />
      <Socials />
    </div>
  );
};
