import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"

function Board({ tasks, setTasks, addActivity }) {
  const columns = ["Pending", "In Progress", "Completed"]

  function handleDragEnd(event) {
    const { active, over } = event

    if (!over) return

    const taskIndex = Number(active.id)
    const newStatus = over.id

    if (tasks[taskIndex].status === newStatus) return

    const updatedTasks = tasks.map((task, index) => {
      if (index === taskIndex) {
        return { ...task, status: newStatus }
      }

      return task
    })

    setTasks(updatedTasks)
    addActivity(`Task moved to ${newStatus}`)
  }

  return (
    <section className="board-page">
      <div className="section-title">
        <h2>Kanban Board</h2>
        <p>Drag tasks between workflow stages</p>
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="board-grid">
          {columns.map((column) => (
            <BoardColumn
              key={column}
              column={column}
              tasks={tasks}
            />
          ))}
        </div>
      </DndContext>
    </section>
  )
}

function BoardColumn({ column, tasks }) {
  const { setNodeRef, isOver } = useDroppable({
    id: column,
  })

  const columnTasks = tasks
    .map((task, index) => ({ ...task, realIndex: index }))
    .filter((task) => task.status === column)

  return (
    <div
      ref={setNodeRef}
      className={`board-column ${isOver ? "board-column-over" : ""}`}
    >
      <div className="board-column-header">
        <h3>{column}</h3>
        <span>{columnTasks.length}</span>
      </div>

      <div className="board-list">
        {columnTasks.length === 0 && (
          <div className="board-empty">
            Drop tasks here
          </div>
        )}

        {columnTasks.map((task) => (
          <BoardCard
            key={task.realIndex}
            task={task}
            id={String(task.realIndex)}
          />
        ))}
      </div>
    </div>
  )
}

function BoardCard({ task, id }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id,
  })

  const style = {
    transform: CSS.Translate.toString(transform),
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`board-card draggable-card ${
        isDragging ? "dragging-card" : ""
      }`}
      {...listeners}
      {...attributes}
    >
      <div className="board-card-top">
        <h4>{task.title}</h4>

        <span className={`priority ${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
      </div>

      <p>{task.category || "General"}</p>

      {task.dueDate && (
        <small>Due: {task.dueDate}</small>
      )}
    </div>
  )
}

export default Board