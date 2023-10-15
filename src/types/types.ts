export type Id = string | number; // needs to be string or number because of dnd-kit

export type Column = {
  id: Id;
  title: string;
};

export type Task = {
  id: Id;
  title: string;
  status: Id;
  createdById: string;
  initial: boolean;
  description?: string;
};
