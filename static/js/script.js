/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("renderCanvas");
const ScreenWidth = canvas.width = window.innerWidth;
const ScreenHeight = canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

//ctx.fillRect(ScreenWidth-100, ScreenHeight-100,100,100);
let treeCol = new treeCollection();
for (let i = 0; i < 80; i++){
    let maxHeight = ScreenHeight*0.08;
    let minHeight = ScreenHeight*0.05;
    treeCol.add(Math.random()*90+90, Math.random()*maxHeight+minHeight);
}

let lake = new Lake(185, 270, "lightblue");
for (let i = 0; i < 15; i++){
    lake.deptarray.push(Math.random() * 50 + 50);
}
lake.deptarray.push(0);


let mountain = new Mountain(270, 360, "brown");
let mountainRes = 20;
mountain.heightarr.push(0);
for (let i = 0; i < mountainRes; i++){
    mountain.heightarr.push(Math.random() * 100)
}
mountain.heightarr.sort()
let mountain2half = [];
for (let i = 0; i < mountainRes; i++){
    mountain2half.push(Math.random() *100)
}
mountain2half.sort();
mountain2half.reverse();
mountain.heightarr.push(...mountain2half);
mountain.heightarr.push(0);

let world = new World(ScreenWidth, ScreenHeight, "grey", treeCol, lake, mountain);


function animate(dt) {
    ctx.clearRect(0, 0, ScreenWidth, ScreenHeight);
    world.rotate((Math.PI / 180)*0.5);
    //world.angle = 225 * Math.PI / 180;
    world.draw(ctx);
    requestAnimationFrame(animate);
}

animate(0);


