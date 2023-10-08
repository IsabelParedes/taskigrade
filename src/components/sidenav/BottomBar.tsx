import { Button } from "../ui/button";

interface BottomBarProps {}

const BottomBar = ({}: BottomBarProps) => {
  return (
    <div className="h-12 w-full">
      <div className="flex justify-around">
        <Button variant={"secondary"}>Invite</Button>
        <Button variant={"secondary"}>Upgrade</Button>
      </div>
    </div>
  );
};

export default BottomBar;
