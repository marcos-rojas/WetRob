const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];
let adjustX = 28;
let adjustY = 10;

ctx.lineWidth = 3;

const mouse = {x: undefined, y: undefined, radius: 50 }

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

ctx.fillStyle = 'white';
ctx.font = '14px Verdana';
ctx.fillText('HUMEDAL', 10, 10);//text,xAxis,yAxis
const textCoordinates = ctx.getImageData(0, 0, 120, 120);//it returns info of each pixel of our data

window.addEventListener('resize', function () {
     textCoordinates = ctx.getImageData(0, 0, 120, 120);//it returns info of each pixel of our data
});

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 6) + 1;
        this.distance;
    }

    draw() {
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.strokeStyle = 'rgba(34,147,214,1)';
        ctx.beginPath();

        if (this.distance < mouse.radius - 5) {
            this.size = 7;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(this.x-3, this.y-3, this.size/2, 0, Math.PI * 2);
            ctx.arc(this.x+3, this.y+3, this.size/3, 0, Math.PI * 2);
        } else if (this.distance <= mouse.radius) {
            this.size = 6;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(this.x-2, this.y-2, this.size/2.5, 0, Math.PI * 2);
        } else {
            this.size = 4;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(this.x-1, this.y-1, this.size/2.5, 0, Math.PI * 2);
            }


        ctx.closePath();
        ctx.fill();
    }

    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        this.distance = distance;
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            //            this.size = 3;
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 10;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 10;
            }
        }
    }
}

function init() {
    particleArray = [];
    // for (let i = 0; i < 1000; i++) {
    //    let x = Math.random() * 500;
    //    let y = Math.random() * 500;
    //    particleArray.push(new Particle(x, y));
    // }
    // Here we can change separation and position with adjustX/Y+
    // it could be possible to change the text which need change in sizes
    for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
            if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
                let positionX = x + adjustX;
                let positionY = y + adjustY;
                particleArray.push(new Particle(positionX * 10, positionY * 10));
            }
        }
    }

}

init();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        particleArray[i].update();
    }
    //connnect();
    requestAnimationFrame(animate);
}

animate();

function connnect() {
    let opacityValue = 1;
    for (let a = 0; a < particleArray.length; a++) {
        for (let b = a; b < particleArray.length; b++) {
            let dx = particleArray[a].x - particleArray[b].x;
            let dy = particleArray[a].y - particleArray[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 14) {
                opacityValue = 1 - (distance / 14);
                ctx.strokeStyle = 'rgba(255,255,255,' + opacityValue + ')';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(particleArray[a].x, particleArray[a].y);
                ctx.lineTo(particleArray[b].x, particleArray[b].y);
                ctx.stroke();
            }
        }
    }
}

