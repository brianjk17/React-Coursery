import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/index';
import Sidebar from '../Sidebar/index';
import { useNavigate } from "react-router-dom"
import './AdminProfile.css'
import axios from 'axios';

function AdminProfile() {
    // const[name,setName] = useState("");

    // setName(localStorage.getItem("name"));
    const navi = useNavigate();

    const [isOpen, setIsOpen] = useState(false)
    const [lesson, setLesson] = useState([])

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    useEffect(()=>{
      if(localStorage.getItem("name")==="admin"){
        fetch('http://localhost/php/fetchQuestion.php').then(response => {
        console.log(response);
        return response.json();
      }).then(result => {
        // Work with JSON data here
        console.log(result);
        setLesson(result);
      })    
      }else{
        navi("/404");
      }
    },[])
    
    const deletData = () => {
      const sendData = {QuizID: localStorage.getItem("id")}
      axios.post("http://localhost/php/deleteQuestion.php",sendData).then(response=>{
        console.log(response.data);
      })
    }

  return (
    <>
    <Sidebar isOpen={isOpen} toggle={toggle}/>
    <Navbar toggle={toggle}/>
    <div className='adminContainer'>
      <div className='first-container'>
        <div className='image-container'>
            <div className='label-container'>
              <label className='home'>Welcome Home,</label>
              <label className='name'>admin</label>
           </div>
        </div>
        <div className='lesson-container'>
            <div className='choose'>
              <label className='label-lesson'>Lesson</label>
              <button className='tombol' onClick={()=>
                {navi("/addLesson")}}>Add Quiz</button>
              <div className='table'>
                   {
                    lesson.map((info, key)=>{
                      return([
                        <div className='main'>
                                <label key = {key} className='bel'>{info.subject}</label>

                                <button onClick = {()=>{
                                  localStorage.setItem("id", info.QuizID);
                                  deletData();
                                  window.location.reload(false);
                                  }}  className='del'>Delete Quiz</button>

                                <button onClick = {()=>{
                                  localStorage.setItem("quizid", info.QuizID);
                                  navi("/update");
                                  }} className='del'>Modify Quiz</button>
                        </div>,
                        <div className='second-table'>
                        </div>
                      ])
                    })  
                  }
              </div>
            </div>
        </div>
      </div>
    </div>
    </>
  ) 
}

export default AdminProfile