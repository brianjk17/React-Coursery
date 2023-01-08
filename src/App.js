//a react app using php and mysql to create a e-learning gamification webapp
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Redirect} from 'react-router-dom';
import './App.css';
import Home from './pages/index';
import SignIn from './pages/SignIn';
import Register from './pages/Register';

import Quiz from './components/Quiz/Quiz'
//import Question from './pages/'
import UserDashBoard from './pages/AdminDashboard';
import AddPage from './pages/AddPage';
import AddLesson from './components/AddLesson';
import AdminRealDashBoard from './pages/AdminRealDashboard';
import UpdateQuestion from './components/UpdateQuestion/UpdateQuestion';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/dashboard" element={<DashBoard />} /> */}
        <Route path="/userdashboard" element={<UserDashBoard />} />
        <Route path="/addquestion" element={<AddPage />} />
        <Route path="/addlesson" element={<AddLesson />} />
        <Route path="/admin" element={<AdminRealDashBoard/>} />
        {/* <Route path="/questions" element={<QuestionContent />} /> */}
        <Route path="/404" element={<ErrorPage />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/update" element={<UpdateQuestion />} />
      </Routes>
    </Router>
  );
}

export default App;
