const socket = io('http://localhost:8000'); // Ensure this URL is accessible

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message'); 
    messageElement.classList.add(position);
    messageContainer.append(messageElement); // Append the message to the container
};

// Send message when form is submitted
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right'); // Use backticks for template literals
    socket.emit('send', message);
    messageInput.value = ''; // Clear input field
});

// Prompt for user name
const name = prompt("Enter your name to join:");
socket.emit('new-user-joined', name);

// Listen for user joining message
socket.on('user-joined', (name) => {
    append(`${name} joined the chat`, 'right'); // Use backticks for template literals
});

// Listen for incoming messages
socket.on('receive', (data) => {
    append(`${data.name}: ${data.message}`, 'left'); // Use backticks for template literals
});

socket.on('left',name =>{
    append('${name} left the chat', 'left')
})