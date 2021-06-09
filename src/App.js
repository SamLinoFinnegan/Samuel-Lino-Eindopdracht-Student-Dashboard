import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AllStudents from "./components/AllStudents";
import Student from "./components/Student";
import "./styles/index.css"
import winclogo from "../src/styles/winclogo.png"

const App = ({ data,
  handleChange,
  difficult,
  fun,
  bargraph,
  handleGraph,
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

  const names = data[0].map(item => item.first_name);
  const students = names.map(student => {
    return <Route
      path={`/${student}`}
      key={`/${student}`}>
      <Student
        data={data}
        tableData={tableData}
        name={`${student}`}
        handleChange={handleChange}
        difficult={difficult}
        fun={fun}
        handleChangeActive={handleChangeActive}
        handleData={handleData}
        chart={chart}
        sortBy={sortBy}
        sortData={sortData}
        handleStudent={handleStudent}
        multipleStudents={multipleStudents}
        setAllActive={setAllActive}
      />
    </Route>
  })

  return (
    <Router>
      <main className="App">
        <header onClick={setAllActive} className="main-header">
          <img class="img" src={winclogo} alt="Winc Logo"></img>
          <h1>STUDENT DASHBOARD</h1></header>
        <Switch>
          <Route path="/" exact>
            <AllStudents
              data={data}
              tableData={tableData}
              handleChange={handleChange}
              difficult={difficult}
              fun={fun}
              handleChangeActive={handleChangeActive}
              handleData={handleData}
              chart={chart}
              sortBy={sortBy}
              sortData={sortData}
              handleStudent={handleStudent}
              multipleStudents={multipleStudents}
              setAllActive={setAllActive}
            />
          </Route>
          {students}
        </Switch>
      </main>
    </Router>
  );
}

export default App;