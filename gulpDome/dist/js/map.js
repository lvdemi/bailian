/* 
    遵从AMD规范
*/
define(["parabola","jquery","jquery-cookie"], function(parabola, $){
/* 放大镜 */
   function cake(){
       $(".intro-left").mouseenter(function(){
           $(".mark,.big").show();
       }).mouseleave(function(){
           $(".mark,.big").hide();
       }).mousemove(function(ev){
           var l = ev.pageX - $(this).offset().left - 100;
           if(l <= 0){
               l = 0;  
           }
           if(l >= 250){
               l = 250;
           }
           var t = ev.pageY - $(this).offset().top - 100;
           if(t <= 0){
               t = 0;
           }
           if( t >= 250){
               t = 250;
           }
             
           $(".mark").css({
               left:l,
               top: t
           })
           $(".big img").css({
               left: -2 * l,
               top: -2 * t
           })
       });
/* 放大镜的数据加载 */
       $.ajax({
           url: "data/nav.json",
           success: function(data){
            var bigImg = data.bigImg;
            //  console.log(bigImg);
            for(var i = 0; i < bigImg.length; i++){
                $(`<li><img src="${bigImg[i].img}"style="display:inline;" id = '${bigImg[i].id}'></li>`).appendTo(".items ul")
            };
           
           
           },
           error: function(msg){
                console.log(msg);
           }
       })
     

    }
/* 放大图片切换 */
    function bigTab(){
        var oUl = $(".items").find("ul");
        $(".prev").click(function(){
            oUl.animate({left:-180}, 500);
        });
        $(".next").click(function(){
            oUl.animate({left:0}, 500);
        }) 
    }

/* 注册 */
  function register(){
  //用户名验证
  var oUsername = $("#username");
  var oSpan = $("#user");
  var oError0 = $(".prompt-error");

  oUsername.blur(function(){
    var oValue = $(this).val();
    if(/[^a-zA-Z]/.test(oValue[0])){
        oSpan.html('✘ 用户名首位必须为字母').css("color","red");
        oError0.css("display", "block")
    }else if(oValue.length < 6 || oValue.length > 18){
        oSpan.html('✘ 用户名长度为6~18个字符').css("color","red");
        oError0.css("display", "block");
    }else if(/\W/.test(oValue)){
        oSpan.html('✘ 用户名需为字母、数字、下划线组成').css("color","red");
        oError0.css("display", "block");
    }else{
        oError0.css("display", "none");
    }
})
   //密码验证
       var oError1 = $(".prompt-error1");
       var oError2 = $(".prompt-error2");
       var oPassword = $(".password");
       var oCorrect = $(".prompt-correct");
       var oAgainCode = $("#againCode");
       var oCode = $("#code");
       var oCode1 = $("#code1");
       oPassword.keyup(function(){
           var oValue = this.value;
           for(var i = 0; i < $(".strength").length; i++){
            $(".strength").eq(i).removeClass("active");
           }
           if(oValue.length >= 6){
            oCorrect.css("display", "block");
            oError1.css("display", "none");
            if(/^[a-z]+$/.test(oValue) || /^[0-9]+$/.test(oValue) || /^[A-Z]+$/.test(oValue)){
                //弱
                $(".strength").eq(0).addClass("active");
            }else if(/[a-z]/.test(oValue) && /[A-Z]/.test(oValue) && /\d/.test(oValue)){
                //中
                $(".strength").eq(2).addClass("active");
            }else{
                $(".strength").eq(1).addClass("active");
            }
           }
       })
        oPassword.blur(function(){
            var oValue = this.value;
            oCorrect.css("display", "none");
            oError1.css("display", "block");
            if(oValue.length < 6){
                oCode.css("color",'red');
            }else{
                oCorrect.css("display", "none");
                oError1.css("display", "none");
            }
        })
        oAgainCode.blur(function(){
            var oValue = oPassword.val()
            var AoValue = oAgainCode.val();
            if(AoValue == ''){
                oCode1.html("✘ 密码不能为空").css("color", 'red');
                oError2.css('display', 'block')
            }else if(oValue !== AoValue){
                oCode1.html("✘ 两次密码不一致").css('color','red');
                oError2.css('dosplay','block')
            }else{
                oError2.css("display",'none'); 
            }
         })
        //手机号验证
         var phoneNumber = $("#phonenumber");
         var oError3 = $(".prompt-error3");
         var oPhone = $("#phone");
         phoneNumber.blur(function(){
             var oValue = $(this).val();
             if(/[^1]/.test(oValue[0])){
                 oError3.css('display', 'block');
                 oPhone.html("✘ 输入的手机号码有误").css("color",'red');
             }else if(oValue.length != 11){
                oError3.css('display', 'block');
                oPhone.html("✘ 手机号码长度为11位").css("color",'red');
             }else if(/\D/.test(oValue)){
                oError3.css('display', 'block');
                oPhone.html("✘ 手机号码应为纯数字").css("color",'red');
             }else{
                 oError3.css("display", 'none');
             }
         })
         //邮箱验证
         var eMailAddress  = $("#email");
         var Cemail = $("#clue-email");
         var oError4 = $(".prompt-error4");
         eMailAddress.blur(function(){
             var oValue = $(this).val();
             if(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(oValue)){
                oError4.css("display",'none');
             }else{
                 oError4.css("display",'block');
                 Cemail.html("X 请输入正确的电子邮箱").css("color", 'red');
             }   
         })
         //验证码
         var oIp  = $("#ip");
         var oCanvas = $("#canvas");
         var oError5 = $(".prompt-error5");
         var oPromptip = $("#prompt-ip");
         var str = testCode(6);
         draw(str);
         oIp.blur(function(){
             var oValue = $(this).val();
             if(oValue.toLowerCase() == str.toLowerCase()){
                 oError5.css("display",'none');
             }else{
                oError5.css("display",'block');
                oPromptip.html('验证码错误')
             }
         })
         oCanvas.click(function(){
            var str = testCode(6);
            var oValue = $(this).val();
             if(oValue.toLowerCase() == str.toLowerCase()){
                 oError5.css("display",'none');
             }else{
                oError5.css("display",'block');
                oPromptip.html('验证码错误')
             }
         })
         function draw(testCode) {
            var canvas_width=document.getElementById('canvas').clientWidth;
            var canvas_height=document.getElementById('canvas').clientHeight;
            var canvas = document.getElementById("canvas");//获取到canvas的对象，演员
            var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
            canvas.width = 22 * testCode.length;
            canvas.height = canvas_height;
            
        
            //有n位验证，可以绘制n位字符
            for (var i = 0; i < testCode.length; i++) {
               
                var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
                var txt = testCode[i];//得到随机的一个内容
                // show_num[i] = txt;
                var x = 10 + i * 20;//文字在canvas上的x坐标
                var y = 20 + Math.random() * 8;//文字在canvas上的y坐标
                context.font = "bold 23px 微软雅黑";
        
                context.translate(x, y);
                context.rotate(deg);
        
                context.fillStyle = randomColor();
                context.fillText(txt, 0, 0);
        
                context.rotate(-deg);
                context.translate(-x, -y);
            }
            for (var i = 0; i <= 5; i++) { //验证码上显示线条
                context.strokeStyle = randomColor();
                context.beginPath();
                context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
                context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
                context.stroke();
            }
            for (var i = 0; i <= 30; i++) { //验证码上显示小点
                context.strokeStyle = randomColor();
                context.beginPath();
                var x = Math.random() * canvas_width;
                var y = Math.random() * canvas_height;
                context.moveTo(x, y);
                context.lineTo(x + 1, y + 1);
                context.stroke();
            }
        }
        function testCode(n){
            var arr = [];
            for(var i = 0; i < n; i++){
                var tmp = parseInt(Math.random() * 123);
                if(tmp >= 0 && tmp <= 9){
                    arr.push(tmp);
                }else if(tmp >= 65 && tmp <= 90 || tmp >= 97 && tmp <= 122){
                    arr.push(String.fromCharCode(tmp));
                }else{
                    //随机到别的不在范围内的数
                    i--;
                }
            }
            return arr.join("");
        }
        function randomColor(){
            var str = "rgba(" + parseInt(Math.random() * 256) + "," + parseInt(Math.random() * 256) + "," + parseInt(Math.random() * 256) + ",1)";
            return str;
        }
        
   }
/* 放大页面 数据加载  */
   function aliment(){
       sc_num();
       sc_msg();
        $.ajax({
            url: "../data/food.json",
            success: function(data){
                var aFoods = data.foods;
                // console.log(aFoods);
                for(i = 0; i < aFoods.length; i++){
                    $(`<li>
                    <span class="picture">
                        <img src="${aFoods[i].img}" alt="">
                    </span>
                    <span class="name">${aFoods[i].title}</span>
                    <span class="price">￥
                        <i>${aFoods[i].pirce}</i>
                    </span>
                </li>`).appendTo(".emption-box ul")
                }
                var Foodleft = data.foodleft;
                // console.log(Foodleft);
            for(var j = 0; j < Foodleft.length; j++){
                $(`<li>
                <div class="pro-show">
                    <div class="pro-img">
                        <a href="#"><img src="${Foodleft[j].img}" alt="" style="width:200px; height:200px"></a>
                    </div>
                    <div class="pro-name">
                        <a href="#">${Foodleft[j].title}</a>
                    </div>
                    <div class="pro-money">
                        ￥<i>${Foodleft[j].pirce}</i>
                    </div>
                </div>
            </li>`).appendTo(".pro-class")
             }
/* 加载购物车*/
             var bigfoods = data.bigfood;
            //   console.log(bigfoods);
             for(k = 0 ; k < bigfoods.length; k++){
              var node=$(` <li>
                <div class="pro-show">
                    <div class="pro-img">
                        <a href="#"><img src="${bigfoods[k].img}" alt=""></a>
                    </div>
                    <div class="pro-money">
                    <div class="money-fl">￥${bigfoods[k].pirce}</div>
                    </div>
                    <div class="product-comment">
                        <div class="pro-name ">
                            <a href="#">台尚 蛋酥沙琪玛 540g</a>
                        </div>
                        <div class="pro-info">新老包装随机发放</div>
                    </div>
                    <div class="pro-assess">
                        <div class="pro-assess-right">自营联华
						</div>
                    </div>
                    <div class="pro-button">
                        <button type="button" class="btn btn-primary addCard"  id = "${bigfoods[k].id}">加入购物车</button>
                    </div>
                </div>
            </li>`);
            node.appendTo(".pro-class1")}
           } 
        })
//给加入购物车按钮添加点击事件
        $(".pro-class1").on("click", ".btn", function(){
            var id  = this.id;
            //判断是否是第一次存储
            var first = $.cookie("goods") == null ? true : false;
            if(first){
            //是第一次存储
            var arr = [{id: id, num: 1}];
			$.cookie("goods", JSON.stringify(arr), {
						expires: 7
			})
         }else{
             //判断之前是否添加过
             var cookieStr = $.cookie("goods");
             var cookieArr = JSON.parse(cookieStr);
             var same = false; //假设没有存储过
                    //通过循环遍历是否有之前存储过的商品
            for(var i = 0; i < cookieArr.length; i++){
                if(cookieArr[i].id == id){
                    cookieArr[i].num++;
					same = true;
					break;
                }
            }
            //判断如果没有添加过
            if(!same){
                var obj = {id: id, num: 1};
                cookieArr.push(obj);
            }
            $.cookie("goods", JSON.stringify(cookieArr), {
                expires: 7
            }) 
         }
         sc_num();
         sc_msg();
         ballMove(this);
    })
    /* 
           统计购物车里商品数量
   */
  function sc_num(){
   var cookieStr = $.cookie("goods");
      if(cookieStr){
       var cookieArr = JSON.parse(cookieStr);
       var sum = 0;
       for(var i = 0; i < cookieArr.length; i++){
           sum += cookieArr[i].num;
       }
       $(".sc_x .sc_num").html(sum);
      }else{
       $(".sc_x .sc_num").html(0);
      }
  }
/* 加载购物车数据*/
    function sc_msg(){
        $(".cart-table-list ul").empty();
        $.ajax({
            url: "../data/food.json",
            success: function(obj){
              //取出cookie中的数据
             var arr = obj.bigfood;
              var cookieStr = $.cookie("goods");
            //   alert(cookieStr);
              if(cookieStr){
                var cookieArr = JSON.parse(cookieStr);
                //找出加入购物车的商品数据 
                var newArr = [];
                for(var i = 0; i < arr.length; i++){
                    for(var j = 0; j < cookieArr.length; j++){
                        if(arr[i].id == cookieArr[j].id){
                            //增加购物车商品数量
                            arr[i].num = cookieArr[j].num;
                            newArr.push(arr[i]);
                        }
                    }
                }
                //  console.log(newArr);
            for(var i = 0; i < newArr.length; i++){
                var node  =$(`<li id = '${newArr[i].id}'>
                <div class="cart-table-line">
                   <div class="item-box">
                       <a href="#"><img src="${newArr[i].img}" style="width:80px; height:80px;"></a>
                       <div class="name">
                           <a href="#">有金人家 足金月饼礼盒 </a>
                       </div>
                       <div class="item-price-box">
                       <span>￥</span>
                       <div class="price">${newArr[i].pirce}</div>
                       </div>
                       <div class="number-box">
                               <em>-</em>
                               <div class="sc_number">${newArr[i].num}</div>
                               <em>+</em>
                       </div>
                       <div class="action-box">删除</div>
                   </div>
               </div>
           </li>`);
           node.appendTo(".cart-table-list ul")
                }
              }
            }
        })
    }

    $(".sc_btn").click(function(){
         //1、清空cookie
         $.cookie("goods", null);
         $(".cart-table-list ul").empty();
         sc_num();
    })
    $(".cart-table-list ul").on("click", ".action-box",function(){
        //2、删除节点
        var id = $(this).closest("li").remove().attr("id");
         //1、删除cookie
        //    alert(id); 
         var cookieArr = JSON.parse($.cookie("goods"));
         for(var i = 0; i < cookieArr.length; i++){
             if(cookieArr[i].id == id){
                 cookieArr.splice(i, 1);
                 break;
             }
         }
         //3、判断是否是空数组
         if(!cookieArr.length){
            $.cookie("goods", null);
        }else{
            $.cookie("goods", JSON.stringify(cookieArr), {
                expires: 7
            })
        }

        sc_num();
        
    })
    //给+和-按钮添加事件
    $(".cart-table-list ul").on("click", ".number-box em", function(){
        var id = $(this).closest("li").attr("id");
        // alert(id);
        //1、找出这个数据,改了cookie
        var cookieArr = JSON.parse($.cookie("goods"));
        for(var i = 0; i < cookieArr.length; i++){
            if(cookieArr[i].id == id){
                if(this.innerHTML === "+"){
                    cookieArr[i].num++;
                }else if(cookieArr[i].num == 1 && this.innerHTML == "-"){
                    alert("数量为1，不能在减少");
                }else{
                    cookieArr[i].num--;
                }
                var a  = $(this).parent().siblings(".item-price-box").find(".price").html();
              /*    alert(a); */
                var b  = $(this).siblings(".sc_number").html();
                // alert(b);
                var c  = parseInt(a * b);

                $(".sc_money").html(c);
                //页面上的数据
                $(this).siblings(".sc_number").html(cookieArr[i].num);

                $.cookie("goods", JSON.stringify(cookieArr), {
                    expires: 7
                })
                sc_num();
                break;
            }
        }

    })
//小球运动
    function ballMove(oBtn){
        //node当前点击的按钮
        $("#box").css({
            left:$(oBtn).offset().left,
            top:$(oBtn).offset().top,
            display:"block"
        })
        var X = $(".tools-leftfont .box_yun").offset().left - $(oBtn).offset().left;
        var Y = $(".tools-leftfont .box_yun").offset().top - $(oBtn).offset().top; 
        	//1、创建抛物线对象
				var bool = new Parabola({
					el: "#box",
					offset: [X,Y],
					duration: 800,
					curvature: 0.0005,
					callback: function(){
						$("#box").hide();
					}
				})
                bool.start();
    }






}

/* 图片切换 */
   function bigTab1(){
    var oUl = $(".emption-box").find("ul");
    $(".prevr").click(function(){
        oUl.animate({left:-1190}, 500);
    });
    $(".nextr").click(function(){
        oUl.animate({left:0}, 500);
    }) 
}
    return {
        cake:cake,
      /*   register:register, */
        bigTab:bigTab,
        aliment:aliment,
        bigTab1:bigTab1,
    }
    
});