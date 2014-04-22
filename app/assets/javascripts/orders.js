var copyOrders;

//Jquery uses
$(document).ready(function(){

	var result = sortByDesiredTime(orders);
	for (var i=0; i<result.length; i++) {
		addRow(result[i], null);
	}

});

//functions
function addRow(id, location){
	console.log(id);
	for (var i=0; i<orders.length; i++) {
		var thisOrder = orders[i];
		if (thisOrder.id == id) {
			if (location == null){$('#table').prepend("<tr class='rowPerOrder' id="+id+"></tr>");}
			else {$("<tr class='rowPerOrder' id="+id+"></tr>").insertAfter('#'+location);}
			var row = $("#"+id+"");
			row.append("<td class='col1'><img class='cross' src='orders_img/cross.png'></span></td>");
			//row.append("<td class='col2'>Menu: "+thisOrder.menu+"<br>Desired Time: "+getTimeString(thisOrder.desiredT)+"</td>");
			row.append("<td class='col2'></td>");
			$("#"+id+" > .col2").append("<div class='preparing'></div>");
			var prepDiv = $("#"+id+" > .col2 > .preparing");
			//prepDiv.append("<span class='menuLabel'>Menu: </span");
			prepDiv.append("<span class='menu'>"+thisOrder.menu+"</span>");
			prepDiv.append("<br>");

			var menuSpan = $("#"+id+" > .col2 > .preparing > .menu");
			console.log("here",menuSpan.outerHeight(),menuSpan.css('font-size'))
			while (parseInt(menuSpan.outerHeight()/parseInt(menuSpan.css('font-size'))) > 1) {				
				console.log(menuSpan.outerHeight(),menuSpan.css('font-size'));
				var f = parseInt(menuSpan.css('font-size'));
			 	menuSpan.css("font-size", ""+(f-1)+"px");
			 	console.log(menuSpan.css("font-size"));
			}

			//prepDiv.append("<span class='noteLabel'>Note: </span");
			prepDiv.append("<span class='note'>"+truncate(thisOrder.note,25)+"</span>");
			if (thisOrder.note.length > 25) {
				$('<span class="moreButton">&nbsp;...&nbsp;</span>').insertAfter("#"+id+" > .col2 > .preparing > .note");
			}

			$("#"+id+" > .col2 > .preparing > .moreButton").click(function(event){
				clickMore(id);
			})

			prepDiv.append("<br>");
			prepDiv.append("<span class='desiredTLabel'>Desired Time: </span");
			prepDiv.append("<span class='desiredT'>"+getTimeString(thisOrder.desiredT)+"</span>");
			row.append("<td class='col3'></td>");

			$("#"+id+" > .col3").append("<img class='check1' src='orders_img/state1.png'></img>")
			$("#"+id+" > .col3").append("<span class='status'>Preparing..</span>");

			$("#"+id+" > .col3 > .check1").click(function(event) {
				prepared(id);
			});

			$("#"+id+" > .col1 > .cross").click(function(event) {
				clickCross(id);
			});

		}
	}	
}

//called when any click other than undo
function displayUndo(infoObj){
	$('#undoBox').remove();
	var action = infoObj.action;
	var menu = infoObj.menu;
	var name = infoObj.name;
	var message;

	if (action == "prepared") {
		message = "You prepared "+menu+" for "+name+". ";
	}
	if (action == "pickedup") {
		message = name+" picked up "+menu+". ";
	}
	if (action == 'cancel') {
		message = "You cancelled "+name+"'s order. ";
	}
	if (action == 'soldout') {
		message = menu+ " is sold out. ";
	}

	$('#table').append("<div hidden id='undoBox'><span id='message'></span><span id='undoButton'>Undo</span></div>");
	$('#message').text(message);
	$('#undoBox').css('margin-top',"-"+$('#undoBox').outerHeight()+"px");
	$('#undoBox').fadeIn("slow");

	$('#undoBox').click(function(event) {
		undo(infoObj);
	});
}

