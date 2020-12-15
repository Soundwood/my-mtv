import React, { useRef, useEffect } from 'react';
import Particle from './Particle'

let particlesArray = []

const Canvas = () => {
    const canvasRef = useRef(null)
    
    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        canvas.height = window.innerHeight
        canvas.width = window.innerWidth
        let height = canvas.height
        let width = canvas.width
        function init() {
            particlesArray = []
            let numberofParticles = (canvas.height * canvas.width) / 9000
            for (let i=0; i<numberofParticles; i++) {
                let size = (Math.random())+1
                let x = (Math.random()*((canvas.width-size*2)-(size*2))+size*2)
                let y = (Math.random()*((canvas.height-size*2)-(size*2))+size*2)
                let directionX = (Math.random()*5)-2.5
                let directionY = (Math.random()*5)-2.5
                let color = '#8c5523'

                particlesArray.push(new Particle(x,y,directionX,directionY,size,color,ctx,width,height))
            }
        }
        function animate() {
            requestAnimationFrame(animate)
            ctx.clearRect(0,0,width,height)
            for (let i=0; i < particlesArray.length; i++) {
                particlesArray[i].update()
            }
        }
        init()
        animate()
    }, [])
    return (
        <canvas id="canvas1" ref={canvasRef}/>
    );
};

export default Canvas;