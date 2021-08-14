document.querySelector('.fullscreen').addEventListener('click', toggleScreen);

function toggleScreen() {
    if (document.fullscreenElement === null) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}
///////////////////////////////////////////////////////////////////////////
function playAudio(src) {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
}

const piano = document.querySelector('.piano');
const pianoKeys = document.querySelectorAll('.piano-key');

////////////////////////////////////////////////////////////////////////////////





const containerBtn = document.querySelector('.btn-container');
const notesBtn = document.querySelector('.btn-notes');
const letterBtn = document.querySelector('.btn-letters');

letterBtn.addEventListener('click', event => {
    if (!letterBtn.classList.contains('btn-active')) {
        letterBtn.classList.add('btn-active');
        notesBtn.classList.remove('btn-active');
    }
    pianoKeys.forEach((el) => {
        el.classList.add('piano-key-letter')
    });
})

notesBtn.addEventListener('click', event => {
    if (!notesBtn.classList.contains('btn-active')) {
        notesBtn.classList.add('btn-active');
        letterBtn.classList.remove('btn-active');
    }
    pianoKeys.forEach((el) => {
        el.classList.remove('piano-key-letter')
    });
})


///////////////////////////////////////////////////////////////////////////

window.addEventListener("keydown", keyboardSound);
window.addEventListener("keydown", event => {
    const key = document.querySelector(`.piano-key[data-key="${event.keyCode}"]`);
    if (!key) return false;
    if (key.classList.contains("piano-key")) {
        key.classList.add("piano-key-active");
        key.classList.add("piano-key-active-pseudo");
    }
});
window.addEventListener("keyup", event => {
    const key = document.querySelector(`.piano-key[data-key="${event.keyCode}"]`);
    if (!key) return false;
    if (key.classList.contains("piano-key")) {
        key.classList.remove("piano-key-active");
        key.classList.remove("piano-key-active-pseudo");
    }
});



function keyboardSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    if (!audio) return false;
    if (e.repeat) return false;
    audio.currentTime = 0;
    audio.play();
}

///////////////////////////////////////////////////////////////////

const startProp = event => {
    event.target.classList.add("piano-key-active");
    event.target.classList.add("piano-key-active-pseudo");
    if (event.target.classList.contains('piano-key')) {
        const note = event.target.dataset.note;
        const src = `./assets/audio/${note}.mp3`;
        playAudio(src);
    };
}
const endProp = event => {
    event.target.classList.remove("piano-key-active");
    event.target.classList.remove("piano-key-active-pseudo");
}


piano.addEventListener('mousedown', event => {
    event.target.classList.add("piano-key-active");
    event.target.classList.add("piano-key-active-pseudo");
    piano.addEventListener('mouseover', startProp)
    piano.addEventListener('mouseout', endProp)
    if (event.target.classList.contains('piano-key')) {
        const note = event.target.dataset.note;
        const src = `./assets/audio/${note}.mp3`;
        playAudio(src);
    };
})

piano.addEventListener('mouseup', event => {
    event.target.classList.remove("piano-key-active");
    event.target.classList.remove("piano-key-active-pseudo");
    piano.removeEventListener('mouseover', startProp)
    piano.removeEventListener('mouseout', endProp)
})

piano.addEventListener('mouseout', event => {
    event.target.classList.add('piano-key-remove-mouse')
})




