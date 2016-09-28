var puzzle_pieces=[
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0]
                  ];
var colors=["#e42b2b",//red
            "#2bcdff",//blue
            "#efff74",//yellow
            "#62ff6f",//green
            "#a95dec",//purple
            "#fff",//
            "#333",//
            "#f8931d",//orange
            ];
var piece=function(r,c){
  var co=parseInt(Math.random()*8)
  this.color=colors[co];
  this.type=co;
  this.r=r;
  this.c=c;
}

var piece1=new piece(1,1)
console.log(piece1)

//某个方块的周围是否需要消除
var needispel=function(r,c,a){
  var me=a[r][c];
  var myType=me.type;
  var rowS=[];
  var colS=[];
  var sameT=[];
  r=parseInt(r);
  c=parseInt(c);
  //row
  for(var i=1;(c-i)>=0;i++){
    var p=a[r][c-i];
    console.log(p.constructor==piece)
    if(p&&(p.constructor==piece)){console.log(11);if(p.type==myType){rowS[rowS.length]=p}else{break;}}
  }
  for(var i=1;(c+i)<8;i++){
    var p=a[r][c+i];
        console.log(p)
    if(p&&(p.constructor==piece)){if(p.type==myType){rowS[rowS.length]=p}else{break;}}
  }
  for(var i=1;(r-i)>=0;i++){
    var p=a[r-i][c];
        console.log(p)
    if(p&&(p.constructor==piece)){if(p.type==myType){colS[colS.length]=p}else{break;}}
  }
  for(var i=1;(r+i)<8;i++){
    var p=a[r+i][c];
        console.log(p)
    if(p&&(p.constructor==piece)){if(p.type==myType){colS[colS.length]=p}else{break;}}
  }
  if(rowS.length>=2){sameT=sameT.concat(rowS)}
  if(colS.length>=2){sameT=sameT.concat(colS)}
  if(sameT.length>=2){sameT=sameT.concat(me)}
    console.log(colS)
    console.log(rowS)
    return sameT;
};
var creatPuzzle=function(){
            for(var r=0;r<puzzle_pieces.length;r++){
              for(var c=0;c<puzzle_pieces[r].length;c++){
                puzzle_pieces[r][c]=new piece(r,c)
              }
            }
            /*var r=Math.floor(Math.random()*51+205);
            var g=Math.floor(Math.random()*51+205);
            var b=Math.floor(Math.random()*51+205);
            return "rgb("+r+","+g+","+b+")"*/
          };
creatPuzzle();