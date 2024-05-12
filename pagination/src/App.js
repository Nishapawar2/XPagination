import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [employees, setEmployees] = useState([]);
  const recordsPerPage=10;
  const [currentPage,setCurrentPage]=useState(1);
  const lastIndex=currentPage*recordsPerPage;
  const firstIndex=lastIndex-recordsPerPage;
  const records=employees.slice(firstIndex,lastIndex);
  const numberOfpages=Math.ceil(employees.length/recordsPerPage);
  const numbers=[...Array(numberOfpages+1).keys()].slice(1);
  useEffect(() => {
    axios
      .get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      )
      .then((res) => setEmployees(res.data))
      .catch(() => alert('failed to fetch data'))
  }, []);

  function prevPage(){
    if(currentPage!==1){
      setCurrentPage(currentPage-1);
    }
  }

  function nextPage(){
    if(currentPage!==numberOfpages){
      setCurrentPage(currentPage+1);
    }
  }


  return (
    <div className="App">      
        <h1>Employee Data Table</h1>
        <table className="empTable">
          <thead>
          <tr className="empHeading">
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
          </thead>
          <tbody>
          {records.map((emp) => {
            return (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.role}</td>
              </tr>
            );
          })}
          </tbody>
        </table>
        <div className="buttonDiv">
          <button onClick={prevPage}>Previous</button>
          <p>{currentPage}</p>
          <button onClick={nextPage}>Next</button>
        </div>
      
    </div>
  );
}

export default App;
