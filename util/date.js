//用于转换datetime格式
//将new Date()日期格式转换为"2020-03-04 "形式。
let formatDate = function (date) {  
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? '0' + m : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    return y + '-' + m + '-' + d;  
}; 
//将new Date()日期格式转换为"2020-03-05 09:49:29"
let formatDateTime = function (date) { 　　　　　
    　　　　　　　var y = date.getFullYear(); 
                var m = date.getMonth() + 1;  
                    m = m < 10 ? ('0' + m) : m;  
                var d = date.getDate();  
                    d = d < 10 ? ('0' + d) : d;  
                var h = date.getHours();  
                    h=h < 10 ? ('0' + h) : h;  
                var minute = date.getMinutes();  
                    minute = minute < 10 ? ('0' + minute) : minute;  
                var second=date.getSeconds();  
                    second=second < 10 ? ('0' + second) : second;  
                return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second; 
    　　}
/**以下转换成时间戳的格式 */
//转成的时间戳是年月日 时分秒 把毫秒改成000显示,传入格式new Date()标准格式
let timestamp1=function(date){
    return Date.parse(date)
}
//转成的时间戳是年月日 时分秒毫秒
let timestamp2=function(date){
    return date.valueOf();
}
//转成的时间戳是年月日 时分秒毫秒
let timestamp3=function(date){
    return date.getTime();
}
module.exports={
    formatDate,
    formatDateTime,
    timestamp1,
    timestamp2,
    timestamp3
}