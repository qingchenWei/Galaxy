class goodsItem{
    constructor(){
        this.search = document.querySelector(".search");
        this.cancel = document.querySelector(".cancel");
        this.allnavUrl = "../json/allnav.json"
        this.now=0;
        this.nowIndex=0;
        this.addEvent();
        this.display();
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
                    console.log($(this).index())
                    console.log(that.allnavRes[that.i][0][$(this).index()])
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
        for(var i=0;i<this.cartGoods.length;i++){
            str += ` <tr align="center">
            <td><input type="checkbox"></td>
            <td><img src="${this.cartGoods[i].src}"></td>
            <td><span>${this.cartGoods[i].hotname}</span></td>
            <td><span>${this.cartGoods[i].price}</span></td>
            <td>
                <input type="button" value="-">
                <span>${this.cartGoods[i].num}</span>
                <input type="button" value="+">
            </td>
            <td><span>${(parseInt((this.cartGoods[i].price).toString().substr(1)))*(parseInt(this.cartGoods[i].num))}</span></td>
            <td><input type="button" value="删除"></td>
        </tr>`
        }
        $(".box").html(str);
    }
}
new goodsItem();