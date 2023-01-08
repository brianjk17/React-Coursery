import {useState}from 'react'
import {SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarMenu, SidebarLink, SideBtnWrap, SidebarRoute} from './SidebarElement';
import { useNavigate } from "react-router-dom";


const Sidebar = ({isOpen, toggle}) => {
    const navi = useNavigate();
    const [name, setName] = useState(localStorage.getItem('name'));
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon/>
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink onClick={()=>{navi("/")}}>
                        Home
                    </SidebarLink>
                    <SidebarLink to='learn'>
                        Learn
                    </SidebarLink>
                    {name &&<SidebarLink onClick={()=>{
                                    if(localStorage.getItem("name")==="admin"){
                                        navi("/admin")
                                    }else{
                                        navi("/userdashboard")
                                    }
                                }}>DashBoard</SidebarLink>}
                </SidebarMenu>
                <SideBtnWrap>
                    { !name &&  
                    <SidebarRoute to='/signin'>Sign In</SidebarRoute>                  
                    }
                    {
                     name && <SidebarRoute onClick={()=>{localStorage.clear()}}to='/signin'>Log Out</SidebarRoute>
                    } 
                </SideBtnWrap>
            </SidebarWrapper>
        </SidebarContainer>
    )
}
export default Sidebar;
