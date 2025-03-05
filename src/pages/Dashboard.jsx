import NoteList from "../features/NoteList";
import GetStarted from "../features/GetStarted";
import { getFromLocalStorage } from "../utils/localStorageUtils";

const Dashboard = () => {

    let noteList = getFromLocalStorage();

    const showNotes = () => {
        if (noteList) {
            return <NoteList noteList={noteList} />;
        } else {
            return <GetStarted />;
        }
    }

    return (
        <>
            <div className="dashboard">
                {showNotes()}
            </div>
        </>
    )

}

export default Dashboard;