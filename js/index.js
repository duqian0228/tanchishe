$(function(){
	var bg=$(".bg");
	var height=$(window).height();
	bg.css("height",height);
	var open=$(".open");
	var btn=$(".btn");
	var time=0;
	var play=$(".list-play");
	var replay=$(".list-replay");
	play.on("click",function(){
		time=setInterval(move,100);
	})
	replay.on("click",function(){
		$(".she").removeClass("she");
		she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
		self={'0_0':true,'0_1':true,'0_2':true};
		time=setInterval(move,100);
	})
	open.eq(0).css("display","block");
	btn.eq(0).css("display","block")
		.on("click",function(){
			$(this).css("display","none");
			open.eq(0).css("display","none");
			open.eq(1).css("display","block");
			btn.eq(1).css("display","block")
				.on("click",function(){
					open.eq(1).css("display","none");
					btn.eq(1).css("display","none");
					$(".box").addClass("active");
					$(".button li").addClass("active");
				});
		});
	btn.eq(1).on("click",function(){
		$(".container").css("display","none");
	});
	for(var i=0;i<20;i++){
		for(var j=0;j<20;j++){
			// var r=Math.floor(Math.random()*155);
			// var g=Math.floor(Math.random()*155);
			// var b=Math.floor(Math.random()*155);
			// var color='rgba('+r+','+g+','+b+',0.5)'
			var block=$("<div>").addClass("block")
			.attr('id',i+'_'+j)
			// .css("background-color",color)
			.appendTo(".box");
		}
	}
	var she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
    var self={'0_0':true,'0_1':true,'0_2':true};
    function findDiv(x,y){
       return $('#'+x+'_'+y);   //通过id选出想要的block
    }

	direction='right';
	$(document).on('keyup',function(e){
		var setTab={'left':37,'top':38,'right':39,'bottom':40}
		var tab={37:'left',38:'top',39:'right',40:'bottom'};
		if(Math.abs(e.keyCode-setTab[direction])==2){
			return;
		}
		if(tab[e.keyCode]){
			direction=tab[e.keyCode];
		}
	})

	function move(){
		var jiutou=she[she.length-1];
		var xintou;
		if(direction=='left'){
			xintou={x:jiutou.x,y:jiutou.y-1}
		}
		if(direction=='top'){
			xintou={x:jiutou.x-1,y:jiutou.y}
		}
		if(direction=='right'){
			xintou={x:jiutou.x,y:jiutou.y+1}
		}
		if(direction=='bottom'){
			xintou={x:jiutou.x+1,y:jiutou.y}
		}
		if(self[xintou.x+'_'+xintou.y]){
			clearInterval(time);
			$(".container").css("display","block");
			open.eq(2).css("display","block");
			btn.eq(2).css("display","block")
				.on("click",function(){
					$(".she").removeClass("she");
					she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
					addShe();
					self={'0_0':true,'0_1':true,'0_2':true};
					$(".container").css("display","none");
					btn.eq(2).css("display","none");
					open.eq(2).css("display","none");
				});
			return;
		}

		if(xintou.x<0||xintou.x>19||xintou.y<0||xintou.y>19){
			clearInterval(time);
			$(".container").css("display","block");
			open.eq(2).css("display","block");
			btn.eq(2).css("display","block")
				.on("click",function(){
					$(".she").removeClass("she");
					she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
					addShe();
					self={'0_0':true,'0_1':true,'0_2':true};
					$(".container").css("display","none");
					btn.eq(2).css("display","none");
					open.eq(2).css("display","none");
				});
			return;
		}
		she.push(xintou);
		self[xintou.x+'_'+xintou.y]=true;
		$.each(she,function(i,v){
            findDiv(v.x,v.y).addClass('she');
        });

        if(xintou.x==food.x&&xintou.y==food.y){
			findDiv(food.x,food.y).removeClass('food');
			food=creatfood();
		}else{
			var weiba=she.shift();

			delete self[weiba.x+'_'+weiba.y];

			findDiv(weiba.x,weiba.y).removeClass('she');
		}
   	}
	function creatfood(){
		do{
			var x=Math.floor(Math.random()*20);
     		var y=Math.floor(Math.random()*20);
		}while(self[x+'_'+y]);
      
       	findDiv(x,y).addClass('food');
       	return {x:x,y:y};
    }
    var food=creatfood();
	function foodActive(){
		$(".food").toggleClass("food-active")
			.delay(500)
			.queue(function(){
				$(this).toggleClass("food-active")
					.dequeue();
			});
	}
	setInterval(foodActive,1000);
	function addShe(){
		$.each(she,function(i,v){
			findDiv(v.x,v.y).addClass('she');
		});
	}
   addShe();
});