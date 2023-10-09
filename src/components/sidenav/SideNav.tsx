"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Bell, Home, Trophy } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import BottomBar from "./BottomBar";
import Dashboards from "./Dashboards";
import Docs from "./Docs";
import Favorites from "./Favorites";
import SearchCommand from "./SearchCommand";
import Spaces from "./Spaces";

interface SideNavProps {}

const SideNav = ({}: SideNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <Sheet open={isOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent className="text-muted-foreground" side="left">
        <SheetHeader>
          <SheetTitle>Tardigrade</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-4">
          <SearchCommand />

          <div className="flex flex-col space-y-2 justify-start items-center">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 h-8 shrink-0 hover:text-primary hover:bg-secondary w-full"
            >
              <Home className="w-10 h-10 p-2" />
              <span className="font-medium">Home</span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 px-3 h-8 shrink-0 hover:text-primary hover:bg-secondary w-full"
            >
              <Bell className="w-10 h-10 p-2" />
              <span className="font-medium">Notifications</span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 px-3 h-8 shrink-0 hover:text-primary hover:bg-secondary w-full"
            >
              <Trophy className="w-10 h-10 p-2" />
              <span className="font-medium">Goals</span>
            </Link>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <Separator />

            <AccordionItem
              value="favorites"
              className="hover:text-primary hover:bg-muted"
            >
              <AccordionTrigger>Favorites</AccordionTrigger>
              <AccordionContent>
                <Favorites />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="spaces"
              className="hover:text-primary hover:bg-muted"
            >
              <AccordionTrigger>Spaces</AccordionTrigger>
              <AccordionContent>
                <Spaces />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="dashboards"
              className="hover:text-primary hover:bg-muted"
            >
              <AccordionTrigger>Dashboards</AccordionTrigger>
              <AccordionContent>
                <Dashboards />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="docs"
              className="hover:text-primary hover:bg-muted"
            >
              <AccordionTrigger>Docs</AccordionTrigger>
              <AccordionContent>
                <Docs />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <SheetFooter className="absolute bottom-0 left-0 border-t h-12 w-full">
          <BottomBar />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SideNav;
