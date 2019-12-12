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
                //左侧侧边栏的数据取出
                var sideNavArr = obj.sideNav;
                for(var i = 0; i < sideNavArr.length; i++){
                    var childArr = sideNavArr[i].child;

                    //计算一共要多少列
                    var col = Math.ceil(childArr.length / 90)

                    var node = $(`<li class = 'category-item'>
                        <a href="/index.html" class = 'title'>
                            ${sideNavArr[i].title}
                            <em class = 'iconfont-arrow-right-big'></em>
                        </a>
                        <div class="children clearfix children-col-${col}" style = 'display:none'>
                            
                        </div>
                    </li>`);
                    node.appendTo($("#J_categoryList"));

                    //取出当前分类下所有的数据

                    
                    for(var j = 0; j < childArr.length; j++){
                        if(j % 90 == 0){
                            var oUl = $(`<ul class="children-list children-list-col children-list-col-1">  
                            </ul>`);
                        }
                        $(` <li>
                        <a href="#">
                            <span class="text">${childArr[j].title}</span>
                        </a>
                    </li>`).appendTo(oUl);
                        oUl.appendTo(node.find(".children"));
                    }
                }
            },
            error: function(msg){
                console.log(msg);
            }

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
    return {
        download: download,
        bannerTab: bannerTab,
        product:product,
        
    }
})