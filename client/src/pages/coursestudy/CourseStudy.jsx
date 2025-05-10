import React, { useEffect } from "react";
import "./coursestudy.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";

const CourseStudy = ({ user }) => {
  const params = useParams();
  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      user &&
      user.role !== "admin" &&
      !user.subscription.includes(params.id)
    ) {
      navigate("/");
    } else {
      fetchCourse(params.id);
    }
  }, []);

  return (
    <>
      {course && (
        <div className="course-study-page">
          <img src={`${server}/${course.image}`} alt={course.title} />
          <div className="course-study-details">
            <h2>{course.title}</h2>
            <h4>{course.description}</h4>
            <h5>By - {course.createdBy}</h5>
            <h5>Duration - {course.duration} Weeks</h5>
            <Link to={`/lectures/${course._id}`}>Go to Lectures</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseStudy;
