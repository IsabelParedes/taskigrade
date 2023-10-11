import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = ({}) => {
  return (
    <header
      id="navbar"
      className="sticky top-0 z-10 flex w-full items-center justify-between border-b-2 bg-secondary p-4 font-medium transition-all duration-1000 ease-in-out md:px-32"
    >
      <nav className="hidden h-full items-center justify-between md:flex">
        <Link href="/" className="mr-4">
          Home
        </Link>
        <Link href="/board" className="mx-4">
          Board
        </Link>
      </nav>

      <div className="flex gap-4">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <Button>Sign In</Button>
          </SignInButton>
        </SignedOut>
      </div>
    </header>
  );
};

export default Navbar;
