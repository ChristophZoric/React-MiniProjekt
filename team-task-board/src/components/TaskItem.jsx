const priorityClass = {
  High: 'badge-high',
  Medium: 'badge-medium',
  Low: 'badge-low',
};

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <article className={`card task-item ${task.done ? 'done' : ''}`}>
      <div>
        <h3>{task.title}</h3>
        <p>Zuständig: {task.assignee}</p>
        <span className={`badge ${priorityClass[task.priority] ?? ''}`}>
          {task.priority}
        </span>
      </div>

      <div className="actions">
        <button onClick={() => onToggle(task.id)}>
          {task.done ? 'Offen setzen' : 'Erledigt'}
        </button>

        <button className="btn-delete" onClick={() => onDelete(task.id)}>
          Löschen
        </button>
      </div>
    </article>
  );
}