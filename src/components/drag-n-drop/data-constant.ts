import { Column as ColumnType, Task } from "./types";

export const COLUMNS: ColumnType[] = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "IN_REVIEW", title: "IN Review" },
  { id: "DONE", title: "Done" },
];

export const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Research Project",
    description: "Gather requirements and create initial documentation",
    status: "TODO",
  },
  {
    id: "2",
    title: "Design System",
    description: "Create component library and design tokens",
    status: "TODO",
  },
  {
    id: "3",
    title: "API Integration",
    description: "Implement REST API endpoints",
    status: "IN_PROGRESS",
  },
  {
    id: "4",
    title: "Testing",
    description: "Write unit tests for core functionality",
    status: "DONE",
  },
  {
    id: "5",
    title: "Database Schema",
    description: "Design and implement database schema",
    status: "TODO",
  },
  {
    id: "6",
    title: "User Authentication",
    description: "Set up user login and registration system",
    status: "IN_PROGRESS",
  },
  {
    id: "7",
    title: "Frontend Styling",
    description: "Apply responsive design and styling",
    status: "TODO",
  },
  {
    id: "8",
    title: "Performance Optimization",
    description: "Optimize loading times and resource usage",
    status: "IN_REVIEW",
  },
  {
    id: "9",
    title: "User Feedback Collection",
    description: "Implement feedback form and gather insights",
    status: "IN_PROGRESS",
  },
  {
    id: "10",
    title: "Deployment",
    description: "Deploy application to production environment",
    status: "DONE",
  },
];
