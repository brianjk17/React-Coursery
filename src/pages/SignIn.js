import React, { useEffect, useState } from 'react';
import { Link as LinkRouter , useNavigate } from "react-router-dom"
import styled from 'styled-components';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './SignIn.css';

const SignIn = () => {
    const navi = useNavigate();

    const page = () =>{
        window.location.href = "/register";
    }

    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    const initialValues = { username: "" , password: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        //alert(e.target)
        setFormValues({...formValues, [name]: value});
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      setFormErrors(validate(formValues));
      setIsSubmit(true);
      if(Object.keys(formErrors).length !== 0){
        console.log("form error");
      }else{
        console.log("accepted");
        const sendData = {
        username: formValues.username,
        password: formValues.password
        }
        console.log(sendData);

        axios.post('http://localhost/php/validate.php',sendData)
        .then(res=>{           
            if(res.data.data === 'invalid'){
                alert('Invalid User');
            }else{
                localStorage.setItem("name",sendData.username);
                if(localStorage.getItem("name") === "admin"){
                    alert('Sign in Success')
                    navi('/admin')
                }else{
                    alert('Sign in Success')
                    navi('/userdashboard');
                }
              
            }
        } )
        .catch(error => {
          console.log(error.response)
        })
      }
    }

    useEffect(()=>{
        console.log(formErrors);
        if(Object.keys(formErrors).length === 0 && isSubmit){
            console.log(formValues);
        }
    })

    const validate = (values) => {
        const errors ={};
        if(!values.username){
            errors.username = "Username is Required!";
        }
        if(!values.password){
            errors.password = "Password is Required!";
        }else if(values.password < 4){
            errors.password = "Password must be more than 4 characters!";
        }else if(values.password > 10){
            errors.password = "Password must not exceed than 10 chracters!"
        }
        return errors;
    }



  return (
      <Container>
          <Sidebar isOpen={isOpen} toggle={toggle}/>
          <Navbar toggle={toggle}/>
          <Container1>
              <Content>
              <form onSubmit={handleSubmit}>
                <h1 className='labelLogin'>Login Form</h1>
                {/* <div className='ui divided'></div>
                <div className='ui form'> */}
                <div className='field'>
                        <label>Username</label>
                        <input type="text" name="username" placeholder='Username' value={formValues.username} onChange={handleChange}/>
                    </div>
                    <p>{formErrors.username}</p>
                    <div className='field'>
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Password" value={formValues.password} onChange={handleChange}/>
                    </div>
                    <p>{formErrors.password}</p>
                    <div className='con'>
                        <Button>Login</Button>
                        <BtnLink  to='/register'>Register</BtnLink>
                    </div>
                {/* </div>  */}
            </form>
              </Content>  
          </Container1>
      </Container>
  );
}

const BtnLink = styled(LinkRouter)`
width: 50%;
display: flex;
justify-content: center;
align-items: center;
height: 50px;
border: 1px solid;
background: black;
border-radius: 25px;
font-size: 18px;
color: #e9f4fb;
font-weight: 700;
cursor: pointer;
outline: none;
margin: 10px;
text-decoration: none;

BtnLink:hover{
    border-color: #2691d9;
  transition: .5s;
}

@media only screen and (max-width: 400px){
    width:50%;
    font-size: 15px;
  }
`

const Button = styled.button`
width: 50%;
  height: 50px;
  border: 1px solid;
  background: black;
  border-radius: 25px;
  font-size: 18px;
  color: #e9f4fb;
  font-weight: 700;
  cursor: pointer;
  outline: none;
  margin: 10px;

  @media only screen and (max-width: 400px){
    width:50%;
    font-size: 15px;
  }
`

const Container = styled.div`
    margin: 0;
  padding: 0;
  height: 881px;
  
`

const Container1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
  height: 100%;
`

const Content = styled.div`
display: flex;
  justify-content: center;
  align-items: center;
    width:25%;
    height: 500px;
  background: white;
  border-radius: 10px;
  box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.05);

  @media only screen and (max-width: 1000px){
    width:60%;
    font-size: 10px;
  }

  @media only screen and (min-width: 1300px){
    width:30%;
    font-size: 20px;
  }

  @media only screen and (max-width: 500px){
    width:100%;
    font-size: 10px;
  }

`

export default SignIn;

