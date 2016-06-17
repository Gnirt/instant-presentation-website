var scrollingScreen = false;
var current_offscene = $("body").scrollTop();
// Init controller
var controller = new ScrollMagic.Controller({
  globalSceneOptions: {
    duration: $('section').height(),
    triggerHook: 0.025,
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
        // .setClassToggle('#'+obj[prop][0], 'active')
        .on('enter', function(event) {
          current_scene = event.target;
          if ($(current_scene.triggerElement()).offset().top !== 0) {
            current_offscene = $(current_scene.triggerElement()).offset().top;
          }
          var current_id = current_scene.triggerElement().id;
          $(".anchor-nav-side").removeClass("previous next active");
          $(".anchor" + (parseInt(current_id.charAt(current_id.length - 1)) - 1)).addClass("previous");
          $(".anchor" + current_id.charAt(current_id.length - 1)).addClass("active");
          $(".anchor" + (parseInt(current_id.charAt(current_id.length - 1)) + 1)).addClass("next");
          if (current_id == 'section-9') {
            $("#next-section").hide();
          }
          if (current_id != 'section-1') {
            $(".navbar-brand").find("img").attr('src', "assets/img/instant-logo.png");
            $("#nav-icon-menu").find("img").attr('src', "assets/img/icons/icon-menu.png");
            $("#open-popup").removeClass("btn-white");
            // $("#right-nav").show();
          } else {
            $(".navbar-brand").find("img").attr('src', "assets/img/instant-logo-white.png");
            $("#nav-icon-menu").find("img").attr('src', "assets/img/icons/icon-menu-white.png");
            $("#open-popup").addClass("btn-white");
            // $("#right-nav").hide();
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
var navScroll = function(e) {
  var target = e.target,
      id     = target.getAttribute('href');

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
$(".anchor-nav-side").on('click', navScroll);

$('#next-section').on('click', function(){
  controller.scrollTo("#" + $(current_scene.triggerElement()).next()[0].id);
});

$("body").mousewheel(function(event, delta) {
    if ( !scrollingScreen ) {
        scrollingScreen = true; // Throttles the call
        // Finds slide headers above/below the last scroll top
        var candidates = $(".slider").filter(function() {
            if ( delta < 0 )
                return $(this).offset().top > current_offscene + 1;
            else
                return $(this).offset().top < current_offscene - 1;
        });
        // If one of more are found, updates top
        if ( candidates.length > 0 ) {
            if ( delta < 0 )
                current_offscene = candidates.first().offset().top;
            else if ( delta > 0 )
                current_offscene = candidates.last().offset().top;
        }
        // Performs an animated scroll to the right place
        $("html,body").animate({ scrollTop:current_offscene }, 800, "swing", function() {
          setTimeout(function () {
              scrollingScreen = false; // Releases the throttle
          }, 500);
        });
    }
    return false; // Prevents default scrolling
});
