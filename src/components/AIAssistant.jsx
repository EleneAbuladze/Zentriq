import {
  FiCpu,
  FiZap,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiTrendingUp,
  FiTarget,
  FiCalendar,
  FiMessageSquare,
  FiActivity,
  FiArrowRight,
} from "react-icons/fi"

function AIAssistant({ tasks, projects, notes, setActivePage }) {
  const completed = tasks.filter((task) => task.status === "Completed").length
  const pending = tasks.filter((task) => task.status === "Pending").length
  const inProgress = tasks.filter((task) => task.status === "In Progress").length
  const highPriority = tasks.filter((task) => task.priority === "High").length
  const scheduled = tasks.filter((task) => task.dueDate).length

  const productivity =
    tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0

  const averageProjectProgress =
    projects.length > 0
      ? Math.round(
          projects.reduce(
            (total, project) => total + Number(project.progress || 0),
            0
          ) / projects.length
        )
      : 0

  const nextMove =
    highPriority > 0
      ? "Focus on high-priority tasks first."
      : inProgress > 0
      ? "Finish active in-progress work."
      : "Plan one important task for today."

  return (
    <section className="ai-page">
      <div className="ai-hero ai-hero-pro">
        <div>
          <span>
            <FiCpu />
            Zentriq Intelligence
          </span>

          <h2>Your AI-powered productivity command center.</h2>

          <p>
            Get workspace insights, focus suggestions, daily summaries and smart
            recommendations based on your tasks, projects and notes.
          </p>

          <div className="ai-hero-actions">
            <button onClick={() => setActivePage("tasks")}>
              Generate Daily Plan
             <FiArrowRight />
            </button>

            <button
               className="secondary-action"
               onClick={() => setActivePage("analytics")}
                 >
               Review Workspace
            </button>
          </div>
        </div>

        <div className="ai-orb">
          <FiZap />
        </div>
      </div>

      <div className="ai-command-grid">
        <div className="ai-command-card">
          <FiTarget />
          <h3>Plan My Day</h3>
          <p>Prioritize active tasks and build a focused daily workflow.</p>
        </div>

        <div className="ai-command-card">
          <FiClock />
          <h3>Start Focus Sprint</h3>
          <p>Choose one high-impact task and start a focused session.</p>
        </div>

        <div className="ai-command-card">
          <FiCalendar />
          <h3>Review Deadlines</h3>
          <p>Find scheduled, urgent and upcoming work instantly.</p>
        </div>
      </div>

      <div className="ai-layout ai-layout-pro">
        <div className="panel ai-chat-panel">
          <div className="section-title">
            <h2>AI Conversation</h2>
            <p>Workspace assistant preview</p>
          </div>

          <div className="chat-box">
            <div className="ai-message">
              <strong>Zentriq AI</strong>
              <p>
                I scanned your workspace. You have {pending + inProgress} active
                tasks, {highPriority} high-priority items and {scheduled}
                scheduled deadlines.
              </p>
            </div>

            <div className="user-message">
              <p>What should I focus on today?</p>
            </div>

            <div className="ai-message">
              <strong>Zentriq AI</strong>
              <p>
                {nextMove} Your current productivity score is {productivity}%.
              </p>
            </div>

            <div className="ai-insight-message">
              <FiTrendingUp />
              <div>
                <h3>Smart Insight</h3>
                <p>
                  Project progress average is {averageProjectProgress}%. Keep
                  the most active project moving before starting something new.
                </p>
              </div>
            </div>

            <div className="ai-recommendation">
              <div>
                <span>Recommended Action</span>
                <h3>{nextMove}</h3>
              </div>

              <FiActivity />
            </div>

            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        <div className="ai-side">
          <div className="ai-insight-card">
            <FiTrendingUp />
            <div>
              <h3>{productivity}%</h3>
              <p>Productivity Score</p>
            </div>
          </div>

          <div className="ai-insight-card">
            <FiCheckCircle />
            <div>
              <h3>{completed}</h3>
              <p>Completed Tasks</p>
            </div>
          </div>

          <div className="ai-insight-card">
            <FiClock />
            <div>
              <h3>{pending}</h3>
              <p>Pending Tasks</p>
            </div>
          </div>

          <div className="ai-insight-card danger-insight">
            <FiAlertCircle />
            <div>
              <h3>{highPriority}</h3>
              <p>High Priority</p>
            </div>
          </div>
        </div>
      </div>

      <div className="ai-summary-grid">
        <div className="ai-summary-card">
          <FiMessageSquare />
          <h3>Today's Summary</h3>
          <p>
            {tasks.length} tasks, {projects.length} projects and {notes.length}
            notes are currently saved in your workspace.
          </p>
        </div>

        <div className="ai-summary-card">
          <FiZap />
          <h3>Best Next Move</h3>
          <p>{nextMove}</p>
        </div>

        <div className="ai-summary-card">
          <FiTarget />
          <h3>Focus Strategy</h3>
          <p>
            Use Focus Mode for 25 minutes and work only on the most important
            task.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AIAssistant