//called when undo is clicked
function undo(infoObj){
	var action = infoObj.action;
	var menu = infoObj.menu;
	var name = infoObj.name;
	var thisOrder = infoObj.thisOrder;
	var id = thisOrder.id;
	$("#undoBox").remove();
	if (action == "prepared") {
		$("#"+id+" > .col2 > .prepared").remove();
		$("#"+id+" > .col2").append("<div class='preparing'></div>");
		var prepDiv = $("#"+id+" > .col2 > .preparing");
		prepDiv.append("<span class='menu'>"+thisOrder.menu+"</span>");
		prepDiv.append("<br>");
		
		var menuSpan = $("#"+id+" > .col2 > .preparing > .menu");
		while (parseInt(menuSpan.outerHeight()/parseInt(menuSpan.css('font-size'))) > 1) {
			var f = parseInt(menuSpan.css('font-size'));
		 	menuSpan.css("font-size", --f+"px");
		}
		
		prepDiv.append("<span class='note'>"+truncate(thisOrder.note,25)+"</span>");
		if (thisOrder.note.length > 25) {
			$('<span class="moreButton">&nbsp;...&nbsp;</span>').insertAfter("#"+id+" > .col2 > .preparing > .note");
		}
		$("#"+id+" > .col2 > .preparing > .moreButton").click(function(event){
			clickMore(id);
		})

		prepDiv.append("<br>");
		prepDiv.append("<span class='desiredTLabel'>Desired Time: </span");
		prepDiv.append("<span class='desiredT'>"+getTimeString(thisOrder.desiredT)+"</span>");
		$("#"+id+" > .col3 > .check2").remove();
		$("#"+id+" > .col3 > .status").text("Preparing..");
		$("#"+id+" > .col3").prepend("<img class='check1' src='orders_img/state1.png'></span>");			

		$("#"+id+" > .col3 > .check1").click(function(event) {
			prepared(id);
		});
	}
	if (action == "pickedup") {
		$("#"+id+" > .col3 > .status").text("Ready");
		$("#"+id+" > .col3 > .check3").remove();
		$("#"+id+" > .col3").prepend("<img class='check2' src='orders_img/state2.png'></span>");
		$("#"+id+" > .col3 > .check2").click(function(event) {
			pickedup(id);
		});		
		$("#"+id+" > .col2 > .prepared > .paid").text(getPaidString(thisOrder.paid));		
	}
	if (action == 'cancel' || action == 'soldout' ) {
		var check = infoObj.check;
		var after = infoObj.after;

		if (check == "check1") {
			addRow(id, after);
		}
		if (check == "check2") {
			if (after == null) {$('#table').prepend("<tr class='rowPerOrder' id="+id+"></tr>");}
			else {$("<tr class='rowPerOrder' id="+id+"></tr>").insertAfter('#'+after);}
			var row = $("#"+id+"");
			row.append("<td class='col1'><img class='cross' src='orders_img/cross.png'></span></td>");
			//row.append("<td class='col2'>Menu: "+thisOrder.menu+"<br>Desired Time: "+getTimeString(thisOrder.desiredT)+"</td>");
			row.append("<td class='col2'></td>");
			$("#"+id+" > .col2").append("<div class='prepared'></div>");
			var prepDiv = $("#"+id+" > .col2 > .prepared");

			prepDiv.append("<span class='name'>"+thisOrder.name+"</span>");
			prepDiv.append("<span class='paid'>"+getPaidString(thisOrder.paid)+"</span>");
			prepDiv.append("<br>");
			prepDiv.append("<span class='menuLabel'>Menu: </span");
			prepDiv.append("<span class='menu'>"+thisOrder.menu+"</span>");
			prepDiv.append("<br>");
			prepDiv.append("<span class='desiredTLabel'>Desired Time: </span");
			prepDiv.append("<span class='desiredT'>"+getTimeString(thisOrder.desiredT)+"</span>");

			row.append("<td class='col3'></td>");
			$("#"+id+" > .col3").append("<img class='check2' src='orders_img/state2.png'></img>")
			$("#"+id+" > .col3").append("<span class='status'>Ready</span>");

			$("#"+id+" > .col3 > .check2").click(function(event) {
				pickedup(id);
			});
			$("#"+id+" > .col1 > .cross").click(function(event) {
				clickCross(id);
			});
		}
		if (check == "check3") {
			if (after == null) {$('#table').prepend("<tr class='rowPerOrder' id="+id+"></tr>");}
			else {$("<tr class='rowPerOrder' id="+id+"></tr>").insertAfter('#'+after);}
			var row = $("#"+id+"");
			row.append("<td class='col1'><img class='cross' src='orders_img/cross.png'></span></td>");
			row.append("<td class='col2'></td>");
			$("#"+id+" > .col2").append("<div class='prepared'></div>");
			var prepDiv = $("#"+id+" > .col2 > .prepared");
			prepDiv.append("<span class='name'>"+thisOrder.name+"</span>");
			prepDiv.append("<span class='paid'>Paid</span>");
			prepDiv.append("<br>");
			prepDiv.append("<span class='menuLabel'>Menu: </span");
			prepDiv.append("<span class='menu'>"+thisOrder.menu+"</span>");
			prepDiv.append("<br>");
			prepDiv.append("<span class='desiredTLabel'>Desired Time: </span");
			prepDiv.append("<span class='desiredT'>"+getTimeString(thisOrder.desiredT)+"</span>");

			row.append("<td class='col3'></td>");
			$("#"+id+" > .col3").append("<img class='check3' src='orders_img/state3.png'></img>")
			$("#"+id+" > .col3").append("<span class='status'>Picked Up</span>");

			$("#"+id+" > .col1 > .cross").click(function(event) {
				clickCross(id);
			});

		}
	}
}

