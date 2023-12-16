/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("renderCanvas");
const ScreenWidth = canvas.width = window.innerWidth;
const ScreenHeight = canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

//ctx.fillRect(ScreenWidth-100, ScreenHeight-100,100,100);
let treeCol = new treeCollection();
//treeCol.add(Math.PI * 10, 100);
//treeCol.add(1, 200);
for (let i = 0; i < 80; i++){
    treeCol.add(Math.random()*180, Math.random()*50+50);
}
let world = new World(ScreenWidth, ScreenHeight, "grey", treeCol);


function animate(dt) {
    ctx.clearRect(0, 0, ScreenWidth, ScreenHeight);
    world.rotate((Math.PI / 180)*0.5);
    world.draw(ctx);
    requestAnimationFrame(animate);
}

animate(0);




