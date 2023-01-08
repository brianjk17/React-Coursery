import styled from 'styled-components';
import {Link as LinkRouter} from 'react-router-dom'

export const HomeButton = styled(LinkRouter)`
    width: 100%;
    font-size: 16px;
    color: #ffffff;
    background-color: #252d4a;
    border-radius: 15px;
    display: flex;
    padding: 5px;
    justify-content: center;
    align-items: center;
    border: 5px solid #234668;
    cursor: pointer;
    text-decoration: none;

    &:hover{
        transition: all 0.5s ease-in-out;
        background: #fff;
        color: #010606;
    }
`