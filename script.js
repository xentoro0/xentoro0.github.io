const main = document.getElementById("main-div");
const options = document.getElementById("options");
const Time = document.getElementById("Time");
var frame;
var errors = 0;
sendJson();
function change() {
    if(options.value == 'top'){
        Time.style.display = 'inline';
    }else{
        Time.style.display = 'none';
    }
}
window.onload = e => {
    for(let i = 0;i < 10;i++){
        jsonRes(" ", "Title", 0, '"Author"')
    }
}
function jsonRes(link, title, ups, author){
        main.innerHTML +=  `<div class='clipsDiv'>
                                <iframe class="clipsFrame" id="frame" src="${link}" width="600" height="340" scrolling="no" title="Twitch.tv embed" frameborder="0" ></iframe>
                                <p><span>${ups}</span> upvotes</p><p class="author">Posted by user: <span>${author}</span></p>
                                <h1 class="clipsText">${title}</h1>
                            </div> \n`;
        frame = document.getElementById("frame");
}
frame.onload(e => console.log('loaded'));
function fetchData() {
    fetch('http://localhost:5501/api')
        .then(res => res.json())
        .then( json => {
            main.innerHTML = '';
            for(let i = 0;i < 10;i++){
                jsonRes(json.body[i].link, json.body[i].title, json.body[i].upvotes, json.body[i].author)
            }
            console.log(json)
        })
        .catch(err => {
            errors++;
            if(errors < 50){
                fetchData();
                console.log(errors)
            }else{
                alert("Servers currently are offline! \nPlease try again later!");
            }
        })
}

function sendJson() {
    let data = {
        type: options.value,
        time: Time.value
    }
    console.log(data);
    fetch('http://localhost:5501/sendJson', {method:"POST", body: JSON.stringify(data), headers: {'Content-type': 'application/json'}})
        .then(fetchData())
    
}

