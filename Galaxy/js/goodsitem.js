class goodsItem{
    constructor(){
        this.search = document.querySelector(".search");
        this.cancel = document.querySelector(".cancel");
        this.imgBox = document.querySelector(".imgBox")
        this.bigBox = document.querySelector(".bigBox")
        this.list = document.querySelector(".list")
        this.allnavUrl = "../json/allnav.json"
        this.now=0;
        this.nowIndex=0;
        this.addEvent();
        this.imgshow();
        this.bigImg(this.now);
        this.date();
        this.add()
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
    imgshow(){
        var that = this;
            this.res=JSON.parse(localStorage.getItem("mes"))
            var str =``;
            var str1=``;
            console.log(that.res)
            for(var i=0;i<that.res.allimg.length;i++){
                str+=`<li class="banImg"> <img  src="${that.res.allimg[i]}" alt=""><span></span></li>`;
                str1 +=`<li class="listBtn"></li>`
            }
            that.bigBox.innerHTML=str;
            that.imgBox.innerHTML=str;
            that.list.innerHTML=str1;
            that.banImg = document.querySelectorAll(".imgBox>.banImg");
            for(var i = 0;i<that.banImg.length;i++){
                that.banImg[i].style.left="410px";
                that.banImg[0].style.left=0+"px";
            }
            that.banImg2 = document.querySelectorAll(".bigBox>.banImg");
                that.banImg2[0].style.zIndex=3;
            that.listBtn = document.querySelectorAll(".listBtn") 
            for(var i=0;i<that.listBtn.length;i++){
             
                that.listBtn[i].style.background=`url(${that.res.allimg[i]}) no-repeat center`
                that.listBtn[i].style.backgroundSize="cover";
            }
            $(".listBtn").eq(that.nowIndex).css("border","1px solid black")
            for(var i=0;i<that.listBtn.length;i++){
                that.listBtn[i].index = i;
                that.listBtn[i].onclick =function(){
                    that.now=this.index;
                    $(".bigBox>.banImg").css("display","none")
                    $(".bigBox>.banImg").eq($(this).index()).css("display","block")
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
                    $(".listBtn").css("border","0").eq(that.nowIndex).css("border","1px solid black")
                    that.bigImg(that.now) 
                }
            }   
   
   
    }
    bigImg(now){
        var that=this;
        this.imgBox = document.querySelector(".imgBox");
        this.span = document.querySelectorAll(".imgBox span");
        this.goodsmain = document.querySelector(".goodsmain");
        this.bigBox = document.querySelector(".bigBox");
        this.img = document.querySelectorAll(".bigBox img")
        this.imgBox.onmouseover = function () {
            that.span[now].style.display = "block";
            that.bigBox.style.display = "block";
            document.body.style.overflow="hidden";
        }
        this.imgBox.onmouseout = function(){
            that.span[now].style.display = "none";
            that.bigBox.style.display = "none";
            document.body.style.overflow="visible";
        }
        this.move(now);
    }
    move(now){
        var that = this;
            this.imgBox.onmousemove = function(eve){
                var e = eve ;   
                var l =  e.clientX-that.goodsmain.offsetLeft-that.span[now].offsetWidth/2;
                var t = e.clientY-that.goodsmain.offsetLeft/2-that.span[now].offsetHeight/2;
                if(l<0) l=0;
                if(t<0) t=0;
                if(l>that.imgBox.offsetWidth-that.span[now].offsetWidth){
                    l=that.imgBox.offsetWidth-that.span[now].offsetWidth;
                }
                if(t>that.imgBox.offsetHeight-that.span[now].offsetHeight){
                    t=that.imgBox.offsetHeight-that.span[now].offsetHeight;
                }
                that.span[now].style.left =l+"px";
                that.span[now].style.top = t+"px";
                that.show(now);
            }       
    }
    show(now){
        this.img[now].style.left =this.span[now].offsetLeft/(this.imgBox.offsetWidth-this.span[now].offsetWidth)*(this.bigBox.offsetWidth-this.img[now].offsetWidth)+"px";
        this.img[now].style.top =this.span[now].offsetTop/(this.imgBox.offsetHeight-this.span[now].offsetHeight)*(this.bigBox.offsetHeight-this.img[now].offsetHeight)+"px";
    }
    date(){
        this.tip = document.querySelector(".tip");
        this.name = document.querySelector(".name");
        this.price = document.querySelector(".price");
        this.mes = JSON.parse(localStorage.getItem("mes"));
        this.tip.innerHTML = this.mes.descr;
        this.name.innerHTML = this.mes.hotname;
        this.price.innerHTML = this.mes.price;
    }
    add(){
        this.addcart = document.querySelector(".addcart");
        
        this.addcart.onclick = function(){
            let arr =[];
            let carcount={};
            let nowcart = JSON.parse(localStorage.getItem("mes"));
            carcount.src=nowcart.src;
            carcount.price=nowcart.price;
            carcount.hotname=nowcart.hotname;
            carcount.num=1;
                arr.push(carcount);
           if(localStorage.hasOwnProperty("cart")){
            let cart = JSON.parse(localStorage.getItem("cart"));
                for(var i=0;i<cart.length;i++){
                    if( carcount.hotname==cart[i].hotname){
                        alert("商品已存在")
                        break;
                    }else{
                        for(var j=0;j<cart.length;j++){
                            arr.push(cart[i])
                        }
                        alert("添加成功")
                        localStorage.setItem("cart",JSON.stringify(arr))
                        break;
                    }
                }
           }else{
            localStorage.setItem("cart",JSON.stringify(arr))
           }
        }
    }
}

new goodsItem();