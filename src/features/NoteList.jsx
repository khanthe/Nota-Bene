import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const NoteList = ({noteList}) => {

    const navigate = useNavigate();

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

    return (
        <>
            <div className="note-list">
                {noteList.length > 0 ? (
                    noteList.map((note) => (
                        <div key={note.id} className="note-item">
                            <div className="note-item-hoverlay" onClick={() => navigate(`/note/${note.id}`)}><a href={`/note/${note.id}`} className="btn">Open Note</a></div>
                            <div className="note-content">
                                <h2>{note.title || "(Untitled)"}</h2> 
                                {renderNoteContent(note)}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No notes available.</p>
                )}
            </div>
        </>

    )

}

NoteList.propTypes = {
    noteList: PropTypes.array.isRequired
}

export default NoteList;