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
            drawTree(ctx, this.raduis, tree.angle, tree.height,"#234f42","#060f1f",4);
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

function drawTree(ctx, raduis, angle, height,leafcol,trunkcol,stemThickness) {
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
        ctx.strokeStyle = "brown";
        ctx.rotate(startangle * Math.PI / 180);
        ctx.moveTo(0, raduis + heightarr[0]);
        ctx.rotate(-startangle * Math.PI / 180);
        for (let i=1; i < heightarr.length; i++){
            ctx.rotate(lerp(270,360,i/heightarr.length) * Math.PI / 180);
            ctx.lineTo(0, raduis + heightarr[i]);
            ctx.rotate(-lerp(270,360,i/heightarr.length) * Math.PI / 180);
        }
        ctx.fill();
}
function lerp(a, b, t) {
    return a + (b - a) * t;
}