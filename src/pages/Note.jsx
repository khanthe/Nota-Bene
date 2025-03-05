//import Dashboard from "./Dashboard";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button, Modal, InputText } from "../components";
import { getFromLocalStorage, saveNoteToLocalStorage, deleteNoteFromLocalStorage} from "../utils/localStorageUtils";

const NotePage = () => {
    const { id } = useParams(); 
    const location = useLocation();
    const navigate = useNavigate();
    const [noteType, setNoteType] = useState(location.state?.noteType || "text");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [listItems, setListItems] = useState([]);
    const [status, setStatus] = useState("Active");
    const [loading, setLoading] = useState(true);  

    useEffect(() => {
        if (id) {
            const note = getFromLocalStorage(id);
            if (note) {
                setTitle(note.title);
                setStatus(note.status);
                if (note.type === "list") {
                    setListItems(note.listItems);
                    setNoteType("list");
                } else if (note.type === "text") {   
                    setContent(note.content);
                    setNoteType("text");
                }
            }
        }
        setLoading(false);
    }, [id]); 

    const handleClose = () => {
        if (title.length >= 1 || content.length >= 1 || listItems.length >= 1) {
            let noteData = {
                id: id || Date.now().toString(),
                title: title.trim(),
                content: content.trim(),
                listItems: listItems,
                type: noteType,
                status: status,
                lastModified: new Date().toISOString()
            }
            
            saveNoteToLocalStorage(noteData, id);

        }
        navigate("/");
    }

    const handleDelete = () => {
        deleteNoteFromLocalStorage(id);
        navigate("/");
    }

    const renderNoteContent = () => {
        if (noteType === "list" && listItems) {
            return (
                <ul className="list-note">
                    {listItems.map((item, index) => (
                        <li key={index}>
                            <Button 
                                buttonClass={`status-toggle ${item.status}`} 
                                onClick={() => {
                                    const newList = [...listItems];
                                    newList[index] = { 
                                        ...newList[index],
                                        status: item.status === "active" ? "complete" : "active"
                                    };
                                    setListItems(newList);
                                }}
                             />
                            <input 
                                type="text" 
                                value={item.content} 
                                className={item.status}
                                data-status={item.status}
                                onChange={(e) => {
                                    const newList = [...listItems];
                                    newList[index] = { 
                                        status: "active",
                                        content: e.target.value
                                    };
                                    setListItems(newList);
                                }}
                            />
                            <Button 
                                buttonClass="remove btn-secondary"
                                onClick={() => {
                                    const newList = [...listItems];
                                    newList.splice(index, 1);
                                    setListItems(newList);
                                }}
                             >X</Button>
                        </li>
                    ))}
                    <Button 
                        buttonClass="add-item btn-secondary"
                        onClick={() => setListItems([...listItems, {
                        status: "active",
                        content: ""
                    }])}><span className="btn-icon">[+]</span>Add Item</Button>
                </ul>
            ) 
        } else if (noteType === "text") {
            return (
                <textarea 
                    placeholder="Start typing your note..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            );
        }   
    };

    return (
        <>
            <Modal onClose={handleClose} modalClass="note">

                <InputText
                    inputClass="title"
                    maxLength="40"
                    placeHolderText="Title"
                    value={title}
                    onChangeFunc={(e) => setTitle(e.target.value)}
                />

                {/* {renderNoteContent()} */}
                {loading ? <p>Loading...</p> : renderNoteContent()}
                <div className="modal-footer">
                    <Button onClick={handleClose}>Save & Close</Button>
                    { id && <Button onClick={handleDelete} buttonClass="delete">Delete</Button> }
                </div>
            </Modal>              
        </>
    );
};

export default NotePage;