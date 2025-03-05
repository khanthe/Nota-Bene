import { useState, useEffect } from "react";

const getFromLocalStorage = () => {
    const storedNotes = localStorage.getItem("notabene");
    return storedNotes ? JSON.parse(storedNotes) : [];
}

const saveNoteToLocalStorage = (notesArray) => {
    localStorage.setItem("notabene", JSON.stringify(notesArray));
}

const useNotes = () => {
    // Initialize state from localStorage
    const [notes, setNotes] = useState(getFromLocalStorage);

    // Effect to update notes in localStorage whenever notes state changes
    useEffect(() => {
        saveNoteToLocalStorage(notes);
    }, [notes]);

    // Function to add a new note or update an existing one
    const saveNote = (noteData, noteId) => {
        let updatedNotes = [...notes];

        if (noteId) {
            // Update existing note
            const index = updatedNotes.findIndex((note) => note.id === noteId);
            if (index !== -1) {
                updatedNotes[index] = noteData;
            }
        } else {
            // Add new note
            updatedNotes.push(noteData);
        }

        setNotes(updatedNotes);
    };

    // Function to delete a note
    const deleteNote = (noteId) => {
        const updatedNotes = notes.filter((note) => note.id !== noteId);
        setNotes(updatedNotes);
    };

    return { notes, saveNote, deleteNote };
};

export default useNotes;
