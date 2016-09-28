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
          puzzle_pieces:puzzle_pieces,
          colors:colors,
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
                  vm.puzzle_pieces[uR][uC].type=targetT;
                  vm.puzzle_pieces[eR][eC].type=utargetT;
/*              if(piecemove=="r1"){
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
              }*/
              var sameT=needispel(eR,eC,this.puzzle_pieces).concat(needispel(uR,uC,this.puzzle_pieces))

              if(sameT.length>2){
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
                },250)}
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

          
        }
      })
