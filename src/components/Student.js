import React from "react";
import Chart from "./Chart";
import Nav from "./Nav";
import Options from "./Options";
import Table from "./Table";

const Student = ({ data,
    name,
    handleChange,
    difficult,
    fun,
    handleChangeActive,
    handleData,
    chart,
    sortBy,
    sortData,
    tableData,
    handleStudent,
    setAllActive,
    multipleStudents
}) => {

    const studentData = data.map(item => item.find(element => element.first_name === name));

    const studentInfo = info => {
        return [...new Set(studentData.map(item => item[info]))]
    }

    const showChart = () => {
        if (chart === "Bargraph") {
            return <Chart
                data={data}
                multipleStudents={multipleStudents}
                handleChange={handleChange}
                difficult={difficult}
                fun={fun}
                bargraph={true}
            />
        } else if (chart === "Spreadsheet") {
            return <Table
                tableData={tableData}
                sortBy={sortBy}
                sortData={sortData}
            />
        } else {
            return <Chart
                data={data}
                multipleStudents={multipleStudents}
                handleChange={handleChange}
                difficult={difficult}
                fun={fun}
                bargraph={false}
            />
        }
    }

    return (
        <div className="student">
            <Nav
                data={data}
                handleChangeActive={handleChangeActive}
                handleStudent={handleStudent}
                setAllActive={setAllActive}
            />
            <div className="info">
                <span>
                    Name: {studentInfo("first_name")} {studentInfo("last_name")}<br />
                    Age: {studentInfo("age")}<br />
                    Tel: {studentInfo("phone")}<br />
                    E-mail: {studentInfo("email")}<br />
                </span>

                <img src={studentInfo("photo")} alt={studentInfo("first_name")} className="image" />
            </div>
            <Options
                handleChange={handleChange}
                difficult={difficult}
                fun={fun}
                handleData={handleData}
                chart={chart}
            />
            {showChart()}
        </div>
    )
}

export default Student;