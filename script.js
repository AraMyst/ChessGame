const files = ['a','b','c','d','e','f','g','h'];
const unicodePieces = {
  white:{K:'♔',Q:'♕',R:'♖',B:'♗',N:'♘',P:'♙'},
  black:{K:'♚',Q:'♛',R:'♜',B:'♝',N:'♞',P:'♟︎'}
};

function inBounds(x,y){return x>=0&&x<8&&y>=0&&y<8;}
function algebraic(x,y){return files[x]+(8-y);}       
function coords(square){return [files.indexOf(square[0]), 8-Number(square[1])];}
function opposite(color){return color==='white'?'black':'white';}

class Piece{
  constructor(type,color,x,y){
    this.type=type;this.color=color;this.x=x;this.y=y;
  }
  get icon(){return unicodePieces[this.color][this.type];}

  moves(board){
    switch(this.type){
      case 'P': return pawnMoves(this,board);
      case 'N': return knightMoves(this,board);
      case 'B': return slideMoves(this,board,[[1,1],[1,-1],[-1,1],[-1,-1]]);
      case 'R': return slideMoves(this,board,[[1,0],[-1,0],[0,1],[0,-1]]);
      case 'Q': return slideMoves(this,board,
                    [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]);
      case 'K': return kingMoves(this,board);
    }
  }
}

function pawnMoves(p,board){
  const dir = p.color==='white'?-1:1, moves=[];
  const startRow = p.color==='white'?6:1;
 
  if(board.empty(p.x,p.y+dir)) moves.push([p.x,p.y+dir]);
  
  if(p.y===startRow && board.empty(p.x,p.y+dir) && board.empty(p.x,p.y+2*dir))
     moves.push([p.x,p.y+2*dir]);
 
  for(const dx of [-1,1]){
    const [nx,ny]=[p.x+dx,p.y+dir];
    if(inBounds(nx,ny) && board.enemyAt(p.color,nx,ny))
      moves.push([nx,ny]);
   
  }
  return moves;
}
function knightMoves(p,board){
  const deltas=[[1,2],[2,1],[2,-1],[1,-2],[-1,-2],[-2,-1],[-2,1],[-1,2]];
  return deltas
    .map(([dx,dy])=>[p.x+dx,p.y+dy])
    .filter(([x,y])=>inBounds(x,y) && !board.friendAt(p.color,x,y));
}
function slideMoves(p,board,dirs){
  const moves=[];
  for(const [dx,dy] of dirs){
    let x=p.x+dx,y=p.y+dy;
    while(inBounds(x,y)){
      if(board.empty(x,y)){moves.push([x,y]);}
      else{
        if(board.enemyAt(p.color,x,y)) moves.push([x,y]);
        break;
      }
      x+=dx;y+=dy;
    }
  }
  return moves;
}
function kingMoves(p,board){
  const moves=[];
  for(let dx=-1;dx<=1;dx++){
    for(let dy=-1;dy<=1;dy++){
      if(dx||dy){
        const [x,y]=[p.x+dx,p.y+dy];
        if(inBounds(x,y) && !board.friendAt(p.color,x,y))
          moves.push([x,y]);
      }
    }
  }
 
  return moves;
}

class Board{
  constructor(){
    this.grid = Array.from({length:8},()=>Array(8).fill(null));
    this.initPieces();
  }
  initPieces(){
    const order=['R','N','B','Q','K','B','N','R'];
    // black
    order.forEach((t,i)=>this.place(new Piece(t,'black',i,0)));
    for(let i=0;i<8;i++) this.place(new Piece('P','black',i,1));
    // white
    order.forEach((t,i)=>this.place(new Piece(t,'white',i,7)));
    for(let i=0;i<8;i++) this.place(new Piece('P','white',i,6));
  }
  piece(x,y){return this.grid[y][x];}
  empty(x,y){return !this.piece(x,y);}
  friendAt(color,x,y){const p=this.piece(x,y);return p && p.color===color;}
  enemyAt(color,x,y){const p=this.piece(x,y);return p && p.color!==color;}
  place(piece){this.grid[piece.y][piece.x]=piece;}
  remove(x,y){const p=this.piece(x,y);this.grid[y][x]=null;return p;}

