"use client";

import { useNetWorth } from "@/context/net-worth";

export const MakeMillionDollarsButton = () => {
  const { setNetWorth, netWorth } = useNetWorth();
  return (
    <button
      className="size-40 cursor-pointer rounded-full border-2 border-white bg-green-600 text-lg font-semibold text-white"
      onClick={() => setNetWorth(netWorth + 1_000_000)}
    >
      Make a million dollars!
    </button>
  );
};
