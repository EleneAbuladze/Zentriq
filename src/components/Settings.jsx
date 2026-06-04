import { useState } from "react"
import {
  FiMoon,
  FiSun,
  FiDownload,
  FiTrash2,
  FiDatabase,
  FiShield,
  FiUser,
  FiMail,
  FiKey,
} from "react-icons/fi"

function Settings({
  theme,
  setTheme,
  tasks,
  setTasks,
  projects,
  setProjects,
  notes,
  setNotes,
  activities,
  setActivities,
}) {
  const savedUser = JSON.parse(localStorage.getItem("zentriq_user"))

  const [fullName, setFullName] = useState(savedUser?.fullName || "")
  const [email, setEmail] = useState(savedUser?.email || "")
  const [password, setPassword] = useState(savedUser?.password || "")

  function exportData() {
    const data = { tasks, projects, notes, activities }

    const file = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    })

    const link = document.createElement("a")
    link.href = URL.createObjectURL(file)
    link.download = "zentriq-backup.json"
    link.click()
  }

  function saveProfile() {
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      alert("Please fill all fields")
      return
    }

    localStorage.setItem(
      "zentriq_user",
      JSON.stringify({
        fullName,
        email,
        password,
      })
    )

    alert("Profile updated successfully")
    window.location.reload()
  }

  function resetWorkspace() {
    const confirmReset = confirm("Are you sure you want to reset everything?")
    if (!confirmReset) return

    setTasks([])
    setProjects([])
    setNotes([])
    setActivities([])

    localStorage.removeItem("tasks")
    localStorage.removeItem("projects")
    localStorage.removeItem("notes")
    localStorage.removeItem("activities")
  }

  return (
    <section className="settings-page">
      <div className="settings-hero">
        <div>
          <span>
            <FiShield />
            Workspace Control
          </span>

          <h2>Manage your Zentriq workspace.</h2>

          <p>
            Customize your profile, theme, backup your data and control your
            local workspace settings.
          </p>
        </div>

        <div className="settings-hero-stat">
          <h3>{tasks.length + projects.length + notes.length}</h3>
          <p>Items</p>
        </div>
      </div>

      <div className="profile-settings-card">
        <div className="profile-settings-header">
          <div className="setting-icon">
            <FiUser />
          </div>

          <div>
            <h3>Profile Settings</h3>
            <p>Update your account name, email and password.</p>
          </div>
        </div>

        <div className="profile-settings-form">
          <label>
            <FiUser />
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
            />
          </label>

          <label>
            <FiMail />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <label>
            <FiKey />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          <button onClick={saveProfile}>Save Profile</button>
        </div>
      </div>

      <div className="settings-grid">
        <div className="setting-card-pro">
          <div className="setting-icon">
            {theme === "dark" ? <FiMoon /> : <FiSun />}
          </div>

          <div>
            <h3>Theme Mode</h3>
            <p>Switch between light and dark workspace appearance.</p>
          </div>

          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div className="setting-card-pro">
          <div className="setting-icon">
            <FiDownload />
          </div>

          <div>
            <h3>Export Backup</h3>
            <p>Download your tasks, projects, notes and activity history.</p>
          </div>

          <button onClick={exportData}>Export</button>
        </div>

        <div className="setting-card-pro">
          <div className="setting-icon">
            <FiDatabase />
          </div>

          <div>
            <h3>Workspace Data</h3>
            <p>
              {tasks.length} tasks • {projects.length} projects • {notes.length} notes
            </p>
          </div>

          <button disabled>Local</button>
        </div>

        <div className="setting-card-pro danger-setting-pro">
          <div className="setting-icon danger-icon">
            <FiTrash2 />
          </div>

          <div>
            <h3>Danger Zone</h3>
            <p>Reset workspace data without deleting your account.</p>
          </div>

          <button onClick={resetWorkspace}>Reset</button>
        </div>
      </div>
    </section>
  )
}

export default Settings