var count = 2,
clickAdded = false;
//Jquery uses
$(document).ready(function(){
	var title = document.title;
	$('#title').text(title);
	// $( "#mainMenu" ).bind( "mousedown", function ( e ) {
	//     e.metaKey = true;  //allows for unselect
	// } ).selectable();
	
	$('#recent').click(function(evt){
		console.log('entered recent');
	
	});
	$('#useful').click(function(evt){
		console.log('entered useful');
	});

	$(document).on('click','.replyButton', function(evt){
		var parent = evt['currentTarget']['parentElement']['parentElement'];
		var id = $(parent).attr('id');
		// var index = $('#mainMenu li').index(parent);
		// console.log('index:',index);
		var time = evt['timeStamp'];
		$(AddReply(count,time)).insertAfter('#'+id);
		$('#'+count+' .replyTextbox').focus();
		increaseCount();
	});

	$(document).on('click','.postButton', function(evt){
		var parent = evt['currentTarget']['parentElement']['parentElement']['parentElement'];
		var id = $(parent).attr('id'),
			val = $('#'+id+' .replyTextbox').val();
		$('#'+id+' .replyTextbox').replaceWith('<p class="comments">'+val+'</p>');
		//once reply posted, change to edit button
		$('#'+id+' .postButton').removeClass('postButton')
								.addClass('editButton')
								.val('EDIT');
	});

	$(document).on('click','.editButton', function(evt){
		var parent = evt['currentTarget']['parentElement']['parentElement']['parentElement'];
		var id = $(parent).attr('id'),
			val = $('#'+id+' .comments').text();
		$('#'+id+' .comments').replaceWith('<input class="replyTextbox" type="text" value="'+val+'"/>');
		$('#'+id+' .replyTextbox').focus();

		var e = $.Event("keydown");
			e.keyCode = $.ui.keyCode.ENTER;
		$('#'+id+' .replyTextbox').trigger(e);

		$(this).removeClass('editButton');
		$(this).addClass('postButton');
		$(this).val('SAVE');
		//once reply posted, change to edit button

	});

	$(document).on('keypress','.replyTextbox', function(evt){
		if(event.which == 13){
			event.preventDefault();
			var val = $(this).val();
			$(this).replaceWith('<p class="comments">'+val+'</p>');
			$('.postButton').click();
		}
	});
	$(document).on('click','.delButton', function(evt){
		var parent = evt['currentTarget']['parentElement']['parentElement']['parentElement'];
		var id = $(parent).attr('id');
		$('#'+id).remove();
	});

	$(document).on('click','.likeImg', function(evt){
		var ele = $(this)[0]['previousElementSibling'], //retrieving like count
		count = $(ele).text();
		$(ele).text(parseInt(count)+1);
		// console.log(count);
	});

	//function for removing the selected menus
	function DeletePressed(){
		$('.ui-selected').remove();
	};
});

//function for adding the main menu name
//each row has id = "id+[count#]"
function AddReply(id,time){
	var replyInput = '<input class="replyTextbox" type="text" />',
		img = '<img class="vendorImg" src="img/Icons_12.gif" />',
		post = '<input class="postButton" type="button" name="edit" value="POST"/>',
		del = '<input class="delButton" type="button" value="DELETE"/>',
		vendor = '<p class="vendorName">Foodie T. </p>',
		postTime = '<p class="postTime">'+time+'</p>';
	return '<li id="'+id+'" class="reply">'+img+replyInput+'<div class="info">'+'<div class="postDiv">'+post+del+'</div>'+vendor+postTime+'</div></li>';
}

/*
	function for increasing the count for the number of
	menu rows created.
	count will be used as id numbers
*/
function increaseCount(){
	count++;
}




