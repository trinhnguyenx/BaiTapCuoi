let openInput = document.getElementById('open-input');
let openEdit = document.getElementById('popup-edit');
let inputForm  = document.getElementById('popup-input');
let closeFormEdit = document.getElementById('close-popup-edit');
let closeFormInput = document.getElementById('close-popup-input');
let addBtn = document.getElementById('add-todo');
let todolist = document.getElementById('todo-list');
let doinglist = document.getElementById('doing-list');
let donelist = document.getElementById('done-list');
let countTodo = document.getElementById('todo-list-count-text');
let countDoing = document.getElementById('doing-list-count-text');
let countDone = document.getElementById('done-list-count-text');

let data = [
	{
		category:'todo',
		title: 'Learn HTML',
		content: 'Learn HTML and CSS',
		date: '2023-05-03',
		type: 'todo'
	},
	{
		category:'todo',
		title: 'Learn HTML',
		content: 'Learn HTML and CSS',
		date: '2023-05-03',
		type: 'doing'
	},
	{
		category:'todo',
		title: 'Learn HTML',
		content: 'Learn HTML and CSS',
		date: '2023-05-03',
		type: 'done'
	}
]
if (localStorage.getItem('todo') == null) {
	localStorage.setItem('todo', JSON.stringify(data)); // covert data to web sever
} else {
	data = JSON.parse(localStorage.getItem('todo'));
}
console.log(addBtn);
openInput.addEventListener('click', function() {
    inputForm.classList.add('enable');
	addBtn = document.getElementById('add-todo');
	
	console.log(closeFormInput);
	
})
closeFormInput.addEventListener('click', function() {
    inputForm.classList.remove('enable');
})
closeFormEdit.addEventListener('click', function() {
    openEdit.classList.remove('enable');
})
addBtn.addEventListener('click', function() {
	let title = document.getElementById('title').value;
	let content = document.getElementById('content').value;
	let date =  new Date().toLocaleDateString();
	let category = document.getElementById('category').value;
	
	if( title  != '' && document.getElementById('title').classList.contains('error')) {
		document.getElementById('title').classList.remove('error');
	} else if(title == '') document.getElementById('title').classList.add('error');

	if( content  != '' && document.getElementById('content').classList.contains('error')) {
		document.getElementById('content').classList.remove('error');
	}   else if(content == '')  document.getElementById('content').classList.add('error');

	if( category  != '' && document.getElementById('category').classList.contains('error')) {
		document.getElementById('category').classList.remove('error');
	}   else if(category == '')  document.getElementById('category').classList.add('error');

	if( title != '' && content != '' && date != '' && category != '') {
		let todo = {
			category: category,
			title: title,
			content: content,
			date: date,
			type: 'todo'
		}
		data.push(todo);
		console.log(data);
		inputForm.classList.remove('enable');
		pushTodo();
		localStorage.setItem('todo', JSON.stringify(data));
	}
});

