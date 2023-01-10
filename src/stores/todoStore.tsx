import { create } from "zustand";
import { combine } from "zustand/middleware";
import { v4 } from "uuid";

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const initialTodos: Todo[] = [
  {
    id: v4(),
    title: "Invest in crypto!",
    description: "Doge coin all the way down to the bank!",
    completed: false,
  },
  {
    id: v4(),
    title: "Try out the new version of ChatGPT",
    description: "Seems like it gained a alot of traction lately.",
    completed: false,
  },
  {
    id: v4(),
    title: "Do the laundary...",
    description: "Remember to wash colors and white seperately",
    completed: true,
  },
  {
    id: v4(),
    title: "Learn to cook good food",
    description: "Maybe buy a cookbook or something...",
    completed: false,
  },
  {
    id: v4(),
    title: "Make sure React is the best web framework",
    description: "Compare against Anuglar, Vue and also the new SolidJS",
    completed: true,
  },
  {
    id: v4(),
    title: "Climb Seceda in Italy",
    description: "Remember to pack for cold and snowy weather",
    completed: true,
  },

  {
    id: v4(),
    title: "Get a motorcycle",
    description: "Maybe a supersport or Adeventure bike?",
    completed: false,
  },
];

export const useTodoStore = create(
  combine(
    {
      todos: initialTodos,
    },
    (set) => ({
      // ...
    })
  )
);
