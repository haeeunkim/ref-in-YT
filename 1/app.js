const MIN = 10;
const MAX = 300;
const COUNT = 10;
const numbers = [];

let player;
let refbutton;
let STARTTIME, ENDTIME;
let REFSTATE = "null";
let button_text = "arnstei et al. 1923";

const objects = [
    {starttime: 1, endtime: 7, button_text: "sample reference indicator 1", url: "https://www.youtube.com/watch?v=lXfEK8G8CUI&t=499s"},
    {starttime: 10, endtime: 15, button_text: "sample reference indicator 2 sample reference indicator 2", url: "https://www.sciencedirect.com/science/article/abs/pii/S1090513819302429?via%3Dihub"},

];






// Replace YOUR_API_KEY with your YouTube Data API key
const API_KEY = "AIzaSyAbjDRiwBgSX2HcFDHfzIszJsKoj3st46I";

// Replace VIDEO_ID with the ID of the YouTube video you want to retrieve metadata for
const VIDEO_ID = "M-K7mxdN62M";

// Define the URL of the API endpoint to retrieve the video metadata
const API_URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${VIDEO_ID}&key=${API_KEY}`;

// Make an HTTP GET request to the API endpoint using fetch
fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        // Extract the video metadata from the API response
        const metadata = data.items[0].snippet;
        const statistics = data.items[0].statistics;

        // Display the video metadata on the webpage
        document.getElementById('title').textContent = metadata.title;
        document.getElementById('description').textContent = metadata.description;
        document.getElementById('channelTitle').textContent = metadata.channelTitle;


        document.getElementById('likes').textContent = statistics.likeCount;
        document.getElementById('dislikes').textContent = statistics.dislikeCount;

        //console.log(metadata);
        //console.log(statistics);
        // Add more properties as needed
    })
    .catch(error => console.error(error));


function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: VIDEO_ID,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange

        }
    });  

}

function onPlayerReady(event) {
    setInterval(updateTime, 1);
    console.log("onplayerready set, interval set.");
    refbutton = document.getElementById("_ref");
    
    refbutton.addEventListener('mouseover', function(){
      document.getElementById("monitor").textContent = "mouseover±±±±";
      refbutton.classList.add("button-preview");
    });

    refbutton.addEventListener('mouseout', function(){
      document.getElementById("monitor").textContent = "mouseout---";
      refbutton.classList.remove("button-preview"); 
    });
    
    refbutton.addEventListener('touchstart', function(){
      document.getElementById("monitor").textContent = "touchstart";
      refbutton.classList.add("button-preview");
    });

    refbutton.addEventListener('touchend', function(){
      document.getElementById("monitor").textContent = "touchend---";
      refbutton.classList.remove("button-preview");
    });
  
}
var done = false;
var count = 0;
function onPlayerStateChange(event) {
    // if playing, calcula
    console.log("statechange alert %d %s", count, event.data);
    count = count + 1;
}

function displaySomething() {

}


function traverseList(currentTime) {
    
    for (let i = 0; i < objects.length; i++) {
      const obj = objects[i];
      
      if (currentTime >= obj.starttime && currentTime <= obj.endtime) {
        document.getElementById("_ref").style.visibility = "visible";
        REFSTATE = 'standby';


        document.getElementById('button_text').textContent = obj.button_text;
        // Perform operations for the current object
        
        // Add any other logic or operations here
        break; // Exit the loop once the current object is found
      }
      document.getElementById("_ref").style.visibility = "hidden";
    }
  }


  
  


function updateTime() {
    const time = player.getCurrentTime();
    //document.getElementById('time').textContent = time;
    traverseList(time);
    

}



/*
refbutton.addEventListener('touchend', function(){
  refbutton.classList.remove("button-preview");
  refbutton.classList.add("button-standby");
});
*/



const sleep = ms => new Promise(res => setTimeout(res, ms));

function clickReferenceButton() {
    
    console.log('pause the video');
    console.log('and new tab leading to a reference page.');

if (player && player.getPlayerState() === YT.PlayerState.PLAYING) {
    player.pauseVideo();
    console.log("pause toggle");
    document.getElementById("metadata-field").style.visibility = "visible";
  } else {
    player.playVideo();
    console.log("play toggle");
    document.getElementById("metadata-field").style.visibility = "hidden";
  }
    

    //window.open("https://www.educative.io/", "_blank");
  }


    

