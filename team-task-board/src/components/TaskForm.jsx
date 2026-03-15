import { useEffect, useRef, useState } from 'react';
import { useTasks } from '../context/TaskContext';

export default function TaskForm() {
  const { dispatch } = useTasks();

  const [formData, setFormData] = useState({
    title: '',
    assignee: '',
    priority: 'Medium',
  });

  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.title.trim() || !formData.assignee.trim()) {
      return;
    }

    dispatch({
      type: 'ADD_TASK',
      payload: {
        id: crypto.randomUUID(),
        title: formData.title.trim(),
        assignee: formData.assignee.trim(),
        priority: formData.priority,
        done: false,
      },
    });

    setFormData({
      title: '',
      assignee: '',
      priority: 'Medium',
    });

    titleRef.current?.focus();
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>Neue Aufgabe</h2>

      <label htmlFor="title">Aufgabe</label>
      <input
        ref={titleRef}
        id="title"
        name="title"
        placeholder="z. B. Deployment vorbereiten"
        value={formData.title}
        onChange={handleChange}
      />

      <label htmlFor="assignee">Zuständig</label>
      <input
        id="assignee"
        name="assignee"
        placeholder="z. B. Anna"
        value={formData.assignee}
        onChange={handleChange}
      />

      <label htmlFor="priority">Priorität</label>
      <select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button type="submit">Task anlegen</button>
    </form>
  );
}