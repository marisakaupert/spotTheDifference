var counter = 0;

var images;

var background = (Math.floor(Math.random() * 3)) + 1;

var timeoutID = 0;

$(function () {
    timeoutID = setTimeout(function () {
        window.location.href = '../';
    }, 10000);
    $('body').on('click', '.edited .clickableArea', spotted);
    $('.startButton').on('click', function () {
        $('#startScreen').hide();
        init();
    });

    $('.newPhotosButton').on('click', function () {
        $('#endWinScreen').hide();
        init();
    });

    $('.tryAgainButton').on('click', function () {
        $('#endLoseScreen').hide();
        init();
    });
});

var init = function () {
    clearTimeout(timeoutID);
    if (!images) {
        loadData();
    } else {
        counter = 0;
        $('.clickableArea').remove();
        $('#scoreItems p').remove();
        randomizeBackground();
        randomizeImages();
    }
}


var loadData = function () {
    $.getJSON("assets/js/images.json", function (data) {
        images = data.images;
        init();
    });
}


var populateBoard = function (index) {
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

var randomizeImages = function () {
    var item = Math.floor(Math.random() * images.length);
    populateBoard(item);
    countdown();
}

var randomizeBackground = function () {
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

var spotted = function () {
    if ($(this).hasClass('spotted')) {
        console.log('1st click');
        return;
    }
    $(this).addClass('spotted');
    var index = $('.edited .clickableArea').index($(this));
    $('.original .clickableArea').eq(index).addClass('spotted');
    counter++;
    $('#scoreItems p').eq(counter - 1).addClass('spotted');
    if (counter == $('#scoreItems p').length) {
        setTimeout(win, 1000);
    }
}

var win = function () {
    console.log('you win!');
    $('#background' + background + ' h2').runner('stop');
    $('#background' + background).hide();
    $('#endWinScreen').show();
    timeoutID = setTimeout(function () {
        window.location.href = '../';
    }, 10000);
}

var lose = function (timeNumber) {
    if (counter != $('#scoreItems p').length || timeNumber == 0) {
        console.log('you lose');
        $('#background' + background).hide();
        $('#endLoseScreen').show();
        timeoutID = setTimeout(function () {
            window.location.href = '../';
        }, 10000);
    };
}

var countdown = function () {
    $('#background' + background + ' h2').runner({
        autostart: true,
        countdown: true,
        startAt: $('#scoreItems p').length * 15000,
        stopAt: 0,
        milliseconds: false
    }).on('runnerFinish', function () {
        var noTime = $('#background' + background + ' h2').runner('info').time
        lose(noTime)
    })


}