function openNav() {
    document.getElementById("mySidenav").style.width = "200px";
    document.getElementById("main").style.marginRight = "200px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
}

// Init controller
var controller = new ScrollMagic.Controller({
  globalSceneOptions: {
    duration: $('section').height(),
    triggerHook: .025,
    reverse: true
  }
});

/*
scene_object = {
  '[scene-name]' : {
    '[target-scene-id]' : '[anchor-href-value]'
  }
}
*/
var scenes = {
  'section-1': {
    'section-1': ['anchor1']
  },
  'section-2': {
    'section-2': ['anchor2']
  },
  'section-3': {
    'section-3': ['anchor3']
  },
  'section-4': {
    'section-4': ['anchor4']
  },
  'section-5': {
    'section-5': ['anchor5']
  },
  'section-6': {
    'section-6': ['anchor6']
  },
  'section-7': {
    'section-7': ['anchor7']
  },
  'section-8': {
    'section-8': ['anchor8']
  },
  'section-9': {
    'section-9': ['anchor9']
  }
};

var current_scene;

for(var key in scenes) {
  // skip loop if the property is from prototype
  if (!scenes.hasOwnProperty(key)) continue;

  var obj = scenes[key];

  for (var prop in obj) {
    // skip loop if the property is from prototype
    if(!obj.hasOwnProperty(prop)) continue;

    new ScrollMagic.Scene({ triggerElement: '#'+prop })
        .setClassToggle('#'+obj[prop][0], 'active')
        .on('enter', function(event) {
          current_scene = event.target;
          var current_id = current_scene.triggerElement().id;
          $(".anchor-nav-side").removeClass("previous next");
          $(".anchor" + (parseInt(current_id.charAt(current_id.length - 1)) - 1)).addClass("previous");
          $(".anchor" + (parseInt(current_id.charAt(current_id.length - 1)) + 1)).addClass("next");
          if (current_id == 'section-9') {
            $("#next-section").hide();
          }
          if (current_id != 'section-1') {
            $(".navbar-brand").find("img").attr('src', "assets/img/instant-logo.png");
            $("#nav-icon-menu").find("img").attr('src', "assets/img/icons/icon-menu.png");
            $("#open-popup").removeClass("btn-white");
            $("#right-nav").show();
          } else {
            $(".navbar-brand").find("img").attr('src', "assets/img/instant-logo-white.png");
            $("#nav-icon-menu").find("img").attr('src', "assets/img/icons/icon-menu-white.png");
            $("#open-popup").addClass("btn-white");
            $("#right-nav").hide();
          }
        })
        .addTo(controller);
  }
}


// Change behaviour of controller
// to animate scroll instead of jump
controller.scrollTo(function(target) {

  TweenMax.to(window, 0.5, {
    scrollTo : {
      y : target,
      autoKill : true // Allow scroll position to change outside itself
    },
    ease : Cubic.easeInOut
  });

});


//  Bind scroll to anchor links using Vanilla JavaScript
var anchor_nav = document.querySelector('.anchor-nav');
var navScroll = function(e) {
  var target = e.target,
      id     = target.getAttribute('href');
  console.log(id);
  if(id !== null) {
    if(id.length > 0) {
      e.preventDefault();
      controller.scrollTo(id);

      if(window.history && window.history.pushState) {
        history.pushState("", document.title, id);
      }
    }
  }
  closeNav();
};
anchor_nav.addEventListener('click', navScroll);
$(".anchor-nav-side").on('click', navScroll);

$('.hoverActiveClass').mouseenter(function(){
  $(this).addClass('active');
  $(this).find("img").attr('src', "assets/img/icons/" + $(this).data('img') + "-blue.png");
});
$('.hoverActiveClass').mouseleave(function(){
  $(this).removeClass('active');
  $(this).find("img").attr('src', "assets/img/icons/" + $(this).data('img') + "-grey.png");
});
$('#next-section').on('click', function(){
  controller.scrollTo("#" + $(current_scene.triggerElement()).parent().next().find("section")[0].id);
});

var container = $("#container");

// Shuffle the contents of container
container.shuffleLetters();

// Leave a 4 second pause

setInterval(function(){

  // Shuffle the container with custom text
  container.shuffleLetters({
    "text": "-- Holidays photos"
  });

},4000);

$("#the-team").on('click', function() {
  $("#our-story-row").removeClass("present");
  $("#the-team-row").addClass("present");
});
$("#our-story").on('click', function() {
  $("#our-story-row").addClass("present");
  $("#the-team-row").removeClass("present");
});
