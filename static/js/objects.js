class World{
    constructor(screenWidth,screenHeight,style,...props) {
        this.raduis = (screenWidth / 2) * (screenHeight > screenWidth ? (screenHeight / screenWidth) : 1 / (screenHeight / screenWidth));
        this.pos = {
            x: screenWidth / 2,
            y: screenHeight + (this.raduis - screenHeight / 2),
        };
        this.style = style;
        this.props = props;
        this.angle = 0;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.style;
        ctx.beginPath();
        ctx.arc(0,0, this.raduis, 0, Math.PI * 2);
        ctx.fillRect(0, -this.raduis, 100, 100);
        ctx.fill();
        ctx.restore();
    }

    rotate(angle) {
        this.angle = angle;
    }
}