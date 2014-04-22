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
		$(AddReply(count)).insertAfter('#'+id);
		$('#'+count+' .replyTextbox').focus();
		increaseCount();
	});

	$(document).on('click','.postButton', function(evt){
		var parent = evt['currentTarget']['parentElement'];
		var id = $(parent).attr('id'),
			val = $('#'+id+' .replyTextbox').val();
		$('#'+id+' .replyTextbox').replaceWith('<p class="comments">'+val+'</p>');
		//once reply posted, change to edit button
		$('#'+id+' .postButton').removeClass('postButton')
								.addClass('editButton')
								.val('EDIT');
	});

	$(document).on('click','.editButton', function(evt){
		var parent = evt['currentTarget']['parentElement'];
		var id = $(parent).attr('id'),
			val = $('#'+id+' .comments').text();
		$('#'+id+' .comments').replaceWith('<input class="replyTextbox" type="text" value="'+val+'"/>');
		$('#'+id+' .replyTextbox').focus();
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
		var parent = evt['currentTarget']['parentElement'];
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
function AddReply(id){
	var replyInput = '<input class="replyTextbox" type="text" />',
		img = '<img class="vendorImg" src="Icons_12.gif" />',
		post = '<input class="postButton" type="button" name="edit" value="POST"/>',
		del = '<input class="delButton" type="button" value="DELETE"';
	return '<li id="'+id+'" class="reply">'+img+replyInput+post+del+'</li>';
}

/*
	function for increasing the count for the number of
	menu rows created.
	count will be used as id numbers
*/
function increaseCount(){
	count++;
}




