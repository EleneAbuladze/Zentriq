import { FiActivity, FiClock, FiZap } from "react-icons/fi"

function Activity({ activities }) {
  return (
    <section className="activity-page">
      <div className="activity-hero">
        <div>
          <span>
            <FiActivity />
            Workspace Timeline
          </span>

          <h2>Track every important action.</h2>

          <p>
            Your recent workspace updates, task movements and productivity actions in one place.
          </p>
        </div>

        <div className="activity-hero-stat">
          <h3>{activities.length}</h3>
          <p>Updates</p>
        </div>
      </div>

      <div className="activity-timeline">
        {activities.length === 0 && (
          <div className="empty-state">
            <h3>No activity yet</h3>
            <p>Your actions will appear here.</p>
          </div>
        )}

        {activities.map((activity, index) => (
          <div className="activity-timeline-item" key={index}>
            <div className="timeline-dot">
              <FiZap />
            </div>

            <div className="timeline-card">
              <div>
                <h3>{activity.text}</h3>
                <p>Workspace event</p>
              </div>

              <span>
                <FiClock />
                {activity.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Activity