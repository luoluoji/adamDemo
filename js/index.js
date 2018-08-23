$(function(){
		function title(arr){
				for(var i = 0; i < arr.title_connect.length; i++){
				$('<li><a href="#">'+ arr.title_connect[i] +'</a></li>').appendTo('#title_connect ul');
					}
				$('.blue_ad').html(arr.blue_ad);
				for(var i = 0; i<arr.banner.length; i++){
					for(var key in arr.banner[i]){
						$("<div><img src="+ arr.banner[i][key] +" ></div>").appendTo('#banner_connect');
						$("<li></li>").appendTo('#banner_connect ul');
					}
				}
				for(var i = 0; i < arr.top_goods.length; i++){
					$('<div class="top_goods_pic"><a class="shadow" href="#"></a><img src='+ arr.top_goods[i] +' alt="" /></div>').appendTo($("#top_goods_connect"));
				}
				for(var i = 0; i < arr.hot_goods_box.length; i++){
					console.log(arr.hot_goods_box[i].name);
					$('#hot_goods_box').append($(`<a href="#"><div class="hot_box_connect">
							<div class="hot_box_connect_img"><img src=${arr.hot_goods_box[i].img} alt="" /></div>
							<div class="hot_box_connect_h4"><h4>${arr.hot_goods_box[i].name}</h4></div>
							<div class="hot_box_connect_h6"><h6>${arr.hot_goods_box[i].title}</h6></div>
							<div class="hot_box_connect_icon"></div>
							<div class = "price">
								<div class="discount-price"><span>¥</span><span>${arr.hot_goods_box[i].price}</span></div>
								<div class="original-price"><span>¥</span><span>${arr.hot_goods_box[i].originalPrice}</span></div>
							</div>
						</div></a>`));	
						for(var j = 0; j < arr.hot_goods_box[i].color.length; j++){
							($(`<div class="hot_box_connect_btn">
							<div class="hot_box_connect_in"></div>
							</div>`)).appendTo($(".hot_box_connect_icon")[i]);
							
							$(".hot_box_connect_icon").eq(i).find($(".hot_box_connect_in")).eq(j).css('background',arr.hot_goods_box[i].color[j]).attr('title',arr.hot_goods_box[i].color[j]);
						}
							$('.hot_box_connect_icon').find('.hot_box_connect_btn:first').addClass('active');
				}		
				var oWidth = $('.hot_box_connect').outerWidth() * $('.hot_box_connect').length;
				$('#hot_goods_box').css('width',oWidth);
				/*for(var i = 0; i < arr.color.length; i++){
					
				}*/
			}
		$.ajax({
 			url: 'code/index.json',
 			success: function(arr){
 				title(arr);
 			},
 			error: function(msg){
 				console.log(msg);
 			}
 		})
		.done(function(){
			$('#banner_connect li:first').attr('class',"active");
			$('#banner_connect li').click(function(){
				$(this).attr('class',"active");
				$(this).siblings().attr('class',"");
				$('#banner_connect div').eq($(this).index()).siblings('div').animate({opacity: 0},1000);
				$('#banner_connect div').eq($(this).index()).animate({opacity: 1},1000);
				});
			$('#hot_goods_tit .left').click(function(){
				$('#hot_goods_tit .left').attr('id','');
				$('#hot_goods_tit .right').attr('id','');
				var left_1 = $('#hot_goods_box').offset().left + $('.hot_box_connect').width()*4 - 101;
				if(left_1 > 0){
					left_1 = 0;
					$('#hot_goods_tit .left').attr('id','active_left');
				}
				$('#hot_goods_box').stop().animate({left:left_1}, 200 );

			})
			$('#hot_goods_tit .right').click(function(){
				$('#hot_goods_tit .left').attr('id','');
				$('#hot_goods_tit .right').attr('id','');
				var right_1 = $('#hot_goods_box').offset().left - $('.hot_box_connect').width()*4 - 101;
				if(right_1 < -$('#hot_goods_box').width() + $('.hot_box_connect').width()*4){
					right_1 = -$('#hot_goods_box').width() + $('.hot_box_connect').width()*4;
					$('#hot_goods_tit .right').attr('id','active_right');
				}
				$('#hot_goods_box').stop().animate({left:right_1}, 200 );
				console.log(right_1);
				console.log()
			})
			$('#hot_goods_box a').hover(function(){
				var that = $(this);
				var index = $(this).index();
				//alert(index);
				$.ajax({
		 			url: 'code/index.json',
		 			success: function(arr){
		 				//alert(index);
		 				that.find('.hot_box_connect_h6').html(arr.hot_goods_box[index].hover[0].black[1]);
		 				that.find('.price').html('<div class="price_icon">查看详情</div>');
		 				
		 			},
		 			error: function(msg){
		 				console.log(msg);
		 			}
		 		})
				
			},function(){
				var that = $(this);
				var index = $(this).index();
				//alert(index);
				$.ajax({
		 			url: 'code/index.json',
		 			success: function(arr){
		 				//alert(index);arr.hot_goods_box[i].title
		 				that.find('.hot_box_connect_h6').html(arr.hot_goods_box[index].title);
		 				that.find('.price').html(`<div class="discount-price"><span>¥</span><span>${arr.hot_goods_box[index].price}</span></div>
								<div class="original-price"><span>¥</span><span>${arr.hot_goods_box[index].originalPrice}</span></div>`);
		 				
		 			},
		 			error: function(msg){
		 				console.log(msg);
		 			}
		 		})
			})
		$('#hot_goods_box').on('mouseover','.hot_box_connect_btn',function(){
			var that = $(this);
			var color = $(this).find('.hot_box_connect_in').attr('title');
			var index = $(this).parents('a').index();
			$.ajax({
		 			url: 'code/index.json',
		 			success: function(arr){
		 				that.siblings().attr('class','hot_box_connect_btn');
						that.addClass('active');
						that.parents('.hot_box_connect').find('.hot_box_connect_img img').attr('src',arr.hot_goods_box[index].hover[0][color][0]);
		 			},	 
		 			error: function(msg){
		 				console.log(msg);
		 			}
		 		})
			
		})
		
		
		
		
		
		
	//parts
	$.ajax({
 			url: 'code/index_new.json',
 			success: function(arr){
 				var parts = $('#parts_box');
 				godead(arr,parts);
 				//console.log(arr);
 			},
 			error: function(msg){
 				console.log(msg);
 			}
 		}).done(function(){
 			var obj_1 = $('#parts_box a');
 			var index = 'index_new';
 			onhover(index,obj_1);
 			mouseover_btn(index,obj_1)
 		})
 		
 		//choiceness
		$.ajax({
 			url: 'code/index_choiceness.json',
 			success: function(arr){
 				var choiceness = $('#choiceness_box');
 				godead(arr,choiceness);
 				//console.log(arr);
 			},
 			error: function(msg){
 				console.log(msg);
 			}
 		}).done(function(){
 			var obj_1 = $('#choiceness_box a');
 			var index = 'index_choiceness';
 			onhover(index,obj_1);
 			mouseover_btn(index,obj_1)
 		})
		//brand
		
		$.ajax({
 			url: 'code/index_brand.json',
 			success: function(arr){
 				var brand = $('#brand_box');
 				godead(arr,brand);
 				//console.log(arr);
 			},
 			error: function(msg){
 				console.log(msg);
 			}
 		}).done(function(){
 			var obj_1 = $('#brand_box a');
 			var index = 'index_brand';
 			onhover(index,obj_1);
 			mouseover_btn(index,obj_1);
 		})
		//sift
			$.ajax({
	 			url: 'code/index_pinzhi.json',
	 			success: function(arr){
	 				var sift = $('#sift_box');
	 				godead(arr,sift);
	 				//console.log(arr);
	 			},
	 			error: function(msg){
	 				console.log(msg);
	 			}
	 		}).done(function(){
	 			$('.sift_left').mouseover(function(){
	 				$('#sift_box').html('');
	 				$('#sift_box').append($(`<div class="parts_banner">
				<img src="images/sift_banner.jpg" alt="" />
			</div>`));
	 				$('.sift_right').attr('class','sift_right');
	 				$(this).addClass('active');
	 				var str = 'index_pinzhi';
	 				pinzhi(str);
	 			});
	 			$('.sift_right').mouseover(function(){
	 				$('#sift_box').html('');
	 				$('#sift_box').append($(`<div class="parts_banner">
				<img src="images/zhineng_banner.jpg" alt="" />
			</div>`));
	 				$('.sift_right').attr('class','sift_right');
	 				$(this).addClass('active');
	 				var str = 'index_zhineng';
	 				pinzhi(str);
	 			});
	 			var obj_1 = $('#sift_box a');
	 			var str = 'index_pinzhi';
	 			onhover(str,obj_1);
	 			mouseover_btn(str,obj_1);
	 		})
	 		
	 //pinzhi
	 function pinzhi(str){
	 	$.ajax({
	 			url: `code/${str}.json`,
	 			success: function(arr){
	 				var sift = $('#sift_box');
	 				godead(arr,sift);
	 				//console.log(arr);
	 			},
	 			error: function(msg){
	 				console.log(msg);
	 			}
	 }).done(
	 	function(){
	 		var obj_1 = $('#sift_box a');
	 			onhover(str,obj_1);
	 			mouseover_btn(str,obj_1);
	 	}
	 )
	 }
	 
	 //mid
	$.ajax({
		url:'code/index_bottom.json',
		success:function(arr){
			//mid
			$('.mid_connect img').each(function(i){
				$(this).attr('src',arr.mid[i]);
			});
			//use
			$('#use_box a').each(function(i){
				$(this).find('.use_box_con img').attr('src',arr.adhibition[i].img);
				$(this).find('.use_box_con .name').html(arr.adhibition[i].name);
				$(this).find('.use_box_con .title').html(arr.adhibition[i].title);
				if(arr.adhibition[i].title_1){
					$(this).find('.use_box_con .title1').html(arr.adhibition[i].title_1);
				}
				$(this).find('.erweima img').attr('src',arr.adhibition[i].hover[0].img);
				$(this).find('.erweima .p1').html(arr.adhibition[i].hover[0].p);
				$(this).find('.erweima .p2').html(arr.adhibition[i].hover[0].a);
			})
			$('.forum_a').each(function(i){
				$(this).find('.forum_img img').attr('src',arr.forum[i].img);
				$(this).find('.p1').html(arr.forum[i].name);
				$(this).find('.p2').attr(arr.forum[i].title);
			})
		}
	}).done(function(){
		$('#use_box a').hover(
			//$(this).siblings().finish();
			function () {
			    $(this).find('.use_box_con').stop().animate(
			    	{opacity:0},function(){
			    		$(this).css('display','none');
			    		$(this).parent().find('.erweima').stop().animate(
			    			{opacity:1}
			    		);
			    	}
			    );
			  },
			  function () {
			   $(this).find('.erweima').stop().animate(
			    	{opacity:0},function(){
			    		$(this).parent().find('.use_box_con').css('display','block');
			    		$(this).parent().find('.use_box_con').stop().animate(
			    			{opacity:1}
			    		)
			    	}
			    );
			  }

		)
	})
	function godead(arr,parts){
		for(var i = 0; i < arr.length; i++){
					//console.log(arr.hot_goods_box[i].name);
					parts.append($(`<a href="#"><div class="parts_box_connect">
							<div class="parts_box_connect_img"><img src=${arr[i].img} alt="" /></div>
							<div class="parts_box_connect_h4"><h4>${arr[i].name}</h4></div>
							<div class="parts_box_connect_h6"><h6>${arr[i].title}</h6></div>
							<div class="parts_box_connect_icon"></div>
							<div class = "price">
								<div class="discount-price"><span>¥</span><span>${arr[i].price}</span></div>
							</div>
						</div></a>`));
						var part_color = parts.find(".parts_box_connect_icon");
						if(arr[i].color){
							for(var j = 0; j < arr[i].color.length; j++){
								($(`<div class="parts_box_connect_btn">
								<div class="parts_box_connect_in"></div>
								</div>`)).appendTo(part_color[i]);
								
								part_color.eq(i).find($(".parts_box_connect_in")).eq(j).css('background',arr[i].color[j]).attr('title',arr[i].color[j]);
							}
								part_color.find('.parts_box_connect_btn:first').addClass('active');
				}	
		}
	}
	//点击弹出语言选择框
	$('.language_btn').click(function(){
		$('.language').css('display','block');	
		event.stopPropagation();
	})
	$(document).click(function(){
		$('.language').css('display','none');
	})
	})
	function onhover(url_1,obj_a){
		obj_a.hover(function(){
				var that = $(this);
				var index = $(this).index() - 1;
				//alert(index);
				$.ajax({
		 			url: 'code/'+ url_1 +'.json',
		 			success: function(arr){
		 				//alert(index);
		 				if(arr[index].hover[0].black[1]){
		 					that.find('.parts_box_connect_h6').html(arr[index].hover[0].black[1]);
		 				}
		 				that.find('.price').html('<div class="price_icon">查看详情</div>');
		 				if(arr[index].inventory){
		 					var buy_car = $(`<button class="buy_car">加入购物车</button>`);
		 					that.find('.price').append(buy_car);
		 				}
		 			},
		 			error: function(msg){
		 				console.log(msg);
		 			}
		 		})
				
			},function(){
				var that = $(this);
				var index = $(this).index() - 1;
				//alert(index);
				$.ajax({
		 			url: 'code/'+ url_1 +'.json',
		 			success: function(arr){
		 				//alert(index);arr.hot_goods_box[i].title
		 				if(arr[index].hover[0].black[1]){
		 					that.find('.parts_box_connect_h6').html(arr[index].title);
		 				}
		 				that.find('.price').html(`<div class="discount-price"><span>¥</span><span>${arr[index].price}</span></div>`);
		 				//html(`<div class="discount-price"><span>¥</span><span>${arr.hot_goods_box[index].price}</span></div>
							//	<div class="original-price"><span>¥</span><span>${arr.hot_goods_box[index].originalPrice}</span></div>`);
		 				
		 			},
		 			error: function(msg){
		 				console.log(msg);
		 			}
		 		})
			})
	}
	//事件委托实现按钮切换
	function mouseover_btn(url_1,obj_a){
		obj_a.on('mouseover','.parts_box_connect_btn',function(){
			var that = $(this);
			var color = $(this).find('.parts_box_connect_in').attr('title');
			var index = $(this).parents('a').index() - 1;
			$.ajax({
		 			url: 'code/'+ url_1 +'.json',
		 			success: function(arr){
		 				that.siblings().attr('class','parts_box_connect_btn');
						that.addClass('active');
						//alert(index);
						that.parents('.parts_box_connect').find('.parts_box_connect_img img').attr('src',arr[index].hover[0][color][0]);
		 			},	 
		 			error: function(msg){
		 				console.log(msg);
		 			}
		 		})
			
		})
	}
	
	})

	
	
