$('#nav-icon1').click(function(){
  $('#nav-icon1').toggleClass('open');
  if ($('#nav-icon1').hasClass("open")) {
    openNav();
  } else {
    closeNav();
  }
});
function openNav() {
    document.getElementById("mySidenav").style.width = "200px";
    document.getElementById("main").style.marginRight = "200px";
    document.getElementById("open-popup").style.marginRight = "50px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  $('#nav-icon1').removeClass('open');
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginRight = "0";
  document.getElementById("open-popup").style.marginRight = "30px";
}

$('.hoverActiveClass').mouseenter(function(){
  $(this).addClass('active');
  $(this).find("img").attr('src', "assets/img/icons/" + $(this).data('img') + "-blue.png");
});
$('.hoverActiveClass').mouseleave(function(){
  $(this).removeClass('active');
  $(this).find("img").attr('src', "assets/img/icons/" + $(this).data('img') + "-grey.png");
});

var shuffleWords = $("#shuffle-words");

// Shuffle the contents of container
shuffleWords.shuffleLetters();

setInterval(function(){

  // Shuffle the container with custom text
  var textArray = ["--- Holidays photos", "--- Cats photos", "--- Paris photos", "--- Happy photos", "--- Food photos", "--- Landscape photos", "--- Sunrise photos", "--- Facebook photos"];
  var randomNumber = Math.floor(Math.random()*textArray.length);
  shuffleWords.shuffleLetters({
    "text": textArray[randomNumber]
  });

},3000);

$("#the-team").on('click', function() {
  $("#our-story-row").removeClass("present");
  $("#the-team-row").addClass("present");
});
$("#our-story").on('click', function() {
  $("#our-story-row").addClass("present");
  $("#the-team-row").removeClass("present");
});
$(".navbar-brand").hover(function() {
  //do hover stuff
  $(this).find("img").attr('src', "assets/img/instant-logo.png");
}, function() {
  //do mouseout stuff
  if (current_scene.triggerElement().id == "section-1")
    $(this).find("img").attr('src', "assets/img/instant-logo-white.png");
});
