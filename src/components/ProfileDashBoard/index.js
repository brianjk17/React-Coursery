import { useState, useEffect  } from 'react';
import './ProfileDashBoard.css';
import Navbar from '../Navbar/index';
import image from "../../images/logo.png"
import { Link as LinkRouter , useNavigate } from "react-router-dom";
import Sidebar from '../Sidebar/index';
function ProfileDashBoard() {
  const navi = useNavigate();
  const [name, setName] = useState('')
  const [lesson,setLesson] = useState([]);

  const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

  useEffect(() => {
    setName(localStorage.getItem("name"))
    fetch('http://localhost/php/fetchQuestion.php').then(response => {
            console.log(response);
            return response.json();
          }).then(result => {
            // Work with JSON data here
            console.log(result);
            setLesson(result);
          })    
          },[])
    
  return (
    <>
    <Sidebar isOpen={isOpen} toggle={toggle}/>
    <Navbar toggle={toggle}/>
    <div className='profileContainer'>
      <div className='first-container'>
        <div className='image-container'>
          <img className='image' src={image} alt ="profile" />
            <div className='label-container'>
              <label className='home'>Welcome Home, {name}</label>
           </div>
        </div>
        <div className='lesson-container'>
            <div className='choose'>
              <label className='label-lesson'>Lesson</label>
              {lesson.map((info, key) => {
                return (<button key={key} className='tombol' onClick={()=>{
                  localStorage.setItem("quizID",info.QuizID)
                  navi("/quiz");
                }}>{info.title+", "+info.subject}</button>)   
              })}
            </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ProfileDashBoard