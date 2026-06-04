import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts"

function Analytics({ tasks, projects, notes }) {
  const completed = tasks.filter((task) => task.status === "Completed").length
  const inProgress = tasks.filter((task) => task.status === "In Progress").length
  const pending = tasks.filter((task) => task.status === "Pending").length

  const high = tasks.filter((task) => task.priority === "High").length
  const medium = tasks.filter((task) => task.priority === "Medium").length
  const low = tasks.filter((task) => task.priority === "Low").length

  const productivity =
    tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0

  const averageProgress =
    projects.length > 0
      ? Math.round(
          projects.reduce((total, project) => total + project.progress, 0) /
            projects.length
        )
      : 0

  const statusData = [
    { name: "Completed", value: completed },
    { name: "In Progress", value: inProgress },
    { name: "Pending", value: pending },
  ]

  const priorityData = [
    { name: "High", value: high },
    { name: "Medium", value: medium },
    { name: "Low", value: low },
  ]

  const weeklyData = [
    { day: "Mon", tasks: 2 },
    { day: "Tue", tasks: 4 },
    { day: "Wed", tasks: 3 },
    { day: "Thu", tasks: completed },
    { day: "Fri", tasks: tasks.length },
    { day: "Sat", tasks: Math.max(completed - 1, 0) },
    { day: "Sun", tasks: completed + 1 },
  ]

  const projectData = projects.map((project) => ({
    name: project.name,
    progress: project.progress,
  }))

  const colors = ["#8b5cf6", "#38bdf8", "#f59e0b"]

  return (
    <section className="analytics-page">
      <div className="analytics-hero">
        <div>
          <span>Workspace Intelligence</span>
          <h2>Analytics Overview</h2>
          <p>Track productivity, workload, priorities and project momentum.</p>
        </div>

        <div className="analytics-score">
          <h3>{productivity}%</h3>
          <p>Productivity</p>
        </div>
      </div>

      <div className="analytics-summary premium-analytics-summary">
        <div>
          <p>Total Tasks</p>
          <h2>{tasks.length}</h2>
          <span>All workspace tasks</span>
        </div>

        <div>
          <p>Completed</p>
          <h2>{completed}</h2>
          <span>Finished workload</span>
        </div>

        <div>
          <p>Average Progress</p>
          <h2>{averageProgress}%</h2>
          <span>Project momentum</span>
        </div>

        <div>
          <p>Total Notes</p>
          <h2>{notes.length}</h2>
          <span>Saved ideas</span>
        </div>
      </div>

      <div className="analytics-grid premium-analytics-grid">
        <div className="panel chart-card analytics-large-card">
          <div className="chart-header">
            <div>
              <h3>Weekly Productivity</h3>
              <p>Completed task momentum</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={weeklyData}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="tasks"
                stroke="#38bdf8"
                strokeWidth={4}
                dot={{ r: 5, fill: "#8b5cf6" }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="panel chart-card">
          <div className="chart-header">
            <div>
              <h3>Task Status</h3>
              <p>Current status split</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                innerRadius={72}
                outerRadius={105}
                paddingAngle={6}
              >
                {statusData.map((entry, index) => (
                  <Cell key={index} fill={colors[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="chart-legend">
            {statusData.map((item, index) => (
              <div key={item.name}>
                <span style={{ background: colors[index] }}></span>
                {item.name}
              </div>
            ))}
          </div>
        </div>

        <div className="panel chart-card">
          <div className="chart-header">
            <div>
              <h3>Priority Breakdown</h3>
              <p>Urgency distribution</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={priorityData}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="value" fill="#8b5cf6" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="panel chart-card">
          <div className="chart-header">
            <div>
              <h3>Project Progress</h3>
              <p>Progress by active workspace</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={projectData}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="progress" fill="#38bdf8" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}

export default Analytics