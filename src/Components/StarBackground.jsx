import React from 'react'
import { useState, useEffect } from 'react'


// id, size, x,y, opacity, animation duration
// id, size, x,y, delay, animation duration

const StarBackground = () => {
    const [stars, setStars]=useState([])
    const [Meteor, setMeteors]= useState([])

    useEffect(()=>{
        generateStars();
        generateMeteors();
        const handleResize=()=>{
            generateStars();

        }
        window.addEventListener('resize', handleResize)
        return()=>window.removeEventListener('resize', handleResize)
    },[])
    const generateStars=()=>{
        const numberOfStars= Math.floor(window.innerWidth *window.innerHeight/10000)

        const newStars=[]
    for(let i=0; i<numberOfStars; i++){
        newStars.push({
            id:i,
            size: Math.random()*3 +1,
            x:Math.random()*100,
            y:Math.random()*100,
            opacity:Math.random()*0.5+0.5,
            aminationDuration:Math.random() *4 +2,
        });
    };
        setStars(newStars)
    
    };
    const generateMeteors=()=>{
        const numberOfMeteors= 4;

        const newMeteor=[]
    for(let i=0; i<numberOfMeteors; i++){
        newMeteor.push({
            id:i,
            size: Math.random()*2 +1,
            x:Math.random()*100,
            y:Math.random()*20,
            delay:Math.random()*15,
            aminationDuration:Math.random() *3 +3,
        });
        setMeteors(newMeteor)
    };
    
    };
  return (
    <div className='fixed inset-0 overflow-hidden pointer-events-none z-0'>
        {stars.map((star)=>(
            <div key={star.id} className='star animate-pulse-subtle' style={{
                width: star.size + 'px',
                height:star.size + 'px' ,
                left:star.x +'%',
                top: star.y + '%',
                opacity: star.opacity,
                animationDuration: star.animationDuration + 's',
            }}/>

           
        ))}

             {Meteor.map((Meteor)=>(
            <div key={Meteor.id} className='meteor animate-meteor' style={{
                width: Meteor.size *50 + 'px',
                height:Meteor.size *3+ 'px' ,
                left:Meteor.x +'%',
                top: Meteor.y + '%',
                animationDelay: Meteor.delay,
                animationDuration: Meteor.animationDuration + 's',
            }}/>

           
        ))}
    </div>
  )
}

export default StarBackground