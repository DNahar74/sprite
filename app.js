let playerState = "idle";

const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.width = 600;
const canvasHeight = canvas.height = 600;
const spriteWidth = 575;
const spriteHeight = 523;

const playerImage = new Image();
playerImage.src = 'shadow_dog.png';

const spriteAnimations = [
    {name:'idle', frames:7 } ,
    {name:'jump', frames:7 } ,
    {name:'fall', frames:7 } ,
    {name:'run', frames:9 } ,
    {name:'dizzy', frames:11 } ,
    {name:'sit', frames:5 } ,
    {name:'roll', frames:7 } ,
    {name:'bite', frames:7 } ,
    {name:'ko', frames:12 } ,
    {name:'getHit', frames:4 } 
];

spriteAnimations.forEach((el, index)=>{
    el.location = [];
    for (let i = 0; i < el.frames; i++) {
        let loc = {};
        loc.X = i*spriteWidth;
        loc.Y = index*spriteHeight;
        el.location.push(loc);
    }
})

let index = spriteAnimations.findIndex((spriteAnimations) => spriteAnimations.name===playerState); 
//This is an arrow function where we aren't using {} because if we do, the we need to explicitly return true or false
let frame = spriteAnimations[index];

const dropDown = document.querySelector("#animations");

dropDown.addEventListener('change', (event)=>{
    playerState = event.target.value;
    index = spriteAnimations.findIndex((spriteAnimations) => spriteAnimations.name===playerState); 
    frame = spriteAnimations[index];
})

let gameFrame = 0;
let position = 0;
const staggerFrames = 7;

function animate() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    position = Math.floor(gameFrame / staggerFrames) % frame.frames;

    ctx.drawImage(playerImage, frame.location[position].X, frame.location[position].Y, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

    gameFrame++;
    requestAnimationFrame(animate);
};

animate();