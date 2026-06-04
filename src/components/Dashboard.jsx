import {
  FiZap,
  FiTarget,
  FiCheckSquare,
  FiFolder,
  FiFileText,
  FiClock,
  FiTrendingUp,
  FiAlertCircle,
  FiActivity,
  FiCalendar,
} from "react-icons/fi"

function Dashboard({ tasks, projects, notes, setActivePage }) {
  const completedTasks = tasks.filter((task) => task.status === "Completed").length
  const pendingTasks = tasks.filter((task) => task.status === "Pending").length
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress").length
  const highPriorityTasks = tasks.filter((task) => task.priority === "High").length

  const productivity =
    tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0

  const averageProjectProgress =
    projects.length > 0
      ? Math.round(
          projects.reduce((total, project) => total + Number(project.progress || 0), 0) /
            projects.length
        )
      : 0

  const upcomingTasks = tasks
    .filter((task) => task.dueDate && task.status !== "Completed")
    .slice(0, 3)

  const topProjects = projects.slice(0, 3)

  return (
    <section className="dashboard-page">
      <div className="dashboard-cinema-hero dashboard-hero-pro">
        <div className="hero-content">
          <div className="hero-pill">
            <FiZap />
            AI Productivity Workspace
          </div>

          <h1>Build your day like a pro.</h1>

          <p>
            Zentriq turns your tasks, projects, notes and focus sessions into one
            intelligent command center.
          </p>

          <div className="hero-actions">
            <button onClick={() => setActivePage("focus")}>Start Focus</button>

            <button
              className="secondary-action"
              onClick={() => setActivePage("analytics")}
            >
              View Analytics
            </button>
          </div>
        </div>

        <div className="hero-command-card mission-card-pro">
          <span>Today’s Mission</span>

          <h3>
            {highPriorityTasks > 0
              ? "Finish high priority work"
              : "Keep your momentum"}
          </h3>

          <p>
            {pendingTasks + inProgressTasks} active tasks • {productivity}%
            productivity
          </p>

          <div className="mission-progress">
            <div style={{ width: `${productivity}%` }}></div>
          </div>

          <div className="mission-meta">
            <div>
              <FiAlertCircle />
              <span>{highPriorityTasks} urgent</span>
            </div>

            <div>
              <FiClock />
              <span>Today</span>
            </div>
          </div>
        </div>
      </div>

      <div className="cards">
        <StatCard icon={<FiCheckSquare />} label="Total Tasks" value={tasks.length} sub="Workspace workload" progress={Math.min(tasks.length * 12, 100)} />
        <StatCard icon={<FiTarget />} label="Completed" value={completedTasks} sub="Finished tasks" progress={productivity} />
        <StatCard icon={<FiFolder />} label="Projects" value={projects.length} sub="Active spaces" progress={averageProjectProgress} />
        <StatCard icon={<FiFileText />} label="Notes" value={notes.length} sub="Saved ideas" progress={Math.min(notes.length * 20, 100)} />
      </div>

      <div className="dashboard-pro-grid">
        <div className="panel dashboard-widget">
          <div className="section-title">
            <h2>Focus Overview</h2>
            <p>Your current workflow status</p>
          </div>

          <div className="overview-list">
            <div><span>Pending</span><strong>{pendingTasks}</strong></div>
            <div><span>In Progress</span><strong>{inProgressTasks}</strong></div>
            <div><span>High Priority</span><strong>{highPriorityTasks}</strong></div>
            <div><span>Completed</span><strong>{completedTasks}</strong></div>
          </div>
        </div>

        <div className="panel dashboard-widget">
          <div className="section-title">
            <h2>Productivity Core</h2>
            <p>Performance score</p>
          </div>

          <div
            className="score-circle"
            style={{
              background: `conic-gradient(#38bdf8 0deg, #7c3aed ${
                productivity * 3.6
              }deg, rgba(255,255,255,0.08) ${productivity * 3.6}deg)`,
            }}
          >
            <h1>{productivity}%</h1>
          </div>

          <div className="score-info">
            <div>
              <span>Level</span>
              <strong>
                {productivity >= 70 ? "Elite" : productivity >= 40 ? "Strong" : "Starter"}
              </strong>
            </div>

            <div>
              <span>Updated</span>
              <strong><FiClock /> Today</strong>
            </div>
          </div>
        </div>

        <div className="panel dashboard-widget">
          <div className="section-title">
            <h2>Upcoming</h2>
            <p>Next scheduled tasks</p>
          </div>

          <div className="dashboard-mini-list">
            {upcomingTasks.length === 0 && (
              <div className="dashboard-empty-mini">
                <FiCalendar />
                <span>No upcoming deadlines</span>
              </div>
            )}

            {upcomingTasks.map((task, index) => (
              <div className="dashboard-mini-item" key={index}>
                <div>
                  <h3>{task.title}</h3>
                  <p>{task.category || "General"} • {task.dueDate}</p>
                </div>

                <span className={`priority ${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel dashboard-widget">
          <div className="section-title">
            <h2>Project Momentum</h2>
            <p>Progress across active spaces</p>
          </div>

          <div className="dashboard-mini-list">
            {topProjects.length === 0 && (
              <div className="dashboard-empty-mini">
                <FiFolder />
                <span>No projects yet</span>
              </div>
            )}

            {topProjects.map((project, index) => (
              <div className="dashboard-project-row" key={index}>
                <div>
                  <h3>{project.name}</h3>
                  <p>{project.status || "Active"}</p>
                </div>

                <div className="dashboard-project-progress">
                  <div style={{ width: `${project.progress || 0}%` }}></div>
                </div>

                <strong>{project.progress || 0}%</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="panel dashboard-widget dashboard-action-panel">
          <div className="section-title">
            <h2>Quick Actions</h2>
            <p>Move faster through your workspace</p>
          </div>

          <div className="quick-actions-grid">
            <button onClick={() => setActivePage("tasks")}>
              <FiCheckSquare />
              Add Task
            </button>

            <button onClick={() => setActivePage("projects")}>
              <FiFolder />
              New Project
            </button>

            <button onClick={() => setActivePage("focus")}>
              <FiClock />
              Start Focus
            </button>

            <button onClick={() => setActivePage("analytics")}>
              <FiTrendingUp />
              View Analytics
            </button>
          </div>
        </div>

        <div className="panel dashboard-widget today-focus-card">
          <div className="section-title">
            <h2>Today’s Focus</h2>
            <p>Your best next move</p>
          </div>

          <div className="focus-recommendation">
            <FiTarget />

            <div>
              <h3>
                {highPriorityTasks > 0
                  ? "Handle high priority tasks first"
                  : inProgressTasks > 0
                  ? "Finish what you already started"
                  : "Create one important task"}
              </h3>

              <p>
                {pendingTasks + inProgressTasks} active tasks waiting in your workspace.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatCard({ icon, label, value, sub, progress }) {
  return (
    <div className="card premium-card stat-card-v2">
      <div className="stat-card-top">
        <div className="card-icon">{icon}</div>

        <div className="trend-badge">
          <FiActivity />
          {progress}%
        </div>
      </div>

      <p>{label}</p>
      <h2>{value}</h2>
      <span>{sub}</span>

      <div className="mini-progress">
        <div style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  )
}

export default Dashboard