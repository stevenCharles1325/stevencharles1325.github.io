class Board {
  constructor() {
    this.board = [
    ['','',''],
    ['','',''],
    ['','','']
    ];
    stroke(0);
    strokeWeight(10);
    for (let x = width / 3; x < width; x += width / 3) {
      line(x, 20, x, height-20);
    }
    for (let y = height / 3; y < height; y += height / 3) {
      line(20, y, width-20, y);
    }
  }
  
  drawCircle(x ,y){
    noFill();
    ellipse(x, y, 60, 60);
  }
  
  drawX(x, y){
    line(x-20, y-20, x+20, y+20);
    line(x+20, y-20, x-20, y+20);
  }
  
  getLocation(x, y){
    let center = null;
    if(x == 0 & y == 0){
      center = {'x': 66, 'y': 66};
    }
    else if(x == 1 && y == 0){
      center = {'x': 66, 'y': 200};
    }
    else if(x == 2 && y == 0){
      center = {'x': 66, 'y': 333};
    }

    // second row
    else if(x == 0 & y == 1){
      center = {'x': 200, 'y': 66};
    }
    else if(x == 1 && y == 1){
      center = {'x': 200, 'y': 200};
    }
    else if(x == 2 && y == 1){
      center = {'x': 200, 'y': 333};
    }

    // third row
    else if(x == 0 & y == 2){
      center = {'x': 333, 'y': 66};
    }
    else if(x == 1 && y == 2){
      center = {'x': 333, 'y': 200};
    }
    else if(x == 2 && y == 2){
      center = {'x': 333, 'y': 333};
    }
    return center;
  }


  drawWinLine(from, to){
    let x = this.getLocation(from[0], from[1]);
    let y = this.getLocation(to[0], to[1]);


    console.log(x);
    console.log(y);

    stroke('#d63031');

    line(x['x'], x['y'], y['x'], y['y']);
}


  drawTurn(turn, location){
    let x = location[0];
    let y = location[1];
    let center = this.getLocation(x, y);

    // first row
    

    // this is to check what should the program draw
    if (turn == 'X'){
      this.board[x][y] = 'X';
      this.drawX(center['x'], center['y']);  
    }
    else{
      this.board[x][y] = 'O';
      this.drawCircle(center['x'], center['y']); 
    }
  }

}