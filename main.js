var count = 0;
var map = null;
document.getElementById('location').onkeypress = function(e) {
    if(e.keyCode == 13) {
        // alert('You pressed enter!');
        weather();
    }
}
let MAP = function(latitude, longitude) {
    count++;
    L.mapquest.key = 'GK0Kohi9O60IhyOrQPTEwKcDc5OyyjHw';
    map = L.mapquest.map('place', {
      center: [latitude, longitude],
      layers: L.mapquest.tileLayer('map'),
      zoom: 10
    });
    console.log(map);
    L.marker([latitude, longitude]).addTo(map);
    map.addControl(L.mapquest.control());

}
function weather(){
    document.getElementById('place').style.display = "block";
    let app = document.getElementsByClassName("root")[0];
    let location = document.getElementById("location").value;
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&APPID=d8ad6d57490e80c4fe38fe48104f6bb2";
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function  () {
        if(request.status >= 200 && request.status < 400){
            let data = JSON.parse(request.response);
            let longitude = data.coord.lon;
            let latitude = data.coord.lat;
            let temp = (data.main.temp - 273.15).toPrecision(4) + "<sup>o</sup>" + "C";
            app.innerHTML = temp;
            if( count != 0){
                map.remove();
            }
            MAP(latitude, longitude);
        }
        else{
            app.innerHTML = "Invalid location";
            document.getElementById('place').style.display = "none";
        }
    }
    request.send();
}

