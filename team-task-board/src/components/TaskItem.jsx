const priorityClass = {
  High: 'badge-high',
  Medium: 'badge-medium',
  Low: 'badge-low',
};

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <article className={`task-item ${task.done ? 'done' : ''}`}>
      <div className="task-item-body">
        <span className={`badge ${priorityClass[task.priority] ?? ''}`}>
          {task.priority[0]}
        </span>
        <div className="task-item-text">
          <h3>{task.title}</h3>
          <p>{task.assignee}</p>
        </div>
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
