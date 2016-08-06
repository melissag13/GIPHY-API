$(document).ready(function(){
// Audio plays for 18 secs. does not loop

var audio = new Audio("assets/audio/Express_yourself_edit.mp3");
audio.play();

//Array of expression & new ones will be added to

var expression = ["Lauging", "Dancing", "Excited", "Falling", "Frustrated"];

// Functions displaying the buttons

function displayButtons (){
    $("#btnSelect").empty();
	for (var i=0; i < expression.length; i++){
		var giphyButton = $("<button>");
			giphyButton.addClass("action");
			giphyButton.addClass("btn btn-info");
			giphyButton.attr("data-name", expression[i]);
			$("#btnSelect").append(giphyButton);
	}
}

// Function to add a new action button
function addNewButton(){
    $("#addGiphy").on("click", function(){
    var action = $(".form-control").val().trim();
    if (action == ""){
      return false; //user cannot add a blank button
    }
    expression.push(action);

    displayButtons();
    return false;
    });
}

// Displays all the giphy
function displayGiphy(){
    var action = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q= " + action + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL); 
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        console.log(response); 
        $(".giphyBody").empty(); // erases from the previous click
        var results = response.data; 
        if (results == ""){
          alert("There isn't a gif for this selected button");
        }
        for (var i=0; i<results.length; i++){

            var giphyDiv = $("<div>"); //div where giphy go in
            giphyDiv.addClass("giphyDiv");
            
            var giphyRating = $("<p>").text("Rating: " + results[i].rating);
            giphyDiv.append(giphyRating);
            
            var giphyImage = $("<img>");
            giphyImage.attr("src", results[i].images.fixed_height_small_still.url); 
            giphyImage.attr("data-still",results[i].images.fixed_height_small_still.url); 
            giphyImage.attr("data-animate",results[i].images.fixed_height_small.url); 
            giphyImage.attr("data-state", "still"); 
            giphyImage.addClass("image");
            giphyDiv.append(giphyImage);
            
            $(".giphyBody").prepend(giphyDiv);
        }
    });
}
// Calling functions 
displayButtons(); 
addNewButton();

// Document Event Listeners
$(document).on("click", ".action", displayGiphy);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if (state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});




});




























