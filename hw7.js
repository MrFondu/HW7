$(document).ready(function() {

  var instruments = ["tuba", "trumpet", "saxophone", "trombone", "drums", "xylophone"];

// *** Dynamicly builds the buttons

  function buttonMaker(blankArr, classs, bigBand) {
    $(bigBand).empty();

    for (var i = 0; i < blankArr.length; i++) {
      var buttonDisplay = $("<button>");
      buttonDisplay.addClass(classs);
      buttonDisplay.attr("data-type", blankArr[i]);
      buttonDisplay.text(blankArr[i]);
      $(bigBand).append(buttonDisplay);
    }
  }

  // adds the $click to each of the buttons with the right class.

  $(document).on("click", ".instrument-button", function() {
    $("#instruments").empty();
    $(".instrument-button").removeClass("active");
    $(this).addClass("active");

    // what the search is going to be and the queryURL for Giffy
    var search = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var instrumentDiv = $("<div class=\"instrument-item\">");

          var gif = $("<div>")

          var animate = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;

          var instrumentImage = $("<img>");
          instrumentImage.attr("src", still);
          instrumentImage.attr("data-still", still);
          instrumentImage.attr("data-animate", animate);
          instrumentImage.attr("data-state", "still");
          instrumentImage.addClass("instrument-image");

          instrumentDiv.append(gif);
          instrumentDiv.append(instrumentImage);

          $("#instruments").append(instrumentDiv);
        }
      });
  });

// Swaps the Gifs from the still picture to the animate Gif
  $(document).on("click", ".instrument-image", function() {

    var makeitmove = $(this).attr("data-state");

    if (makeitmove === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

// adds more buttons, using the "input". Prevent Default!! dont forget

  $("#add-instrument").on("click", function(event) {
    event.preventDefault();
    var newinstrument = $("input").val();
      instruments.push(newinstrument);
    buttonMaker(instruments, "instrument-button", "#instrument-buttons");
   });

  buttonMaker(instruments, "instrument-button", "#instrument-buttons");
});
