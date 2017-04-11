var counter = 0;

$(".clickableArea").on('click', clickEditedItem);

function clickEditedItem() {
    counter++;
    console.log(counter);
    if (counter == 1) {
        $(".itemSplat1").fadeIn(200);
    }
    if (counter == 2) {
        $(".itemSplat2").fadeIn(200);
    }
    if (counter == 3) {
        $(".itemSplat3").fadeIn(200);
    }
    if (counter > 3) {
        counter = 0;
        return;
    }
}



$.getJSON("assets/js/images.json", function(data) {
    var images = data.images;
    console.log(images[0].original);
    var pathtoImages = "assets/images/photos/";
    $('.original img').attr('src', pathtoImages + images[0].original);
    $('.edited img').attr('src', pathtoImages + images[0].edit);
    $('.edited .clickableArea').remove();
    for (var i = 0; i < images[0].hotspots.length; i++) {
        var region = $('<div class="clickableArea"></div>').appendTo('.edited');
        region.css({
            left: images[0].hotspots[i].left,
            top: images[0].hotspots[i].top,
            height: images[0].hotspots[i].height,
            width: images[0].hotspots[i].width
        })
    }
});

//randomized number becomes the new 0 in the 





