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
    'section-1': 'anchor1'
  },
  'section-2': {
    'section-2': 'anchor2'
  },
  'section-3': {
    'section-3': 'anchor3'
  },
  'section-4': {
    'section-4': 'anchor4'
  },
  'section-5': {
    'section-5': 'anchor5'
  },
  'section-6': {
    'section-6': 'anchor6'
  },
  'section-7': {
    'section-7': 'anchor7'
  },
  'section-8': {
    'section-8': 'anchor8'
  }
};


for(var key in scenes) {
  // skip loop if the property is from prototype
  if (!scenes.hasOwnProperty(key)) continue;

  var obj = scenes[key];

  for (var prop in obj) {
    // skip loop if the property is from prototype
    if(!obj.hasOwnProperty(prop)) continue;

    new ScrollMagic.Scene({ triggerElement: '#'+prop })
        .setClassToggle('#'+obj[prop], 'active')
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

anchor_nav.addEventListener('click', function(e) {
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