  clone(){                       
    const b=new Board();
    b.grid=this.grid.map(row=>row.slice());
    return b;
  }
  movePiece(px,py,tx,ty){
    const piece=this.remove(px,py);
    const captured=this.remove(tx,ty);
    piece.x=tx;piece.y=ty;
    this.place(piece);
    return captured;
  }
  kingPos(color){
    for(let y=0;y<8;y++)for(let x=0;x<8;x++){
      const p=this.piece(x,y);
      if(p&&p.type==='K'&&p.color===color) return [x,y];
    }
  }
  isAttacked(x,y,byColor){
    for(let yy=0;yy<8;yy++)for(let xx=0;xx<8;xx++){
      const p=this.piece(xx,yy);
      if(p&&p.color===byColor){
        const moves=p.moves(this);
        if(moves.some(([mx,my])=>mx===x&&my===y)) return true;
      }
    }
    return false;
  }
  inCheck(color){
    const [kx,ky]=this.kingPos(color);
    return this.isAttacked(kx,ky,opposite(color));
  }
  anyLegalMoves(color){
    for(let y=0;y<8;y++)for(let x=0;x<8;x++){
      const p=this.piece(x,y);
      if(p&&p.color===color){
        const moves=p.moves(this);
        if(moves.some(([tx,ty])=>this.isLegalMove(p,x,y,tx,ty))) return true;
      }
    }
    return false;
  }
  isLegalMove(piece,px,py,tx,ty){
    if(!piece.moves(this).some(([mx,my])=>mx===tx&&my===ty)) return false;
    const clone=this.clone();
    clone.movePiece(px,py,tx,ty);
    return !clone.inCheck(piece.color);
  }
}

class Game{
  constructor(){
    this.board=new Board();
    this.turn='white';
    this.selected=null;
    this.captured={white:[],black:[]};
    this.status=document.getElementById('status');
    this.boardDiv=document.getElementById('board');
    this.whiteCap=document.getElementById('white-captured');
    this.blackCap=document.getElementById('black-captured');
    this.drawBoard();
  }
  drawBoard(){
    this.boardDiv.innerHTML='';
    for(let y=0;y<8;y++){
      for(let x=0;x<8;x++){
        const sq=document.createElement('div');
        sq.className=`square ${(x+y)%2?'dark':'light'}`;
        sq.dataset.x=x;sq.dataset.y=y;
        const p=this.board.piece(x,y);
        if(p) sq.textContent=p.icon;
        sq.addEventListener('click',()=>this.handleClick(x,y,sq));
        this.boardDiv.appendChild(sq);
      }
    }
  }
  refresh(){
    this.drawBoard();
    this.whiteCap.textContent=this.captured.black.map(p=>p.icon).join(' ');
    this.blackCap.textContent=this.captured.white.map(p=>p.icon).join(' ');
    const check=this.board.inCheck(this.turn) ? ' – CHECK!' : '';
    this.status.textContent=`${this.turn==='white'?'White':'Black'} to move${check}`;
  }
  handleClick(x,y){
    const p=this.board.piece(x,y);

    if(!this.selected){
      if(p && p.color===this.turn){
        this.selected=[p,x,y];
        this.highlightLegalMoves(p,x,y);
      }
      return;
    }

    if(p && p.color===this.turn){
      this.clearHighlights();
      this.selected=[p,x,y];
      this.highlightLegalMoves(p,x,y);
      return;
    }

    
    const [piece,px,py]=this.selected;
    if(this.board.isLegalMove(piece,px,py,x,y)){
      const captured=this.board.movePiece(px,py,x,y);
      if(captured) this.captured[piece.color].push(captured);
      this.afterMove();
    }
    this.clearHighlights();
    this.selected=null;
    this.refresh();
  }
  highlightLegalMoves(piece,px,py){
    this.clearHighlights();
    piece.moves(this.board).forEach(([tx,ty])=>{
      if(this.board.isLegalMove(piece,px,py,tx,ty)){
        const idx=ty*8+tx;
        this.boardDiv.children[idx].classList.add('highlight');
      }
    });
  }
  clearHighlights(){
    this.boardDiv.querySelectorAll('.highlight')
                 .forEach(el=>el.classList.remove('highlight'));
  }
  afterMove(){
    const opp=opposite(this.turn);
    if(!this.board.kingPos(opp)){
      alert(`Checkmate! ${this.turn} wins.`);
      location.reload();
    }else if(!this.board.anyLegalMoves(opp)){
      alert(`Game over! ${this.turn} delivers checkmate.`);
      location.reload();
    }else{
      this.turn=opp;
    }
  }
}

const game=new Game();
game.refresh();
