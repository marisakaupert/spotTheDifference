var counter = 0;

var images;

var background = (Math.floor(Math.random() * 3)) + 1;

$(function () {
    $('body').on('click', '.clickableArea', spotted);
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
    console.log(images);
    if( !images ){
        loadData();
    } else {
        counter = 0;
        $('.edited .clickableArea').remove();
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
        $('#background' + background + ' #scoreItems').append('<p>' + (i + 1) + '</p>');
        region.css({
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
    $(this).remove();
    counter++;
    $('#scoreItems p').eq(counter - 1).addClass('spotted');
    if (counter == $('#scoreItems p').length) {
        console.log('you win!');
        $('#background' + background + ' h2').runner('stop');
        $('#background' + background).hide();
        $('#endWinScreen').show();
    }
}

var checkToSeeIfWin = function (timeNumber) {
    if (counter != $('#scoreItems p').length || timeNumber == 0) {
        console.log('you lose');
        $('#background' + background).hide();
        $('#endLoseScreen').show();
    }
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
        checkToSeeIfWin(noTime)
    })


}