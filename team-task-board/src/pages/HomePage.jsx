import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function HomePage() {
  const { tasks } = useTasks();

  useDocumentTitle('Home | Team Task Board');

  const openTasks = tasks.filter((task) => !task.done).length;
  const doneTasks = tasks.length - openTasks;

  return (
    <section className="page">
      <div className="card hero">
        <h2>Internes Demo-Projekt für React</h2>
        <p>
          Kleine, saubere Beispielanwendung mit Router, Props, State,
          Form-Handling, Hooks und Global State.
        </p>

        <div className="stats">
          <span>Offen: {openTasks}</span>
          <span>Erledigt: {doneTasks}</span>
        </div>

        <Link to="/tasks" className="link-button">
          Zu den Tasks
        </Link>
      </div>
    </section>
  );
}