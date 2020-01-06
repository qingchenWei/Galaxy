const http = require("http");
const url = require("url");
const querystring=require("querystring")
const fs = require("fs");

http.createServer((req,res)=>{
    if(req.url != "/favicon.ico"){
        var pathname = url.parse(req.url).pathname;
        if(pathname ==="/api"){
            ajaxHandle(req,res);
        }else{
            fsHandle(req,res);
        }
    }
}).listen("88","localhost");


function fsHandle(req,res){
    const path = "./../"+url.parse(req.url).pathname;
    console.log(path);
    
    fs.readFile(path,(err,data)=>{
        if(err){
            res.write("404");
        }else{
            res.write(data);
        }
        res.end();
    })
}
function ajaxHandle(req,res){
    let str = "";
    req.on("data",(d)=>{
        str += d;
    })
    req.on("end",()=>{
        // post数据的解析
        let data = querystring.parse(str);
        // 如果post数据在解析之前，为空字符
        if(!str){
            // 那么就去解析get数据
            data = url.parse(req.url,true).query;
        }
        // 无论是get和post，都一视同仁，因为数据都已经被解析成对象了
        res.write(data);
        res.end();
    })
}

