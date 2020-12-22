//Once we are loading the page,search button,get the value and search weather
$(document).ready(function () {
  //using the button id to add the click event using the jquery selector
  $("#buttonWeather").click(function () {
    //get the value and search for the weather $('#city').val('');
    city = $("#city").val();
    console.log(city);
    newList()
    //History button, use to search the weather
    $(".history").on("click", "li", function () {
      createcitycard($(this).text());
    });


    //check if input field is not empty,then use else for error
    if (city !== '') {
      //if city is in local storage call "createcitycard" with store data, else make the ajax request

      //ajax request get location data using the api key
      $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=13ee4eff24825f8ba8259842109cad9c",
        type: "GET",
        dataType: "JSON",
        //callback
        success: function(data){
          console.log("success");
          //Current weather content for html
          card = $("<div>").addClass("card");
          cardBody = $("<div>").addClass("card-body").attr("id", "cardBody");
          title = $("<h3>").addClass("card-title").text(data.name + "/" + data.sys.country + "");
          wind = $("<p>").addClass("cart-text").text("Wind Speed: " + data.wind.speed + "MPH");
          humid = $("<p>").addClass("card-text").text("Humidity:" + data.main.humidity + "%");
          temp = $("<p>").addClass(" card-text").text("Temperature:" + data.main.temp + "˚F");
          uv = $("<p>").text("UV Index:").attr("id", "UVI");
          img = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png");
      
      
          //api endpoints, they represent the data we get back from "Ajax"
          lat = data.coord.lat;
          lon = data.coord.lon;
      
          //Append and add to the page
          title.append(img);
          cardBody.append(title, temp, humid, wind, uv);
          card.append(cardBody);
          $("#current-date").append(card)
      
          getUVIndex(lat, lon);
          getForecast(city);
      
      
        }

      });

    } else {
      $("#error").html('Field should not be empty')
    }

  });

  var uv;
  var btn;
  var lat;
  var lon;
  var uvResponse;
  var card;
  var cardBody;
  var title;
  var wind;
  var humid;
  var temp;
  var img;
  var city;

  
  //UVIndex
  function getUVIndex(lat, lon) {
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=13ee4eff24825f8ba8259842109cad9c",
      type: "GET",
      dataType: "JSON",

    }).then(function (response) {
      uvResponse = response;
      console.log(uvResponse);


      btn = $("<span>").addClass("btn btn-sm").text(uvResponse[0].value);


      if (uvResponse[0].value < 3) {
        btn.addClass("btn-success")
      } else if (uvResponse[0].value < 7) {
        btn.addClass("btn-warning")
      } else {
        btn.addClass("btn-danger")
      }


      var uvButton = uv.append(btn)
      cardBody.append(uvButton);





      //$("#citylist").append(card);
      //console.log(card)
    })

  }

  //forecast api
  function getForecast(city) {

    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=13ee4eff24825f8ba8259842109cad9c",
      type: "GET",
      dataType: "JSON",

      success:

      function (response) {
        $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");
        
        for (var i = 0; i < 5; i++) {
    
        var col = $("<div>").addClass("col-md-2") .text(response.list[i].main.temp);
      
        $("#forecast .row").append(col);
      }

    } 

  })

}

  //Create Li list
  function newList() {
    var listItem = $("<li>").addClass("list-group-item").text(city);
    $("list").append(listItem);

    //current history,last searched city forecast
    var history = JSON.parse(window.localStorage.getItem("history")) || [];

    if (history.length > 0) {
      createcitycard(history[history.length - 1]);
    }
    for (var i = 0; i < history.length; i++) {
      makeRow(history[i]);
    }
  }
  //show current date and time
  function currentDate() {
    console.log(currentDate);
    var current = $.now();
    var maxDate = newDate(current);
    var currentDate = maxDate.toString();
    $("#date").html(currentDate);
  }
  //rows
  function makeRow(text) {}




});
