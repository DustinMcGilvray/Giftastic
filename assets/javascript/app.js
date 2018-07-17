// $(document).ready(function () {
  //Array of Topics
  var topics = ["80s Movies", "80s Toys", "80s Music", "80s Fashion"];

  //Function for Displaying Gifs
  function displayEighties() {
    $("#topics").empty();
    var eightiesInfo = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + eightiesInfo + "&api_key=sm8z5Yxja8rinARsGr6GRGuwebdVVY9o&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      for (var i = 0; i < response.data.length; i++) {
        var imageDiv = $("<div class='eightiesInfo'>");
        var imgUrlplay = response.data[i].images.fixed_height_small.url;
        var imgUrlPaused = response.data[i].images.fixed_height_small_still.url;
        
        var rating = response.data[i].rating;
        var r = $("<p>").text("Rating: " + rating);
        var downloadButton = $("<button>").text("Download");
        var d = $("<a>").attr("src", imgUrl.download);

        var image = $("<img>").attr("src", imgUrlPaused);
        // image.attr("data-pause", imgUrlPaused);
        // image.attr("data-play", imgUrlplay);
        // image.attr("data-status", "status");
        // image.addClass("picture");

        $("#topics").append(image);
        $("#topics").append(r);
        $("#topics").append(downloadButton);
      }
    });
  }

  //Function for dumping the JSON content for each button into the div
  function topicButtons() {
    $("#buttons").empty();
    for (var i = 0; i < topics.length; i++) {
      var b = $("<button>");
      b.addClass("80sButton");
      b.attr("data-name", topics[i]);
      b.text(topics[i]);
      $("#buttons").append(b);
    }
  }

  //Function for Playing and Pausing Gifs
  function pausePlayGifs() {
    var status = $(this).attr("data-status");
    if (status === "data-status") {
      $(this).attr("src", imageUrlPaused);
      $(this).attr("data-pause", "pause")
    } else if (status === "imageUrl") {
      $(this).attr("src", imgUrlplay);
      $(this).attr("data-play", "play")
    }
  }

  // //Function for dumping the JSON URL content for each button into the div
  // function downloadGif() {
  //   $("#download").empty();
  //   for (var i = 0; i < topics.length; i++) {
  //     var d = $("<button>");
  //     d.addClass("downloadButton");
  //     d.attr("data-name", topics[i]);
  //     d.html("Download");
  //     $("#download").append(d);
  //   }
  // }

  // $("#download").on("click", function (event) {}
  //     event.preventDefault();
  //     var gifDownload = $(response.data[i].images.fixed_height_small.url;);


  //Function Call 
  topicButtons();

  //On Click For Creating Buttons for New Search Requests
  $("#addButton").on("click", function (event) {
    event.preventDefault();
    var eighties = $("#topic_input").val().trim();
    topics.push(eighties);
    topicButtons();
  });

  //On-Click Event for Play/Pause of Gifs
  // $(document).on("click", ".picture", pausePlayGifs);

  //On Click Event to all Buttons
  $(document).on("click", ".80sButton", displayEighties);


// });