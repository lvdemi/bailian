/* 
    遵从AMD规范
*/
define(["jquery"],function($){
    function download(){
        $.ajax({
            url:"../data/nav.json",
            success:function(obj){
                 console.log(obj);
                var bannerArr = obj.banner;
               for(var i = 0; i < bannerArr.length; i++){
                   var node = $(`<li style="display: ${i == 0 ? "block" : "none"}; opacity: ${i == 0 ? 1 : 0.2};position: absolute; left: 0px;height: 430px;">
                   <a href="#"><img src="${bannerArr[i].img}" alt="" class="main-top-img"></a>
               </li>`);
               if(i == 0){
                   node.css("background","rgb(31, 27, 25)")
               }else if(i == 1){
                node.css("background","rgb(255, 167, 192)")
               }else if(i == 2){
                   node.css("background","rgb(177, 81, 1)")
               }else if(i == 3){
                node.css("background","rgb(241, 37, 74)")
               }else{
                node.css("background","rgb(94, 1, 9)")
               }
               node.appendTo(".rollBody .main-top-scroll")
                $(`  <li><a class="li-a-circle-black ${i == 0 ? "li-a-circle-black-active" : ""}"></a></li>`).appendTo($(".banner_eye .progress-bar-ol"))
               }

               //左侧侧边栏的数据
                var sidnavArr = obj.sideNav;
               for(var i = 0; i < sidnavArr.length; i++){
                var childArr = sidnavArr[i].child;
                
                 var node = $(`<li class = "item">
                 <a href="#"><span>${sidnavArr[i].Title}</span></a>
                 <div class="left-ul-show" style = 'display: none'>
                     <ul class="left-ul-nv">
                     <li>
                     <div class="menu_floor">
                     
                     </div>
                         <div class="menu_right_img">

                         </div>
                      </li> 
                     </ul>
                 </div> 
             </li> `);
             node.appendTo(".nav-show");

             //取出所有数据
           for(var j = 0; j < childArr.length; j++){
               if(j % 14 == 0){
                   var oDiv = $(`<div class="menu_floor_a">

                   </div>`);
               }
            $(`<a href="#">${childArr[j].title}</a>`).appendTo(oDiv);
            oDiv.appendTo(node.find(".menu_floor"))
           }  
           var imgARR = sidnavArr[i].rightImg;
            for(var k = 0; k < imgARR.length; k++){
                $(`<a href="#"><img src="images/${imgARR[k]}" alt="" style="width:240px; height:203px; margin-bottom: 5px; "></a>`).appendTo(node.find(".menu_right_img"));
            } 

         }
        
    },
            error: function(msg){
                console.log(msg);
            }

        })
    }
    function leftNavtab(){
        $(".nav-show").on("mouseenter",".item", function(){
            $(this).addClass("item-active");
            $(this).find(".left-ul-show").show();
        })
        $(".nav-show").on("mouseleave",".item", function(){
            $(this).removeClass("item-active");
            $(this).find(".left-ul-show").hide();
        })
    }
  //轮播图效果
        function bannerTab(){
            var timer = null;
            var iNow = 0;

            timer = setInterval(function(){
                iNow++;
                tab();
            }, 5000);

            function tab(){
                var aImgs = $(".rollBody .main-top-scroll").find("li");
                var aBtns = $(".banner_eye .progress-bar-ol").find("li a");
    
                aImgs.css("opacity", 0.2).hide().eq(iNow).show().animate({
                    opacity: 1
                }, 800, function(){
                    if(iNow == aBtns.size() - 1){
                        iNow = -1;
                    }
                });
                aBtns.removeClass("li-a-circle-black-active").eq(iNow).addClass("li-a-circle-black-active");
            }
        //添加移入移出
        $(".rollBody .main-top-scroll").mouseenter(function(){
            clearInterval(timer);
        });
        $(".rollBody .main-top-scroll").mouseleave(function(){
            timer = setInterval(function(){
                iNow++;
                tab();
            }, 2000);
        });
        $(".banner_eye .progress-bar-ol").on("click", "li", function(){
            iNow = $(this).index();
            tab();
            return false;
        });
        //给上一张和下一张添加点击事件
        $(".prev,.next").on("click",function(){
            if(this.className == "prev"){
                iNow--;
                if(iNow == 0){
                    iNow == 4;
                }
            }else{
                iNow++;
            }
            tab();
        })

        }
/* 加载商品 */
   function product(){
       $.ajax({
           type:"get",
           url:"../data/da.json",
           success:function(arr){
             console.log(arr);
            for(var i = 0; i < arr.length; i++){
                var node =$(`<li>
                    <div class="pro-show">
                    <div class="pro-img">
                        <a href="#"><img src="${arr[i].img}" alt="${arr[i].title}"></a>
                    </div>
                    <div class="pro-name">
                        <a href="#">${arr[i].title}</a>
                    </div>
                    <div class="pro-money">
                        <div class="money-fl">￥
                            <span>${arr[i].price}</span>
                            <a href="#">收藏</a>
                        </div>
                    </div>
                  </div>
                </li>`);
                node.appendTo($(".alsolike .like_class"));
            }
           },
           error:function(msg){
               console.log(msg);
           }
           
       })
   }
/* 中心放大 */
   function magnify(){
  /*   function startMove(node, cssObj, complete){
        clearInterval(node.timer);
        node.timer = setInterval(function(){
            var isEnd = true; //假设都到达目的值
            for(var attr in cssObj){
                var iTarget = cssObj[attr];
                //获取当前值
                var iCur = null;
                if(attr == "opacity"){
                    iCur = parseInt(parseFloat(getStyle(node, "opacity")) * 100);
                }else{
                    iCur = parseInt(getStyle(node, attr))
                }
                var speed = (iTarget - iCur) / 6;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
    
                    //node.style["width"]
                if(attr == "opacity"){
                    iCur += speed;
                    node.style.opacity = iCur / 100;
                    node.style.filter = "alpha(opacity=" + iCur + ")";
                }else{
                    node.style[attr] = iCur + speed + 'px';
                }
                //如果其中有一个没有到达目的值
                if(iCur != iTarget){
                    isEnd = false;
                }
            }
            if(isEnd){
                clearInterval(node.timer);
                if(complete){
                    complete.call(node);
                }
            }
    
        }, 30);
    }
    //封装一个获取当前有效样式的跨浏览器兼容的方法
function getStyle(node, cssStyle){
    if(node.currentStyle){
        return node.currentStyle[cssStyle];
    }else{
        return getComputedStyle(node)[cssStyle];
    }
}
    $(".new_tm_l_s img").mouseenter(function(){
        startMove(this,{
            width:342,
            height:389,
             marginLeft: -19,
             marginTop: -17
           
        })
    });
    $(".new_tm_l_s img").mouseleave(function(){
        startMove(this,{
            width:305,
            height:370,
            marginLeft: 0,
            marginTop: 0
        })
    })

    */
  



   }





    return {
        download: download,
        bannerTab: bannerTab,
        product:product,
        leftNavtab:leftNavtab,
        magnify:magnify,
    }
})