function pushTodo(){
	let x=0;y=0;z =0;
	todolist.innerHTML = '';
	doinglist.innerHTML = '';
	donelist.innerHTML = '';
	data.forEach(function(item,index) {
	if(item.type == 'todo'){
		x++;
		todolist.innerHTML += 
		`<div class="todo-list">
		<div class="todo-item">
		<div class="todo-item-header">
			<span class="todo-item-header-category">${item.category}</span>
			<div class="too-item-header-action">
				<img src="./assets/img/edit.png" alt="" class="edit" onclick="editItem(${index})">
				<img src="./assets/img/del.png" alt="" class="del" onclick="remove(${index})">
			</div>
		</div>
		<p class="todo-title">${item.title}</p>
		<div class="line-item"></div>
		<p class="todo-content">
			${item.content}
		</p>
		<div class="time">
			<img src="./assets/img/clock.png" alt=" " class="clock">
		<p class="time-text">${item.date}</p>
		</div>
	</div>
	</div>`;
	countTodo.innerHTML = x;
	} else if (item.type == 'doing'){
		y++;
		doinglist.innerHTML += 
		`<div class="todo-list">
		<div class="todo-item">
		<div class="todo-item-header">
			<span class="todo-item-header-category">${item.category}</span>
			<div class="too-item-header-action">
				<img src="./assets/img/edit.png" alt="" class="edit" onclick="editItem(${index})">
				<img src="./assets/img/del.png" alt="" class="del" onclick="remove(${index})">
			</div>
		</div>
		<p class="todo-title">${item.title}</p>
		<div class="line-item"></div>
		<p class="todo-content">
			${item.content}
		</p>
		<div class="time">
			<img src="./assets/img/clock.png" alt=" " class="clock">
		<p class="time-text">${item.date}</p>
		</div>
	</div>
	</div>`
	countDoing.innerHTML = y;
	} else {
		z++;
		donelist.innerHTML += `
		<div class="todo-list">
		<div class="todo-item">
                        <div class="todo-item-header">
                            <span class="todo-item-header-category">${item.category}</span>
                            <div class="too-item-header-action">
                                <img src="./assets/img/edit.png" alt="" class="edit" onclick="editItem(${index})">
                                <img src="./assets/img/del.png" alt="" class="del" onclick="remove(${index})">
                            </div>
                        </div>
                        <p class="todo-title">${item.title}</p>
                        <div class="line-item"></div>
                        <p class="todo-content">
                            ${item.content}
                        </p>
                        <div class="time">
                            <img src="./assets/img/clock.png" alt=" " class="clock">
                        <p class="time-text">21:22</p>
                        </div>
                    </div>
					</div>`
					countDone.innerHTML = z;
	}
})
};
let currentEdit = 0;
//get element type checkbox input
let checkbox = document.querySelectorAll('.choosetype');
pushTodo();
function editItem(obj){
	currentEdit = obj;
	openEdit.classList.add('enable');
	console.log(data[obj].title);
	document.getElementById('title-edit').value = data[obj].title;
	document.getElementById('content-edit').value = data[obj].content;
	document.getElementById('category-edit').value = data[obj].category;
	switch(data[obj].type){
		case 'todo':
			choose(0);
			break;
		case 'doing':
			choose(1);
			break;
		case 'done':
			choose(2);
			break;
	}
	console.log(data[0]);
}
function choose(val){
	for(var i =0 ; i < checkbox.length; i++){
			checkbox[i].checked = false;
	}
	checkbox[val].checked = true;
}
let btnSubmitEdit = document.getElementById('add-todo-edit');
btnSubmitEdit.addEventListener('click',function(){
	let title = document.getElementById('title-edit').value;
	let content = document.getElementById('content-edit').value;
	let date =  new Date().toLocaleDateString();
	let category = document.getElementById('category-edit').value;
	let type = '';
	for(var i =0 ; i < checkbox.length; i++){
		if(checkbox[i].checked == true) type = checkbox[i].value;
	}
	if( title  != '' && document.getElementById('title-edit').classList.contains('error')) {
		document.getElementById('title-edit').classList.remove('error');
	} else if(title == '') document.getElementById('title-edit').classList.add('error');

	if( content  != '' && document.getElementById('content-edit').classList.contains('error')) {
		document.getElementById('content-edit').classList.remove('error');
	}   else if(content == '')  document.getElementById('content-edit').classList.add('error');

	if( category  != '' && document.getElementById('category-edit').classList.contains('error')) {
		document.getElementById('category-edit').classList.remove('error');
	}   else if(category == '')  document.getElementById('category-edit').classList.add('error');

	if( title != '' && content != '' && date != '' && category != '') {
		let todo = {
			category: category,
			title: title,
			content: content,
			date: date,
			type: type
		}
		data[currentEdit] = todo;
		console.log(data);
		openEdit.classList.remove('enable');
		pushTodo();
		localStorage.setItem('todo',JSON.stringify(data));

	}
})
function remove(val){
	data.splice(val,1);
	pushTodo();
	localStorage.setItem('todo',JSON.stringify(data));
}
function closeInput(){
	console.log('close');
	inputForm.classList.remove('enable');
}
function closeEdit(){
	openEdit.classList.remove('enable');
}