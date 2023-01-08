
import axios from 'axios';
import React, { useState } from 'react';
import './addLesson.css';
import { useNavigate } from "react-router-dom"

function AddLesson() {
    const navi = useNavigate()
    const initialValues= {title: "", subject: ""}
    const [formValues, setFormValues] = useState(initialValues);
    //const [id,setID] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const sendData = {
            title: formValues.title,
            subject: formValues.subject
        }

        axios.post('http://localhost/php/add.php',sendData).then(res=>{
            if(res.data.data === 'valid'){
                alert('Succcessfully added');
                localStorage.setItem("quizID", res.data.QuizID[0].QuizID)
                localStorage.setItem("title", formValues.title)
                localStorage.setItem("subject", formValues.subject)
                navi("/addquestion")
            }else{
                alert('Failed add');
            }
        })
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    };
    return (
        <div className="addLessonContainer">
            <div className='addform'>
                <form onSubmit={handleSubmit}>
                  <h1>Add Quiz</h1>
                  <div className='ui divided'></div>
                      <div className='field'>
                          <label>Title</label>
                          <input type="text" name="title" placeholder='Title' value={formValues.title} onChange={handleChange}/>
                      </div>
                      <div className='field'>
                          <label>Subject</label>
                          <input type="text" name="subject" placeholder='Subject' value={formValues.subject} onChange={handleChange}/>
                      </div>
                      <div className='con'>
                      <button className='ui button'>Add</button>
                      </div>
              </form>
            </div>    
        </div>  
    )
}

export default AddLesson