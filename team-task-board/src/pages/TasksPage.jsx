import { useEffect, useState } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function TasksPage() {
  const { tasks, dispatch } = useTasks();
  // Simuliertes Laden — zeigt useEffect + Cleanup zu Demo-Zwecken
  const [loading, setLoading] = useState(true);

  useDocumentTitle('Tasks | Team Task Board');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);

    return () => clearTimeout(timer);
  }, []);

  function handleToggle(id) {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  }

  function handleDelete(id) {
    dispatch({ type: 'DELETE_TASK', payload: id });
  }

  const openTasks = tasks.filter((task) => !task.done);
  const doneTasks = tasks.filter((task) => task.done);

  return (
    <section className="page">
      <TaskForm />

      <div className="section-header">
        <h2>Offene Aufgaben</h2>
        <span>{openTasks.length} offen</span>
      </div>

      {loading ? (
        <p className="card">Lade Aufgaben...</p>
      ) : (
        <TaskList
          tasks={openTasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      )}

      {!loading && doneTasks.length > 0 && (
        <>
          <div className="section-header">
            <h2>Erledigt</h2>
            <span>{doneTasks.length} erledigt</span>
          </div>

          <TaskList
            tasks={doneTasks}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        </>
      )}
    </section>
  );
}