import React from "react";
import {FaBars} from 'react-icons/fa'
import Image from '../../images/logo.png'
import{Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavBtnLink, NavBtn, Logo} from'../Navbar/NavbarElements';
const LoggedinNavbar = ({toggle}) =>{
    return (
        <Nav>
            <NavbarContainer>
                <NavLogo to='/'><Logo src={Image} alt="" />Coursery</NavLogo>
                <MobileIcon onClick={toggle}>
                    <FaBars />
                </MobileIcon>
                <NavMenu>
                    <NavItem>
                        <NavLinks to='home'>Home</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to='questions'>Questions</NavLinks>
                    </NavItem>
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to='/Home'>Log Out</NavBtnLink>
                </NavBtn>
            </NavbarContainer>
        </Nav>
    )
}

export default LoggedinNavbar;

