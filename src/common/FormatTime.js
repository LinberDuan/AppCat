/**
 * Author: LinberDuan
 * Create Time: 2018-03-20 10:44
 * Description:
 */

/*毫秒级时间戳 转 yyyy-MM-DD HH:mm-ss*/
export const formatDateTime = (timeStamp) => {

    let times = timeStamp.length >=13 ? timeStamp / 1000: timeStamp;
    let date = new Date();
    date.setTime(times);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let minute = date.getMinutes();
    let second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
};


/*毫秒级时间戳 转 yyyy-MM-DD*/
export const formatDateTimesForSimple = (timeStamp) => {

    let times = timeStamp.length >=13 ? timeStamp / 1000: timeStamp;
    let date = new Date();
    date.setTime(times);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
};

/*毫秒级时间戳 转 MM/DD*/
export const formatDateTimesForMD = (timeStamp) => {


    let times = timeStamp.length >=13 ? timeStamp / 1000: timeStamp;
    let date = new Date();
    date.setTime(times);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return m + '/' + d;
};


export const formatDate = (timeStamp) => {

    let times = timeStamp.length >=13 ? timeStamp / 1000: timeStamp;
    let date = new Date();
    date.setTime(times);
    let yy = date.getFullYear();
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? ('0' + MM) : MM;
    let DD = date.getDate();
    DD = DD < 10 ? ('0' + DD) : DD;
    let HH = date.getHours();
    HH = HH < 10 ? ('0' + HH) : HH;
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    mm = mm < 10 ? ('0' + mm) : mm;
    ss = ss < 10 ? ('0' + ss) : ss;

    return {yy, MM, DD, HH, mm, ss}
};
