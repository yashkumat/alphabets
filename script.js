const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 25;
let startX;
let startY;
let alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

let speech = new SpeechSynthesisUtterance();
speech.lang = "en";

toolbar.addEventListener('click', e => {
    
    if (e.target.id === 'next') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var alphabet = alphabets[Math.floor(Math.random()*alphabets.length)];

        if(alphabet.charCodeAt(0) >= 65 && alphabet.charCodeAt(0) <= 90){
            speech.text = 'capital ' + alphabet
        }else if(alphabet.charCodeAt(0) >= 97 && alphabet.charCodeAt(0) <= 122){
            speech.text = 'small '+ alphabet
        }else{
            speech.text = 'small y'
        }

        document.getElementById("random_alphabet").innerHTML = alphabet
        
        window.speechSynthesis.speak(speech);
    }
    
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if(speech.text == ""){
            speech.text = 'small y'
        }
        window.speechSynthesis.speak(speech);
    }

    if(e.target.id == 'speak'){
        if(speech.text == ""){
            speech.text = 'small y'
        }
        window.speechSynthesis.speak(speech);
    }
});

toolbar.addEventListener('change', e => {
    if(e.target.id === 'stroke') {
        ctx.strokeStyle = e.target.value;
    }

    if(e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }
    
});

const draw = (e) => {
    if(!isPainting) {
        return;
    }

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
    ctx.stroke();
}

canvas.addEventListener('pointerdown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('pointerup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('pointermove', draw);
