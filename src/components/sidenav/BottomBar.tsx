import { Button } from "../ui/button";

interface BottomBarProps {}

const BottomBar = ({}: BottomBarProps) => {
  return (
    <div className="flex justify-around items-center w-full">
      <Button size={"sm"} variant={"secondary"}>
        Invite
      </Button>
      <Button size={"sm"} variant={"secondary"}>
        Upgrade
      </Button>
    </div>
  );
};

export default BottomBar;
