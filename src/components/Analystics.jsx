function Analytics({ tasks, projects, notes }) {
  const completed = tasks.filter((task) => task.status === "Completed").length
  const inProgress = tasks.filter((task) => task.status === "In Progress").length
  const pending = tasks.filter((task) => task.status === "Pending").length

  const high = tasks.filter((task) => task.priority === "High").length
  const medium = tasks.filter((task) => task.priority === "Medium").length
  const low = tasks.filter((task) => task.priority === "Low").length

  const averageProgress =
    projects.length > 0
      ? Math.round(
          projects.reduce((total, project) => total + project.progress, 0) /
            projects.length
        )
      : 0

  function getPercent(value) {
    if (tasks.length === 0) return 0
    return Math.round((value / tasks.length) * 100)
  }

  return (
    <section className="analytics-page">
      <div className="section-title">
        <h2>Analytics</h2>
        <p>Understand your productivity and workspace performance</p>
      </div>

      <div className="analytics-grid">
        <div className="panel">
          <h3>Task Status</h3>

          <div className="analytics-bar">
            <span>Completed</span>
            <div><div style={{ width: getPercent(completed) + "%" }}></div></div>
            <strong>{completed}</strong>
          </div>

          <div className="analytics-bar">
            <span>In Progress</span>
            <div><div style={{ width: getPercent(inProgress) + "%" }}></div></div>
            <strong>{inProgress}</strong>
          </div>

          <div className="analytics-bar">
            <span>Pending</span>
            <div><div style={{ width: getPercent(pending) + "%" }}></div></div>
            <strong>{pending}</strong>
          </div>
        </div>

        <div className="panel">
          <h3>Priority Breakdown</h3>

          <div className="analytics-bar">
            <span>High</span>
            <div><div style={{ width: getPercent(high) + "%" }}></div></div>
            <strong>{high}</strong>
          </div>

          <div className="analytics-bar">
            <span>Medium</span>
            <div><div style={{ width: getPercent(medium) + "%" }}></div></div>
            <strong>{medium}</strong>
          </div>

          <div className="analytics-bar">
            <span>Low</span>
            <div><div style={{ width: getPercent(low) + "%" }}></div></div>
            <strong>{low}</strong>
          </div>
        </div>

        <div className="panel analytics-summary">
          <h3>Workspace Summary</h3>

          <div>
            <p>Total Tasks</p>
            <h2>{tasks.length}</h2>
          </div>

          <div>
            <p>Average Project Progress</p>
            <h2>{averageProgress}%</h2>
          </div>

          <div>
            <p>Total Notes</p>
            <h2>{notes.length}</h2>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Analytics