// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
let player1;
  function onYouTubeIframeAPIReady() {


      const play = document.getElementById("bouton")
      play.onclick = toggleAudio1;

      player1 = new YT.Player('youtube-player1', {
        height: '0',
        width: '0',
        videoId: "",
        playerVars: {
          autoplay: 0,
          loop: 1,
        },
        events: {
          'onReady': onPlayerReady1,
          'onStateChange': onPlayerStateChange1 
        } 
      });
  } 


  function toggleAudio1() {
    if ( player1.getPlayerState() == 1 || player1.getPlayerState() == 3 ) {
      player1.pauseVideo(); 
    } else {
      player1.playVideo(); 
    } 
  }  

  function onPlayerReady1(event) {
    event.target.setVolume(10);
    player1.setPlaybackQuality("small");
  }

  function onPlayerStateChange1(event) {
    if (event.data === 0) {
      const check = document.getElementById("bouton");
      check.checked = true 
    }
  }

  function changerVideo(idVideo) {
    player1.loadVideoById(idVideo);
  }

function pauseVideo() {
  player1.pauseVideo()
}

function volumeVideo(volume) {
  player1.setVolume(volume)
}