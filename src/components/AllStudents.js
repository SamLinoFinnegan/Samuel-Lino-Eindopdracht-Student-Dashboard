import React from "react";
import Chart from "./Chart";
import Nav from "./Nav";
import Options from "./Options";
import Table from "./Table";

const AllStudents = ({ data,
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
    multipleStudents,
    setAllActive
}) => {

    const studentNames = data.map(element => element.map(item => {
        return item.active ? `${item.first_name} ` : null;
    }));

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
        <div className="students">
            <Nav
                data={data}
                handleChangeActive={handleChangeActive}
                handleStudent={handleStudent}
                setAllActive={setAllActive}
            />
            <div className="info all-students">
                {studentNames[0]}
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

export default AllStudents;