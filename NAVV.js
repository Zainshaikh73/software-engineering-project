import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import Register from './Register'
const NAVV = ({ onUsernameUpdate, onBlogUpdate }) => {

  const style = {

    "main": {
      // "fontFamily": "",
      "display": "flex",
      "justifyContent": "space-between",
      "width": "100vw",
      "paddingTop": "10px",
      "paddingBottom": "0",
      "boxSizing": "border-box",
      "margin": "0",
      "marginBottom": "50px",
      "paddingLeft": "50px",
      "paddingRight": "50px"
    },

    "title": {
      "display": "flex",
      "alignItems": "center",
      "fontSize": "20px",
      "fontWeight": "bolder"

    },

    "fields": {
      "width": "30%",
      "display": "flex",
      "justifyContent": "space-around",
      "cursor": "pointer"
    }

  }

  const [userName, setUserName] = useState(localStorage.getItem('userName') || 'Login');

  async function addBlog() {
    // console.log(e);
    // console.log(localStorage.getItem('authorId'))
    await axios.post("http://localhost:4000/addBlog", { title: 'add your event', content: 'description', author_id: localStorage.getItem('authorId') })

    // console.log("Going in blog update")
    onBlogUpdate()
  }


  async function handleClick(e) {

    const password = prompt("Enter password to login");
    // console.log(password)
    if (password == null) return
    if (password !== '') {
      const res = await axios.post("http://localhost:4000/validate", { password: password });


      if (res.data === '') {
        alert("Author Does not exist")
      } else {
        // console.log(res.data[0]);
        // if (!res.data[0].name) return
        localStorage.setItem('userName', res.data[0].name);
        localStorage.setItem('authorId', res.data[0].author_id);
        setUserName(res.data[0].name);
        onUsernameUpdate(res.data[0].name)
      }
    }
  }

  return (
    <div style={style["main"]}>

      <div style={style["title"]}>
          SOFTWARE ENGINEERING Project: Event Management System
      </div>
      <div style={style["fields"]}>
        <h5>Home</h5>
        {userName === "Login" ? <h5> <Link to="/register" style={{
          "cursor": "pointer", "textDecoration": "none", "color": "white", margin: "0", padding: '0'
        }} >Register</Link></h5> : ''}

        <h5> <Link style={{ "cursor": "pointer", "textDecoration": "none", "color": "white", margin: "0", padding: '0' }} to = "/login">{userName}</Link> </h5>
        {userName !== "Login" ? <h5 onClick={() => {localStorage.removeItem('userName');localStorage.removeItem('authorId');window.location.href = '/';}}>Logout</h5>: null}
        <h5 style={{ "cursor": "pointer", "display": `${userName}` !== "Login" ? 'initial' : 'none' }} onClick={() => addBlog()}>Add Event</h5>
      </div>

    </div>
  )
}

export default NAVV