import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      Home
      <Link className={buttonVariants()} href="/board">
        board
      </Link>
    </main>
  );
}
