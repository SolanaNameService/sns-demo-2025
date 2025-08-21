"use client";

import {
  getAllDomains,
  getPrimaryDomain,
  reverseLookup,
} from "@bonfida/spl-name-service";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

export const useDisplayName = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [displayName, setDisplayName] = useState<string | undefined>(undefined);

  const fn = async () => {
    if (!publicKey) return;
    try {
      const domains = await getAllDomains(connection, publicKey);
      // See if user owns any domains
      if (domains.length) {
        // Get primary domain using account public key
        const { reverse: primary, stale } = await getPrimaryDomain(
          connection,
          publicKey,
        );

        // Sort domains so a user without a primary uses the same one from list each time
        const sortedDomains = domains.sort((a, b) =>
          a.toBase58().localeCompare(b.toBase58()),
        );

        // Get the human readable reverse
        const firstReverse = await reverseLookup(connection, sortedDomains[0]);

        // If a user has a primary domain set use that, otherwise pick first from returned list. Concat .sol
        const primaryOrFirst =
          (primary && !stale ? primary : firstReverse) + ".sol";

        setDisplayName(primaryOrFirst);
      } else {
        return publicKey.toBase58();
      }
    } catch (error) {
      console.log("Error: ", error);
      throw new Error("Error resolving display name");
    }
  };

  useEffect(() => {
    fn();
  }, [connection, publicKey]);

  return displayName;
};
