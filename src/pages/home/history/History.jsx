import { useFind } from "use-pouchdb";
import PropTypes from "prop-types";
import HistoryCard from "../../../components/history-card/HistoryCard";
import "./history.scss";

const History = ({ onRequestSelectionChanged }) => {
  /*const { rows } = useAllDocs({
    include_docs: true, // Load all document bodies
  });*/

  const { docs: rows } = useFind({
    selector: {
      type: "history",
    },
  });

  const applyHistory = (history) => {
    onRequestSelectionChanged(history);
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
  onRequestSelectionChanged: PropTypes.func,
};

export default History;
