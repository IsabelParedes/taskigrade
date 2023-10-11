import { buttonVariants } from "@/components/ui/button";
import { SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      Home
      <SignUpButton />
      <UserButton />
      <Link className={buttonVariants()} href="/board">
        board
      </Link>
    </main>
  );
}
