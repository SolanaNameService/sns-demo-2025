"use client";

import { useSocials } from "@/hooks/use-socials";

export const Socials = () => {
  const socials = useSocials();

  return (
    <div className="flex w-3/4 justify-between gap-3">
      {Object.entries(socials).map(([key, value]) => {
        if (!value) return null;

        let display: React.ReactNode = value;

        if (key === "url") {
          display = (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              {value}
            </a>
          );
        }

        if (key === "twitter") {
          const handle = value.startsWith("@") ? value.slice(1) : value;
          display = (
            <a
              href={`https://twitter.com/${handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              @{handle}
            </a>
          );
        }

        return (
          <div
            key={key}
            className="flex min-w-[170px] flex-col items-center gap-2"
          >
            <span className="font-semibold capitalize">{key}:</span>
            {display}
          </div>
        );
      })}
    </div>
  );
};
