
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
        this.size =1.8;
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