function clickCross(id){
	$('#undoBox').remove();
	for (var i=0; i<orders.length; i++) {
		var thisOrder = orders[i];
		if (thisOrder.id == id) {
			$("#undoBox").remove();
			$('.cancelBox').remove();
			$("#"+id+" > .col2").append("<div hidden class='cancelBox'><span class='cancel'>Delete</span><span class='soldout'>Soldout</span></div>");
			$('.cancelBox').fadeIn("slow");
			$("#"+id+" > .col2 > .cancelBox > .cancel").click(function(event) {
				clickCancel(id);
			});
			$("#"+id+" > .col2 > .cancelBox > .soldout").click(function(event) {
				clickSoldout(id);
			});
		}
	}
}
function clickCancel(id){
	for (var i=0; i<orders.length; i++) {
		var thisOrder = orders[i];
		if (thisOrder.id == id) {
			var whichCheck = $("#"+id+"> .col3").children().attr('class');
			var after = null;
			var previousSibling = document.getElementById(id).previousSibling;
			if (previousSibling != null) {after = previousSibling.id;}
			$("#"+id).remove();
			var infoObj = {'action': 'cancel', 'check': whichCheck, 'after': after, 'menu': thisOrder.menu, 'name': thisOrder.name, 'thisOrder': thisOrder};
			displayUndo(infoObj);
		}
	}			
}
function clickSoldout(id){
	for (var i=0; i<orders.length; i++) {
		var thisOrder = orders[i];
		if (thisOrder.id == id) {
			var whichCheck = $("#"+id+"> .col3").children().attr('class');
			var after = null;
			var previousSibling = document.getElementById(id).previousSibling;
			if (previousSibling != null) {after = previousSibling.id;}
			$("#"+id).remove();
			var infoObj = {'action': 'soldout', 'check': whichCheck, 'after': after, 'menu': thisOrder.menu, 'name': thisOrder.name, 'thisOrder': thisOrder};
			displayUndo(infoObj);
		}
	}			
}


