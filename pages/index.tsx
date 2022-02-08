import { useEffect, useState } from "react";

export default function Home() {
  const date = new Date();
  const yy = date.getFullYear().toString().substring(2);
  const month = (date.getMonth() + 1).toString();
  const mm = month.length === 1 ? "0" + month : month;
  const day = date.getDate().toString();
  const dd = day.length === 1 ? "0" + day : day;
  const [userName, setUserName] = useState("ku.james");
  const [status, setStatus] = useState("home");
  const [company, setCompany] = useState("ktw");
  const [department, setDepartment] = useState("trd");
  // yymm.dd.[office|home|leave].[ktw/tbw/twm].[trd/mis/...]@username
  const logString = `${yy}${mm}.${dd}.${status}.${company}.${department}@${userName}`;
  useEffect(() => {
    const persistedStatus = localStorage.getItem("status");
    const persistedcompany = localStorage.getItem("company");
    const persistedDepartment = localStorage.getItem("department");
    const persistedUserName = localStorage.getItem("userName");

    if (persistedStatus) {
      setStatus(persistedStatus);
    }
    if (persistedcompany) {
      setCompany(persistedcompany);
    }
    if (persistedDepartment) {
      setDepartment(persistedDepartment);
    }
    if (persistedUserName) {
      setUserName(persistedUserName);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("status", status);
    localStorage.setItem("company", company);
    localStorage.setItem("department", department);
    localStorage.setItem("userName", userName);
  });

  return (
    <div>
      <h1>abw helper</h1>
      <select
        name="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="home">home</option>
        <option value="office">office</option>
        <option value="leave">leave</option>
      </select>
      <input
        type="text"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />
      <input
        type="username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <p>{logString}</p>
      <button
        onClick={() => {
          navigator.clipboard.writeText(logString);
        }}
      >
        copy
      </button>
    </div>
  );
}
