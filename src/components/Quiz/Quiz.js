import React, { useEffect, useState } from 'react';
import './Quiz.css';
import { HomeButton } from './QuizElements';
import axios from 'axios';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';

const Quiz = () =>{
	const [questions,setQuestions] = useState([]);
	const [ansOptions,setAnsOptions] = useState([]);
	const [currentQuestion, setCurrentQuestion] = useState(0);//integer of the index
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const [isOpen, setIsOpen] = useState(false)
	const [oneQuestion,setOneQuestion] = useState([]);//string of the question

	useEffect(()=>{
		console.log("use effect");
		const sendData = {
			QuizID: localStorage.getItem("quizID")
		}

		console.log(sendData);

		axios.post("http://localhost/php/fetchLesson.php", sendData)
		.then(res=>{
			console.log("TEST");
			setQuestions(res.data.quiz);
			var choices=([
				{answerText:  res.data.quiz[currentQuestion].answer, isCorrect: true},
				{answerText:  res.data.quiz[currentQuestion].choice2, isCorrect: false},
				{answerText:  res.data.quiz[currentQuestion].choice3, isCorrect: false},
				{answerText:  res.data.quiz[currentQuestion].choice4, isCorrect: false},
			]);
			setAnsOptions(randomArrayShuffle(choices));
			setOneQuestion(res.data.quiz[currentQuestion].Question);
		}).catch(error => {
			console.log(error.response)
		})
	},[])

	function randomArrayShuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;
		while (0 !== currentIndex) {
		  randomIndex = Math.floor(Math.random() * currentIndex);
		  currentIndex -= 1;
		  temporaryValue = array[currentIndex];
		  array[currentIndex] = array[randomIndex];
		  array[randomIndex] = temporaryValue;
		}
		return array;
	}

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
			var choices=([
				{answerText: questions[nextQuestion].answer, isCorrect: true},
				{answerText: questions[nextQuestion].choice2, isCorrect: false},
				{answerText: questions[nextQuestion].choice3, isCorrect: false},
				{answerText: questions[nextQuestion].choice4, isCorrect: false},
			]);
			setAnsOptions(randomArrayShuffle(choices));
			setOneQuestion(questions[nextQuestion].Question);
		} else {
			setShowScore(true);
		}
	};
	
    const toggle = () => {
        setIsOpen(!isOpen)
	};
	
	return (
		<>
			<Sidebar isOpen={isOpen} toggle={toggle}/>
            <Navbar toggle={toggle}/>

			<div className='body'>
				<div className='app'>
					{showScore? (
        		        <div className='score-section'>
							You scored {score} out of {questions.length}
        		            <HomeButton to="/userdashboard">Back to Dashboard</HomeButton>
						</div>
					) : (
						<>
							<div className='question-section'>
								<div className='question-count'>
									<span>Question {currentQuestion + 1}</span>/{questions.length}
								</div>
								<div className='question-text'>
									{oneQuestion}
								</div>
							</div>
							<div className='answer-section'>
								{ansOptions.map((ans,key)=>{return (
									<button key={key} onClick={()=>handleAnswerOptionClick(ans.isCorrect)}>
									 		{ans.answerText}
									</button>
								)})}
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
}

export default Quiz


