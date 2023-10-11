"use client";

import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import SidenavContent from "./SideNavContent";

interface SideNavProps {}

const SideNav = ({}: SideNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <Sheet open={false} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SidenavContent />
    </Sheet>
  );
};

export default SideNav;
