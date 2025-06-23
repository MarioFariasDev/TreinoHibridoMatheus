// Função para iniciar o timer
function iniciarTimer(dia, exercicio) {
    let seconds = 60;
    const timerDiv = document.getElementById(`timer-dia${dia}-${exercicio}`);
    timerDiv.textContent = `⏳ Tempo restante: ${seconds}s`;

    const countdown = setInterval(() => {
        seconds--;
        if (seconds <= 0) {
            clearInterval(countdown);
            timerDiv.textContent = "✅ Tempo finalizado!";
        } else {
            timerDiv.textContent = `⏳ Tempo restante: ${seconds}s`;
        }
    }, 1000);
}

// Função para marcar exercício como concluído
function marcarConcluido(dia) {
    const status = document.getElementById(`status${dia}`);
    status.textContent = "✔️ Concluído";
    status.style.color = "#0f0";
}

// Função para enviar o relatório no WhatsApp
