function CommandPalette({ isOpen, setIsOpen, setActivePage }) {
  if (!isOpen) return null

  const pages = [
    { label: "Dashboard", value: "dashboard" },
    { label: "Tasks", value: "tasks" },
    { label: "Board", value: "board" },
    { label: "Projects", value: "projects" },
    { label: "Notes", value: "notes" },
    { label: "Calendar", value: "calendar" },
    { label: "Activity", value: "activity" },
    { label: "Focus Mode", value: "focus" },
    { label: "AI Assistant", value: "ai" },
    { label: "Analytics", value: "analytics" },
    { label: "Settings", value: "settings" },
  ]

  function openPage(page) {
    setActivePage(page)
    setIsOpen(false)
  }

  return (
    <div className="command-overlay" onClick={() => setIsOpen(false)}>
      <div className="command-modal" onClick={(event) => event.stopPropagation()}>
        <div className="command-header">
          <div>
            <h2>Command Palette</h2>
            <p>Quickly navigate through your workspace</p>
          </div>

          <button className="command-close" onClick={() => setIsOpen(false)}>
            ✕
          </button>
        </div>

        <div className="command-list">
          {pages.map((page) => (
            <button
              key={page.value}
              className="command-item"
              onClick={() => openPage(page.value)}
            >
              <span>{page.label}</span>
              <small>Open</small>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CommandPalette