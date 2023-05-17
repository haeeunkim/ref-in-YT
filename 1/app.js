const MIN = 10;
const MAX = 300;
const COUNT = 10;
const numbers = [];


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

        console.log(metadata);
        console.log(statistics);
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
    console.log("time alert");
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

function updateTime() {
    const time = player.getCurrentTime();
    if (time > 5 && time < 15) {
        document.getElementById('time').textContent = time;
        document.getElementById("metadata-field").style.visibility = "visible";
        document.getElementById("changeVideo").style.visibility = "hidden";
        
    }
    else {
        document.getElementById("metadata-field").style.visibility = "hidden";
        document.getElementById("changeVideo").style.visibility = "visible";
    }


}
function handleVideoChange() {
    // Code to change the video
    // For example, you can use the YouTube Player API to load a new video in the player
    console.log('Video changed!');
    console.log('pause the video');
    console.log('and new tab leading to a reference page.');
    window.open("https://www.educative.io/", "_blank");
  }


    

