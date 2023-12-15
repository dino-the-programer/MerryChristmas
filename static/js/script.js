/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("renderCanvas");
const ScreenWidth = canvas.width = window.innerWidth;
const ScreenHeight = canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

//ctx.fillRect(ScreenWidth-100, ScreenHeight-100,100,100);

let world = new World(ScreenWidth, ScreenHeight, "grey");


function animate(dt) {
    ctx.clearRect(0, 0, ScreenWidth, ScreenHeight);
    //world.rotate((Math.PI / 180)*2);
    world.angle += (Math.PI / 180) * 0.5;
    world.draw(ctx);
    requestAnimationFrame(animate);
}

animate(0);



