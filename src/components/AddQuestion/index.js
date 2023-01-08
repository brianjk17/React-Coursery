import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import axios from 'axios';
import { Link as LinkRouter , useNavigate } from "react-router-dom";

function AddQuestion() {
    const title = localStorage.getItem('title');
    const subject = localStorage.getItem('subject');

    const navi = useNavigate();

    const questions =
    {
		questionText: '',
		answer:'',
        choice2:'',
        choice3:'',
        choice4:'',
    };
    
    const [finished,setfinished] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [formValues, setFormValues] = useState(questions);
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    };

    const check = (formValues) =>{
        if(!formValues.questionText || !formValues.answer || !formValues.choice2 || !formValues.choice3 || !formValues.choice4){
            return false
        }
        return true;
    }

    const update=()=>{
        if (currentQuestion < 4) {
                setCurrentQuestion(currentQuestion+1);
                formValues.questionText="";
                formValues.answer="";
                formValues.choice2="";
                formValues.choice3="";
                formValues.choice4="";
        } else {
                setfinished(true);
                navi("/admin");
        }  
    }

    const handleSubmit=()=>{
        console.log("handlesbumit");
        setFormErrors(check(formValues));
        setIsSubmit(true);
        const sendData = {
            Question: formValues.questionText,
			answer: formValues.answer,
            choice2:formValues.choice2,
            choice3:formValues.choice3,
            choice4:formValues.choice4,
            QuizID: localStorage.getItem("quizID"),
        };
        console.log(sendData);
        axios.post('http://localhost/php/addQuestion.php',sendData)
        .then(res=>{      
            console.log(res.data);
            if(res.data.data === 'failed'){
                alert('Invalid input');
            }
        } )
        .catch(error => {
          console.log(error.response)
        })
        update();
    }

    useEffect(()=>{
        console.log(formErrors);
        if(Object.keys(formErrors).length === 0 && isSubmit){
            console.log(formValues);
        }
    })
    
    return (
        <Container>
            <ContainerOne>
                <QuizTitle>
                    <TitleProperty>Title: {localStorage.getItem("title")}</TitleProperty>
                </QuizTitle>
                <SubjectTitle>
                    <SubjectProperty>Subject: {localStorage.getItem("subject")}</SubjectProperty>
                </SubjectTitle>
            </ContainerOne>

        {finished ?(
            <>
                <h1>DONE</h1>
            </>    
        ):(
            <>
                <ContainerTwo>
                    <QuestionTotal>
                        <QuestionTotalProperty>Question {currentQuestion + 1} of 5</QuestionTotalProperty>
                    </QuestionTotal>
                    <Questions>
                        <QuestionsProperty type="text" name="questionText" placeholder="Questions" value={formValues.questionText} onChange={handleChange}/>
                    </Questions>
                </ContainerTwo>

                <ContainerThree>
                    <ContainerAnswers>
                        <AnswerOne>                
                            <Label>Answer</Label>
                            <AnswerProperty type="text" name="answer" placeholder="Answer" value={formValues.answer} onChange={handleChange}/>
                        </AnswerOne>
                        <AnswerTwo>               
                            <Label>choice 2</Label>
                            <AnswerProperty type="text" name="choice2" placeholder="Choice 2" value={formValues.choice2} onChange={handleChange}/>
                        </AnswerTwo>
                        <AnswerThree>
                            <Label>choice 3</Label>
                            <AnswerProperty type="text" name="choice3" placeholder="Choice 3" value={formValues.choice3} onChange={handleChange} />
                        </AnswerThree>
                        <AnswerFour>
                            <Label>choice 4</Label>
                            <AnswerProperty type="text" name="choice4" placeholder="Choice 4" value={formValues.choice4} onChange={handleChange}/>
                        </AnswerFour>
                    </ContainerAnswers>
                </ContainerThree>
                {check(formValues)&&<NextQuestion onClick={() => handleSubmit()}> Next Question </NextQuestion>}
            </>
    )}
    </Container>
  )
}

const Container = styled.div`
margin: 0;
padding: 0;
background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
height: 100vh;
overflow: hidden;

@media only screen and (max-width: 300px) {
    width: 50%;
    height: 50%;
};
`
const ContainerOne = styled.div`
    width: 100%;
    height: 25%;
    display: flex;
    justify-content: space-around;
    align-items: center;

`

const QuizTitle = styled.div`
    width: 25%;
    height: 100px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    
    
`
const TitleProperty = styled.div`
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media only screen and (max-width: 600px) {
        font-size: 15px;
        margin: 0;
    };
`

const SubjectTitle = styled.div`
width: 30%;
height: 100px;
background-color: white;
border-radius: 30px;
text-align: center;

display: flex;
justify-content: center;
align-items: center;
`

const SubjectProperty = styled.div`
font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media only screen and (max-width: 600px) {
        font-size: 15px;
        margin: 0;
    };
`
const ContainerTwo = styled.div`
width: 100%;
height: 25%;
display: flex;
justify-content: space-around;
align-items: center;
`
const QuestionTotal = styled.div`
width: 15%;
font-size: 20px;
height: 100px;
background-color: white;
border-radius: 30px;
display: flex;
justify-content: center;
    align-items: center;

    @media only screen and (max-width: 600px) {
        width: 30%;
        font-size: 15px;
        margin: 0;
    };

`
const QuestionTotalProperty = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Questions = styled.div`
width: 30%;
height: 150px;
background-color: white;

border-radius: 30px;
text-align: center;
display: flex;
justify-content: center;
    align-items: center;
    @media only screen and (max-width: 600px) {
        width: 50%;
        font-size: 15px;
        margin: 0;
    };
`
const QuestionsProperty = styled.textarea`
font-size: 18px;
width: 350px;
height: 100px;
border: none;
display: flex;
justify-content: center;
align-items: center;
`

const ContainerThree = styled.div`
width: 100%;
height: 25%;
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
`

const ContainerAnswers = styled.div`
width: 50%;
height: 100%;
background-color: white;
border-radius: 30px;
text-align: center;
@media only screen and (max-width: 600px) {
    width: 70%;
    font-size: 15px;
    margin: 0;
};
`
const AnswerOne = styled.div`
    width: 100%;
    height:25%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-style: none none solid none;
    border-radius: 30px 30px 0px 0px;
`
const AnswerTwo = styled.div`
    width: 100%;
    height:25%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-style: none none solid none;
`
const AnswerThree = styled.div`
    width: 100%;
    height:25%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-style: none none solid none;
`
const AnswerFour = styled.div`
width: 100%;
    height:25%;
    display: flex;
    justify-content: center;
    align-items: center;
    
    border-radius:  0px 0px 30px 30px ;
`
const Label = styled.label`
    width: 70px;
    margin-right: 50px;
    
    border-radius: 30px 30px 30px 30px;
    border-style: solid;
`
const NextQuestion = styled.button`
width: 25%;
height: 100px;
background-color: white;
color: black;

border-radius: 30px;
text-align: center;
display: flex;
justify-content: center;
    align-items: center;
    &:hover {
        background-color: orange;
        color: white;
    }
`
const AnswerProperty = styled.input`
    width: 40%;
    
`
const Check = styled.input`
    width: 40%;
    
`



const dark = "background-color: black"


export default AddQuestion