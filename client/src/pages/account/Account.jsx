import React from "react";
import "./account.css";
import { UserData } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Account = ({ user }) => {
  const { setIsAuth, setUser } = UserData();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged Out");
    navigate("/login");
  };

  return (
    <div>
      {user && (
        <div className="profile">
          <h2>My Profile</h2>
          <div className="profile-content">
            <div className="profile-info">
              <p>
                <strong>Name - {user.name}</strong>
              </p>
              <p>
                <strong>Email - {user.email}</strong>
              </p>
            </div>
            <div className="profile-buttons">
              {user.role === "user" && (
                <button
                  onClick={() => navigate(`/${user._id}/dashboard`)}
                  className="account-btn"
                >
                  Dashboard
                </button>
              )}

              {user.role === "admin" && (
                <button
                  onClick={() => navigate(`/admin/dashboard`)}
                  className="account-btn"
                >
                  Admin Dashboard
                </button>
              )}

              <button onClick={logoutHandler} className="account-btn">
                LogOut
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
