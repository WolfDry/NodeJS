const messageList = document.getElementById('message-list');
const chatStatus = document.getElementById('chat-status');


/**
 * Permet l'affichage du message
 * @param {string} name 
 * @param {string} message 
 */
function addMessage(name, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message')
  const nameElement = document.createElement('b');

  nameElement.innerText = name + " : ";
  messageElement.appendChild(nameElement);

  const textElement = document.createElement('span');

  textElement.innerText = message;
  messageElement.appendChild(textElement);
  messageList.appendChild(messageElement);
}

let ws

/**
 * Permet la connexion avec le webSocket
 */
function connect() {
  ws = new WebSocket('ws://localhost:3000/wsChat');

  ws.onopen = () => {
    console.log('Connected');
    chatStatus.style.backgroundColor = 'green';
  };

  ws.onclose = () => {
    console.log('Disconnected');
    chatStatus.style.backgroundColor = 'red';
    setTimeout(connect, 1000);
  };

  ws.onerror = (error) => {
    console.log('Error', error);
  };

  ws.onmessage = (event) => {
    console.log('Message from server', event.data);
    const {type, data} = JSON.parse(event.data);
    console.log(data)
    if (type === 'reply') {
      addMessage(
        data.user.name,
        data.msg
      );
    }
  };
}

connect()

document.querySelector('form')
  .addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document
      .querySelector('#chat-input');
    ws.send(input.value);
    input.value = '';
  });
