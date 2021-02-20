$(document).ready(function() {
    
    // Get current date and time for #date-time
    var today = new Date();
    var date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();

    // Get current location
    
    
    $("#date-time").html(date);
    // alert(dateTime)

    // function to show/hide disclaimer
    $("#disclaimer").hide();
    $("#disclaimer-button").click(function() {
        $('#disclaimer').show();
        });    
});