import { create } from "zustand";
import { combine } from "zustand/middleware";
import { v4 } from "uuid";

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export const enum FilterState {
  All = "all",
  Pending = "pending",
  Completed = "completed",
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
      filterState: FilterState.All,
      filteredTodos: initialTodos,
    },
    (set) => ({
      toogleCompleted: (id: string) =>
        set((state) => {
          const todos: Todo[] = state.todos.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          );
          const filteredTodos = filterTodosOnstate(todos, state.filterState);

          return {
            ...state,
            todos: todos,
            filteredTodos: filteredTodos,
          };
        }),
      addTodo: (todo: Todo) =>
        set((state) => {
          const newTodos = [...state.todos, todo];
          const filteredTodos = filterTodosOnstate(newTodos, state.filterState);

          return { ...state, todos: newTodos, filteredTodos: filteredTodos };
        }),
      deleteTodo: (id: string) =>
        set((state) => {
          const todos: Todo[] = state.todos.filter((t) => t.id !== id);
          const filteredTodos = filterTodosOnstate(todos, state.filterState);

          return {
            ...state,
            todos: todos,
            filteredTodos: filteredTodos,
          };
        }),
      setFilterState: (filterState: FilterState) =>
        set((state) => {
          const filteredTodos = filterTodosOnstate(state.todos, filterState);

          return {
            ...state,
            filteredTodos: filteredTodos,
            filterState: filterState,
          };
        }),
    })
  )
);

const filterTodosOnstate = (todos: Todo[], filterState: FilterState) => {
  switch (filterState) {
    case FilterState.All:
      return todos;

    case FilterState.Pending:
      const pendingTodos: Todo[] = todos.filter((t) => t.completed === false);
      return pendingTodos;

    case FilterState.Completed:
      const completedTodos: Todo[] = todos.filter((t) => t.completed === true);
      return completedTodos;
  }
};
