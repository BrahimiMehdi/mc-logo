import "./style.css";
const canvas = document.getElementById("canv");
const ctx = canvas.getContext("2d");
const CELL_SIZE = 30
canvas.height = 600;
canvas.width = 600;

class Cell {
  constructor(effect, x, y) {
    this.effect = effect;
    this.x = x;
    this.y = y;
    this.positionX = this.effect.width*0.5;
    this.positionY= this.effect.height*0.5;
    this.speedY;
    this.speedX;
    this.width = this.effect.cellWidth;
    this.height = this.effect.cellHeight;
    this.image = document.getElementById("image")
    this.random = Math.random() *20 +2
  }
  draw(context) {
    context.drawImage(this.image, this.x,this.y,this.width,this.height,this.positionX,this.positionY,this.width,this.height);
  }
  update(){
    this.speedX = (this.x - this.positionX) /this.random 
    this.speedY = (this.y - this.positionY)/this.random
    this.positionX += this.speedX
    this.positionY += this.speedY
  }
}
class Effect {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.cellWidth = this.width / CELL_SIZE;
    this.cellHeight = this.height / CELL_SIZE;
    this.imageGrid = [];
    this.createGrid();
  }
  createGrid() {
    for (let y = 0; y < this.height; y += this.cellHeight) {
      for (let x = 0; x < this.width; x += this.cellWidth) {
        this.imageGrid.push(new Cell(this, x, y));
      }
    }
  }
  render(context) {
    this.imageGrid.forEach((cell) => {
      cell.update()
      cell.draw(context);
    });
  }
}
const effect = new Effect(canvas);
function animate(){
  effect.render(ctx)
  requestAnimationFrame(animate)
}
animate()
