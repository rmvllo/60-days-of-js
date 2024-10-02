const textarea = document.querySelector("textarea");
const voicelist = document.querySelector("select");
const speechBtn = document.querySelector("button");

let synth = speechSynthesis;
    isSpeaking = true;

voices();

function voices() {
    for (let voice of synth.getVoices()) {
        let selected = voice.name === "Google US English" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}> ${voice.name} (${voice.lang})</option>`;
        voicelist.insertAdjacentHTML("beforeend", option);
    }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    for (let voice of synth.getVoices()) {
        if (voice.name === voicelist.value) {
            utterance.voice = voice;
        }
    }
    synth.speak(utterance);
}

speechBtn.addEventListener("click", e => {
    e.preventDefault();
    if(textarea.value !== "") {
        // Checar se não está falando, Speak Textarea text
        if (!synth.speaking) {
            textToSpeech(textarea.value);
        }
        //  função para se o texto for longo, adiciona resume e pausa
        if (textarea.value.length > 80 ) {
            setInterval(() => {
                if (!synth.speaking && !isSpeaking) {
                    isSpeaking = true;
                    speechBtn.innerText = "Converter para fala";
                } else { }
            }, 500);
            if (isSpeaking) {
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pausar fala";
            } else {
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Continuar fala";
            }
        } else {
            speechBtn.innerText = "Converter para fala";
        }
    }
});