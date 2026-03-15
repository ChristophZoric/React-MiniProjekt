import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const TaskContext = createContext(null);

const initialTasks = [
  {
    id: 'demo-task-1',
    title: 'Frontend-Review vorbereiten',
    assignee: 'Christoph',
    priority: 'High',
    done: false,
  },
  {
    id: 'demo-task-2',
    title: 'Meeting-Notizen strukturieren',
    assignee: 'Anna',
    priority: 'Medium',
    done: true,
  },
];

function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return [action.payload, ...state];
    case 'TOGGLE_TASK':
      return state.map((task) =>
        task.id === action.payload ? { ...task, done: !task.done } : task
      );
    case 'DELETE_TASK':
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks, () => {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : initialTasks;
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const value = useMemo(() => ({ tasks, dispatch }), [tasks]);

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTasks must be used inside TaskProvider');
  }

  return context;
}