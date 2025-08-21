"use client";

import { resolve } from "@bonfida/spl-name-service";
import { useConnection } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

export const Transfer = () => {
  const { connection } = useConnection();
  const [input, setInput] = useState("");

  const [resolvedDomain, setResolvedDomain] = useState("");

  const resolveDomain = async () => {
    const resolvedDomain = await resolve(connection, input);

    setResolvedDomain(resolvedDomain.toBase58());
  };

  useEffect(() => {
    if (!input.length) {
      setResolvedDomain("");
    }
  }, [input]);
  return (
    <div className="flex w-full flex-col items-center gap-5 bg-white/5 p-2">
      <div className="flex flex-col gap-1">
        <span className="text-center text-lg font-semibold text-white">
          Ready to cash out?
        </span>
        <span className="text-center text-white">
          Transfer your millions to another wallet.
        </span>
      </div>

      <div className="flex w-full flex-col items-center">
        <input
          className="h-10 w-1/2 rounded-md bg-black p-2 text-white"
          placeholder="Enter recipient..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <div className="h-2">
          {resolvedDomain && (
            <span className="text-center text-sm">
              Sending to: {resolvedDomain}...
            </span>
          )}
        </div>
      </div>
      <button
        className="h-12 w-48 flex-shrink-0 cursor-pointer rounded-xl bg-blue-500 text-white"
        onClick={() => resolveDomain()}
      >
        Send
      </button>
    </div>
  );
};