//called when check1 is clicked
function prepared(id){
	for (var i=0; i<orders.length; i++) {
		var thisOrder = orders[i];
		if (thisOrder.id == id) {
			$('.cancelBox').remove();
			$("#"+id+" > .col2 > .preparing").remove();
			$("#"+id+" > .col2").append("<div class='prepared'></div>");
			var prepDiv = $("#"+id+" > .col2 > .prepared");
			//prepDiv.append("<span class='nameLabel'>Name: </span");
			prepDiv.append("<span class='name'>"+thisOrder.name+"</span>");
			prepDiv.append("<span class='paid'>"+getPaidString(thisOrder.paid)+"</span>");
			prepDiv.append("<br>");
			prepDiv.append("<span class='menuLabel'>Menu: </span");
			prepDiv.append("<span class='menu'>"+thisOrder.menu+"</span>");
			prepDiv.append("<br>");
			prepDiv.append("<span class='desiredTLabel'>Desired Time: </span");
			prepDiv.append("<span class='desiredT'>"+getTimeString(thisOrder.desiredT)+"</span>");
			$("#"+id+" > .col3 > .check1").remove();
			$("#"+id+" > .col3 > .status").text("Ready");
			$("#"+id+" > .col3").prepend("<img class='check2' src='orders_img/state2.png'></span>");			

			$("#"+id+" > .col3 > .check2").click(function(event) {
				pickedup(id);
			});

			var infoObj = {'action':'prepared', 'menu': thisOrder.menu, 'name': thisOrder.name, "thisOrder": thisOrder};
			displayUndo(infoObj);
		}
	}		
}

//called when check2 is clicked
function pickedup(id){
	for (var i=0; i<orders.length; i++) {
		var thisOrder = orders[i];
		if (thisOrder.id == id) {
			$('.cancelBox').remove();
			$("#"+id+" > .col3 > .status").text("Picked Up");
			$("#"+id+" > .col3 > .check2").remove();
			$("#"+id+" > .col3").prepend("<img class='check3' src='orders_img/state3.png'></span>");
			$("#"+id+" > .col2 > .prepared > .paid").text("Paid");		

			var infoObj = {'action':'pickedup', 'menu': thisOrder.menu, 'name': thisOrder.name, "thisOrder": thisOrder};
			displayUndo(infoObj);
		}
	}			
}

function clickMore(id){
	console.log("called");
	for (var i=0; i<orders.length; i++) {
		var thisOrder = orders[i];
		if (thisOrder.id == id) {
			$("#"+id+" > .col2 > .preparing > .note").text(thisOrder.note);
			$("#"+id+" > .col2 > .preparing > .moreButton").remove();
			$("<span class='lessButton'>&nbsp;&#60;&nbsp;</span>").insertAfter("#"+id+" > .col2 > .preparing > .note");
			//$("#"+id+" > .col2 > .preparing").append("<span class='lessButton'>&#60;</span>");
			$("#"+id+" > .col2 > .preparing > .lessButton").click(function(event){
				clickLess(id);
			});
		}
	}
}

function clickLess(id){
	console.log("called");
	for (var i=0; i<orders.length; i++) {
		var thisOrder = orders[i];
		if (thisOrder.id == id) {
			$("#"+id+" > .col2 > .preparing > .note").text(truncate(thisOrder.note,25));
			$("#"+id+" > .col2 > .preparing > .lessButton").remove();
			$("<span class='moreButton'>&nbsp;...&nbsp;</span>").insertAfter("#"+id+" > .col2 > .preparing > .note");
			//$("#"+id+" > .col2 > .preparing").append("<span class='moreButton'> ... </span>");
			$("#"+id+" > .col2 > .preparing > .moreButton").click(function(event){
				clickMore(id);
			});
		}
	}
}

//sort all orders by desired time and return the list of ids in order from earliest to latest
function sortByDesiredTime(orders) {
	var cloneOrders = orders.slice(0);
	var result = [];
	cloneOrders.sort(function(a,b){
		if (a.desiredT-b.desiredT==0) {
			return b.orderT-a.orderT;
		}
		else {
			return b.desiredT-a.desiredT;
		}
	});
	for (var i = 0; i < cloneOrders.length; i++) {
		result.push(cloneOrders[i].id);
	}
	return result;
}

//Minor Functions
function getPaidString(paid){
	if (paid == true) {return "Paid";}
	else {return "NOT Paid";}
}

function getTimeString(date) {
	var hr = date.getHours();
	var min = date.getMinutes();
	return twoDigit(hr)+":"+twoDigit(min);
}

function twoDigit(number) {
    var output = number + '';
    while (output.length < 2) {
        output = '0' + output;
    }
    return output;
}

function truncate(str, maxLength)
{
    if(str.length > maxLength)
    {
        str = str.substring(0, maxLength + 1); 
        str = str.substring(0, Math.min(str.length, str.lastIndexOf(" ")));
    }
    return str;
}
