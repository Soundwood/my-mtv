import React, { useRef, useEffect } from 'react';
import Particle from './Particle'
import * as Constants from './Constants'

let particlesArray = []

const Background = () => {
    const canvasRef2 = useRef(null)
    
    useEffect(() => {
        const canvas = canvasRef2.current
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
                let color = Constants.PURPLE

                particlesArray.push(new Particle(x,y,directionX,directionY,size,color,ctx,width,height))
            }
        }
        function connect() {
            let inverseLineDensity = 12
            let opacity = 1
            for (let a=0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x-particlesArray[b].x)**2)+((particlesArray[a].y-particlesArray[b].y)**2)
                    if (distance < (canvas.width/inverseLineDensity) * (canvas.height/inverseLineDensity)) {
                        opacity = 1 - (distance/10000)
                        ctx.strokeStyle = `rgba(140,85,31,${opacity})`
                        ctx.lineWidth = 1
                        ctx.beginPath()
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
                        ctx.stroke()
                    }
                }
            }
        }
        function animate() {
            requestAnimationFrame(animate)
            ctx.clearRect(0,0,width,height)
            for (let i=0; i < particlesArray.length; i++) {
                particlesArray[i].update()
            }
            connect()
        }
        init()
        animate()
    }, [])
    return (
        <canvas id="canvas2" className="canvas2" ref={canvasRef2}/>
    );
};

export default Background;