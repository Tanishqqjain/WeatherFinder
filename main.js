function weather(){
    let app = document.getElementsByClassName("root")[0];
    let location = document.getElementById("location").value;
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&APPID=d8ad6d57490e80c4fe38fe48104f6bb2";
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function  () {
        if(request.status >= 200 && request.status < 400){
            let data = JSON.parse(request.response);
            app.innerHTML = (data.main.temp - 273.15).toPrecision(4) + "<sup>o</sup>" + "C";
        }
        else{
            app.innerHTML = "Invalid location";
        }
    }
    request.send();
}
