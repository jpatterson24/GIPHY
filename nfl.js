$(document).ready(function() {
    var teamArray =  ["arizona cardinals","alanta falcons","baltimore ravens","philadelphia eagles"];
    
    function displayHeroInfo() {
        var team = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + team + "&api_key=Td4PZppUXN2hiUe56YxvMYT0zAB8J61l&rating=g&limit=10";
        // Creating an AJAX call for the specific hero button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response);
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var teamDiv = $("<div class='item'>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var teamImage = $("<img>");
                teamImage.attr("src", results[i].images.fixed_height_still.url);
                teamImage.attr("data-still", results[i].images.fixed_height_still.url);
                teamImage.attr("data-animate", results[i].images.fixed_height.url);
                teamImage.attr("data-state", "still");
                teamImage.attr("class", "gif");
                teamDiv.prepend(p);
                teamDiv.prepend(teamImage);
                $("#teams").prepend(teamDiv);
            }
        })
    };
    // Function for displaying team buttons
    function renderButtons() {
        
        $("#teamButtons").empty();
        // Looping through the array of teams
        for (var i = 0; i < teamArray.length; i++) {
            // Then dynamicaly generating buttons for each team in the array
            var a = $("<button id='team'>");
            // Adding a class of team to our button
            a.addClass("team");
            // Adding a data-attribute
            a.attr("data-name", teamArray[i]);
            // Providing the initial button text
            a.text(teamArray[i]);
            // Adding the button to the teamButtons div
            $("#teamButtons").append(a);
        }
    };
    // This function handles events where a team button is clicked
    $("#add-team").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var teams = $("#team-input").val().trim();
        // Adding team from the textbox to our array
        teamArray.push(teams);
        // Calling renderButtons which handles the processing of our team array
        renderButtons();
    });
    // Adding a click event listener to all elements with a class of "team"
    $(document).on("click", ".team", displayHeroInfo);
    // Calling the renderButtons function to display the intial buttons
    renderButtons();
    
    $(document).on("click", ".gif", function() {
        console.log('here')
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
    
});