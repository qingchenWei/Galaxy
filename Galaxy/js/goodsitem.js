class goodsItem {
    constructor() {
        this.search = document.querySelector(".search");
        this.cancel = document.querySelector(".cancel");
        this.imgBox = document.querySelector(".imgBox")
        this.bigBox = document.querySelector(".bigBox")
        this.list = document.querySelector(".list")
        this.log = document.querySelector(".log");
        this.cartPage = document.querySelector(".cart");
        this.allnavUrl = "../json/allnav.json"
        this.now = 0;
        this.nowIndex = 0;
        this.addEvent();
        this.imgshow();
        this.bigImg(this.now);
        this.date();
        this.add();
        this.showname();
		this.searchcc();
    }
    showname() {
        var that = this;
        let user = JSON.parse(localStorage.getItem("user"));
        user.some(function (val, index) {
            if (val.off == 1) {
                that.i = index;
            }
        })
        if (this.i != undefined) {
            console.log(user[that.i].off)
            if (user[that.i].off === 1) {
                that.log.innerHTML = "<i></i>退出登录";
					that.log.style.color="blue";
                this.log.href = "../html/index.html";
                this.cartPage.href = "../html/cart.html";
                this.log.onclick = function () {
                    user[that.i].off = 0;
                    localStorage.setItem("user", JSON.stringify(user));
                    this.href = "../html/login.html";
                }
            }
            if (user[that.i].off === 0) {
                that.log.innerHTML = "<i></i>登录/注册";
            }
        }
		
    }
    addEvent() {
        var that = this;
        this.search.onclick = function () {
            $(".searchBox").show(500);
        }
        this.cancel.onclick = function () {
            $(".searchBox").hide(500);
        }
        $(".nav-left").children("li").click(function () {
            localStorage.setItem("id", $(this).index())
        })

        $(".nav-left").children("li").hover(function () {
            $(".nav-tip").eq($(this).index()).stop().slideDown(500);
            that.i = $(this).index();
            ajaxGet(that.allnavUrl, function (res) {
                that.allnavRes = JSON.parse(res);
                var str = ``;
                var str1 = ``;
                for (var i = 0; i < that.allnavRes[that.i][0].length; i++) {
                    str += `<li ><a href="../html/goodsitem.html">
                    <img  src="${that.allnavRes[that.i][0][i].src}"><span class="hotname">${that.allnavRes[that.i][0][i].hotname}</span>
                    </a></li>`;
                }
                for (var j = 0; j < that.allnavRes[that.i][1].length; j++) {
                    str1 += `<li><a href="../html/goodslist.html">${that.allnavRes[that.i][1][j]}</a></li>`
                }
                $(".nav-img").html(str);
                $(".nav-small").html(str1);
                $(".nav-small").children("li").click(function () {
                    localStorage.setItem("index", $(this).index())
                })
                $(".nav-img").children("li").click(function () {
                    localStorage.setItem("mes", JSON.stringify(that.allnavRes[that.i][0][$(this).index()]))
                })

            })
        }, function () {
            $(".nav-tip").eq($(this).index()).stop().slideUp()
        })
    }
    imgshow() {
        var that = this;
        this.res = JSON.parse(localStorage.getItem("mes"))
        var str = ``;
        var str1 = ``;
        for (var i = 0; i < that.res.allimg.length; i++) {
            str += `<li class="banImg"> <img  src="${that.res.allimg[i]}" alt=""><span></span></li>`;
            str1 += `<li class="listBtn"></li>`
        }
        
        that.bigBox.innerHTML = str;
        that.imgBox.innerHTML = str;
        that.list.innerHTML = str1;
        that.banImg = document.querySelectorAll(".imgBox>.banImg");
        for (var i = 0; i < that.banImg.length; i++) {
            that.banImg[i].style.left = "410px";
            that.banImg[0].style.left = 0 + "px";
        }
        that.banImg2 = document.querySelectorAll(".bigBox>.banImg");
        that.banImg2[0].style.zIndex = 3;
        that.listBtn = document.querySelectorAll(".listBtn")
        for (var i = 0; i < that.listBtn.length; i++) {

            that.listBtn[i].style.background = `url(${that.res.allimg[i]}) no-repeat center`
            that.listBtn[i].style.backgroundSize = "cover";
        }
        $(".listBtn").eq(that.nowIndex).css("border", "1px solid black")
        for (var i = 0; i < that.listBtn.length; i++) {
            that.listBtn[i].index = i;
            that.listBtn[i].onclick = function () {
                that.now = this.index;
                $(".bigBox>.banImg").css("display", "none")
                $(".bigBox>.banImg").eq($(this).index()).css("display", "block")
                if (this.index > that.nowIndex) {
                    $(".banImg").eq(this.index).css({
                        left: $(".banImg").eq(0).width()
                    }).stop().animate({
                        left: 0,
                    }).end().eq(that.nowIndex).css({
                        left: 0,
                    }).stop().animate({
                        left: -$(".banImg").eq(0).width()
                    })
                }
                if (this.index < that.nowIndex) {
                    $(".banImg").eq(this.index).css({
                        left: -$(".banImg").eq(0).width()
                    }).stop().animate({
                        left: 0,
                    }).end().eq(that.nowIndex).css({
                        left: 0,
                    }).stop().animate({
                        left: $(".banImg").eq(0).width()
                    })
                }
                that.nowIndex = this.index;
                $(".listBtn").css("border", "0").eq(that.nowIndex).css("border", "1px solid black")
                that.bigImg(that.now)
            }
        }


    }
    bigImg(now) {
        var that = this;
        this.imgBox = document.querySelector(".imgBox");
        this.span = document.querySelectorAll(".imgBox span");
        this.goodsmain = document.querySelector(".goodsmain");
        this.bigBox = document.querySelector(".bigBox");
        this.img = document.querySelectorAll(".bigBox img")
        this.imgBox.onmouseover = function () {
            that.span[now].style.display = "block";
            that.bigBox.style.display = "block";
            document.body.style.overflow = "hidden";
        }
        this.imgBox.onmouseout = function () {
            that.span[now].style.display = "none";
            that.bigBox.style.display = "none";
            document.body.style.overflow = "visible";
        }
        this.move(now);
    }
    move(now) {
        var that = this;
        this.imgBox.onmousemove = function (eve) {
            var e = eve;
            var l = e.clientX - that.goodsmain.offsetLeft - that.span[now].offsetWidth / 2;
            var t = e.clientY - that.goodsmain.offsetLeft / 2 - that.span[now].offsetHeight / 2;
            if (l < 0) l = 0;
            if (t < 0) t = 0;
            if (l > that.imgBox.offsetWidth - that.span[now].offsetWidth) {
                l = that.imgBox.offsetWidth - that.span[now].offsetWidth;
            }
            if (t > that.imgBox.offsetHeight - that.span[now].offsetHeight) {
                t = that.imgBox.offsetHeight - that.span[now].offsetHeight;
            }
            that.span[now].style.left = l + "px";
            that.span[now].style.top = t + "px";
            that.show(now);
        }
    }
    show(now) {
        this.img[now].style.left = this.span[now].offsetLeft / (this.imgBox.offsetWidth - this.span[now].offsetWidth) * (this.bigBox.offsetWidth - this.img[now].offsetWidth) + "px";
        this.img[now].style.top = this.span[now].offsetTop / (this.imgBox.offsetHeight - this.span[now].offsetHeight) * (this.bigBox.offsetHeight - this.img[now].offsetHeight) + "px";
    }
    date() {
        this.tip = document.querySelector(".tip");
        this.name = document.querySelector(".name");
        this.price = document.querySelector(".price");
        this.mes = JSON.parse(localStorage.getItem("mes"));
        this.tip.innerHTML = this.mes.descr;
        this.name.innerHTML = this.mes.hotname;
        this.price.innerHTML = this.mes.price;
    }
    add() {
        var that = this;
        this.addcart = document.querySelector(".addcart");
        let arr = [];
        let user = JSON.parse(localStorage.getItem("user"));
        user.some(function (val, index) {
            if (val.off == 1) {
                that.i = index;
            }
        })
        if (this.i != undefined) {
            if (user[that.i].off === 1) {
                this.addcart.onclick = function () {
                    let onff = 0;
                    let carcount = {};
                    let nowcart = JSON.parse(localStorage.getItem("mes"));
                    carcount.src = nowcart.src;
                    carcount.price = nowcart.price;
                    carcount.hotname = nowcart.hotname;
                    carcount.num = 1;
                    arr.push(carcount);
                    if (localStorage.hasOwnProperty("cart")) {
                        let cart = JSON.parse(localStorage.getItem("cart"));
                        for (var i = 0; i < cart.length; i++) {
                            if (cart[i].hotname === carcount.hotname) {
                                $(".mestip>div").html("!").css({"color":"yellow","border":"3px solid yellow"});
                                $(".mestip>span").html("商品已存在").css("color","yellow");
                                $(".mestip").css("display","block");
                                setTimeout(function() {
                                	 $(".mestip").css("display","none");
                                }, 1000);
                                onff = 1;
                                break;
                            }
                        }
                        if (onff == 0) {
                            cart.push(carcount)
                           $(".mestip>div").html("√").css("color","green");
                           $(".mestip>span").html("成功加入购物车!").css("color","white");
                           $(".mestip").css("display","block");
                           setTimeout(function() {
                           	 $(".mestip").css("display","none");
                           }, 1000);
                            localStorage.setItem("cart", JSON.stringify(cart))
                            onff = 0;
                        }

                    } else {
                        localStorage.setItem("cart", JSON.stringify(arr))
                    }
                }
            }
        }else{
            this.addcart.onclick = function () {
                $(".mestip>div").html("!").css({"color":"red","border":"3px solid red"});
                $(".mestip>span").html("请先去登录!").css("color","red");
				$(".mestip").css("display","block");
				setTimeout(function() {
					 $(".mestip").css("display","none");
				}, 1000);
               
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

new goodsItem();