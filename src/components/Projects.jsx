import { useState } from "react"
import { FiPlus, FiTrash2, FiEdit3, FiCheck, FiCalendar } from "react-icons/fi"

function Projects({ projects, setProjects }) {
  const [projectInput, setProjectInput] = useState("")
  const [editingIndex, setEditingIndex] = useState(null)
  const [editInput, setEditInput] = useState("")

  function addProject() {
    if (projectInput.trim() === "") return

    const newProject = {
      name: projectInput,
      progress: 0,
      status: "Planning",
      dueDate: "",
      color: "purple",
    }

    setProjects([newProject, ...projects])
    setProjectInput("")
  }

  function deleteProject(index) {
    setProjects(projects.filter((project, i) => i !== index))
  }

  function updateProgress(index, value) {
    const progress = Number(value)

    const updatedProjects = projects.map((project, i) => {
      if (i === index) {
        return {
          ...project,
          progress,
          status:
            progress === 100
              ? "Completed"
              : progress >= 50
              ? "Active"
              : progress > 0
              ? "Started"
              : "Planning",
        }
      }

      return project
    })

    setProjects(updatedProjects)
  }

  function startEdit(index, name) {
    setEditingIndex(index)
    setEditInput(name)
  }

  function saveEdit(index) {
    if (editInput.trim() === "") return

    const updatedProjects = projects.map((project, i) => {
      if (i === index) {
        return { ...project, name: editInput }
      }

      return project
    })

    setProjects(updatedProjects)
    setEditingIndex(null)
    setEditInput("")
  }

  return (
    <section className="projects-page">
      <div className="section-title section-row">
        <div>
          <h2>Projects</h2>
          <p>Track project progress, status and deadlines</p>
        </div>
      </div>

      <div className="project-create-bar">
        <input
          type="text"
          placeholder="Create new project..."
          value={projectInput}
          onChange={(event) => setProjectInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") addProject()
          }}
        />

        <button onClick={addProject}>
          <FiPlus />
          Add Project
        </button>
      </div>

      <div className="projects-grid-v2">
        {projects.map((project, index) => (
          <div className="project-card-v2" key={index}>
            <div className="project-card-header">
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
                  <h3>{project.name}</h3>
                )}

                <span className={`project-status project-${(project.status || "planning").toLowerCase()}`}>
                  {project.status || "Planning"}
                </span>
              </div>

              <div className="project-actions">
                {editingIndex === index ? (
                  <button onClick={() => saveEdit(index)}>
                    <FiCheck />
                  </button>
                ) : (
                  <button onClick={() => startEdit(index, project.name)}>
                    <FiEdit3 />
                  </button>
                )}

                <button
                  className="small-delete"
                  onClick={() => deleteProject(index)}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>

            <div className="project-progress-ring-wrap">
              <div
                className="project-progress-ring"
                style={{
                  background: `radial-gradient(circle at center, #111827 55%, transparent 56%),
                  conic-gradient(#38bdf8 0deg, #7c3aed ${
                    project.progress * 3.6
                  }deg, rgba(255,255,255,0.09) ${project.progress * 3.6}deg)`,
                }}
              >
                <strong>{project.progress}%</strong>
              </div>
            </div>

            <div className="project-progress">
              <div
                className="project-progress-fill"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>

            <div className="project-footer">
              <div>
                <FiCalendar />
                <span>{project.dueDate || "No deadline"}</span>
              </div>

              <span>{project.progress === 100 ? "Done" : "Active"}</span>
            </div>

            <input
              className="progress-slider"
              type="range"
              min="0"
              max="100"
              value={project.progress}
              onChange={(event) => updateProgress(index, event.target.value)}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects