import React, { useEffect, useState } from 'react';
import AddQuestion from '../components/AddQuestion/index'
import { Link as LinkRouter , useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function AddPage() {
    const navi = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    
    const toggle = () => {
        setIsOpen(!isOpen)
    }
  return (
      <>
        <Sidebar isOpen={isOpen} toggle={toggle}/>
        <Navbar toggle={toggle}/>
        <AddQuestion />
      </>
    
  )
}

export default AddPage