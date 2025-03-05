export const getFromLocalStorage = (noteId) => {
    const storedNotes = localStorage.getItem("notabene");
    const notesArry = storedNotes ? JSON.parse(storedNotes) : false; 

    if (noteId) {
        const note = notesArry.find((note) => note.id === noteId);
        return note || false;
    } else {
        return notesArry;
    }
}

export const saveNoteToLocalStorage = (noteData, noteId) => {
    const storedNotes = localStorage.getItem("notabene");
    let notesArry = storedNotes ? JSON.parse(storedNotes) : [];

    if (noteId) {
        const index = notesArry.findIndex((note) => note.id === noteId);
        if (index !== -1) {
            notesArry[index] = noteData;
        } else {
            notesArry.push(noteData);
        }
    } else {
        notesArry.push(noteData);
    }

    localStorage.setItem("notabene", JSON.stringify(notesArry));
}

export const deleteNoteFromLocalStorage = (noteId) => {
    const storedNotes = localStorage.getItem("notabene");
    let notesArry = storedNotes ? JSON.parse(storedNotes) : [];

    if (noteId) {
        const updatedNotesArry = notesArry.filter((note) => note.id !== noteId);
        localStorage.setItem("notabene", JSON.stringify(updatedNotesArry));
    }
}
