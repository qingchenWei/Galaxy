class Login{
    constructor(){
        this.btn2 = document.querySelector(".btn2");
        this.login = document.querySelector(".login");
        this.register = document.querySelector(".register");
        this.username = document.querySelector(".username");
        this.tel = document.querySelector(".tel");
        this.tel2 = document.querySelector(".tel2");
        this.password = document.querySelector(".password");
        this.password2 = document.querySelector(".password2");
        this.tip = document.querySelector(".tip");
        this.tip2 = document.querySelector(".tip2");
        this.btn3 = document.querySelector(".btn3");
        this.btn = document.querySelector(".btn");
        this.addEvent();
    }
    addEvent(){
        var that=this;
        let onf=0;
        let onff=0;
        this.btn2.onclick = function(){
            that.login.style.display="none";
            that.register.style.display="block";
        }
        this.username.onblur = function(){
            let reg = /^[\u2E80-\u9FFF\w-]{2,10}$/;
            if(reg.test(this.value)){
                that.tip2.innerHTML = "用户名合格";
                that.tip2.style.color = "green";
                onf=1;
            }else{
                that.tip2.innerHTML = "用户名格式错误";
                that.tip2.style.color = "red";
                onf=0;
            }
        }
        this.tel2.onblur = function(){
            let reg = /^1[0-9]{4}$/;
            if(reg.test(this.value)){
                that.tip2.innerHTML = "手机格式正确";
                that.tip2.style.color = "green";
                onff=1;

            }else{
                that.tip2.innerHTML = "手机格式不正确";
                that.tip2.style.color = "red";
                onff=0;
            }
        }
        let arr =[];
        this.btn3.onclick = function(){
            let userObj={}
            let ii=0;
            if(onff==1&&onf==1&that.password2.value!=""){
                userObj.name = that.username.value;
                userObj.tel = that.tel2.value;
                userObj.password = that.password2.value;
                userObj.off = 0;
                arr.push(userObj)
                if(localStorage.hasOwnProperty("user")){
                    let user = JSON.parse(localStorage.getItem("user"));
                        for(var i=0;i<user.length;i++){
                            if( user[i].tel===that.tel2.value){
                                that.tip2.innerHTML="手机号已被注册";
                                that.tip2.style.color = "red";
                                ii=1;
                                break;
                            }
                        }
                        if(ii==0){
                            user.push(userObj)
                            that.tip2.innerHTML="注册成功，快去登录吧！";
                            localStorage.setItem("user",JSON.stringify(user))
                            ii=0;
                        }
                       
                   }else{
                    localStorage.setItem("user",JSON.stringify(arr));
                   }
              
            }else{
                that.tip2.innerHTML = "确保注册信息正确";
                that.tip2.style.color = "red";
            }
        }
        this.btn.onclick = function(){
            let user = JSON.parse(localStorage.getItem("user"));
            if(that.tel.value==""||that.password.value==""){
                that.tip.innerHTML = "请填写登录信息";
                that.tip.style.color = "red";
            }else{
                let b=0;
                for(let i=0;i<user.length;i++){
                    if(that.tel.value==user[i].tel&&that.password.value==user[i].password){
                        that.tip.innerHTML = "登陆成功,1秒后自动跳转";
                        that.tip.style.color = "green";
                        user[i].off=1;
                        localStorage.setItem("user",JSON.stringify(user))
                        setTimeout(function(){
                            window.location.href="../html/index.html";
                        },500)
                        break;
                    }
                
                    if(that.tel.value!=user[i].tel){
                        b++;
                    }
                    if(b==user.length){
                        that.tip.innerHTML = "该手机号未注册";
                        that.tip.style.color = "red";
                    }
                    if(that.tel.value==user[i].tel&&that.password.value!=user[i].password){
                        that.tip.innerHTML = "密码错误";
                        that.tip.style.color = "red";
                    }
                }
                            
            }
        }
    }
}
new Login();