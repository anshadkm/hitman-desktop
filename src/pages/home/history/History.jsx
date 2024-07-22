import { useFind } from "use-pouchdb";
import PropTypes from "prop-types";
import HistoryCard from "../../../components/history-card/HistoryCard";
import "./history.scss";

const History = ({ onRequestSelect }) => {
  
  const { docs: rows } = useFind({
    selector: {
      type: "history",
    },
    sort: [{'_id': 'desc'}]
  });

  const applyHistory = (history) => {
    onRequestSelect(history);
  };

  return (
    <div className="history">
      {rows.map((row) => (
        <HistoryCard history={row} key={row._id} onClick={applyHistory} />
      ))}
    </div>
  );
};

History.propTypes = {
  onRequestSelect: PropTypes.func,
};

export default History;
