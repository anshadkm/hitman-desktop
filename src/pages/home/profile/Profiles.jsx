import PropTypes from "prop-types";
import ProfileToolbar from "./ProfileToolbar";
import { useFind } from "use-pouchdb";
import ProfileCard from "./ProfileCard";
import "./profile.scss";

const Profiles = ({onProfileChanged}) => {
  const { docs: profiles } = useFind({
    selector: {
      type: "profile",
      //method: { $exists: true },
    },
  });

  return (
    <div className="profile">
      <ProfileToolbar />
      <div className="profile__listing">
        {profiles.map((profile, idx) => (
          <ProfileCard key={idx} profile={profile} onClick={onProfileChanged} />
        ))}
      </div>
    </div>
  );
};

Profiles.propTypes = {};

export default Profiles;
