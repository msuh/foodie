

$(document).ready(function() {
	
	$(".button").click(function(){
	    $(".instruction").addClass("hidden");
	    $(".calendar").addClass("hidden");
	    $(".button").addClass("hidden");

	    $("#example").removeClass("hidden");
	    $(".result").removeClass("hidden");
	    $(".calendar_icon").removeClass("hidden");
	    $(".calendar_instruction").removeClass("hidden");
	    $(".calendar_bottom").removeClass("hidden");
	    $(".mainFrame").css("background-color", "white");
	})

	$(".calendar_icon, .calendar_instruction").click(function(){
		$("#example").addClass("hidden");
	    $(".result").addClass("hidden");
	    $(".calendar_icon").addClass("hidden");
	    $(".calendar_instruction").addClass("hidden");
	    $(".calendar_bottom").addClass("hidden");
	    $(".mainFrame").css("background-color", "#E5E3DF");

	   	$(".instruction").removeClass("hidden");
	    $(".calendar").removeClass("hidden");
	    $(".button").removeClass("hidden");
	})



});





