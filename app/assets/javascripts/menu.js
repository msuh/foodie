
//Jquery uses
$(document).ready(function(){
	var count = 6; //count starts at 6 since there are default menus already in

	var title = document.title;
	$('#title').text(title);

	$(document).on('dblclick','.ol_menuRow', function(evt){
		if($(this).hasClass('ui-selected')){
			$(this).removeClass('ui-selected');
			return;
		}
		$(this).addClass('ui-selected');
	});

	$('#AddMenu').click(function(evt){
		$('#mainMenu').append(AddNewMenuBar(count));
		increaseCount();
		
	
	});
	$('#DeleteMenu').click(function(evt){
		DeletePressed();
	});

	$(document).on('click','.addSubmenu', function(evt){
		var parent = evt['currentTarget']['parentElement']['parentElement'];
		var id = $(parent).attr('id');
		// var index = $('#mainMenu li').index(parent);
		// console.log('index:',index);
		$('#'+id+' ol').append(AddSubMenuBar(count));
		//height is automatically set to 0px as inline style.. which makes unwanted overlap happen
		$('#'+id+' ol').css('height','');
		increaseCount();
	});

	$(document).on('click','.editMenu', function(evt){
		var parent = evt['currentTarget']['parentElement']['parentElement'];
		var id = $(parent).attr('id'),
		// console.log('id:',id);
			value= $('#'+id+' .menuRow p').text();
		$('#'+id+' .menuRow p').replaceWith(createTextBox(value));
		$('#'+id+' .menuRow .textBox').focus();
		
	});
	$(document).on('click','.editsubMenu', function(evt){
		var parent = evt['currentTarget']['parentElement'];
		var id = $(parent).attr('id'),
		value = $('#'+id+' .submenuName').text();
		$('#'+id+' .submenuName').replaceWith(createsubTextBox(value));
		$('#'+id+' .textBox').focus();
		value = $('#'+id+' .price').text();
		$('#'+id+' .price').replaceWith(createPriceTextBox(value));
		
	});

	$(document).on('mousedown','.menuRow', function(evt){
		//if pressed target is a input button, don't slide
		if($(evt['target']).attr('type') == 'button'){
			return;
		}
		$(this).next('.ol_submenuRow').slideToggle();
	});
	/*
		For some very strange reason, menuRow did not fire event 'keypress'
		only for Enter key, while submenuRow did. Changing to keydown works for both cases now..
	*/
	$(document).on('keydown','.textBox', function(evt){
		if(event.which == 13){
			var val = $(this).val();
			$(this).replaceWith('<p class="menuName">'+val+'</p>');
		}
	});
	$(document).on('keydown','.subtextBox', function(evt){
		if(event.which == 13){
			var val = $(this).val();
			$(this).replaceWith('<p class="submenuName">'+val+'</p>');
		}
	});
	$(document).on('keydown','.priceTextBox', function(evt){
		if(event.which == 13){
			var val = $(this).val();
			$(this).replaceWith('<p class="price">'+val+'</p>');
		}
	});



	//function for removing the selected menus
	function DeletePressed(){
		$('.ui-selected').remove();
	};
});

//function for adding the main menu name
//each row has id = "id+[count#]"
//the <ol> within categories are named id=list+[row id];
function AddNewMenuBar(id){
	var name = '<p class="menuName"></p>',
		addBut = '<input class="addSubmenu" type="button" name="add" value="+"/>',
		edit = '<input class="editMenu" type="button" name="edit" value="EDIT"/>';
	return '<li id="id'+id+'" class="ol_menuRow"><ol class="submenu" id=listid'+id+'><li class="menuRow">'+name+addBut+edit+'</li><ol class="ol_submenuRow"></ol></ol></li>';
}
// <div class='gradient'>
// 	<p class="submenuName">Chicken Fried Rice</p>
// 	<p class="price">$5.00</p>
// </div>
//function for adding the submenus
function AddSubMenuBar(id){
	var name = '<p class="submenuName">menu name</p>',
		edit = '<input class="editsubMenu" type="button" name="edit" value="EDIT"/>',
		img = '<img class="menuImage" src="/assets/question.jpeg"/>',
		price = '<p class="price">$</p>';
	return '<li id="id'+id+'" class="submenuRow">'+edit+img+'<div class="gradient">'+name+price+'</div></li>';
}

function createTextBox(value){
	return '<input class="textBox" type="text" value="'+value+'"/>';
}
function createsubTextBox(value){
	return '<input class="subtextBox" type="text" value="'+value+'"/>';
}
function createPriceTextBox(value){
	return '<input class="priceTextBox" type="text" value="'+value+'"/>';
}
/*
	function for increasing the count for the number of
	menu rows created.
	count will be used as id numbers
*/
function increaseCount(){
	count++;
}

