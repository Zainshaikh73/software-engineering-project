import { useState, useEffect } from 'react';
import React from 'react'
import NAVV from './NAVV';
import axios from 'axios'
import Footer from './Footer';


const Home = () => {
    const [editingIndex, setEditingIndex] = useState(-1);
    const [array, setArray] = useState([])

    const [userName, setUserName] = useState(localStorage.getItem('userName') || 'user');
    const [postStyle, setPostStyle] = useState({
        "backgroundColor": "#1d2231",
        // "height": "100px",
        "margin": "5px",
        "marginLeft": "50px",
        "paddingBottom": "10px",
        "marginBottom": "20px",
        "borderBottom": "1px solid white"
    })
    useEffect(() => {
        console.log("data fetched")
        async function fetchData() {
            // console.log("reached")
            let res = await axios.get("http://localhost:4000/posts");
            // console.log(res.data)
            setArray(res.data)
          }
          fetchData();


          console.log(array)

    }, []); // Empty dependency array ensures it runs only once
    

    let style = {

        "body": {
            "height": "auto",
            "backgroundColor": "#1d2231",
        },

        "title": {
            "padding": "0",
            "margin": "0",
            "marginBottom": "10px",
            "fontSize": "20px",
            "backgroundColor": "#1d2231"
        },
        "content": {
            "backgroundColor": "#1d2231",
            "fontSize": "12px",
            "padding": "0",
            "margin": "0",
        },
        
    }


    // function editTitle(e) {
    //     const index = e.target.id; // Get the index of the item in the array
    //     const title = array[index].title; // Get the current title
    //     const text = prompt("", title); // Prompt for a new title

    //     if (text !== null) {
    //         setArray((prevArray) => {
    //             return prevArray.map((item, i) => {
    //                 if (i === index) {
    //                     return { ...item, title: text }; // Update the title of the specific item
    //                 }
    //                 return item; // Return other items unchanged
    //             });
    //         });
    //     }
    // } 


    

    function editTitle(e) {
        const updatedArray = [...array]; // Create a copy of the original array

        const index = e.target.id; // Get the index of the item in the array
        const title = updatedArray[index].title; // Get the current title
        const text = prompt("", title); // Prompt for a new title

        if (text !== null) {
            updatedArray[index] = { ...updatedArray[index], title: text }; // Update the title

            setArray(updatedArray); // Update the state with the modified array

            axios.post("http://localhost:4000/updateTitle", {data: updatedArray[index]})
        }
    }

     // State to track the index of the item being edited

    function editContent(index) {
        setEditingIndex(index);
    }

    function HandleBlur(index, e) {
        axios.post("http://localhost:4000/updateContent", {data: array[index], content: e.target.value})
        setEditingIndex(-1)
    }

    const handleBlogUpdate= async () => {

        let res = await axios.get("http://localhost:4000/posts");
            // console.log(res.data)
        setArray(res.data)
    }

    async function deleteBlog(index) {
        await axios.post("http://localhost:4000/deleteBlog", {post_id: array[index].post_id})

        handleBlogUpdate();
    }

    const handleUsernameUpdate = () => {        

        setUserName(localStorage.getItem('userName'));
        // window.location.reload();
      };

    function handleChange(index, e) {
        const updatedArray = [...array]; // Create a copy of the original array
        updatedArray[index].content = e.target.value; // Update the content of the item
        setArray(updatedArray); // Update the state with the modified array
    }

    return (
        <body style={style["body"]}>

            <NAVV onUsernameUpdate={handleUsernameUpdate} onBlogUpdate={handleBlogUpdate} />

            <div >

                {
                    array.map((value, index) => {

                        return (

                            <div style={postStyle} onMouseLeave={(a) => {
                                setPostStyle((a) => {
                                    const data = {
                                        ...a,
                                        "backgroundColor": "#1d2231",
                                    }
                                    return data;})
                            }} onMouseEnter={() => { 
                                
                                setPostStyle((a) => {
                                const data = {
                                    ...a,
                                    "backgroundColor": "rgba(206, 206, 206, 0.205)",
                                }
                                return data;
                            })}} >
                                <h5 style={style["title"]}>{value.title} <span id={index}  style={{ "fontSize": "15px", "cursor": "pointer", 'display': `${array[index].name}` == userName ? 'initial' : 'none' }} onClick={(e) => editTitle(e)} >✍</span> <span id='delete' onClick={() => deleteBlog(index)} style={{ "fontSize": "15px",'cursor': 'pointer' ,'display': `${array[index].name}` == userName ? 'initial' : 'none' }}>❌</span> </h5>
                                
                                
                                {
                                    editingIndex === index ? (
                                        <textarea
                                        type="text"
                                        value={value.content}
                                        onChange={(e) => handleChange(index, e)}
                                        onBlur={(e) => HandleBlur(index, e)}
                                        />
                                    ) : (
                                        <p style={style["content"]}>
                                            {value.content}
                                            <span
                                                id="content"
                                                style={{ "fontSize": "15px", "cursor": "pointer", "display": `${array[index].name}` == userName ? 'initial' : 'none' }}
                                                onClick={() => editContent(index)}
                                            >
                                                ✍
                                            </span>

                                            
                                        </p>
                                    )
                                }

                                <button style={{ "margin": "15px 0 5px 150px"}} >Enroll</button>

                            </div>


                        )

                    })
                }


            </div>


                <Footer />
        </body>


    )
}

export default Home