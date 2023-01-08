import React, {useState} from 'react'
import Video from '../../video/backgroundImage.mp4';
import Image from '../../images/logo.png';
import {Button} from '../ButtonElement';
import { HeroContainer, HeroBg, VideoBg, HeroContent, HeroH1, HeroBtnWrapper, HeroP, ArrowForward, ArrowRight, HeroLogo} from './HeroElements';

const HeroSection = () =>{
    const[hover, setHover] = useState(false)

    const onHover = () => {
        setHover(!hover);
    }

    return (
        <HeroContainer>
            <HeroBg>
                <VideoBg autoPlay loop muted src={Video} type='video/mp4' />
            </HeroBg>
            <HeroContent>
                <HeroLogo src={Image} alt="" />
                <HeroH1>Coursery</HeroH1>
                <HeroH1>Make Study Easy</HeroH1>
                <HeroP>
                    Easily learn maths by just watching videos and do some excercise.
                </HeroP>
                <HeroBtnWrapper>
                    <Button to='learn' onMouseEnter={onHover} onMouseLeave={onHover}>
                        Get started {hover ? <ArrowForward /> : <ArrowRight />}
                    </Button>
                </HeroBtnWrapper>
            </HeroContent>
        </HeroContainer>
    )
}

export default HeroSection;