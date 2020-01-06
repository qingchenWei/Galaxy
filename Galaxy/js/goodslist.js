class goodsList{
    constructor(){
        this.search = document.querySelector(".search");
        this.cancel = document.querySelector(".cancel");
        this.allnavUrl = "../json/allnav.json"
        this.alliphonUrl = "../json/iphone-list.json"
        this.watchallUrl="../json/watch-list.json"
        this.addEvent();
        this.a = localStorage.getItem("id");
        this.liIndex = localStorage.getItem("index");
        this.load(this.a);
        this.listClick()
    }
    load(b){
        let str=``;
        let str0=``;
        let that=this;
        let arrurl=[this.alliphonUrl,this.watchallUrl,this.alliphonUrl,this.watchallUrl,this.alliphonUrl]
        ajaxGet(that.allnavUrl,function(res){
            that.allnavRes = JSON.parse(res);
        for(var j=0;j<that.allnavRes[b][1].length;j++){
            str0 += `<li><a href="##">${that.allnavRes[b][1][j]}</a></li>`
        }
        $(".allList").html(str0);  
        that.listClick();
        })
    ajaxGet(arrurl[b],function(res){
        that.alliphonRes = JSON.parse(res);
    for(var j = 0;j<that.alliphonRes.length;j++){
        for(var i=0;i<that.alliphonRes[j].length;i++){
            str+=`<li>
            <img  src="${that.alliphonRes[j][i].src}"><span class="name">${that.alliphonRes[j][i].hotname}</span>
            <span class="descr">${that.alliphonRes[j][i].descr}</span> 
            <span class="price">${that.alliphonRes[j][i].price}</span> 
            </li>`;
        }
    }
        $(".goods").html(str);  
        that.display(that.liIndex)
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
            that.i = $(this).index();
            that.load(that.i);
        })
        $(".nav-left").children("li").hover(function(){
            $(".nav-tip").eq($(this).index()).stop().slideDown(500);
            that.i = $(this).index();
                var str =``;
                var str1 =``;
                for(var i=0;i<that.allnavRes[that.i][0].length;i++){
                    str+= `<a href="##"><li >
                    <img  src="${that.allnavRes[that.i][0][i].src}"><span class="hotname">${that.allnavRes[that.i][0][i].hotname}</span>
                    </li></a>`;
                }
                for(var j=0;j<that.allnavRes[that.i][1].length;j++){
                    str1 += `<li><a href="##">${that.allnavRes[that.i][1][j]}</a></li>`
                }
                $(".nav-img").html(str);  
                $(".nav-small").html(str1);  
        },function(){
            $(".nav-tip").eq($(this).index()).stop().slideUp()
        })
    }
    listClick(){
        let that = this;
        let arrli=[$(".allList"),$(".nav-small")]
        for(var i=0;i<arrli.length;i++){
            arrli[i].children("li").click(function(){
                that.liIndex=$(this).index();
                that.display(that.liIndex)
        })
        }
            

    }
    display(liIndex){
        let str = ``;
            for(var i=0;i<this.alliphonRes[liIndex].length;i++){
                str+=`<li>
                <img  src="${this.alliphonRes[liIndex][i].src}">       <span class="name">${this.alliphonRes[liIndex][i].hotname}</span>
                <span class="descr">${this.alliphonRes[liIndex][i].descr}</span> 
                <span class="price">${this.alliphonRes[liIndex][i].price}</span> 
                </li>`;
            }
            $(".goods").html(str);  
    }
}
new goodsList();