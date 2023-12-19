import React from "react";
import { Users } from "../services/features/users/types/UsersInterface";
interface ProfileCardProps {
  user: Users | null;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="position-relative">
        <img src="/images/dots.png" className="card-img-top" alt="..." />
        <div className="position-absolute top-50 start-50 translate-middle">
          <img className="avatar rounded-circle" src={user?.avatar} alt="" />
        </div>
      </div>
      <div className="card-body">
        {/* Full Name */}
        <h3 className="fullname  text-center">{user?.fullname}</h3>

        {/* Country */}
        {user?.city || user?.country ? (
          <p className="city-country   text-center mb-1">
            {user?.city && user?.city}
            {user?.country && `${user?.city ? "," : ""} ${user?.country}`}
          </p>
        ) : null}

        {/* Jobs */}
        {user?.job ? <p className="job   text-center mb-1">{user?.job}</p> : null}
      </div>
    </div>
  );
};

export default ProfileCard;
