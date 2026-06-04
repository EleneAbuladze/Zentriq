import {
  FiZap,
  FiBarChart2,
  FiCheckSquare,
  FiCpu,
  FiArrowRight,
} from "react-icons/fi"

function LandingPage({ onEnter }) {
  return (
    <section className="landing-page">
      <nav className="landing-nav">
        <div className="landing-logo">
          <div>⚡</div>
          <span>Zentriq</span>
        </div>

        <button onClick={onEnter}>Open Workspace</button>
      </nav>

      <div className="landing-hero">
        <div className="landing-content">
          <div className="landing-pill">
            <FiZap />
            AI Productivity SaaS Dashboard
          </div>

          <h1>Organize your work with a smarter productivity workspace.</h1>

          <p>
            Zentriq combines tasks, projects, notes, analytics and AI insights
            into one premium SaaS-style command center.
          </p>

          <div className="landing-actions">
            <button onClick={onEnter}>
              Enter Workspace
              <FiArrowRight />
            </button>

            <button className="secondary-action">View Features</button>
          </div>

          <div className="landing-stats">
            <div>
              <h3>AI</h3>
              <span>Insights</span>
            </div>

            <div>
              <h3>10+</h3>
              <span>Features</span>
            </div>

            <div>
              <h3>100%</h3>
              <span>Responsive</span>
            </div>
          </div>
        </div>

        <div className="landing-preview">
          <div className="preview-top">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="preview-card main-preview">
            <FiBarChart2 />
            <div>
              <h3>Analytics Overview</h3>
              <p>Track productivity, projects and task progress.</p>
            </div>
          </div>

          <div className="preview-grid">
            <div className="preview-card">
              <FiCheckSquare />
              <h4>Tasks</h4>
              <strong>24</strong>
            </div>

            <div className="preview-card">
              <FiCpu />
              <h4>AI Score</h4>
              <strong>87%</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LandingPage