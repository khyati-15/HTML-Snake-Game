var snake=[{x:250,y:250},{x:240,y:250},{x:230,y:250},{x:220,y:250},{x:210,y:250}];
var score=0;
var dx=10,dy=0;
var canvas=document.getElementById("GameArea");
var ctx=canvas.getContext('2d');
var food_x,food_y;
var directionchanging=false;
var temp;

main();
makeFood();

document.addEventListener("keydown", direction);

function main(){
	if(collide())
		return;
	
	else{
	setTimeout(function(){
		directionchanging=false;
		clearCanvas();
		drawFood();
		moveSnake();
		drawSnake();
		main();
	},100);
	drawSnake();
	}
}

function drawSnake(){
	snake.forEach(snakePart);
}

function snakePart(part){
	ctx.fillStyle='lightgreen';
	ctx.strokeStyle='darkgreen';
	ctx.fillRect(part.x,part.y,10,10);
	ctx.strokeRect(part.x,part.y,10,10);
}

function moveSnake(){
 const head={x:snake[0].x+dx , y:snake[0].y+dy};
	snake.unshift(head);
	if(snake[0].x===food_x && snake[0].y===food_y){
		score+=10;
		document.getElementById("score").innerHTML=score;
		makeFood();
	}
	else
	snake.pop();
	
	if(snake[0].x<0){
		 temp=500;
		for(var i=0;i<snake.length;i++){
			temp+=10;
			snake[i].x=temp;
		}
	}
	else if(snake[0].x>500){
		 temp=0;
		for(var i=0;i<snake.length;i++){
			temp-=10;
			snake[i].x=temp;
		}
	}
	else if(snake[0].y<0){
		temp=500;
		for(var i=0;i<snake.length;i++){
			temp+=10;
			snake[i].y=temp;
		}
	}
	else if(snake[0].y>500){
		temp=0;
		for(var i=0;i<snake.length;i++){
			temp-=10;
			snake[i].y=temp;
		}
	}
}

function clearCanvas(){
	ctx.fillStyle='lightgray';
	ctx.strokeStyle='darkgray';
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.strokeRect(0,0,canvas.width,canvas.height);
}

function direction(event){
	if(directionchanging)
		return;
	directionchanging=true;
	
	var key=event.keyCode;
	var goingup=(dy===-10);
	var goingleft=(dx==-10);
	var goingdown=(dy===10);
	var goingright=(dx===10);
	
	if(key===37 && !goingright){
			dx=-10;
			dy=0;
	}
	else if(key==38 && !goingdown){
		dx=0;
		dy=-10;
	}
	else if(key==39 && !goingleft){
		dx=10;
		dy=0;
	}
	else if(key==40 && !goingup){
		dx=0;
		dy=10;
	}
}

function makeFood(){
	food_x=generate_random(0,canvas.width-10);
	food_y=generate_random(0,canvas.height-10);
	snake.forEach(function(part){
		if(part.x===food_x && part.y===food_y)
			makeFood();
	})
}
	
function generate_random(min,max){
	return Math.round((Math.random()*(max-min)+min)/10)*10;
}

function drawFood() { 
	ctx.fillStyle = 'red';
	ctx.strokestyle = 'darkred';
	ctx.fillRect(food_x, food_y, 10, 10);
	ctx.strokeRect(food_x, food_y, 10, 10);
}

function collide(){
	for(var i=4;i<snake.length;i++){
		if(snake[0].x===snake[i].x && snake[0].y===snake[i].y)
			return true;
	}
	return false;
}