import React from "react";
import { Link, useHistory } from "react-router-dom";


const Nav = ({ data, handleChangeActive, handleStudent, setAllActive }) => {
    let history = useHistory();
    const getAmountOfStudents = array => {
        const students = array.map(element => element.map(item => item.active));
        const activeStudents = students.flat().filter(item => item === true);
        return (activeStudents.length / 56);
    }
    const getStudent = array => {
        const firstName = array.map(element => element.filter(item => {
            return item.active === true;
        })).flat()[0].first_name;
        return history.push(firstName);
    }
    const changeRoute = () => {
        if (getAmountOfStudents(data) === 1) {
            getStudent(data);
        } else if (getAmountOfStudents(data) === 0) {
            setAllActive()
        } else {
            history.push("/");
        }
    }
    const changeRouteAndActive = () => {
        changeRoute();
        return handleChangeActive;
    }

    const names = data[0].map(item => item);
    const students = names.map(student => {
        return <span key={`${student.id}`} className="student__item">
            <Link
                to={`/${student.first_name}`}
            >
                <li onClick={handleStudent}>
                    {student.first_name}
                </li>
            </Link>
            <input
                className="student-checkbox"
                type="checkbox"
                name="active"
                onChange={changeRouteAndActive()}
                checked={student.active}
            />
        </span>
    })

    return (
        <nav className="main-nav">
            <ul className="main-nav-ul">
                {students}
            </ul>
        </nav>
    )
}

export default Nav;