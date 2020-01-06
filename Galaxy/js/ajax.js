function ajaxGet(url,cb,data){
    data = data || {};
    var str = "";
    for(var i in data){
        str += `${i}=${data[i]}&`;
    }
    var d = new Date();
    url = url + "?" + str + "__lyt__="+d.getTime();
    var xhr = new XMLHttpRequest();
    xhr.open("get",url,true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            cb(xhr.responseText);
        }
    }
    xhr.send();
}

function ajaxPost(url,cb,data){
    data = data || {};
    var str = "";
    for(var i in data){
        str += `${i}=${data[i]}&`;
    }
    str = str.slice(0,str.length-1);
    var xhr = new XMLHttpRequest();
    xhr.open("post",url,true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            cb(xhr.responseText);
        }
    }
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send(str);
}


function ajaxJsonp(url,cb,data){
    var str = "";
    for(var i in data){
        str += `${i}=${data[i]}&`;
    }
    var d = new Date();
    url = url + "?" + str + "__qft__=" + d.getTime();
    var script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script);
    window[data[data.columnName]] = function(res){
        cb(res);
    }
    script.remove();
}


