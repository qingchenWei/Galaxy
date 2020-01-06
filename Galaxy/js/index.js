class Index{
    constructor(){
        this.search = document.querySelector(".search");
        this.cancel = document.querySelector(".cancel");
        this.imgBox = document.querySelector(".imgBox");
        this.list = document.querySelector(".list");
        this.new = document.querySelector(".new");
        this.hot = document.querySelector(".hot");
        this.left = document.querySelector(".left");
        this.watchMain = document.querySelector(".watch-main");
        this.iphoneMain = document.querySelector(".iphone-main");
        this.watchLeft = document.querySelector(".watchleft");
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
        this.index = 0;
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
                    str+= `<a href="##"><li >
                    <img  src="${that.allnavRes[that.i][0][i].src}"><span class="hotname">${that.allnavRes[that.i][0][i].hotname}</span>
                    </li></a>`;
                }
                for(var j=0;j<that.allnavRes[that.i][1].length;j++){
                    str1 += `<li><a href="../html/goodslist.html">${that.allnavRes[that.i][1][j]}</a></li>`
                }
                $(".nav-img").html(str);  
                $(".nav-small").html(str1); 
                $(".nav-small").children("li").click(function(){
                    localStorage.setItem("index",$(this).index())
                    console.log(111)
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
                str+=`<li class="hotPin">                <span class="hotname">${that.hotRes[i].hotname}</span>
                <span class="descr">${that.hotRes[i].descr}</span> 
                <span class="price">${that.hotRes[i].price}</span> 
                <img  src="${that.hotRes[i].src}">
                <em><img  src="${that.hotRes[i].tip}"></em>
                </li>`;
            }
            that.hot.innerHTML=str;  
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

    }
    watchShow(){
        var that=this;
        this.url = this.watchUrl;
        ajaxGet(this.url,function(res){
            that.wacthRes = JSON.parse(res);
            var str =``;
            var str1 =``;
            for(var i=0;i<that.wacthRes.length-1;i++){
                str+=`<li class="hotPin">
                <img  src="${that.wacthRes[i].src}">       <span class="hotname">${that.wacthRes[i].hotname}</span>
                <span class="descr">${that.wacthRes[i].descr}</span> 
                <span class="price">${that.wacthRes[i].price}</span> 
                </li>`;
            }
            str1 = `<a href="##"><img src="${that.wacthRes[i].src}"></a>`

            that.watchMain.innerHTML=str;  
            that.watchLeft.innerHTML=str1;  
        })

    }
    ajaxGet(){
        var that = this;
        ajaxGet(this.url,function(res){
            that.iphoneRes = JSON.parse(res);
            var str =``;
            var str1 =``;
            for(var i=0;i<that.iphoneRes[that.index].length-1;i++){
                str+=`<li class="hotPin">
                <img  src="${that.iphoneRes[that.index][i].src}"><span class="hotname">${that.iphoneRes[that.index][i].hotname}</span>
                <span class="descr">${that.iphoneRes[that.index][i].descr}</span> 
                <span class="price">${that.iphoneRes[that.index][i].price}</span> 
                </li>`;
            }
            str1 = `<a href="##"><img src="${that.iphoneRes[[that.index]][i].src}"></a>`

            that.iphoneMain.innerHTML=str;  
            that.left.innerHTML=str1;  
        })
    }
    floor(){
        document.onscroll = function(){
            if($(".new").offset().top<=$(document).scrollTop()){
                $(".floor").css({"position":"fixed","left":"100px","top":"72px"})
            }
            if($(".new").offset().top>$(document).scrollTop()){
                $(".floor").css({"position":"absolute","left":"100px","top":"-220px"})
            }
        }
    }
}
new Index();