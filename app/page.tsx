import { MakeMillionDollarsButton } from "./components/buttons/make-million-dollars-button";
import { Profile } from "./components/profile";
import { Transfer } from "./components/transfer";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-between gap-8">
      <div className="mt-8 flex w-full justify-center">
        <Profile />
      </div>

      <MakeMillionDollarsButton />
      <div className="flex w-full flex-col items-center gap-4">
        <Transfer />
      </div>
    </main>
  );
}
