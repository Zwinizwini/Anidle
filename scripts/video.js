// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
let player1;
  function onYouTubeIframeAPIReady() {

      var ctrlq1 = document.getElementById("youtube-audio1");
      ctrlq1.innerHTML += '<img id="youtube-icon1" src=""/><div id="youtube-player1"></div>';
      ctrlq1.onclick = toggleAudio1;

      player1 = new YT.Player('youtube-player1', {
        height: '0',
        width: '0',
        videoId: "",
        playerVars: {
          autoplay: 0,
          loop: ctrlq1.dataset.loop,
        },
        events: {
          'onReady': onPlayerReady1,
          'onStateChange': onPlayerStateChange1 
        } 
      });
  } 

  function togglePlayButton1(play) {    
    document.getElementById("youtube-icon1").src = play ? "images/pause.png" : "images/bouton-jouer.png";
  }

  function toggleAudio1() {
    if ( player1.getPlayerState() == 1 || player1.getPlayerState() == 3 ) {
      player1.pauseVideo(); 
      togglePlayButton1(false);
    } else {
      player1.playVideo(); 
      togglePlayButton1(true);
    } 
  }  

  function onPlayerReady1(event) {
    player1.setPlaybackQuality("small");
    document.getElementById("youtube-audio1").style.display = "block";
    togglePlayButton1(player1.getPlayerState() !== 5);
  }

  function onPlayerStateChange1(event) {
    if (event.data === 0) {
      togglePlayButton1(false); 
    }
  }

  function changerVideo(idVideo) {
    player1.loadVideoById(idVideo);
  }

function pauseVideo() {
  player1.pauseVideo()
}