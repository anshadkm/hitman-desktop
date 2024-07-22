import History from "./History";
import HistoryToolbar from "./HistoryToolbar"

const Histories = ({ onRequestSelect }) => {
    return (<div className="histories">
        <HistoryToolbar/>
        <History onRequestSelect={onRequestSelect} />
    </div>)
}

export default Histories;