import {useState} from "react";
import {FaBars} from 'react-icons/fa'
import Image from '../../images/logo.png'
import{Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavBtnLink, NavBtn, Logo} from'./NavbarElements';
import { Link as LinkRouter , useNavigate } from "react-router-dom";

const Navbar = ({toggle}) =>{
    const navi = useNavigate();
    const [name, setName] = useState(localStorage.getItem('name'));
    return (
        <>
        <Nav>
            <NavbarContainer>
                <NavLogo to='/'><Logo src={Image} alt="" />Coursery</NavLogo>
                <MobileIcon onClick={toggle}>
                    <FaBars />
                </MobileIcon>
                <NavMenu>
                    <NavItem>
                        <NavLinks onClick={()=>{navi("/")}} >Home</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to='learn'>Learn</NavLinks>
                    </NavItem>
                    <NavItem>
                        {
                            name && <NavLinks onClick={()=>{
                                    if(localStorage.getItem("name")==="admin"){
                                        navi("/admin")
                                    }else{
                                        navi("/userdashboard")
                                    }
                                }}>DashBoard</NavLinks>
                        }
                    </NavItem>
                </NavMenu>
                <NavBtn>
                    { !name &&  
                    <NavBtnLink to='/signin'>Sign In</NavBtnLink>                  
                    }
                    {
                     name && <NavBtnLink onClick={()=>{localStorage.clear()}}to='/signin'>Log Out</NavBtnLink>
                    }  
                </NavBtn>
            </NavbarContainer>
        </Nav>
        </>
    )
}

export default Navbar;

