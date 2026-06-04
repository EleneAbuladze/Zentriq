import { useEffect, useState } from "react"
import { FiPlay, FiPause, FiRotateCcw, FiZap, FiClock } from "react-icons/fi"

function FocusMode() {
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [sessions, setSessions] = useState(0)

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100

  useEffect(() => {
    if (!isRunning) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setIsRunning(false)
          setSessions((count) => count + 1)
          return 25 * 60
        }

        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isRunning])

  function toggleFocus() {
    setIsRunning(!isRunning)
  }

  function resetFocus() {
    setIsRunning(false)
    setTimeLeft(25 * 60)
  }

  return (
    <section className="focus-page">
      <div className="focus-hero">
        <div>
          <span>
            <FiZap />
            Deep Focus Mode
          </span>

          <h2>Protect your attention. Finish meaningful work.</h2>

          <p>
            Start a 25-minute focus session and remove distractions while Zentriq tracks your momentum.
          </p>
        </div>

        <div className="focus-hero-stat">
          <h3>{sessions}</h3>
          <p>Sessions</p>
        </div>
      </div>

      <div className="focus-layout">
        <div className="panel focus-timer-panel">
          <div
            className="focus-ring"
            style={{
              background: `radial-gradient(circle at center, #111827 58%, transparent 59%),
              conic-gradient(#38bdf8 0deg, #7c3aed ${
                progress * 3.6
              }deg, rgba(255,255,255,0.08) ${progress * 3.6}deg)`,
            }}
          >
            <div>
              <h1>
                {minutes}:{seconds < 10 ? "0" + seconds : seconds}
              </h1>
              <p>{isRunning ? "Focus running" : "Ready to focus"}</p>
            </div>
          </div>

          <div className="focus-actions">
            <button onClick={toggleFocus}>
              {isRunning ? <FiPause /> : <FiPlay />}
              {isRunning ? "Pause" : "Start Focus"}
            </button>

            <button className="secondary-action" onClick={resetFocus}>
              <FiRotateCcw />
              Reset
            </button>
          </div>
        </div>

        <div className="focus-side">
          <div className="focus-tip-card">
            <FiClock />
            <div>
              <h3>25 Minute Sprint</h3>
              <p>Work on one task only. No switching, no distractions.</p>
            </div>
          </div>

          <div className="focus-tip-card">
            <FiZap />
            <div>
              <h3>Best Use</h3>
              <p>Pick one high-priority task before starting the timer.</p>
            </div>
          </div>

          <div className="focus-tip-card">
            <FiPlay />
            <div>
              <h3>After Session</h3>
              <p>Take a short break, then start another focus sprint.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FocusMode