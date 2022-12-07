#!C:/Program Files/nodejs/node.exe
console.log("Content-type: text/html\r\n");
let fs = require("fs");

process.stdin.setEncoding("utf-8");
process.stdin.on("readable", to_do_list);

function to_do_list(){
    let html = fs.readFileSync("./to_do_list.html", "utf-8");
    let list_json = fs.readFileSync("./to_do_list.json", "utf-8");
    let list = JSON.parse(list_json);
    let query_string = process.stdin.read();
    res = "";
    if(query_string!==null){
        query_string_parts = query_string.split("=");
        data = query_string_parts[1];
        list.unshift(data);
    }
    for(let str of list){
        res = res + "<li>" + str + "</li>";
    }
    html = html.replace("<!--#res-->", res);
    console.log(html);
    let str_json = JSON.stringify(list, null, '    ');
    fs.writeFileSync("./to_do_list.json", str_json);
    return html;
}
to_do_list();