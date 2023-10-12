import { Column, Task } from "@/types/types";

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
    status: "todo",
    createdById: 10,
    initial: false,

    title: "List admin APIs for dashboard",
  },
  {
    id: "2",
    status: "todo",
    createdById: 10,
    initial: false,

    title:
      "Develop user registration functionality with OTP delivered on SMS after email confirmation and phone number confirmation",
  },
  {
    id: "3",
    status: "inprogress",
    createdById: 10,
    initial: false,

    title: "Conduct security testing",
  },
  {
    id: "4",
    status: "inprogress",
    createdById: 10,
    initial: false,

    title: "Analyze competitors",
  },
  {
    id: "5",
    status: "test",
    createdById: 10,
    initial: false,

    title: "Create UI kit documentation",
  },
  {
    id: "6",
    status: "test",
    createdById: 10,
    initial: false,

    title: "Dev meeting",
  },
  {
    id: "7",
    status: "test",
    createdById: 10,
    initial: false,

    title: "Deliver dashboard prototype",
  },
  {
    id: "8",
    status: "complete",
    createdById: 10,
    initial: false,

    title: "Optimize application performance",
  },
  {
    id: "9",
    status: "complete",
    createdById: 10,
    initial: false,

    title: "Implement data validation",
  },
  {
    id: "10",
    status: "complete",
    createdById: 10,
    initial: false,

    title: "Design database schema",
  },
  {
    id: "11",
    status: "todo",
    createdById: 10,
    initial: false,

    title: "Integrate SSL web certificates into workflow",
  },
  {
    id: "12",
    status: "inprogress",
    createdById: 10,
    initial: false,

    title: "Implement error logging and monitoring",
  },
  {
    id: "13",
    status: "inprogress",
    createdById: 10,
    initial: false,

    title: "Design and implement responsive UI",
  },
];
