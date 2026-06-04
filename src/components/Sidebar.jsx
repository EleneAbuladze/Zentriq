import {
  FiHome,
  FiCheckSquare,
  FiColumns,
  FiFolder,
  FiFileText,
  FiCalendar,
  FiActivity,
  FiClock,
  FiCpu,
  FiBarChart2,
  FiSettings,
} from "react-icons/fi"

function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="sidebar">

      <div className="logo-area">
        <div className="logo-icon">⚡</div>
        <h2>Zentriq</h2>
      </div>

      <nav>

        <a
          className={activePage === "dashboard" ? "active" : ""}
          onClick={() => setActivePage("dashboard")}
        >
          <FiHome />
          Dashboard
        </a>

        <a
          className={activePage === "tasks" ? "active" : ""}
          onClick={() => setActivePage("tasks")}
        >
          <FiCheckSquare />
          Tasks
        </a>

        <a
          className={activePage === "board" ? "active" : ""}
          onClick={() => setActivePage("board")}
        >
          <FiColumns />
          Board
        </a>

        <a
          className={activePage === "projects" ? "active" : ""}
          onClick={() => setActivePage("projects")}
        >
          <FiFolder />
          Projects
        </a>

        <a
          className={activePage === "notes" ? "active" : ""}
          onClick={() => setActivePage("notes")}
        >
          <FiFileText />
          Notes
        </a>

        <a
          className={activePage === "calendar" ? "active" : ""}
          onClick={() => setActivePage("calendar")}
        >
          <FiCalendar />
          Calendar
        </a>

        <a
          className={activePage === "activity" ? "active" : ""}
          onClick={() => setActivePage("activity")}
        >
          <FiActivity />
          Activity
        </a>

        <a
          className={activePage === "focus" ? "active" : ""}
          onClick={() => setActivePage("focus")}
        >
          <FiClock />
          Focus Mode
        </a>

        <a
          className={activePage === "ai" ? "active" : ""}
          onClick={() => setActivePage("ai")}
        >
          <FiCpu />
          AI Assistant
        </a>

        <a
          className={activePage === "analytics" ? "active" : ""}
          onClick={() => setActivePage("analytics")}
        >
          <FiBarChart2 />
          Analytics
        </a>

        <a
          className={activePage === "settings" ? "active" : ""}
          onClick={() => setActivePage("settings")}
        >
          <FiSettings />
          Settings
        </a>

      </nav>

    </aside>
  )
}

export default Sidebar