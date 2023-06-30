const MIN = 10;
const MAX = 300;
const COUNT = 10;
const numbers = [];

let player;
let refbutton;
let STARTTIME, ENDTIME;
let REFSTATE = "null";
let CURRENT_REF;

// a dummy referernce list in objects.
// todo: check id integrity?
// id 



const objects = [
  {
    starttime: 1, endtime: 7, id: "bibID_1",
    button_text: "sample reference indicator 1",
    url: "https://www.youtube.com/watch?v=lXfEK8G8CUI&t=499s",
    annotation_text: "this is an annotation text for sample 1"
  },
  {
    starttime: 10, endtime: 15, id: "bibID_2",
    button_text: "sample reference indicator 2 sample reference indicator 2",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S1090513819302429?via%3Dihub",
    annotation_text: "this is an annotation text for sample 2"
  },

  {
    starttime: 48, endtime: 54, id: "bibID_3",
    button_text: "sample reference indicator 3",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S1090513819302429?via%3Dihub",
    annotation_text: "this is an annotation text for sample 3"
  },

  {
    starttime: 72, endtime: 85, id: "bibID_4",
    button_text: "sample reference indicator 4",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S1090513819302429?via%3Dihub",
    annotation_text: "this is an annotation text for sample 4"
  },

  {
    starttime: 102, endtime: 120, id: "bibID_5",
    button_text: "sample reference indicator 5",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S1090513819302429?via%3Dihub",
    annotation_text: "this is an annotation text for sample 5"
  },

  {
    starttime: 125, endtime: 140, id: "bibID_6",
    button_text: "sample reference indicator 6",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S1090513819302429?via%3Dihub",
    annotation_text: "this is an annotation text for sample 6"
  },



];


// YouTube API credentials
const API_KEY = "AIzaSyAbjDRiwBgSX2HcFDHfzIszJsKoj3st46I";
const VIDEO_ID = "M-K7mxdN62M"; // a dummy YT id
const API_URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${VIDEO_ID}&key=${API_KEY}`;

// Make an HTTP GET request to the API endpoint using fetch
fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    // Extract the video metadata from the API response
    const metadata = data.items[0].snippet;
    const statistics = data.items[0].statistics;

    // Display the video metadata on the webpage
    
    document.getElementById('video-title').textContent = metadata.title;
    document.getElementById('video-basicinfo').textContent = `${metadata.channelTitle}    ${statistics.likeCount}`; // change to subscriber count

    
    //document.getElementById('description').textContent = metadata.description;
    //document.getElementById('likes').textContent = statistics.likeCount;
    //document.getElementById('dislikes').textContent = statistics.dislikeCount;
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
/*
  refbutton.addEventListener('mouseover', function () {
    document.getElementById("monitor").textContent = "mouseover±±±±";
    refbutton.classList.add("button-preview");
    REFSTATE = "preview";
  });

  refbutton.addEventListener('mouseout', function () {
    document.getElementById("monitor").textContent = "mouseout---";
    refbutton.classList.remove("button-preview");
    REFSTATE = "standby";
  });

  refbutton.addEventListener('touchstart', function () {
    document.getElementById("monitor").textContent = "touchstart";
    refbutton.classList.add("button-preview");
    REFSTATE = "preview";
  });

  refbutton.addEventListener('touchend', function () {
    document.getElementById("monitor").textContent = "touchend---";
    refbutton.classList.remove("button-preview");
    REFSTATE = "standby";
  });
*/

  // think again about where to put this
  $('read_more').attr("id", "bibliography");
  $.each(objects, function (i, objects) {
    $("#bibliography").append("<li><a href='" + objects.url + "'  id=" + objects.id + ">" + objects.annotation_text + "</a></li>");
    // Todo: remove duplicates
    // Todo: how to address the elements?
  })

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
    CURRENT_REF = obj;

    if (currentTime >= obj.starttime && currentTime <= obj.endtime) {
      document.getElementById("_ref").style.visibility = "visible";
      document.getElementById('button_text').textContent = obj.button_text;
      refbutton.classList.add("button-expand"); 
      break; // Exit the loop once the current object is found
    }
    refbutton.classList.remove("button-expand");  //todo: i want to make this disappear smoothly
    document.getElementById("_ref").style.visibility = "hidden";
  }
}






function updateTime() {
  const time = player.getCurrentTime();
  //document.getElementById('time').textContent = time;
  traverseList(time);


}


const sleep = ms => new Promise(res => setTimeout(res, ms));

// TODO: how to work with the video play/pause button
// traverse the list regardless of the button interaction
// let the player go? i personally prefer "stop to ponder" approach, but it's simpler interaction-wise.
function clickReferenceButton() {
  if (player && player.getPlayerState() === YT.PlayerState.PLAYING) {
    player.pauseVideo();
    document.getElementById(CURRENT_REF.id).style.backgroundColor = "yellow";

  } else {
    player.playVideo();
    document.getElementById(CURRENT_REF.id).style.backgroundColor = "";
  }
}




