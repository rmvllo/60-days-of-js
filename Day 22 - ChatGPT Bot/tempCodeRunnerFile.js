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
            'x-rapidapi-key': '0cece6d7a7mshbe958ea513674b5p11f1e7jsn46c3dbe7e448',
            'x-rapidapi-host': 'open-ai21.p.rapidapi.com',
            'Content-Type': 'application/json'
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
    
    fetch('https://open-ai21.p.rapidapi.com/chatgpt', options)
    .then((response) => response.json())
    .then((response) => {
        console.log(response); // Log para verificar o que a API está retornando
        if (response.choices && response.choices[0] && response.choices[0].message) {
            appendMessage('bot', response.choices[0].message.content);
        } else {
            appendMessage('bot', 'Erro na resposta da API.');
        }

        buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
        buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
    })
    .catch((err) => {
        console.error(err); // Log do erro para debugar melhor
        if (err.name === 'TypeError') {
            appendMessage('bot', 'Error: Verificar a chave da API!');
            buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
        }
    });

}