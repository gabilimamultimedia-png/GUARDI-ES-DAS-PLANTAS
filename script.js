// 1. Cursor e Micro-interações
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        follower.style.left = e.clientX - 11 + 'px';
        follower.style.top = e.clientY - 11 + 'px';
    }, 50);
});

// 2. Loading State
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(() => document.getElementById('loader').remove(), 500);
        initTypewriter();
    }, 2000);
});

// 3. Efeito Typewriter Profissional
function initTypewriter() {
    const text = "Monitorização Global de Saúde Vegetal em tempo real. Identifica ameaças, protege ecossistemas.";
    let i = 0;
    const speed = 40;
    function type() {
        if (i < text.length) {
            document.getElementById("typing-hero").innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// 4. Lógica do Game Dashboard
let gameState = {
    score: 0,
    level: 1,
    foundPragas: 0
};

const scenarios = [
    { name: "Horta Comunitária", bg: "images/fundo-horta.jpg", pragas: 4 },
    { name: "Reserva Florestal", bg: "images/fundo-floresta.jpg", pragas: 6 },
    { name: "Pulmão Urbano", bg: "images/fundo-cidade-verde.jpg", pragas: 5 }
];

function loadLevel(idx) {
    const viewport = document.getElementById('game-viewport');
    viewport.style.backgroundImage = `url(${scenarios[idx].bg})`;
    viewport.style.backgroundSize = "cover";
    viewport.innerHTML = '<div class="scan-line"></div>';
    
    document.getElementById('current-location').innerText = scenarios[idx].name;

    for(let i=0; i<scenarios[idx].pragas; i++) {
        createPraga(viewport);
    }
}

function createPraga(parent) {
    const p = document.createElement('div');
    p.className = 'praga-target';
    p.style.cssText = `
        position: absolute;
        top: ${Math.random() * 80 + 10}%;
        left: ${Math.random() * 80 + 10}%;
        width: 40px;
        height: 40px;
        background: url('images/pragas.png') no-repeat center;
        background-size: contain;
        filter: saturate(0) brightness(0.5);
        cursor: pointer;
        transition: 0.3s;
    `;
    
    p.onclick = function() {
        if(this.dataset.identified) return;
        this.style.filter = 'saturate(1.5) drop-shadow(0 0 10px red)';
        this.dataset.identified = true;
        updateScore(150);
        checkLevelComplete();
    };
    
    parent.appendChild(p);
}

function updateScore(points) {
    gameState.score += points;
    document.getElementById('score-val').innerText = gameState.score.toString().padStart(4, '0');
}

// 5. Certificado Profissional em Canvas
function generateProfessionalCert() {
    const name = document.getElementById('guardian-name').value.toUpperCase();
    if(!name) return alert("Por favor, insira o nome.");

    const canvas = document.getElementById('hidden-canvas');
    const ctx = canvas.getContext('2d');

    // Desenho de fundo elegante (Simulado)
    ctx.fillStyle = '#0b130e';
    ctx.fillRect(0, 0, 1200, 800);
    ctx.strokeStyle = '#2ecc71';
    ctx.lineWidth = 20;
    ctx.strokeRect(40, 40, 1120, 720);

    // Textos
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.font = '800 60px Lexend';
    ctx.fillText('CERTIFICADO DE MÉRITO AMBIENTAL', 600, 200);
    
    ctx.font = '300 30px Lexend';
    ctx.fillText('ESTA CREDENCIAL É ATRIBUÍDA A', 600, 320);
    
    ctx.fillStyle = '#2ecc71';
    ctx.font = '700 80px Lexend';
    ctx.fillText(name, 600, 450);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '300 25px Lexend';
    ctx.fillText('Pelo compromisso com a Saúde das Plantas e Sustentabilidade Global.', 600, 550);

    // Converter para imagem e exibir
    const dataUrl = canvas.toDataURL();
    const renderArea = document.getElementById('cert-render-area');
    renderArea.innerHTML = `<img src="${dataUrl}" class="cert-preview">`;
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
}

// Iniciar primeiro nível
loadLevel(0);
