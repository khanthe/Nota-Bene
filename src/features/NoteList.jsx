import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const NoteList = ({noteList}) => {

    const navigate = useNavigate();

    const sortNotes = (notes) => {
        const pinned = [], active = [], archived = [];
    
        for (let note of notes) {
            if (note.status === "pinned") {
                pinned.push(note);
            } else if (note.status === "archived") {
                archived.push(note);
            } else {
                active.push(note);
            }
        }
    
        pinned.sort((a, b) => Date.parse(b.lastModified) - Date.parse(a.lastModified));
        active.sort((a, b) => Date.parse(b.lastModified) - Date.parse(a.lastModified));
        archived.sort((a, b) => Date.parse(b.lastModified) - Date.parse(a.lastModified));
    
        return { pinnedNotes: pinned, activeNotes: active, archivedNotes: archived };
    };

    const renderNoteContent = (note) => {  
        if (note.type === "list") {
            return (
            <ul>
                {note.listItems.map((item, index) => (
                    <li key={index} className={item.status}>{item.content}</li>
                ))}
            </ul>
            )
        } else {
            return (
            <p>{note.content}</p>
            )
        }
    }

    const renderNotes = (notes, category) => {
        if (notes.length === 0) return null;

        return (
            <>
                <div className={`note-list note-list-${category}`}>
                    {notes.map((note) => (
                        <div key={note.id} className="note-item">
                            <div className="note-item-hoverlay" onClick={() => navigate(`/note/${note.id}`)}>
                                <a href={`/note/${note.id}`} className="btn">Open Note</a>
                            </div>
                            <div className="note-content">
                                <h3>{note.title || "(Untitled)"}</h3>
                                {renderNoteContent(note)}
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    };

    const noteListSorted = sortNotes(noteList);

    return (
        <>
                    {noteListSorted.pinnedNotes.length !==0 && (
                        <h2>Pinned Notes</h2>
                    )}
                    {renderNotes(noteListSorted.pinnedNotes, 'pinned')}
                    {noteListSorted.activeNotes.length !==0 &&  (noteListSorted.pinnedNotes.length !==0 || noteListSorted.archivedNotes.length != 0) &&
                        <h2>Active Notes</h2>
                    }
                    {renderNotes(noteListSorted.activeNotes, 'active')}
                    {noteListSorted.archivedNotes.length !==0 && (
                        <h2>Archived Notes</h2>
                    )}
                    {renderNotes(noteListSorted.archivedNotes, 'archived')}
                    {noteListSorted.pinnedNotes.length === 0 && noteListSorted.activeNotes.length === 0 && noteListSorted.archivedNotes.length === 0 && (
                        <p>No notes available.</p>
                    )}
        </>

    )

}

NoteList.propTypes = {
    noteList: PropTypes.array.isRequired
}

export default NoteList;