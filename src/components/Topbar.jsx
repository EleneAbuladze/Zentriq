import { useState } from "react"
import {
  FiSearch,
  FiBell,
  FiCommand,
  FiUser,
  FiSettings,
  FiLogOut,
  FiTrash2,
} from "react-icons/fi"

function Topbar({
  setIsCommandOpen,
  isNotificationOpen,
  setIsNotificationOpen,
  activities,
  setActivePage,
  tasks,
  projects,
  notes,
}) {
  const [searchInput, setSearchInput] = useState("")
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const user = JSON.parse(localStorage.getItem("zentriq_user"))

  const userName =
    user?.fullName ||
    user?.email?.split("@")[0] ||
    "Zentriq User"

  const userInitial = userName.charAt(0).toUpperCase()

  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

  const recentActivities = activities.slice(0, 5)

  const searchResults = [
    ...tasks.map((task) => ({
      title: task.title,
      type: "Task",
      page: "tasks",
    })),

    ...projects.map((project) => ({
      title: project.name,
      type: "Project",
      page: "projects",
    })),

    ...notes.map((note) => ({
      title: note.text,
      type: "Note",
      page: "notes",
    })),

    { title: "Dashboard", type: "Page", page: "dashboard" },
    { title: "Board", type: "Page", page: "board" },
    { title: "Calendar", type: "Page", page: "calendar" },
    { title: "Analytics", type: "Page", page: "analytics" },
    { title: "AI Assistant", type: "Page", page: "ai" },
    { title: "Focus Mode", type: "Page", page: "focus" },
  ].filter((item) =>
    item.title.toLowerCase().includes(searchInput.toLowerCase())
  )

  function openSearchResult(page) {
    setActivePage(page)
    setSearchInput("")
  }

  function openActivityPage() {
    setActivePage("activity")
    setIsNotificationOpen(false)
  }

  function logout() {
    localStorage.removeItem("zentriq_auth")
    window.location.reload()
  }

  function deleteAccount() {
    const confirmDelete = confirm(
      "Are you sure you want to delete your account?"
    )

    if (!confirmDelete) return

    localStorage.removeItem("zentriq_user")
    localStorage.removeItem("zentriq_auth")
    window.location.reload()
  }

  return (
    <header className="topbar">
      <div>
        <p className="welcome-text">Welcome back, {userName}</p>
        <h1>Command Center</h1>
      </div>

      <div className="topbar-actions">
        <div className="search-wrapper">
          <div className="search-pill">
            <FiSearch />

            <input
              type="text"
              placeholder="Search workspace..."
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
          </div>

          {searchInput && (
            <div className="search-dropdown">
              {searchResults.length === 0 && (
                <div className="search-empty">No results found</div>
              )}

              {searchResults.slice(0, 6).map((item, index) => (
                <button
                  className="search-result"
                  key={index}
                  onClick={() => openSearchResult(item.page)}
                >
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.type}</span>
                  </div>

                  <small>Open</small>
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          className="command-open-btn"
          onClick={() => setIsCommandOpen(true)}
          title="Open commands"
        >
          <FiCommand />
        </button>

        <div className="notification-wrapper">
          <button
            className="icon-btn notification-btn"
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          >
            <FiBell />

            {activities.length > 0 && (
              <span className="notification-dot">{activities.length}</span>
            )}
          </button>

          {isNotificationOpen && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <h3>Notifications</h3>
                <button onClick={openActivityPage}>View all</button>
              </div>

              <div className="notification-list">
                {recentActivities.length === 0 && (
                  <div className="notification-empty">
                    <p>No notifications yet</p>
                    <span>Your workspace activity will appear here.</span>
                  </div>
                )}

                {recentActivities.map((activity, index) => (
                  <div className="notification-row" key={index}>
                    <div className="notification-bullet"></div>

                    <div>
                      <p>{activity.text}</p>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="live-clock">{time}</div>

        <div className="profile-wrapper">
          <button
            className="profile-box"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <div className="profile-avatar">{userInitial}</div>

            <div>
              <h4>{userName}</h4>
            </div>
          </button>

          {isProfileOpen && (
            <div className="profile-dropdown">
              <button
                onClick={() => {
                  setActivePage("settings")
                  setIsProfileOpen(false)
                }}
              >
                <FiUser />
                Profile
              </button>

              <button
                onClick={() => {
                  setActivePage("settings")
                  setIsProfileOpen(false)
                }}
              >
                <FiSettings />
                Settings
              </button>

              <button className="profile-logout" onClick={logout}>
                <FiLogOut />
                Logout
              </button>

              <button className="profile-delete" onClick={deleteAccount}>
                <FiTrash2 />
                Delete Account
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Topbar