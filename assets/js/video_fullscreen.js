var vid = document.getElementById("bgvid"),
pauseButton = document.getElementById("vidpause");

function vidFade() {
  vid.classList.add("stopfade");
}

vid.addEventListener('ended', function() {
  // only functional if "loop" is removed
  vid.pause();
  // to capture IE10
  vidFade();
});

pauseButton.addEventListener("click", function() {
  var elem = document.getElementById("bgvid");
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  }
  // $(".video-hide").hide();
  // vid.classList.toggle("stopfade");
  // if (vid.paused) {
  //   vid.play();
  //   pauseButton.innerHTML = "Pause";
  // } else {
  //   vid.pause();
  //   $(".video-hide").show();
  //   pauseButton.innerHTML = "Watch the trailer";
  // }
});
