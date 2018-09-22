$(document).ready(function () {

  //Array of Topics
  var topics = ["80s Movies", "80s Toys", "80s Music", "80s Clothes"];
  var click=0;

  //Function for Displaying Gifs
  function displayEighties() {
    $("#topics").empty();
    var eightiesInfo = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + eightiesInfo + "&api_key=sm8z5Yxja8rinARsGr6GRGuwebdVVY9o&offset=5&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      $("#topicsCard").show();
      for (var i = 0; i < response.data.length; i++) {
        var imageDiv = $("<div class='eightiesInfo'>");
        var imgUrlPlay = response.data[i].images.fixed_height.url;
        var imgUrlPaused = response.data[i].images.fixed_height_still.url;
        
        var rating = response.data[i].rating;
        var r = $("<p>").text("Rating: " + rating);

        //Download Button
        // var downloadButton = $("<a download>");
        // var d = downloadButton.attr("href",response.data[i].images.fixed_height.url);
        // var button = $("<button id='downloadButton'>").text("Download");
        // d.append(button);
        
        //Holds the images, download, and ratings.
        var imageHolder = $("<div class= 'imageHolder'>");

        var image = $("<img>");
        image.attr("src", imgUrlPaused);
        image.attr("data-pause", imgUrlPaused);
        image.attr("data-play", imgUrlPlay);
        image.attr("data-status", "stop");
        image.addClass("picture");
        image.addClass("card");

        //imgBorder class to give each gif a different border color. Used (+i+) in Voltron Trivia Game to get similar result.
       
        imageHolder.append(image);
        imageHolder.append(r);
        
        //Download Button in DOM
        // imageHolder.append(button);

        $("#topics").append(imageHolder);
      }
    });
  }

  //Function for dumping the JSON content for each button into the div
  function topicButtons() {
    $("#buttons").empty();
    $("#topicsCard").hide();
    for (var i = 0; i < topics.length; i++) {
      var b = $("<button class='btn'>");
      b.addClass("eightiesButton");
      b.attr("data-name", topics[i]);
      b.text(topics[i]);
      if (b.attr("data-click"))
      b.attr("data-click")
      $("#buttons").append(b);
      $("#topic_input").val("80's");
    }
  }

  //Function for Playing and Pausing Gifs
  function pausePlayGifs() {
    var status = $(this).attr("data-status");
    var pause = $(this).attr("data-pause");
    var play = $(this).attr("data-play");
    if (status === "stop") {
      $(this).attr("src", play);
      $(this).attr("data-status", "animate")
    } else if (status === "animate") {
      $(this).attr("src", pause);
      $(this).attr("data-status", "stop")
    }
  }

  //Function Call 
  topicButtons();

  //On Click For Creating Buttons for New Search Requests
  $("#searchButton").on("click", function (event) {
    event.preventDefault();
    var eighties = $("#topic_input").val().trim();
    topics.push(eighties);
    topicButtons();
  });

  //On-Click Event for Play/Pause of Gifs
  $(document).on("click", ".picture", pausePlayGifs);

  //On Click Event to all Buttons
  $(document).on("click", ".eightiesButton", displayEighties);


});