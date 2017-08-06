var counter = 0;

var images;

var background = (Math.floor(Math.random() * 3)) + 1;

var timeoutID = 0;

$(function() {
  timeoutID = setTimeout(function() {
    window.location.href = '../';
  }, 15000);
  $('body').on('click', '.edited .clickableArea', spotted);
  $('.startButton').on('click', function() {
    $('#startScreen').hide();
    init();
  });

  $('.newPhotosButton').on('click', function() {
    $('#endWinScreen').hide();
    init();
  });

  $('.tryAgainButton').on('click', function() {
    $('#endLoseScreen').hide();
    init();
  });
});

var init = function() {
  if (!images) {
    loadData();
  } else {
    counter = 0;
    $('.clickableArea').remove();
    $('#scoreItems p').remove();
    randomizeBackground();
    randomizeImages();
    delayCountdownForImagesToFullyLoad();
  }
}


var loadData = function() {
  $.getJSON("assets/js/images.json", function(data) {
    images = data.images;
    init();
  });
}


var populateBoard = function(index) {
  var pathtoImages = "assets/images/photos/";
  $('.original img').attr('src', pathtoImages + images[index].original);
  $('.edited img').attr('src', pathtoImages + images[index].edit);
  for (var i = 0; i < images[index].hotspots.length; i++) {
    var region = $('<div class="clickableArea"></div>').appendTo('.edited');
    var region2 = $('<div class="clickableArea"></div>').appendTo('.original');
    $('#background' + background + ' #scoreItems').append('<p>' + (i + 1) + '</p>');
    region.css({
      left: images[index].hotspots[i].left,
      top: images[index].hotspots[i].top,
      height: images[index].hotspots[i].height,
      width: images[index].hotspots[i].width
    });
    region2.css({
      left: images[index].hotspots[i].left,
      top: images[index].hotspots[i].top,
      height: images[index].hotspots[i].height,
      width: images[index].hotspots[i].width
    });
  }
}

var randomizeImages = function() {
  var item = Math.floor(Math.random() * images.length);
  populateBoard(item);
}

var randomizeBackground = function() {
  if (background == 1) {
    $('#background1').show();
  }
  if (background == 2) {
    $('#background2').show();
  }
  if (background == 3) {
    $('#background3').show();
  }
}

var delayCountdownForImagesToFullyLoad = function () {
  setTimeout(countdown, 1000);
}

var spotted = function() {
  if ($(this).hasClass('spotted')) {
    return;
  }
  $(this).addClass('spotted');
  var index = $('.edited .clickableArea').index($(this));
  $('.original .clickableArea').eq(index).addClass('spotted');
  counter++;
  $('#scoreItems p').eq(counter - 1).addClass('spotted');
  if (counter == $('#scoreItems p').length) {
    setTimeout(win, 500);
  } else if ((counter != $('#scoreItems p').length - 1) || (counter != $('#scoreItems p').length - 2)) {
    return;
  } else {
    lose();
  }
}


var win = function() {
  $('#background' + background + ' h2').runner('stop');
  $('#background' + background).hide();
  $('#endWinScreen').show();
  if (timeoutID !== null) {
    clearTimeout(timeoutID);
  }
  timeoutID = setTimeout(function () {
      window.location.href = '../';
  }, 10000);
}



var lose = function() {
  $('#background' + background + ' h2').runner('stop');
  $('#background' + background).hide();
  $('#endLoseScreen').show();
  if (timeoutID !== null) {
    clearTimeout(timeoutID);
  }
  timeoutID = setTimeout(function () {
      window.location.href = '../';
  }, 10000);

}

var countdown = function() {
  clearTimeout(timeoutID);
  $('#background' + background + ' h2').runner({
    autostart: true,
    countdown: true,
    startAt: $('#scoreItems p').length * 15000,
    stopAt: 0,
    milliseconds: false
  }).on('runnerFinish', function() {
    var noTime = $('#background' + background + ' h2').runner('info').time;
    if (noTime == 0) {
      lose();
    }
  })


}
