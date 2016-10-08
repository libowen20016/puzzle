var vm = new Vue({
        el: '#app',
        data: {
          planPrice:0,
          showdt:{},
          showModal: false,
          plans:[],
          plansList:[],
          detailCommon:[],
          detailPlane:{},
          color:null,
          utarget:"",
          utargetR:"",
          utargetC:"",
          puzzle_pieces:_puzzle_pieces,
          colors:colors,
          point:point,
        },
        methods: {
          showDetail:function(i){
              this.showModal = true;
          },
          
          closeCol:function(r1,c1,r2,c2){
            console.log(r1+":"+c1+","+r2+":"+c2)
            if(r1==r2){
              if((c1-c2)==1)return "-c1";
              if((c1-c2)==-1)return "c1"
            }
            if(c1==c2){
              if((r1-r2)==1)return "-r1";
              if((r1-r2)==-1)return "r1"
            }
            return false;
          },
          dispel:function(){

          },
          onclick_:function(e){
              if(!isEmpty(window.webkit)){//IOS
                 return false
              }else if(!isEmpty(window.vhswebview)){//安卓
                return false
              }else{//页面
                this.selected(e)
              }
          },
          selected:function(e){
            console.log(this.color)
            if(this.color){
              var eR=$(e.target).data("row")
              var eC=$(e.target).data("col")
              var uR=this.utargetR
              var uC=this.utargetC
              var piecemove=this.closeCol(this.utargetR,this.utargetC,$(e.target).data("row"),$(e.target).data("col"));
              var targetT=this.puzzle_pieces[eR][eC].type
              var utargetT=this.puzzle_pieces[this.utargetR][this.utargetC].type
              if(piecemove){
              if(piecemove=="r1"){
                $("#"+this.utarget).addClass("D")
                $(e.target).addClass("U")
              }else if(piecemove=="-r1"){
                $("#"+this.utarget).addClass("U")
                $(e.target).addClass("D")
              }else if(piecemove=="c1"){
                $("#"+this.utarget).addClass("R")
                $(e.target).addClass("L")
              }else if(piecemove=="-c1"){
                $("#"+this.utarget).addClass("L")
                $(e.target).addClass("R")
              }
              setTimeout(
                function(){
                  $(".piece_c").css("display","none");
                  $(".piece_c").css("display");
                  vm.puzzle_pieces[uR][uC].type=targetT;
                  vm.puzzle_pieces[eR][eC].type=utargetT;
                  var rowS=[]
                  var colS=[]
                  if(needispel(eR,eC,vm.puzzle_pieces).rowS){
                    rowS=rowS.concat(needispel(eR,eC,vm.puzzle_pieces).rowS);
                  }
                  if(needispel(eR,eC,vm.puzzle_pieces).colS){
                    colS=colS.concat(needispel(eR,eC,vm.puzzle_pieces).colS);
                  }
                  if(needispel(uR,uC,vm.puzzle_pieces).rowS){
                    rowS=rowS.concat(needispel(uR,uC,vm.puzzle_pieces).rowS);
                  }
                  if(needispel(uR,uC,vm.puzzle_pieces).colS){
                    colS=colS.concat(needispel(uR,uC,vm.puzzle_pieces).colS);
                  }
                  var sameT=rowS.concat(colS)
                  vm.point+=(100*sameT.length)
                  if(sameT.length>2){
                  $(".piece_c").attr("class","piece_c");
                  $(".piece_c").css("display","block");
                  $(".piece_c").css("display");
                    for(var i=0;i<sameT.length;i++){
                      var r=sameT[i].r
                      var c=sameT[i].c
                      $(".piece_c").css("display");
                      $("#piece_r"+r+"_c"+c).css('transform',"scale(0)")
                      $("#piece_r"+r+"_c"+c).css('-webkit-transform',"scale(0)")
                      vm.puzzle_pieces[r][c].v=0;
                    }
                    setTimeout(vm.changePuzzle,250);
                  }else{
                    vm.puzzle_pieces[uR][uC].type=utargetT;
                    vm.puzzle_pieces[eR][eC].type=targetT;
                    $(".piece_c").css("display","block");
                    $(".piece_c").css("display");
                    $(".piece_c").attr("class","piece_c");
                  }
                  vm.color=null;
                  vm.utarget=null;
                  vm.utargetR=null;
                  vm.utargetC=null;
                },250)

/*              var sameT=needispel(eR,eC,this.puzzle_pieces).concat(needispel(uR,uC,this.puzzle_pieces))

              if(sameT.length>2){
                setTimeout(
                function(){
                  $(".piece_c").css("display","none");
                  $(".piece_c").css("display");
                  $(".piece_c").attr("class","piece_c");
                  $(".piece_c").css("display","block");
                  vm.puzzle_pieces[uR][uC].type=targetT;
                  vm.puzzle_pieces[eR][eC].type=utargetT;
                  vm.color=null;
                  vm.utarget=null;
                  vm.utargetR=null;
                  vm.utargetC=null;
                },250)
                for(var i=0;i<sameT.length;i++){
                  $("#piece_r"+sameT[i].r+"_c"+sameT[i].c).addClass('dispel')
                  var r=sameT[i].r
                  var c=sameT[i].c
                  setTimeout(function(r,c){
                    $("#piece_r"+r+"_c"+c).css("display","none")}.bind(this,r,c),250)
                }
              }else{
              setTimeout(
                function(){
                  $(".piece_c").attr("class","piece_c");
                  vm.puzzle_pieces[uR][uC].type=utargetT;
                  vm.puzzle_pieces[eR][eC].type=targetT;
                  vm.color=null;
                  vm.utarget=null;
                  vm.utargetR=null;
                  vm.utargetC=null;
                },250)}*/
              //$("#"+this.utarget).css("background-color",$(e.target).css("background-color"))
              //$(e.target).css("background-color",this.color)
              }

            }
            $(".piece_c").removeClass('selected')
            $(e.target).addClass('selected')
            this.color=$(".piece_c.selected").css("background-color")
            this.utarget=$(".piece_c.selected").attr("id")
            this.utargetR=$(".piece_c.selected").data("row")
            this.utargetC=$(".piece_c.selected").data("col")            
          },
          changePuzzle:function(){
            var cha=[];//需要改变的信息
            var rowS=[]
            var colS=[]
            for(var r=0;r<_puzzle_pieces.length;r++){
              var col=-1;
              var n=0;
              for(var c=0;c<_puzzle_pieces[r].length;c++){
                if(_puzzle_pieces[r][c].v==0){
                  (col==-1)?(col=c):((col>c)&&(col=c));
                  n++;
                  _puzzle_pieces[r][c].v=1;
                }
              }
              (n!=0)&&(cha[cha.length]={"r":r,"col":col,"num":n})
            }
            console.log(cha)
            //重新赋值，和动画
            for(var i=0;i<cha.length;i++){
              for(var x=0;x<(8-cha[i].col);x++){
                var me=$("#piece_r"+cha[i].r+"_c"+(cha[i].col+x));
                me.css("display","none");
                me.css("display");
                $(".piece_c").attr("class","piece_c");
                me.css("transform","translate("+(cha[i].num*100)+"%)");//移动
                me.css("-webkit-transform","translate("+(cha[i].num*100)+"%)");
                

                //赋值

                
                if((cha[i].col+x)<=(7-cha[i].num)){
                  vm.puzzle_pieces[cha[i].r][(cha[i].col+x)].type=vm.puzzle_pieces[cha[i].r][cha[i].col+x+cha[i].num].type
                }else{
                  var np=new piece(1,1);
                  vm.puzzle_pieces[cha[i].r][(cha[i].col+x)].type=np.type

                }

                
                //落下
                
                me.css("display","block");
                me.css("display");
                me.css("transform","");
                me.css("transform","");
              }
            }
            for(var i=0;i<cha.length;i++){
              for(var x=0;x<(8-cha[i].col);x++){
                //是否需要消除
                var A=needispel(cha[i].r,(cha[i].col+x),vm.puzzle_pieces)
                //console.log(A)
                if(A.rowS){
                    rowS=rowS.concat(A.rowS);
                }
                if(A.colS){
                    colS=colS.concat(A.colS);
                }
              }
            }
            var sameT=rowS.concat(colS)
            if(sameT.length>2){
            setTimeout(function(){
                  vm.point+=(100*sameT.length);

                    for(var i=0;i<sameT.length;i++){
                      var r=sameT[i].r
                      var c=sameT[i].c
                      $(".piece_c").css("display");
                      $("#piece_r"+r+"_c"+c).css('transform',"scale(0)")
                      $("#piece_r"+r+"_c"+c).css('-webkit-transform',"scale(0)")
                      vm.puzzle_pieces[r][c].v=0;
                    }
                    setTimeout(vm.changePuzzle,300);
            },300);

                  }
            console.log(cha)
          },
          clearPuzzle:function(){
            for(var r=0;r<_puzzle_pieces.length;r++){
              for(var c=0;c<_puzzle_pieces[r].length;c++){
                vm.puzzle_pieces[r].$set(c,_puzzle_pieces[r][c])
              }
            }
          },
          
        }
      })
