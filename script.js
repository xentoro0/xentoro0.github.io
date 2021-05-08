const main = document.getElementById("main-div");


var jsonD ;
const options = {
    method: "GET",
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
}
fetch('http://localhost:5501/api')
    .then(res => res.json())
    .then(json => {
        jsonRes(json)
        console.log((json))
    });
function jsonRes(data){
    for(let i = 0;i < 10;i++){
        main.innerHTML += `<div class='clipsDiv'>
                            <iframe class="embedly-embed" src="${data[i].link}" width="600" height="340" scrolling="no" title="Twitch.tv embed" frameborder="0" ></iframe>
                            <h1 class="clipsText">${data[i].title}</h1>
                            </div> \n`;
    }
}