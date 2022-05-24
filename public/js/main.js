const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

//get username and room from url
const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix: true});



//msg from server
const socket = io();

//join chatroom
socket.emit('joinRoom', {username, room});
socket.on('message',message => {
    console.log(message); 
    outputMessage(message);

//get room and users

socket.on('roomUsers', ({room, users}) => {
    outputRoomName(room);
    outputUsers(users);
});
    //scroll down   
    chatMessages.scrollTop = chatMessages.scrollHeight;

});


//msg submit 
chatForm.addEventListener('submit',(e) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;

    //emiting a msg to server
    socket.emit('chatMessage',msg);

    //clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
    // e.target.elements.msg.value = '';
    
});

//output msg to DOM

function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username}<span> ${ message.time}</span></p>
    <p class="text">
        ${message.text }
    </p>`
    document.querySelector('.chat-messages').appendChild(div);
    
}


//add room name to dom
function outputRoomName(room){
    roomName.innerText = room;
}

//add users to dom

function outputUsers(users){
    userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
}