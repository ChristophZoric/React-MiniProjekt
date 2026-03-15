import useDocumentTitle from '../hooks/useDocumentTitle';

const techCards = [
  {
    tag: 'Routing',
    title: 'React Router v6',
    description:
      'Die App nutzt createBrowserRouter mit einer verschachtelten Route-Struktur. App.jsx dient als Shell-Komponente und rendert per <Outlet /> die aktive Seite. NavLink markiert den aktiven Navigationseintrag automatisch mit der CSS-Klasse active.',
    file: 'main.jsx',
  },
  {
    tag: 'Global State',
    title: 'Context API + useReducer',
    description:
      'TaskContext.jsx hält den zentralen Task-State. Statt useState wird useReducer eingesetzt, um Zustandsübergänge (ADD_TASK, TOGGLE_TASK, DELETE_TASK) klar zu trennen. Der Context-Wert wird mit useMemo stabilisiert, damit Consumer nicht unnötig neu rendern.',
    file: 'context/TaskContext.jsx',
  },
  {
    tag: 'Persistenz',
    title: 'localStorage mit Lazy Initializer',
    description:
      'Beim ersten Render liest useReducer den gespeicherten State aus localStorage — über den dritten Parameter (Init-Funktion), nicht über einen separaten useEffect. Das verhindert einen unnötigen Render-Zyklus beim Start. Änderungen werden per useEffect synchronisiert.',
    file: 'context/TaskContext.jsx',
  },
  {
    tag: 'Custom Hook',
    title: 'useDocumentTitle',
    description:
      'Ein eigener Hook kapselt das Setzen von document.title. Jede Seite ruft ihn mit ihrem Titel auf. Das Dependency-Array [title] stellt sicher, dass der Effekt nur bei Titeländerung läuft — nicht bei jedem Render.',
    file: 'hooks/useDocumentTitle.js',
  },
  {
    tag: 'Formulare',
    title: 'Kontrolliertes Formular & useRef',
    description:
      'TaskForm verwaltet alle Felder in einem einzigen formData-State-Objekt mit computed property keys ([name]: value). useRef setzt den Fokus beim ersten Render und nach jedem Submit automatisch zurück auf das Titelfeld — ohne DOM-Manipulation von außen.',
    file: 'components/TaskForm.jsx',
  },
  {
    tag: 'Komponenten',
    title: 'Props & Komponentenhierarchie',
    description:
      'TasksPage hält die Handler-Funktionen und reicht sie per Props nach unten: TaskList → TaskItem. TaskItem kennt keinen Context und ist damit vollständig wiederverwendbar. Diese klare Trennung von "smart" und "dumb" Komponenten erleichtert Tests und Wartung.',
    file: 'components/TaskItem.jsx',
  },
  {
    tag: 'UX',
    title: 'Conditional Rendering',
    description:
      'TasksPage zeigt für 500 ms einen Ladezustand — demonstriert useEffect mit Cleanup (clearTimeout). Danach wird zwischen leerem Zustand (Noch keine Aufgaben) und der gefüllten Liste unterschieden. Erledigte Tasks erscheinen in einer eigenen Sektion, sichtbar sobald mindestens eine vorhanden ist.',
    file: 'pages/TasksPage.jsx',
  },
  {
    tag: 'Listen',
    title: 'key Prop & Array-Rendering',
    description:
      'Alle Tasks besitzen eine stabile ID (crypto.randomUUID() beim Anlegen). React nutzt diese als key, um beim Re-Render gezielt nur geänderte Listeneinträge zu aktualisieren — statt die gesamte Liste neu zu erzeugen.',
    file: 'components/TaskList.jsx',
  },
];

export default function AboutPage() {
  useDocumentTitle('About | Team Task Board');

  return (
    <section className="page">
      <div className="card about-hero">
        <div className="about-hero-tag">React Mini-Demo</div>
        <h2>Team Task Board</h2>
        <p>
          Eine kompakte Beispielanwendung, die die wichtigsten React-Konzepte
          anhand eines konkreten Anwendungsfalls zeigt: ein internes Task-Board
          mit globalem State, Routing und Datenpersistenz — ohne externe
          State-Management-Bibliothek.
        </p>
        <div className="about-stack">
          <span>React 18</span>
          <span>React Router v6</span>
          <span>Context API</span>
          <span>Vite</span>
        </div>
      </div>

      <div className="about-grid">
        {techCards.map((card) => (
          <div key={card.title} className="card tech-card">
            <div className="tech-card-header">
              <span className="tech-tag">{card.tag}</span>
            </div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <div className="tech-file">{card.file}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
