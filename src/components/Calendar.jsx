import { FiCalendar, FiClock, FiAlertCircle, FiCheckCircle } from "react-icons/fi"

function Calendar({ tasks }) {
  const today = new Date().toISOString().split("T")[0]

  const tasksWithDate = tasks.filter((task) => task.dueDate)

  const todayTasks = tasksWithDate.filter(
    (task) => task.dueDate === today && task.status !== "Completed"
  )

  const overdueTasks = tasksWithDate.filter(
    (task) => task.dueDate < today && task.status !== "Completed"
  )

  const upcomingTasks = tasksWithDate.filter(
    (task) => task.dueDate > today && task.status !== "Completed"
  )

  function TaskCard({ task }) {
    return (
      <div className="calendar-pro-card">
        <div>
          <h3>{task.title}</h3>
          <p>{task.category || "General"} • {task.status}</p>
        </div>

        <div className="calendar-card-right">
          <span className={`priority ${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>
          <small>{task.dueDate}</small>
        </div>
      </div>
    )
  }

  return (
    <section className="calendar-page">
      <div className="calendar-hero">
        <div>
          <span><FiCalendar /> Smart Calendar</span>
          <h2>Stay ahead of your deadlines.</h2>
          <p>Track today’s tasks, upcoming work and overdue priorities.</p>
        </div>

        <div className="calendar-hero-stat">
          <h3>{tasksWithDate.length}</h3>
          <p>Scheduled</p>
        </div>
      </div>

      <div className="calendar-stats">
        <div>
          <FiClock />
          <h3>{todayTasks.length}</h3>
          <span>Today</span>
        </div>

        <div className="danger-calendar-stat">
          <FiAlertCircle />
          <h3>{overdueTasks.length}</h3>
          <span>Overdue</span>
        </div>

        <div>
          <FiCheckCircle />
          <h3>{upcomingTasks.length}</h3>
          <span>Upcoming</span>
        </div>
      </div>

      <div className="calendar-columns">
        <div className="panel calendar-column-pro">
          <h2>Today</h2>
          {todayTasks.length === 0 && <p className="calendar-empty">No tasks due today.</p>}
          {todayTasks.map((task, index) => <TaskCard task={task} key={index} />)}
        </div>

        <div className="panel calendar-column-pro">
          <h2>Upcoming</h2>
          {upcomingTasks.length === 0 && <p className="calendar-empty">No upcoming tasks.</p>}
          {upcomingTasks.map((task, index) => <TaskCard task={task} key={index} />)}
        </div>

        <div className="panel calendar-column-pro">
          <h2>Overdue</h2>
          {overdueTasks.length === 0 && <p className="calendar-empty">No overdue tasks.</p>}
          {overdueTasks.map((task, index) => <TaskCard task={task} key={index} />)}
        </div>
      </div>
    </section>
  )
}

export default Calendar