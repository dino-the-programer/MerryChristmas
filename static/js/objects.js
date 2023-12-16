class World{
    constructor(screenWidth,screenHeight,style,...props) {
        this.raduis = (screenWidth / 2) * (screenHeight > screenWidth ? (screenHeight / screenWidth) : 1 / (screenHeight / screenWidth));
        this.pos = {
            x: screenWidth / 2,
            y: screenHeight + (this.raduis - screenHeight*0.30),
        };
        this.style = style;
        this.props = props;
        this.angle = Math.PI;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.style;
        ctx.beginPath();
        ctx.arc(0,0, this.raduis, 0, Math.PI * 2);
        ctx.fill();
        this.props[0].array.forEach(tree => {
            drawTree(ctx, this.raduis, tree.angle, tree.height,"#234f42","#060f1f",4);
        });
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


function drawTree(ctx, raduis, angle, height,leafcol,trunkcol,stemThickness) {
    ctx.beginPath();
    ctx.strokeStyle = trunkcol;
    ctx.fillStyle = leafcol;
    ctx.lineWidth = stemThickness;
    let width = height / 3.5;
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