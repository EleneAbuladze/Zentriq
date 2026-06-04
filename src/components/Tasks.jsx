import { useState } from "react"

function Tasks({ tasks, setTasks, addActivity }) {
  const [taskInput, setTaskInput] = useState("")
  const [priorityInput, setPriorityInput] = useState("Low")
  const [categoryInput, setCategoryInput] = useState("General")
  const [dueDateInput, setDueDateInput] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [editingIndex, setEditingIndex] = useState(null)
  const [editInput, setEditInput] = useState("")
  const [openMenuIndex, setOpenMenuIndex] = useState(null)

  function addTask() {
    if (taskInput.trim() === "") return

    const newTask = {
      title: taskInput,
      status: "Pending",
      priority: priorityInput,
      category: categoryInput,
      dueDate: dueDateInput,
      createdAt: new Date().toLocaleDateString(),
    }

    setTasks([newTask, ...tasks])
    addActivity("New task created")

    setTaskInput("")
    setPriorityInput("Low")
    setCategoryInput("General")
    setDueDateInput("")
  }

  function deleteTask(index) {
    setTasks(tasks.filter((task, i) => i !== index))
    addActivity("Task deleted")
  }

  function changeStatus(index, newStatus) {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, status: newStatus }
      }

      return task
    })

    setTasks(updatedTasks)
    addActivity(`Task moved to ${newStatus}`)
  }

  function startEdit(index, currentTitle) {
    setEditingIndex(index)
    setEditInput(currentTitle)
  }

  function saveEdit(index) {
    if (editInput.trim() === "") return

    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, title: editInput }
      }

      return task
    })

    setTasks(updatedTasks)
    addActivity("Task edited")

    setEditingIndex(null)
    setEditInput("")
  }

  function clearCompleted() {
    setTasks(tasks.filter((task) => task.status !== "Completed"))
    addActivity("Completed tasks cleared")
  }

  function isOverdue(task) {
    if (!task.dueDate || task.status === "Completed") return false

    const today = new Date().toISOString().split("T")[0]
    return task.dueDate < today
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchInput.toLowerCase())

    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <section className="task-section">
      <div className="section-title section-row">
        <div>
          <h2>Task Manager</h2>
          <p>Create, filter, search and manage your work</p>
        </div>

        <button className="clear-btn" onClick={clearCompleted}>
          Clear Completed
        </button>
      </div>

      <div className="task-form advanced-form">
        <input
          type="text"
          placeholder="Enter task..."
          value={taskInput}
          onChange={(event) => setTaskInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") addTask()
          }}
        />

        <select
          value={priorityInput}
          onChange={(event) => setPriorityInput(event.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select
          value={categoryInput}
          onChange={(event) => setCategoryInput(event.target.value)}
        >
          <option>General</option>
          <option>Study</option>
          <option>Work</option>
          <option>Personal</option>
          <option>Urgent</option>
        </select>

        <input
          type="date"
          value={dueDateInput}
          onChange={(event) => setDueDateInput(event.target.value)}
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option>All</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>

      <div className="tasks-stats">
        <div className="task-stat-card">
          <h3>{tasks.length}</h3>
          <span>Total Tasks</span>
        </div>

        <div className="task-stat-card">
          <h3>
            {tasks.filter((task) => task.status === "Completed").length}
          </h3>
          <span>Completed</span>
        </div>

        <div className="task-stat-card">
          <h3>
            {tasks.filter((task) => task.status === "In Progress").length}
          </h3>
          <span>In Progress</span>
        </div>

        <div className="task-stat-card danger-stat">
          <h3>
            {tasks.filter((task) => task.priority === "High").length}
          </h3>
          <span>High Priority</span>
        </div>
      </div>

      <div className="task-list">
        {filteredTasks.length === 0 && (
          <div className="empty-state">
            <h3>No tasks found</h3>
            <p>Try changing your filters or create a new task.</p>
          </div>
        )}

        {filteredTasks.map((task, index) => (
          <div
            className={`task-item ${
              isOverdue(task) ? "overdue-task" : ""
            } ${task.status === "Completed" ? "completed-task" : ""}`}
            key={index}
          >
            <div>
              {editingIndex === index ? (
                <input
                  className="edit-input"
                  value={editInput}
                  onChange={(event) => setEditInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") saveEdit(index)
                  }}
                />
              ) : (
                <h3>{task.title}</h3>
              )}

              <p>
                {task.status} • {task.category || "General"}
                {task.dueDate && ` • Due: ${task.dueDate}`}
              </p>

              {isOverdue(task) && (
                <small className="overdue-label">Overdue</small>
              )}
            </div>

            <div className="task-right">
              <div className="task-badges">
                <span className={`priority ${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>

                <span className="task-category">
                  {task.category || "General"}
                </span>

                <span
                  className={`task-status-badge status-${task.status
                    .replace(" ", "-")
                    .toLowerCase()}`}
                >
                  {task.status}
                </span>
              </div>

              <div className="task-actions">

                <button
                  className="task-menu-btn"
                  onClick={() =>
                    setOpenMenuIndex(openMenuIndex === index ? null : index)
                  }
                >
                  ⋮
                </button>

                {openMenuIndex === index && (
                  <div className="task-menu">

                    <button
                       onClick={() => {
                       changeStatus(index, "Pending")
                       setOpenMenuIndex(null)
                          }}
                        >
                          Move to Pending
                   </button>

                   <button
                      onClick={() => {
                      changeStatus(index, "In Progress")
                      setOpenMenuIndex(null)
                         }}
                        >
                          Move to In Progress
                   </button>

                   <button
                      onClick={() => {
                      changeStatus(index, "Completed")
                      setOpenMenuIndex(null)
                         }}
                       >
                          Move to Completed
                  </button>

                    <button
                      onClick={() => {
                        startEdit(index, task.title)
                        setOpenMenuIndex(null)
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="menu-delete"
                      onClick={() => {
                        deleteTask(index)
                        setOpenMenuIndex(null)
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Tasks