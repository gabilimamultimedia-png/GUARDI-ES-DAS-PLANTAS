// Configurações do Jogo
let points = 0;
let currentScenario = 0;
const scenarios = [
    { title: "Horta", bg: "images/fundo-horta.jpg", targets: 3 },
    { title: "Floresta", bg: "images/fundo-floresta.jpg", targets: 3 },
    { title: "Cidade Verde", bg: "images/fundo-cidade.jpg", targets: 3 }
];

// 1. Cursor Personalizado
const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// 2. Efeito Typing
const typingText = "Sabias que as plantas produzem quase todo o oxigénio que respiramos?";
let i = 0;
function typeWriter() {
    if (i < typingText.length) {
        document.getElementById("typing-text").innerHTML += typingText.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    }
}
window.onload = typeWriter;

// 3. Navegação entre Secções
function changeSection(sectionId) {
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    
    if(sectionId === 'game') startScenario();
}

// 4. Lógica do Jogo
function startScenario() {
    const canvas = document.getElementById('game-canvas');
    const scenario = scenarios[currentScenario];
    document.getElementById('scenario-title').innerText = `Cenário: ${scenario.title}`;
    canvas.style.backgroundImage = `url(${scenario.bg})`;
    canvas.innerHTML = ''; // Limpar alvos anteriores

    for(let j=0; j < scenario.targets; j++) {
        const target = document.createElement('img');
        target.src = 'images/praga.png'; // Ou lixo, folha doente
        target.className = 'hotspot';
        target.style.width = '60px';
        target.style.top = Math.random() * 80 + '%';
        target.style.left = Math.random() * 80 + '%';
        
        target.onclick = () => {
            triggerQuizTask(target);
        };
        canvas.appendChild(target);
    }
}

function triggerQuizTask(element) {
    // Aqui podes abrir uma pergunta rápida
    points += 10;
    document.getElementById('points').innerText = points;
    element.style.display = 'none';
    
    checkProgress();
}

function checkProgress() {
    const targetsRemaining = document.querySelectorAll('.hotspot:not([style*="display: none"])').length;
    if(targetsRemaining === 0) {
        currentScenario++;
        updateProgressBar();
        if(currentScenario < scenarios.length) {
            setTimeout(startScenario, 1000);
        } else {
            confetti(); // Efeito de vitória
            setTimeout(() => changeSection('quiz'), 2000);
        }
    }
}

function updateProgressBar() {
    const progress = (currentScenario / scenarios.length) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';
}

// 5. Certificado com Canvas
function generateCertificate() {
    const name = document.getElementById('user-name').value || "Guardião Fiel";
    const canvas = document.getElementById('certCanvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = function() {
        ctx.drawImage(img, 0, 0, 800, 600);
        ctx.font = '40px Quicksand';
        ctx.fillStyle = '#27AE60';
        ctx.textAlign = 'center';
        ctx.fillText(name, 400, 300); // Ajusta a posição conforme a tua imagem
        
        const preview = document.getElementById('cert-preview');
        preview.innerHTML = `<img src="${canvas.toDataURL()}" style="width:100%; border-radius:10px; box-shadow:0 10px 30px rgba(0,0,0,0.2);">`;
        preview.innerHTML += `<br><a href="${canvas.toDataURL()}" download="certificado_guardiao.png" class="btn-main">Descarregar Certificado</a>`;
    };
    img.src = 'images/certificado-base.jpg';
}

// Modais
function openModal(type) {
    const modal = document.getElementById('modal');
    const title = document.getElementById('modal-title');
    const text = document.getElementById('modal-text');
    
    const content = {
        oxigenio: { t: "As Plantas Respiram por nós!", p: "Elas absorvem o CO2 e dão-nos oxigénio puro." },
        comida: { t: "Delícias Naturais", p: "Sem abelhas e plantas saudáveis, não teríamos fruta nem vegetais!" },
        equilibrio: { t: "Casa de Todos", p: "As florestas são as casas dos animais. Se as plantas estão doentes, eles ficam sem casa." }
    };
    
    title.innerText = content[type].t;
    text.innerText = content[type].p;
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Música
document.getElementById('toggle-music').onclick = function() {
    const music = document.getElementById('bg-music');
    if (music.paused) {
        music.play();
        this.innerText = "🔊";
    } else {
        music.pause();
        this.innerText = "🎵";
    }
};
