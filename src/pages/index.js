import React, {useState} from'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import HeroSection from '../components/HeroSection';
import InfoSection from '../components/infoSection';
import { homeObjOne, homeObjTwo} from '../components/infoSection/Data';

const Home = () => {
const [isOpen, setIsOpen] = useState(false)

const toggle = () => {
    setIsOpen(!isOpen)
}

    return (
        <>
        <Sidebar isOpen={isOpen} toggle={toggle}/>
        <Navbar toggle={toggle}/>
        <HeroSection /> 
        <InfoSection {...homeObjOne}/>
        <InfoSection {...homeObjTwo}/>
        </>
    )
}

export default Home