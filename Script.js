var city = document.getElementById;
$(document).ready(function(){

   //using the button id to add the click event using the jquery selector
   $("#buttontWeather").click(function(){
       //$('#city').val('');
       var city = $("#city").val();
       //check if input field is not empty,then use else for error
       if (city != ''){

           //ajax request get location data using the api key
           $.ajax({
           url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city +"&APPIS=13ee4eff24825f8ba8259842109cad9c",
           type:"GET",
           dataType:"JSON",
           //callback
           success: function(data){

            }

           });
       
       }else{
           $("#error").html('Field should not be empty')
       }
       
   });
});