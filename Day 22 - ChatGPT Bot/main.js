const chatLog = document.getElementById('chat-log'),
    userInput = document.getElementById('user-input'),
    sendButton = document.getElementById('send-button'),
    buttonIcon = document.getElementById('button-icon'),
    info = document.querySelector('.info');

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});




function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') {
        return;
    }
    else if (message === 'developer') {
        
        userInput.value = '';
        
        appendMessage('user', message);
        
        setTimeout(() => {
            appendMessage('bot', 'Feito por Rômulo Dantas');
            buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
        }, 2000);
        return;
    }

    appendMessage('user', message);
    userInput.value = '';
    
    
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '0cece6d7a7mshbe958ea513674b5p11f1e7jsn46c3dbe7e448',
            'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
        },
        body: JSON.stringify({
            messages: [
                {
                    role: 'user',
                    content: message 
                }
            ]
        })
        
    };
   
    fetch('https://chatgpt-42.p.rapidapi.com/conversationgpt4-2', options)
    .then((response) => response.json())
    .then((response) => {
        console.log(response); 
        if (response.result) {
            appendMessage('bot', response.result);
        } else {
            appendMessage('bot', 'Erro na resposta da API.');
        }

        buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
        buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
    })
    .catch((err) => {
        console.error(err); 
        appendMessage('bot', 'Erro ao tentar acessar a API.');
        buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
        buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
    });
}





function appendMessage(sender, message) {
    info.style.display = "none";
    
    buttonIcon.classList.remove('fa-solid', 'fa-paper-plane');
    buttonIcon.classList.add('fas', 'fa-spinner', 'fa-pulse');

    const messageElement = document.createElement('div');
    const iconElement = document.createElement('div');
    const chatElement = document.createElement('div');
    const icon = document.createElement('i');

    chatElement.classList.add("chat-box");
    iconElement.classList.add("icon");
    messageElement.classList.add(sender);
    messageElement.innerText = message;

    
    if (sender === 'user') {
        icon.classList.add('fa-regular', 'fa-user');
        iconElement.setAttribute('id', 'user-icon');
    } else {
        icon.classList.add('fa-solid', 'fa-robot');
        iconElement.setAttribute('id', 'bot-icon');
    }

    iconElement.appendChild(icon);
    chatElement.appendChild(iconElement);
    chatElement.appendChild(messageElement);
    chatLog.appendChild(chatElement);
    chatLog.scrollTo = chatLog.scrollHeight;

}

