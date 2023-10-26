import { trpc } from "@/app/_trpc/client";
import { Play, Square } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

interface TimerProps {
  totalTime: number;
  taskId: string;
}

const Timer = ({ taskId, totalTime }: TimerProps) => {
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [time, setTime] = useState(0);

  const { mutate: updateTotalTime } = trpc.updateTotalTime.useMutation({
    onSuccess: () => {
      console.log("success");
    },
    onError: () => {
      console.log("error");
    },
  });

  useEffect(() => {
    setTime(totalTime);
  }, [totalTime]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isTimerOn) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isTimerOn]);

  const handleStart = () => {
    if (!isTimerOn) {
      setIsTimerOn(true);
    }
  };

  const handleStop = () => {
    if (isTimerOn) {
      setIsTimerOn(false);
      updateTotalTime({ taskId, totalTime: time });
    }
  };

  const formatTime = (timeInSeconds: number): string => {
    const hours = String(Math.floor(timeInSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(timeInSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="flex text-xs">
      {isTimerOn ? (
        <Button
          size={"icon"}
          className="mr-2 rounded-full h-4 w-4 bg-accent"
          onClick={handleStop}
        >
          <Square className="h-2 w-2" fill="accent-foreground" />
        </Button>
      ) : (
        <Button
          size={"icon"}
          className="mr-2 rounded-full h-4 w-4 bg-accent"
          onClick={handleStart}
        >
          <Play className="h-2 w-2" fill="accent-foreground" />
        </Button>
      )}
      <span>{formatTime(time)}</span>
    </div>
  );
};
export default Timer;
