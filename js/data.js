var _puzzle_pieces=[
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0]
                  ];
var colors=[
            
            "#e42b2b",//red
            "#2bcdff",//"url('img/8.png') no-repeat 0 0/100% 100%",blue
            "#efff74",//yellow
            "#62ff6f",//green
            "#a95dec",//purple
            "#666",//"url('img/1.jpg') no-repeat 0 0/100% 100%",
            "#ff7070",//
            "#f8931d",//orange
            ];
var piece=function(r,c){
  var co=parseInt(Math.random()*8)
  this.color=colors[co];
  this.type=co;
  this.r=r;
  this.c=c;
  this.v=1;
}
var point=0;
var piece1=new piece(1,1)
var vm;
console.log(piece1)

//某个方块的周围是否需要消除
var needispel=function(r,c,a){
  var me=a[r][c];
  var myType=me.type;
  var rowS=[];
  var colS=[];
  var sameT={rowS:null,colS:null};
  r=parseInt(r);
  c=parseInt(c);
  //row
  for(var i=1;(c-i)>=0;i++){
    var p=a[r][c-i];
    if(p&&(p.constructor==piece)){if(p.type==myType){rowS[rowS.length]=p}else{break;}}
  }
  for(var i=1;(c+i)<8;i++){
    var p=a[r][c+i];      
    if(p&&(p.constructor==piece)){if(p.type==myType){rowS[rowS.length]=p}else{break;}}
  }
  for(var i=1;(r-i)>=0;i++){
    var p=a[r-i][c];   
    if(p&&(p.constructor==piece)){if(p.type==myType){colS[colS.length]=p}else{break;}}
  }
  for(var i=1;(r+i)<8;i++){
    var p=a[r+i][c]; 
    if(p&&(p.constructor==piece)){if(p.type==myType){colS[colS.length]=p}else{break;}}
  }

  if(rowS.length>=2){sameT["rowS"]=rowS.concat(me)}
  if(colS.length>=2){sameT["colS"]=colS.concat(me)}
      console.log(sameT)
    return sameT;

};

//是否死地图
var mapEnd=function(){

};
var creatPuzzle=function(){
            for(var r=0;r<_puzzle_pieces.length;r++){
              for(var c=0;c<_puzzle_pieces[r].length;c++){
                _puzzle_pieces[r][c]=new piece(r,c)
                if((needispel(r,c,_puzzle_pieces).rowS)||(needispel(r,c,_puzzle_pieces).colS)){c--;console.log(r+":"+c)}
              }
            }
            /*var r=Math.floor(Math.random()*51+205);
            var g=Math.floor(Math.random()*51+205);
            var b=Math.floor(Math.random()*51+205);
            return "rgb("+r+","+g+","+b+")"*/
          };
function isEmpty(value){
     if(value==null) return true;
     if(value=="null") return true;
     if(value==undefined) return true;
     if(value=='undefined') return true;
     if(value=='') return true;
     return false;
  }
creatPuzzle();