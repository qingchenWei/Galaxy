class goodsItem{
    constructor(){
        this.search = document.querySelector(".search");
        this.cancel = document.querySelector(".cancel");
        this.box = document.querySelector(".box");
        this.clear = document.querySelector(".clear");
        this.log = document.querySelector(".log");
        this.cartPage = document.querySelector(".cart");
        this.allnavUrl = "../json/allnav.json";
        this.now=0;
        this.nowIndex=0;
        this.addEvent();
        this.display();
        this.behavior();
        this.showname();
		this.searchcc();
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
                this.log.innerHTML= "<i></i>退出登录";
                this.log.href="../html/index.html";
				that.log.style.color="blue";
                this.cartPage.href="../html/cart.html";
                this.log.onclick = function(){
                    user[that.i].off=0;
                    localStorage.setItem("user",JSON.stringify(user));
                    this.log.href="../html/login.html";
                }
            }
            if(user[that.i].off===0){
                that.log.innerHTML= "<i></i>登录/注册";
            }
        }
        
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
    display(){
        this.cartGoods=JSON.parse(localStorage.getItem("cart"));
        let str=``;
        this.cartGoods = this.cartGoods? this.cartGoods :[]
        for(var i=0;i<this.cartGoods.length;i++){
            str += ` <tr class="smbox" align="center">
            <td><input class="check" type="checkbox"></td>
            <td><img src="${this.cartGoods[i].src}"></td>
            <td><span class="name">${this.cartGoods[i].hotname}</span></td>
            <td><span>${this.cartGoods[i].price}</span></td>
            <td>
                <input class="les" type="button" value="-">
                <span>${this.cartGoods[i].num}</span>
                <input class="add" type="button" value="+">
            </td>
            <td><span>${(parseInt((this.cartGoods[i].price).toString().substr(1)))*(parseInt(this.cartGoods[i].num))}</span></td>
            <td><input class="delete" type="button" value="删除"></td>
        </tr>`
        }
        $(".box").html(str);
    }
    behavior(){
        var that=this;
        this.cartGoods=JSON.parse(localStorage.getItem("cart"));
        this.box.onclick = function(eve){
            if(eve.target.className=="add"){
                that.cartGoods.some((val,index)=>{
                    if(val.hotname==eve.target.parentNode.previousElementSibling.previousElementSibling.firstElementChild.innerHTML){
                        val.num++;
                        eve.target.previousElementSibling.innerHTML=val.num;
                        eve.target.parentNode.nextElementSibling.firstElementChild.innerHTML=(parseInt((val.price).toString().substr(1)))*(parseInt(val.num));
                    }
                    localStorage.setItem("cart",JSON.stringify(that.cartGoods))
                })
                that.plan()
            }
            if(eve.target.className=="les"){
                that.cartGoods.some((val,index)=>{
                    if(val.hotname==eve.target.parentNode.previousElementSibling.previousElementSibling.firstElementChild.innerHTML){
                        if(val.num>1){
                            val.num--;
                        }else{
                            val.num=1;
                        }         
                        eve.target.nextElementSibling.innerHTML=val.num;
                        eve.target.parentNode.nextElementSibling.firstElementChild.innerHTML=(parseInt((val.price).toString().substr(1)))*(parseInt(val.num));
                    }
                    localStorage.setItem("cart",JSON.stringify(that.cartGoods))
                })
                that.plan()
            }
            if(eve.target.className=="delete"){
                that.cartGoods.some((val,index)=>{
                    if(val.hotname==eve.target.parentNode.previousElementSibling.previousElementSibling.firstElementChild.innerHTML){
                        that.i=index;
                     }
                })
                eve.target.parentNode.parentNode.remove()
                that.cartGoods.splice(that.i,1)
                localStorage.setItem("cart",JSON.stringify(that.cartGoods))
                that.plan()   
            }
        }
        this.clear.onclick = function(){
            that.box.remove()
            localStorage.clear("cart")
        }
        this.arrcheck = document.querySelectorAll(".check");
        this.check = document.querySelector(".allcheck");
        this.check.onclick = function(){
            if(this.checked){
                for(var i=0;i<that.arrcheck.length;i++){
                    that.arrcheck[i].checked=true;
                    that.arrcheck[i].parentNode.parentNode.setAttribute("selected","selected");
                }
                that.plan()
            }else{
                for(var i=0;i<that.arrcheck.length;i++){
                    that.arrcheck[i].checked=false;
                    that.arrcheck[i].parentNode.parentNode.removeAttribute("selected");
                }
                that.plan()
            }
        }
        for(var i=0;i<this.arrcheck.length;i++){
            this.arrcheck[i].index=i;
            this.arrcheck[i].onclick = function(){
                if(this.checked){
                   this.parentNode.parentNode.setAttribute("selected","selected");
                }else{
                    this.parentNode.parentNode.removeAttribute("selected");
                } 
                if(!this.checked){
                    that.check.checked=false;
                }
               that.plan()
            }
        }
    }
    plan(){
        let sumprice=0;
        let sumnum=0;
        this.smbox = document.querySelectorAll(".smbox");
        this.sumprice = document.querySelector(".sumprice");
        this.num = document.querySelector(".num");
        for(var i=0;i<this.smbox.length;i++){
            if(this.smbox[i].getAttribute("selected")){
                console.log(this.smbox[i].children[5])
                sumprice += parseInt(this.smbox[i].children[5].firstElementChild.innerHTML);
                sumnum += parseInt(this.smbox[i].children[4].children[1].innerHTML);
            }
        }
        this.num.innerHTML=sumnum;
        this.sumprice.innerHTML="￥"+sumprice+".00";
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