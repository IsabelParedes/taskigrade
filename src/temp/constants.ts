import { Column, Task } from "./types";

export const dummyCols: Column[] = [
  {
    id: "todo",
    title: "To Do",
  },
  {
    id: "inprogress",
    title: "In Progress",
  },
  {
    id: "test",
    title: "Test",
  },
  {
    id: "complete",
    title: "Complete",
  },
];

export const dummyTasks: Task[] = [
  {
    id: "1",
    columnId: "todo",
    content: "List admin APIs for dashboard",
  },
  {
    id: "2",
    columnId: "todo",
    content:
      "Develop user registration functionality with OTP delivered on SMS after email confirmation and phone number confirmation",
  },
  {
    id: "3",
    columnId: "inprogress",
    content: "Conduct security testing",
  },
  {
    id: "4",
    columnId: "inprogress",
    content: "Analyze competitors",
  },
  {
    id: "5",
    columnId: "test",
    content: "Create UI kit documentation",
  },
  {
    id: "6",
    columnId: "test",
    content: "Dev meeting",
  },
  {
    id: "7",
    columnId: "test",
    content: "Deliver dashboard prototype",
  },
  {
    id: "8",
    columnId: "complete",
    content: "Optimize application performance",
  },
  {
    id: "9",
    columnId: "complete",
    content: "Implement data validation",
  },
  {
    id: "10",
    columnId: "complete",
    content: "Design database schema",
  },
  {
    id: "11",
    columnId: "todo",
    content: "Integrate SSL web certificates into workflow",
  },
  {
    id: "12",
    columnId: "inprogress",
    content: "Implement error logging and monitoring",
  },
  {
    id: "13",
    columnId: "inprogress",
    content: "Design and implement responsive UI",
  },
];
