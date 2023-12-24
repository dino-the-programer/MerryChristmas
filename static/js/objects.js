class World{
    constructor(screenWidth,screenHeight,style,...props) {
        this.raduis = (screenWidth / 2) * (screenHeight > screenWidth ? (screenHeight / screenWidth) : 1 / (screenHeight / screenWidth));
        this.pos = {
            x: screenWidth / 2,
            y: screenHeight + (this.raduis - screenHeight*0.30),
        };
        this.style = style;
        this.props = props;
        this.angle = 0;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.angle);
        drawMountain(ctx,this.raduis,this.props[2].startangle,this.props[2].stopangle,this.props[2].heightarr,this.props[2].mountainCol);
        ctx.fillStyle = this.style;
        ctx.beginPath();
        ctx.arc(0, 0, this.raduis, 0, 360 * Math.PI / 180);
        ctx.fill();
        this.props[0].array.forEach(tree => {
            drawTree(ctx, this.raduis, tree.angle, tree.height, this.props[0].treeColor, this.props[0].stemColor);
        });
        drawLake(ctx,this.raduis,this.props[1].waterCol,this.props[1].startangle,this.props[1].stopangle,this.props[1].deptarray);
        ctx.restore();
    }

    rotate(angle) {
        this.angle += angle;
    }
}
class treeCollection{
    constructor() {
        this.stemColor="black";
        this.treeColor="green";
        this.array = [];
    }
    add(angle, height) {
        this.array.push({ angle: angle, height: height });
    }
}

class Lake{
    constructor(startangle, stopangle, waterCol) {
        this.startangle = startangle;
        this.stopangle = stopangle;
        this.waterCol = waterCol;
        this.deptarray = [];
    }
    add(depth) {
        this.deptarray.push(depth);
    }
}

class Mountain{
    constructor(startangle, stopangle, mountainCol) {
        this.startangle = startangle;
        this.stopangle = stopangle;
        this.mountainCol = mountainCol;
        this.heightarr = [];
    }

    add(height) {
        this.heightarr.push(height);
    }
}

class Santa{
    constructor(div) {
        this.image = document.getElementById(div);
        this.pos = {
            x: Number(this.image.style.left.replace("px","")),
        }
    }

    move(ScreenWidth) {
        //console.log(this.pos.x);
        if (this.pos.x < -ScreenWidth*0.2) {
            this.pos.x = ScreenWidth*0.8;
        } else {
            this.pos.x -= 0.5;
        }
        this.image.style.left = String(this.pos.x) + "px";
    }
    
}

class StarCluster{
    constructor(screenHeight, screenWidth,minSize,maxSize, n) {
        this.screenHeight = screenHeight;
        this.screenWidth = screenWidth;
        this.minSize = minSize;
        this.maxSize = maxSize;
        this.n = n;
        this.colorSel = ["white", "pink", "lightblue","lightyellow"];
        this.starArray = [];
    }
    makeStars() {
        for (let i = 0; i < this.n; i++) {
            let obj = {
                x: Math.random() * this.screenWidth*2,
                y: Math.random() * this.screenHeight*2,
                radius: Math.random()*this.maxSize + this.minSize,
                color: Math.floor(Math.random() * this.colorSel.length),
                rmove:1,
            }
            this.starArray.push(obj);
        }
    };
    draw(ctx){
        this.starArray.forEach(star => {
            ctx.beginPath();
            ctx.fillStyle = this.colorSel[star.color];
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
        })
    }
    blink(ds) {
        this.starArray.forEach(star => {
            if (star.radius > this.maxSize) {
                star.radius = this.maxSize;
                star.rmove = -1;
            } else if (star.radius < this.minSize) {
                star.radius = this.minSize;
                star.rmove = 1;
            }
            star.radius += ds * star.rmove;
        })
    }
}



function drawTree(ctx, raduis, angle, height,leafcol,trunkcol) {
    ctx.beginPath();
    ctx.strokeStyle = trunkcol;
    ctx.fillStyle = leafcol;
    let width = height / 3.5;
    ctx.lineWidth = (height/width)/2;
    ctx.rotate(angle * Math.PI / 180);
    ctx.moveTo(0, raduis);
    ctx.lineTo(0, raduis + height);
    ctx.stroke();
    ctx.lineTo(-width*0.25, raduis + height * 0.75);
    ctx.lineTo(0, raduis + height * 0.75);
    ctx.lineTo(-width*0.5, raduis + height * 0.5);
    ctx.lineTo(0, raduis + height * 0.5);
    ctx.lineTo(-width*0.75, raduis + height * 0.25);
    ctx.lineTo(width * 0.75, raduis + height * 0.25);
    ctx.lineTo(0, raduis + height * 0.5);
    ctx.lineTo(width * 0.5, raduis + height * 0.5);
    ctx.lineTo(0, raduis + height * 0.75);
    ctx.lineTo(width * 0.25, raduis + height * 0.75);
    ctx.lineTo(0, raduis + height);
    ctx.rotate(-angle * Math.PI / 180);
    ctx.fill();

}


function drawLake(ctx, raduis, waterCol, startangle, stopangle, deptharray) {

    ctx.beginPath();
    ctx.fillStyle = waterCol;
    ctx.rotate(startangle * Math.PI / 180);
    ctx.moveTo(0, raduis);
    ctx.rotate(-startangle * Math.PI / 180);
    for (let i = 0; i < deptharray.length; i++){
        ctx.rotate(lerp(startangle, stopangle, i / deptharray.length) * Math.PI / 180);
        ctx.lineTo(0, raduis - deptharray[i]);
        ctx.rotate(-lerp(startangle, stopangle, i / deptharray.length) * Math.PI / 180);
    }
    ctx.arc(0, 0, raduis, 0, -(stopangle-startangle) * Math.PI / 180,true);
    ctx.fill();
}

function drawMountain(ctx,raduis,startangle,stopangle,heightarr,mountainCol) {
    ctx.beginPath();
        ctx.fillStyle = mountainCol;
        ctx.strokeStyle = "#fafafa";
        ctx.rotate(startangle * Math.PI / 180);
        ctx.moveTo(0, raduis + heightarr[0]);
        ctx.rotate(-startangle * Math.PI / 180);
        for (let i=1; i < heightarr.length; i++){
            ctx.rotate(lerp(startangle,stopangle,i/heightarr.length) * Math.PI / 180);
            ctx.lineTo(0, raduis + heightarr[i]);
            ctx.rotate(-lerp(startangle,stopangle,i/heightarr.length) * Math.PI / 180);
    }
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.fill();
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}