import "./App.css"
import { useEffect, useState } from "react"

import Sidebar from "./components/Sidebar"
import Topbar from "./components/Topbar"
import Dashboard from "./components/Dashboard"
import Tasks from "./components/Tasks"
import Projects from "./components/Projects"
import Notes from "./components/Notes"
import Settings from "./components/Settings"
import Calendar from "./components/Calendar"
import AIAssistant from "./components/AIAssistant"
import FocusMode from "./components/FocusMode"
import Board from "./components/Board"
import Activity from "./components/Activity"
import Analytics from "./components/Analytics"
import CommandPalette from "./components/CommandPalette"
import LandingPage from "./components/LandingPage"
import Auth from "./components/Auth"

function App() {
  const [activePage, setActivePage] = useState("dashboard")
  const [showLanding, setShowLanding] = useState(true)

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("zentriq_auth") === "true"
  })

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark"
  })

  const [isCommandOpen, setIsCommandOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)

  const [activities, setActivities] = useState(() => {
    const savedActivities = localStorage.getItem("activities")
    return savedActivities ? JSON.parse(savedActivities) : []
  })

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks")

    return savedTasks
      ? JSON.parse(savedTasks)
      : [
          {
            title: "Design dashboard UI",
            status: "In Progress",
            priority: "High",
            category: "Work",
            dueDate: "",
            createdAt: new Date().toLocaleDateString(),
          },
        ]
  })

  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem("projects")

    return savedProjects
      ? JSON.parse(savedProjects)
      : [
          {
            name: "Zentriq App",
            progress: 65,
            status: "Active",
            dueDate: "2026-06-20",
            color: "purple",
          },
          {
            name: "Portfolio Website",
            progress: 40,
            status: "Planning",
            dueDate: "2026-07-10",
            color: "blue",
          },
        ]
  })

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes")
    return savedNotes ? JSON.parse(savedNotes) : []
  })

  function addActivity(text) {
    const newActivity = {
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }

    setActivities([newActivity, ...activities].slice(0, 12))
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects))
  }, [projects])

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities))
  }, [activities])

  useEffect(() => {
    localStorage.setItem("theme", theme)
  }, [theme])

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.altKey && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setIsCommandOpen((prev) => !prev)
      }

      if (event.key === "Escape") {
        setIsCommandOpen(false)
        setIsNotificationOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  function renderPage() {
    if (activePage === "dashboard") {
      return (
        <Dashboard
          tasks={tasks}
          projects={projects}
          notes={notes}
          setActivePage={setActivePage}
        />
      )
    }

    if (activePage === "tasks") {
      return (
        <Tasks
          tasks={tasks}
          setTasks={setTasks}
          addActivity={addActivity}
        />
      )
    }

    if (activePage === "board") {
      return (
        <Board
          tasks={tasks}
          setTasks={setTasks}
          addActivity={addActivity}
        />
      )
    }

    if (activePage === "projects") {
      return (
        <Projects
          projects={projects}
          setProjects={setProjects}
        />
      )
    }

    if (activePage === "notes") {
      return (
        <Notes
          notes={notes}
          setNotes={setNotes}
        />
      )
    }

    if (activePage === "calendar") {
      return <Calendar tasks={tasks} />
    }

    if (activePage === "activity") {
      return <Activity activities={activities} />
    }

    if (activePage === "focus") {
      return <FocusMode />
    }

    if (activePage === "ai") {
      return (
        <AIAssistant
          tasks={tasks}
          projects={projects}
          notes={notes}
          setActivePage={setActivePage}
        />
      )
    }

    if (activePage === "analytics") {
      return (
        <Analytics
          tasks={tasks}
          projects={projects}
          notes={notes}
        />
      )
    }

    if (activePage === "settings") {
      return (
        <Settings
          theme={theme}
          setTheme={setTheme}
          tasks={tasks}
          setTasks={setTasks}
          projects={projects}
          setProjects={setProjects}
          notes={notes}
          setNotes={setNotes}
          activities={activities}
          setActivities={setActivities}
        />
      )
    }

    return (
      <Dashboard
        tasks={tasks}
        projects={projects}
        notes={notes}
        setActivePage={setActivePage}
      />
    )
  }

  if (showLanding) {
    return (
      <LandingPage
        onEnter={() => setShowLanding(false)}
      />
    )
  }

  if (!isAuthenticated) {
    return (
      <Auth
        onLogin={() => setIsAuthenticated(true)}
      />
    )
  }

  return (
    <div className={`app ${theme}`}>
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="main">
        <Topbar
          setIsCommandOpen={setIsCommandOpen}
          isNotificationOpen={isNotificationOpen}
          setIsNotificationOpen={setIsNotificationOpen}
          activities={activities}
          setActivePage={setActivePage}
          tasks={tasks}
          projects={projects}
          notes={notes}
        />

        <CommandPalette
          isOpen={isCommandOpen}
          setIsOpen={setIsCommandOpen}
          setActivePage={setActivePage}
        />

        <div key={activePage} className="page-motion">
          {renderPage()}
        </div>
      </main>
    </div>
  )
}

export default App