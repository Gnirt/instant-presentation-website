var $bgvid = $('#bgvid')
document.getElementById("vidpause").addEventListener("click", function() {
  var bgvid = document.getElementById("bgvid");
  if (bgvid.requestFullscreen) {
    bgvid.requestFullscreen();
  } else if (bgvid.mozRequestFullScreen) {
    bgvid.mozRequestFullScreen();
  } else if (bgvid.webkitRequestFullscreen) {
    bgvid.webkitRequestFullscreen();
  }
  $bgvid.prop('muted', false);
});
document.getElementById("screencast-img").addEventListener("click", function() {
  var elem = document.getElementById("screencast");
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  }
  elem.play();
  // $("video").prop('muted', false);
});

$bgvid.bind('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e) {
    var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
    var event = state ? 'FullscreenOn' : 'FullscreenOff';
    if (event == "FullscreenOff")
      $bgvid.prop('muted', true);
});
