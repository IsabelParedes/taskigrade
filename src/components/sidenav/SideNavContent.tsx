"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Bell, Home, Trophy } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import BottomBar from "./BottomBar";
import Dashboards from "./Dashboards";
import Docs from "./Docs";
import Favorites from "./Favorites";
import SearchCommand from "./SearchCommand";
import Spaces from "./Spaces";

interface SideNavContentProps {}

const SideNavContent = ({}: SideNavContentProps) => {
  return (
    <SheetContent className="text-foreground/70" side="left">
      <SheetHeader>
        <SheetTitle>Tardigrade</SheetTitle>
      </SheetHeader>
      <div className="flex flex-col gap-4 py-4">
        <SearchCommand />

        <div className="flex flex-col space-y-2 justify-start items-center">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 h-8 shrink-0 hover:text-foreground hover:bg-primary w-full rounded-md"
          >
            <Home className="w-10 h-10 p-2" />
            <span className="font-medium">Home</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 px-3 h-8 shrink-0 hover:text-foreground hover:bg-primary w-full rounded-md"
          >
            <Bell className="w-10 h-10 p-2" />
            <span className="font-medium">Notifications</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 px-3 h-8 shrink-0 hover:text-foreground hover:bg-primary w-full rounded-md"
          >
            <Trophy className="w-10 h-10 p-2" />
            <span className="font-medium">Goals</span>
          </Link>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <Separator />

          <AccordionItem
            value="favorites"
            className="hover:text-foreground hover:bg-primary"
          >
            <AccordionTrigger>Favorites</AccordionTrigger>
            <AccordionContent>
              <Favorites />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="spaces"
            className="hover:text-foreground hover:bg-primary"
          >
            <AccordionTrigger>Spaces</AccordionTrigger>
            <AccordionContent>
              <Spaces />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="dashboards"
            className="hover:text-foreground hover:bg-primary"
          >
            <AccordionTrigger>Dashboards</AccordionTrigger>
            <AccordionContent>
              <Dashboards />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="docs"
            className="hover:text-foreground hover:bg-primary"
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
  );
};

export default SideNavContent;
