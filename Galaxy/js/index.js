class Index{
    constructor(){
        this.search = document.querySelector(".search");
        this.cancel = document.querySelector(".cancel");
        this.imgBox = document.querySelector(".imgBox");
        this.list = document.querySelector(".list");
        this.new = document.querySelector(".new");
        this.hot = document.querySelector(".hot");
        this.left = document.querySelector(".left");
        this.log = document.querySelector(".log");
        this.watchMain = document.querySelector(".watch-main");
        this.iphoneMain = document.querySelector(".iphone-main");
        this.watchLeft = document.querySelector(".watchleft");
        this.cartPage = document.querySelector(".cart");
        this.bannerUrl = "../json/banner.json";
        this.hotUrl = "../json/hot.json"
        this.newUrl = "../json/new.json"
        this.iphoneUrl = "../json/iphon-all.json"
        this.allnavUrl = "../json/allnav.json"
        this.watchUrl = "../json/watch-all.json"
        this.url = this.iphoneUrl;
        this.nowIndex = 0;
        this.addEvent();
        this.banner();
        this.newShow();
        this.hotShow();
        this.iphoneShow();
        this.watchShow();
        this.floor();
        this.showname();
        this.myselfMain();
        this.searchcc();
        this.index = 0;
    }
    
    showname(){
        var that=this;
        let user = JSON.parse(localStorage.getItem("user"));
        user.some(function(val,index){
            if(val.off==1){
                that.i=index;
            } 
        })
        if(this.i!=undefined){
            if(user[that.i].off===1){
                that.log.innerHTML= "<i></i>"+user[that.i].name;
				that.log.style.color="blue";
                this.log.removeAttribute("href");
                this.cartPage.href="../html/cart.html";
                $(".floorcart")[0].href="../html/cart.html"
            }
            if(user[that.i].off===0){
                that.log.innerHTML= "<i></i>登录/注册";
            }
        }
		$(".login").hover(function(){
			if(that.log.innerHTML!="<i></i>登录/注册"){
				$(".login-bottom").stop().slideDown(500)
			}
		},function(){
			$(".login-bottom").stop().slideUp(500)
		})
		$(".quit").click(function(){
			user[that.i].off=0;
			localStorage.setItem("user",JSON.stringify(user));
		})
       
    }
    addEvent(){
        var that = this;
       this.search.onclick = function(){
           $(".searchBox").show(500);
        }
        this.cancel.onclick = function(){
            $(".searchBox").hide(500);
        }
        $(".nav-left").children("li").click(function(){
            localStorage.setItem("id",$(this).index())
        })
	
        $(".nav-left").children("li").hover(function(){
            $(".nav-tip").eq($(this).index()).stop().slideDown(500);
            that.i = $(this).index();
            ajaxGet(that.allnavUrl,function(res){
                that.allnavRes = JSON.parse(res);
                var str =``;
                var str1 =``;
                for(var i=0;i<that.allnavRes[that.i][0].length;i++){
                    str+= `<li ><a href="../html/goodsitem.html">
                    <img  src="${that.allnavRes[that.i][0][i].src}"><span class="hotname">${that.allnavRes[that.i][0][i].hotname}</span>
                    </a></li>`;
                }
                for(var j=0;j<that.allnavRes[that.i][1].length;j++){
                    str1 += `<li><a href="../html/goodslist.html">${that.allnavRes[that.i][1][j]}</a></li>`
                }
                $(".nav-img").html(str);  
                $(".nav-small").html(str1); 
                $(".nav-small").children("li").click(function(){
                    localStorage.setItem("index",$(this).index())
                }) 
                $(".nav-img").children("li").click(function(){
                    localStorage.setItem("mes",JSON.stringify(that.allnavRes[that.i][0][$(this).index()]))
                }) 
                
            })
        },function(){
            $(".nav-tip").eq($(this).index()).stop().slideUp()
        })

    }
    banner(){
        var that = this;
        ajaxGet(this.bannerUrl,function(res){
            that.res =JSON.parse(res);
            var str =``;
            var str1=``;
            for(var i=0;i<that.res.length;i++){
                str+=`<li class="banImg"> <img  src="${that.res[i].src}" alt=""></li>`;
                str1 +=`<li class="listBtn"></li>`
            }
            that.imgBox.innerHTML=str;
            that.list.innerHTML=str1;
            that.banImg = document.querySelectorAll(".banImg");
            for(var i = 0;i<that.banImg.length;i++){
                that.banImg[i].style.left=document.body.offsetWidth+"px";
                that.banImg[0].style.left=0+"px";
            }
            that.listBtn = document.querySelectorAll(".listBtn") 
            $(".listBtn").css("background","white").eq(that.nowIndex).css("background","black")
            for(var i=0;i<that.listBtn.length;i++){
                that.listBtn[i].index = i;
                that.listBtn[i].onclick =function(){
                    if(this.index > that.nowIndex){
                        $(".banImg").eq(this.index).css({
                            left:$(".banImg").eq(0).width()
                        }).stop().animate({
                            left:0,
                        }).end().eq(that.nowIndex).css({
                            left:0,
                        }).stop().animate({
                            left:-$(".banImg").eq(0).width()
                        })}
                    if(this.index < that.nowIndex){
                        $(".banImg").eq(this.index).css({
                            left:-$(".banImg").eq(0).width()
                        }).stop().animate({
                            left:0,
                        }).end().eq(that.nowIndex).css({
                            left:0,
                        }).stop().animate({
                            left:$(".banImg").eq(0).width()
                        })
                    }
                    that.nowIndex = this.index;
                    $(".listBtn").css("background","white").eq(that.nowIndex).css("background","black")
                }
            }
            that.autoPlay = function(){
                if(that.nowIndex > that.banImg.length-1){
                    that.nowIndex=0;
                }
                var now =that.nowIndex-1;
                if(now == -1){
                    now=that.banImg.length-1;
                }
                $(".banImg").eq(that.nowIndex).css({
                    left:-$(".banImg").eq(0).width()
                }).stop().animate({
                    left:0,
                }).end().eq(now).css({
                    left:0,
                }).stop().animate({
                    left:$(".banImg").eq(0).width()
                })
                $(".listBtn").css("background","white").eq(that.nowIndex).css("background","black")
            }
            that.time=setInterval(()=>{
                that.nowIndex++;
                that.autoPlay()
            },2000)
            var a= [$(".imgBox") ,$(".listBtn")];
            for(var i=0;i<a.length;i++){
                a[i].hover(function(){
                    clearInterval(that.time)
                },function(){
                    that.time=setInterval(()=>{
                        that.nowIndex++;
                        that.autoPlay()
                    },2500)
                })
            }
            
        })
    }
    newShow(){
        var that=this;
        ajaxGet(this.newUrl,function(res){
            that.newRes = JSON.parse(res);
            var str =``;
            for(var i=0;i<that.newRes.length;i++){
                str+=`<a class="newpin"> <img  src="${that.newRes[i].src}" alt=""></a>`;
            }
            that.new.innerHTML=str;  
        })
    }
    hotShow(){
        var that=this;
        ajaxGet(this.hotUrl,function(res){
            that.hotRes = JSON.parse(res);
            var str =``;
            for(var i=0;i<that.hotRes.length;i++){
                str+=`<li class="hotPin"><a href="../html/goodsitem.html">               <span class="hotname">${that.hotRes[i].hotname}</span>
                <span class="descr">${that.hotRes[i].descr}</span> 
                <span class="price">${that.hotRes[i].price}</span> 
                <img  src="${that.hotRes[i].src}">
                <em><img  src="${that.hotRes[i].tip}"></em></a> 
                </li>`;
            }
            that.hot.innerHTML=str;
            $(".hot").children("li").click(function(){
                localStorage.setItem("mes",JSON.stringify(that.hotRes[$(this).index()]))
            })
        })
    }
    iphoneShow(){
        var that=this;
        that.ajaxGet();
        $(".iphon-top").children("li").find("a").eq(0).css({color:"blue"})
            $(".iphon-top").children("li").hover(function(){
                $(".iphon-top").children("li").find("a").css({color:"black"})
                $(this).find("a").css({color:"blue"})
                    that.url = that.iphoneUrl;
                    that.index=$(this).index();
                    that.ajaxGet();
             });
        $(".more").click(function(){
            localStorage.setItem("id","0");
        })
        
    
    }
    
    watchShow(){
        var that=this;
        this.url = this.watchUrl;
        ajaxGet(this.url,function(res){
            that.wacthRes = JSON.parse(res);
            var str =``;
            var str1 =``;
            for(var i=0;i<that.wacthRes.length-1;i++){
                str+=`<li class="hotPin"><a href="../html/goodsItem.html">
                <img  src="${that.wacthRes[i].src}">       <span class="hotname">${that.wacthRes[i].hotname}</span>
                <span class="descr">${that.wacthRes[i].descr}</span> 
                <span class="price">${that.wacthRes[i].price}</span></a>
                </li>`;
            }
            str1 = `<a href="../html/goodsItem.html"><img src="${that.wacthRes[i].src}"></a>`

            that.watchMain.innerHTML=str;  
            that.watchLeft.innerHTML=str1;  
            $(".watch-main").children("li").click(function(){
                localStorage.setItem("mes",JSON.stringify(that.wacthRes[$(this).index()]))
            })
            $(".watchleft>a").click(function(){
                localStorage.setItem("mes",JSON.stringify(that.wacthRes[i]))
            })
        })   
    }
    ajaxGet(){
        var that = this;
        ajaxGet(this.url,function(res){
            that.iphoneRes = JSON.parse(res);
            var str =``;
            var str1 =``;
            for(var i=0;i<that.iphoneRes[that.index].length-1;i++){
                str+=`<li class="hotPin"><a href="../html/goodsItem.html">
                <img  src="${that.iphoneRes[that.index][i].src}"><span class="hotname">${that.iphoneRes[that.index][i].hotname}</span>
                <span class="descr">${that.iphoneRes[that.index][i].descr}</span> 
                <span class="price">${that.iphoneRes[that.index][i].price}</span></a>
                </li>`;
            }
            str1 = `<a href="../html/goodsItem.html"><img src="${that.iphoneRes[[that.index]][i].src}"></a>`

            that.iphoneMain.innerHTML=str;  
            that.left.innerHTML=str1;  
            $(".iphone-main").children("li").click(function(){
                localStorage.setItem("mes",JSON.stringify(that.iphoneRes[that.index][$(this).index()]))
            })
            $(".left>a").click(function(){
                localStorage.setItem("mes",JSON.stringify(that.iphoneRes[that.index][i]))
            })

        })
    }
    floor(){
        document.onscroll = function(){
            if($(".new").offset().top<=$(document).scrollTop()){
                $(".floor").css({"position":"fixed","left":"100px","top":"90px","z-Index":"10"})
                $(".rightFloor").css({"position":"fixed","right":"100px","top":"90px","z-Index":"10"})
            }
            if($(".new").offset().top>$(document).scrollTop()){
                $(".floor").css({"position":"absolute","left":"100px","top":"-220px"})
                $(".rightFloor").css({"position":"absolute","right":"100px","top":"-220px"})
            }
        }
    }
    myselfMain(){
        let onf=0;
        var that=this;
        this.j=0;
        let user = JSON.parse(localStorage.getItem("user"));
        user.some(function(val,index){
            if(val.off==1){
                that.i=index;
            } 
        })
        if(this.i!=undefined){
            if(user[that.i].off===1){
                $(".my")[0].href="##";
        $(".myself")[0].onclick = function(){
            if(onf==0){
                $(".selfMain").css("display","block")
                onf=1;
            }else{
                $(".selfMain").css("display","none")
                onf=0
            }
        }
		$(".close").click(function(){
			$(".selfMain").css("display","none")
			onf=0;
		})	
		$(".exit").click(function(){
			$(".pwdupdate").css("display","none")
			$(".pwdmes").html("密码管理");
		})
		$(".login-self")[0].onclick = function(){
		    if(onf==0){
		        $(".selfMain").css("display","block")
		        onf=1;
		    }else{
		        $(".selfMain").css("display","none")
		        onf=0
		    }
		}
        user.some(function(val,index){
            if(val.off==1){
                that.j=index;
            }
        })
        $(".name").val(user[this.j].name);
        $(".name").attr("disabled","disabled")
        $(".tel").val(user[this.j].tel);
        $(".tel").attr("disabled","disabled")
        $(".top").html("尊贵的会员,"+user[this.j].name+",您好！！");
        $(".update").click(function(){
            if($(".update").html()=="修改"){
                $(".name").removeAttr("disabled");
                $(".update").html("确认");
				
            }else{
                user[that.j].name=$(".name").val();
				$(".log").html("<i></i>"+$(".name").val())
				 $(".top").html("尊贵的会员,"+$(".name").val()+",您好！！");
                localStorage.setItem("user",JSON.stringify(user))
                $(".name").attr("disabled","disabled");
                $(".update").html("修改");
            }
        })
        $(".pwdmes").click(function(){
            if($(".pwdmes").html()=="密码管理"){
                $(".pwdupdate").css("display","block")
                $(".pwdmes").html("确认");
            }else{
                console.log($(".oldpwd").val(),user[that.j].password)
                if($(".oldpwd").val()==user[that.j].password){
                    if($(".newpwd").val()!=""){
                        user[that.j].password=$(".newpwd").val();
						user[that.j].off=0;
						localStorage.setItem("user",JSON.stringify(user))
						$(".pwdmes").html("密码管理");
						$(".pwdupdate").css("display","none")
						$(".mestip>div").html("√").css("color","green");
						$(".mestip>span").html("密码修改成功，请重新登陆！").css("color","white");
						$(".mestip").css("display","block");
						setTimeout(function() {
							 $(".mestip").css("display","none");
							 window.location.href="../html/login.html";
						}, 1000);
						
                    }else{
						$(".mestip>div").html("x").css("color","red");
						$(".mestip>span").html("请填写新密码").css("color","white");
						$(".mestip").css("display","block");
						setTimeout(function() {
							 $(".mestip").css("display","none");
						}, 1000);
						
                    }
                    
                }else if($(".newpwd").val()==""){
                   $(".mestip>div").html("x").css("color","red");
                   $(".mestip>span").html("请填写信息").css("color","white");
                   $(".mestip").css("display","block");
                   setTimeout(function() {
                   	 $(".mestip").css("display","none");
                   }, 1000);
					
                }else{
           
					$(".mestip>div").html("x").css("color","red");
					$(".mestip>span").html("旧密码不匹配").css("color","white");
					$(".mestip").css("display","block");
					setTimeout(function() {
						 $(".mestip").css("display","none");
					}, 1000);
					
                }
                
            }
        })
    }
    }
}
	searchcc(){
		var that=this;
		let keyword=["手机","手表","电脑","家居","配件"]
		$(".searchBtn").click(function(){
			keyword.some(function(val,index){
				if(val==$(".searchword").val()){
					that.key=index;
					localStorage.setItem("id",that.key);
				}
			})
		})
	}
}
new Index();