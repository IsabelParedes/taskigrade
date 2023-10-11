"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import SideNavContent from "./sidenav/SideNavContent";
import { Button } from "./ui/button";
import { Sheet, SheetTrigger } from "./ui/sheet";

const Navbar = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header
      id="navbar"
      className="sticky top-0 z-10 flex w-full items-center justify-between border-b-2 bg-secondary p-4 font-medium transition-all duration-1000 ease-in-out md:pl-16 md:pr-32 h-16"
    >
      <nav className="hidden h-full items-center justify-between md:flex">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu className="mr-4 cursor-pointer" />
          </SheetTrigger>
          <SideNavContent />
        </Sheet>
        <Link href="/" className="mr-4">
          Home
        </Link>
        <Link href="/board" className="mx-4">
          Board
        </Link>
      </nav>

      <div className="flex gap-4">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
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
