import { useState } from "react"
import {
  FiPlus,
  FiTrash2,
  FiEdit3,
  FiCheck,
  FiStar,
  FiSearch,
  FiFileText,
} from "react-icons/fi"

function Notes({ notes, setNotes }) {
  const [noteInput, setNoteInput] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const [editingIndex, setEditingIndex] = useState(null)
  const [editInput, setEditInput] = useState("")

  function addNote() {
    if (noteInput.trim() === "") return

    const newNote = {
      text: noteInput,
      date: new Date().toLocaleDateString(),
      pinned: false,
    }

    setNotes([newNote, ...notes])
    setNoteInput("")
  }

  function deleteNote(index) {
    setNotes(notes.filter((note, i) => i !== index))
  }

  function togglePin(index) {
    const updatedNotes = notes.map((note, i) => {
      if (i === index) {
        return { ...note, pinned: !note.pinned }
      }

      return note
    })

    const sortedNotes = [...updatedNotes].sort((a, b) => b.pinned - a.pinned)
    setNotes(sortedNotes)
  }

  function startEdit(index, text) {
    setEditingIndex(index)
    setEditInput(text)
  }

  function saveEdit(index) {
    if (editInput.trim() === "") return

    const updatedNotes = notes.map((note, i) => {
      if (i === index) {
        return { ...note, text: editInput }
      }

      return note
    })

    setNotes(updatedNotes)
    setEditingIndex(null)
    setEditInput("")
  }

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchInput.toLowerCase())
  )

  const pinnedCount = notes.filter((note) => note.pinned).length

  return (
    <section className="notes-page">
      <div className="notes-hero">
        <div>
          <span>
            <FiFileText />
            Smart Notes
          </span>

          <h2>Capture ideas before they disappear.</h2>

          <p>
            Save quick thoughts, pin important ideas and search your notes instantly.
          </p>
        </div>

        <div className="notes-hero-stat">
          <h3>{notes.length}</h3>
          <p>Notes</p>
        </div>
      </div>

      <div className="notes-toolbar">
        <div className="notes-input-wrap">
          <input
            type="text"
            placeholder="Write a new note..."
            value={noteInput}
            onChange={(event) => setNoteInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") addNote()
            }}
          />

          <button onClick={addNote}>
            <FiPlus />
            Add Note
          </button>
        </div>

        <div className="notes-search">
          <FiSearch />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </div>
      </div>

      <div className="notes-stats">
        <div>
          <h3>{notes.length}</h3>
          <span>Total Notes</span>
        </div>

        <div>
          <h3>{pinnedCount}</h3>
          <span>Pinned</span>
        </div>

        <div>
          <h3>{filteredNotes.length}</h3>
          <span>Visible</span>
        </div>
      </div>

      <div className="notes-grid-v2">
        {filteredNotes.length === 0 && (
          <div className="empty-state">
            <h3>No notes found</h3>
            <p>Create a new note or try another search.</p>
          </div>
        )}

        {filteredNotes.map((note, index) => {
          const realIndex = notes.indexOf(note)

          return (
            <div
              className={`note-card-v2 ${note.pinned ? "pinned-note-v2" : ""}`}
              key={realIndex}
            >
              <div className="note-card-top">
                <div className="note-icon">
                  <FiFileText />
                </div>

                {note.pinned && (
                  <span className="pinned-badge">
                    <FiStar />
                    Pinned
                  </span>
                )}
              </div>

              {editingIndex === realIndex ? (
                <input
                  className="edit-input"
                  value={editInput}
                  onChange={(event) => setEditInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") saveEdit(realIndex)
                  }}
                />
              ) : (
                <p>{note.text}</p>
              )}

              <div className="note-card-footer">
                <span>{note.date}</span>

                <div className="note-actions-v2">
                  <button onClick={() => togglePin(realIndex)}>
                    <FiStar />
                  </button>

                  {editingIndex === realIndex ? (
                    <button onClick={() => saveEdit(realIndex)}>
                      <FiCheck />
                    </button>
                  ) : (
                    <button onClick={() => startEdit(realIndex, note.text)}>
                      <FiEdit3 />
                    </button>
                  )}

                  <button
                    className="small-delete"
                    onClick={() => deleteNote(realIndex)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Notes