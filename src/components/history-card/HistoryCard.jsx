import PropTypes from "prop-types";
import "./history-card.scss";
import { Card, Tag } from "antd";

const HistoryCard = ({ history, onClick }) => {
  return (
    <Card
      className="history-card"
      size="small"
      onClick={() => onClick(history)}
      bordered={false}
    >
      <div className="history-card__content">
        <Tag bordered={false}>{history?.method}</Tag>{" "}
        <span className="history-card__url">{history?.url}</span>
      </div>
    </Card>
  );
};

HistoryCard.propTypes = {
  history: PropTypes.object,
  onClick: PropTypes.func,
};

export default HistoryCard;
