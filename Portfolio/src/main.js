
//defining constants
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];

//handle mouse
const mouse = {
    x: null,
    y: null,
    radius: 150
};
window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

//creating canvas gradient to fill the particles
const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
gradient.addColorStop('0.125', 'red');
gradient.addColorStop('0.25', 'orange');
gradient.addColorStop('0.375', 'yellow');
gradient.addColorStop('0.5', 'green');
gradient.addColorStop('0.625', 'turquoise');
gradient.addColorStop('0.75', 'blue');
gradient.addColorStop('0.875', 'violet');

//drawing the text
ctx.fillStyle = gradient;
ctx.font = '35px Trebuchet MS';
//text and position on canvas
ctx.fillText('Elysia Williams', 13, 70);
//scans 500x500 pixels of the text to find pixels with opacity
const textCoordinates = ctx.getImageData(0, 0, 500, 500);

//creating the particle class
class particle {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.size = 2.3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 50) + 5;
    }
    draw(){
        ctx.fillStyle = 'gradient' ;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update(){
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if(distance < mouse.radius){ 
            this.x -= forceDirectionX * 3;
            this.y -= forceDirectionY * 3;
        } else {
            if (this.x !== this.baseX){
                let dx = this.x - this.baseX;
                this.x -= dx * 0.1;
            }
            if (this.y !== this.baseY){
                let dy = this.y - this.baseY;
                this.y -= dy * 0.1;
            }
        }
    }
}

    function init() {
        particleArray = [];
        for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
            for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
                if (textCoordinates.data[(y * 4 * textCoordinates.width)
                    +(x * 4) + 3] > 128){
                    let positionX = x;
                    let positionY = y;
                    particleArray.push(new particle(positionX * 5,
                        positionY * 5 ));
                }
            }
        }
    }

    init();

//animating the particles
    function animate() {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        for (let i = 0; i < particleArray.length; i++){
            particleArray[i].draw();
            particleArray[i].update();
        }
        requestAnimationFrame(animate);
    };

animate();


let particleArray2 = [];

/*
class particle2 {
    constructor(x,y,size){
        this.x = x;
        this.y = y;
        this.size = size;
        this.density = (Math.random() * 1.5) + 1.5;
        this.directionX = Math.random() * 2;
    }
    update2(){
        this.y -= this.density;
        this.x += this.directionX;
        if (this.size >= 0.3) this.size -= 0.2;
    }
    draw2(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'orange';
        ctx.fill();
    }
}

const buttonElements = document.querySelectorAll('button');
let buttonMeasurements = [];
function measureButtons(){
    buttonMeasurements = [];
    buttonElements.forEach(button => {
        buttonMeasurements.push(button.getBoundingClientRect());
    })};
    measureButtons();

let activeButton = 0;
buttonElements.forEach(button => button.addEventListener('mouseenter', function(){
    activeButton = button.dataset.number;
}));
buttonElements.forEach(button => button.addEventListener('mouseleave', function(){
    activeButton = -1;
}));

function handleParticles(){
    for (let i=0; i < particleArray2.length; i++){
        particleArray2[i].update2();
        particleArray2[i].draw2();
        if (particleArray2[i].size <=1){
            particleArray2.splice(i, 1);
            i--;
        }
    }
}

function createParticle(){
    if (activeButton > -1){
        let size = Math.random() *40 +10;
        let x= Math.random() * buttonMeasurements[activeButton];
        let y = Math.random() * buttonMeasurements[activeButton];
        particleArray2.push(new particle(x, y, size));
    }
}
function animate2(){

    ctx.clearRect(0,0, canvas.width, canvas.height);
    createParticle();
    handleParticles();
    requestAnimationFrame(animate2);
}
animate2();
*/
