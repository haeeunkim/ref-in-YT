const MIN = 10;
const MAX = 300;
const COUNT = 10;
const numbers = [];

let player;
let refbutton;
let STARTTIME, ENDTIME;
let REFSTATE = "null";
let CURRENT_REF;


$().ready(function() {
  $("#text").html("Text added by jQuery code.");
});





const objects = [
  {
    starttime: 1, endtime: 7, id: "bibAlarm",
    button_text: "Check references of this video ",
  },

];


// YouTube API credentials
const API_KEY = "AIzaSyAbjDRiwBgSX2HcFDHfzIszJsKoj3st46I";
const VIDEO_ID = "NRUEc_QryY0"; 
const API_URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${VIDEO_ID}&key=${API_KEY}`;
let description;


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

    
    description = metadata.description;
    //document.getElementById('likes').textContent = statistics.likeCount;
    //document.getElementById('dislikes').textContent = statistics.dislikeCount;
    // Add more properties as needed



  })
  .catch(error => console.error(error));


  $(document).ready(function() {
    // Button 1 click action
    $('#btn1').click(function() {
      //.css("word-wrap: break-word;word-break: normal;white-space: pre-wrap;")
      $('#displayText').text(description).css('white-space', 'pre-wrap');
    });
  
    // Button 2 click action
   
  $('#btn2').click(function() {
    $.ajax({
      url: 'bibliography.html', // Replace with the path to your local HTML file
      dataType: 'html',
      success: function(data) {
        $('#displayText').html(data);
      },
      error: function(xhr, status, error) {
        console.error('Failed to load HTML content:', error);
      }
    });
});
  });




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


function clickReferenceButton() {
  
  $.ajax({
    url: 'bibliography.html', // Replace with the path to your local HTML file
    dataType: 'html',
    success: function(data) {
      $('#displayText').html(data);
    },
    error: function(xhr, status, error) {
      console.error('Failed to load HTML content:', error);
    }
  });
}


function clickDescription() {
  document.getElementById("YT-description").style.visibility = "display";  
}



