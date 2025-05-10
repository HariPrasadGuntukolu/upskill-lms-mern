import React from "react";
import "./courseCard.css";
import { server } from "../../main";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { CourseData } from "../../context/CourseContext";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();
  const { fetchCourses } = CourseData;

  const deleteHandler = async (id) => {
    if (confirm("Are You Sure You Want To Delete This Course")) {
      try {
        const { data } = await axios.delete(`${server}/api/course/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        toast.success(data.message);
        fetchCourses();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="course-card">
      <img
        src={`${server}/${course.image}`}
        alt={course.title}
        className="course-image"
      />

      <div className="course-details">
        <h3>{course.title}</h3>
        <p>Instructor - {course.createdBy}</p>
        <p>Duration - {course.duration} Weeks</p>
        <p>Price - ₹ {course.price}</p>

        {isAuth ? (
          <>
            {user && user.role !== "admin" ? (
              user.subscription.includes(course._id) ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="card-btn"
                >
                  Study
                </button>
              ) : (
                <button
                  onClick={() => navigate(`/course/${course._id}`)}
                  className="card-btn"
                >
                  Get Started
                </button>
              )
            ) : (
              <button
                onClick={() => navigate(`/course/study/${course._id}`)}
                className="card-btn"
              >
                Study
              </button>
            )}
          </>
        ) : (
          <button onClick={() => navigate("/login")} className="card-btn">
            Get Started
          </button>
        )}

        {user && user.role === "admin" && (
          <button
            onClick={() => deleteHandler(course._id)}
            className="card-btn delete"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
