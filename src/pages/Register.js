import React, { useEffect, useState } from 'react';
import { Link as LinkRouter , useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import './Register.css';



const Register = () => {
    const navi = useNavigate();

    const page = () =>{
        window.location.href = '/signin';
    }

    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    const initialValues = { username: "", email: "" , password: ""};
    const initialerror={
        username : "Username is Required!",
        email : "Email is Required!",
        password : "Password is Required!"
    }
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState(initialerror);
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
        setFormErrors(validate(formValues));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);

        if(Object.keys(formErrors).length !== 0){
            console.log("form error");
        }
        else{
            const sendData = {
                username: formValues.username,
                email: formValues.email,
                password: formValues.password
            }

            console.log(sendData);
            axios.post('http://localhost/php/insert.php',sendData).then(res=>{
                
                if(res.data.data === 'invalid'){
                    alert('Invalid Input, username used or email used');
                }else{
                    alert('Register Success')
                    navi('/signin');
                }
            } )
            .catch(error => {
              console.log(error.response)
              alert('Invalid Input, username used or email used');
            })

        }
    }

    useEffect(()=>{
        console.log(formErrors);
        if(Object.keys(formErrors).length === 0 && isSubmit){
            console.log(formValues);
        }
        //setFormErrors(validate(formValues));
    })



    const validate = (values) => {
        const errors ={};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!values.username){
            errors.username = "Username is Required!";
        }
        if(!values.email){
            errors.email = "Email is Required!";
        } else if(!regex.test(values.email)){
            errors.email = "This is not a valid email format!";
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
                    <h1 className='labelLogin'>Register Form</h1>
                        <div className='field'>
                            <label>Username</label>
                            <input type="text" name="username" placeholder='Username' value={formValues.username} onChange={handleChange}/>
                        </div>
                        <p>{formErrors.username}</p>
                        <div className='field'>
                            <label>Email</label>
                            <input type="email" name="email" placeholder='Email' value={formValues.email} onChange={handleChange}/>
                        </div>
                        <p>{formErrors.email}</p>
                        <div className='field'>
                            <label>Password</label>
                            <input type="password" name="password" placeholder="Password" value={formValues.password} onChange={handleChange}/>
                        </div>
                        <p>{formErrors.password}</p>
                        <div className='con'>
                        <BtnLink to='/signin' >Login</BtnLink>
                        <Button>Register</Button>
                        </div>
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
  background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
  
`

const Container1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 881px;
  justify-content:center;
`

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width:25%;
  height: 700px;
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
export default Register;