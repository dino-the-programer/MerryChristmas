/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("renderCanvas");
const ScreenWidth = canvas.width = window.innerWidth;
const ScreenHeight = canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

//ctx.fillRect(ScreenWidth-100, ScreenHeight-100,100,100);
let treeCol = new treeCollection();
{
    let startAngle = 30;
    let stopAngle = 180;
    treeCol.treeColor = "#234f42";
    treeCol.stemColor = "#060f1f";
    for (let i = 0; i < 80; i++) {
        let maxHeight = ScreenHeight * 0.08;
        let minHeight = ScreenHeight * 0.05;
        treeCol.add(Math.random() * (stopAngle - startAngle + 1) + startAngle, Math.random() * maxHeight + minHeight);
        //treeCol.add(Math.random()*180, Math.random()*maxHeight+minHeight);
    }
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
    mountain.heightarr.push(Math.random() * 100);
}
mountain.heightarr.sort()
let mountain2half = [];
for (let i = 0; i < mountainRes; i++){
    mountain2half.push(Math.random() *100);
}
mountain2half.sort();
mountain2half.reverse();
mountain.heightarr.push(...mountain2half);
mountain.heightarr.push(0);

let world = new World(ScreenWidth, ScreenHeight, "#2a1010", treeCol, lake, mountain);

let starclustor = new StarCluster(ScreenWidth, ScreenHeight, 2000);
starclustor.makeStars();

let santa = new Santa("santa");




let previousTime=0
function animate(timestamp) {
    ctx.clearRect(0, 0, ScreenWidth, ScreenHeight);
    starclustor.draw(ctx);
    world.rotate((Math.PI / 180) * ((timestamp - previousTime) / ScreenWidth)*5);
    previousTime = timestamp;
    //world.angle = 225 * Math.PI / 180;
    world.draw(ctx);
    santa.move(ScreenWidth);
    //ctx.fillRect(0, 0, 512, 202);
    requestAnimationFrame(animate);
}

animate(0);


