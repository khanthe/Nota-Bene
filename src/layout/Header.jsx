import { Button, Modal } from "../components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    const openModal = () => {
        setModalOpen(true);
    }

    const handleCreateNote = (type) => {
        navigate("/note", { state: { noteType: type } }); 
        //navigate("/note"); 
        setModalOpen(false);
    };

    return (
        <>
            <header className="header full-width">
                <div className="inner-header">   
                        <h1><a href="/"><span className="ascii-logo">&#x2611;<span className="rotated">&#9999;</span></span>Nota Bene</a></h1>
                        <span className="subhead"><a href="/">Notes and lists, quick and easy</a></span>
                    <Button 
                        buttonClass="create-btn" 
                        onClick={openModal}>
                            <span className="btn-icon">[+]</span>Create Note
                    </Button>
                </div>
                {modalOpen && (
                    <Modal onClose={() => setModalOpen(false)} modalClass="create-note-modal">
                        <h2>What type of note do you want to make?</h2>
                        <Button onClick={() => handleCreateNote('list')}>List Note</Button>
                        <Button onClick={() => handleCreateNote('text')}>Text Note</Button>
                    </Modal>                    
                )}
            </header>
        </>
    )

}

export default Header;