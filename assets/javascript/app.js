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
      var imgUrl = response.data[i].images.fixed_height_small.url;
      var image = $("<img>").attr("src", imgUrl);
      $("#topics").append(image);
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

//On Click For Creating Buttons for New Search Requests
$("#addButton").on("click", function (event) {
  event.preventDefault();
  var eighties = $("#topic_input").val().trim();
  topics.push(eighties);
  topicButtons();
});

//Function Call 
topicButtons();

//On Click Event to all Buttons
$(document).on("click", ".80sButton", displayEighties);