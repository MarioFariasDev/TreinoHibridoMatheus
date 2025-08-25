const treinos = [
  {
    dia: "DIA 1 – Fullbody (ênfase Peito + Tríceps)",
    tecnica: "Pré-exaustão + Reverse Pyramid",
    objetivo: "Início da semana com foco em peito e tríceps com carga",
    exercicios: [
      ["Crossover polia baixa", "3", "15", "Pré-exaustão", "Foco no alongamento e contração"],
      ["Supino reto barra", "4", "6-8-10-12", "Reverse Pyramid", "Reduz carga a cada série"],
      ["Agachamento frontal", "3", "10", "-", "Manter core firme"],
      ["Remada baixa máquina", "3", "10", "-", "Cadência controlada"],
      ["Tríceps corda", "3", "15", "Rest-pause final", "Última série com pausa 5s"],
      ["Rosca direta barra", "3", "12", "-", "Conexão e pico"],
      ["Prancha + abdominal infra", "3", "30s + 15", "Bi-set", "Core ativado"]
    ]
  },
  {
    dia: "DIA 2 – Fullbody (ênfase Costas + Bíceps)",
    tecnica: "Cluster + Drop-set",
    objetivo: "Espessura dorsal e pico de bíceps",
    exercicios: [
      ["Puxada frente pegada supinada", "4", "10", "Cadência 3-1-1", "Controle total no retorno"],
      ["Remada curvada barra", "3", "10", "-", "Foco na escápula"],
      ["Levantamento terra romeno", "3", "8", "-", "Amplitude e glúteo"],
      ["Supino inclinado halteres", "3", "10", "-", "Peitoral superior ativo"],
      ["Rosca direta barra", "3", "10", "Drop-set final", "Última série até falha"],
      ["Rosca alternada inclinada", "3", "12", "-", "Rotação completa"],
      ["Crunch com peso + prancha", "3", "15 + 30s", "Bi-set", "Core total"]
    ]
  },
  {
    dia: "DIA 3 – Fullbody (ênfase Pernas + Core)",
    tecnica: "Tensão contínua + Isometria",
    objetivo: "Foco em membros inferiores com estímulo global",
    exercicios: [
      ["Stiff com barra", "4", "10", "3s descida", "Explosão na subida"],
      ["Agachamento búlgaro", "3", "10/10", "-", "Controle sem desequilibrar"],
      ["Supino reto com halteres", "3", "10", "-", "Conexão e estabilidade"],
      ["Remada unilateral halter", "3", "12", "-", "Contração completa"],
      ["Elevação lateral", "3", "12", "-", "Foco em deltoide médio"],
      ["Tríceps francês barra", "3", "12", "-", "Sem abrir cotovelos"],
      ["Abdominal oblíquo + prancha lateral", "3", "15 + 30s", "Bi-set", "Estabilidade e rotação"]
    ]
  },
  {
    dia: "DIA 4 – Fullbody (ênfase Ombros + Peito)",
    tecnica: "Supersérie + Pump",
    objetivo: "Volume e densidade em deltoides e peitoral",
    exercicios: [
      ["Desenvolvimento halteres sentado", "4", "10", "Supersérie", "Última com elevação lateral"],
      ["Elevação lateral + frontal", "3", "12+12", "Supersérie", "Sem descanso"],
      ["Supino inclinado barra", "4", "8", "Rest-pause final", "Força máxima"],
      ["Crossover em Y", "3", "15", "Pump", "Pausa 1s no pico"],
      ["Tríceps corda + tríceps banco", "3", "12+falha", "Bi-set", "Estourar o tríceps"],
      ["Flexão isométrica", "2", "Falha", "Segura 2s no fundo", "Controle total"],
      ["Crunch + prancha dinâmica", "3", "15 + 30s", "Bi-set", "Core ativo"]
    ]
  },
  {
    dia: "DIA 5 – Fullbody (ênfase Braços + Core)",
    tecnica: "Bi-set + Pump final",
    objetivo: "Finalizar a semana com pump total em braços e core ativo",
    exercicios: [
      ["Rosca direta + martelo", "3", "10+10", "Bi-set", "Sem descanso"],
      ["Rosca Scott", "3", "10", "Pausa 2s no topo", "Tensão total"],
      ["Rosca alternada", "3", "12", "-", "Rotação máxima"],
      ["Tríceps corda", "3", "12-15", "-", "Última série até a falha"],
      ["Tríceps testa barra", "3", "10", "-", "Controle completo"],
      ["Crossover 3 ângulos", "3", "15", "Pump final", "Peitoral cheio e estético"],
      ["Abdominal supra com peso", "3", "15", "-", "Controle e foco em abdômen"]
    ]
  }
];


const treinoContainer = document.getElementById("treinoContainer");
const progresso = JSON.parse(localStorage.getItem("progresso") || "{}");

treinos.forEach((treino, i) => {
  const card = document.createElement("div");
  card.className = "card";

  let html = `
    <h2>${treino.dia}</h2>
    <p><strong>Técnica:</strong> ${treino.tecnica}</p>
    <p><strong>Objetivo:</strong> ${treino.objetivo}</p>
    <table class="exercise-table">
      <thead>
        <tr>
          <th>✔</th>
          <th>Exercício</th>
          <th>Séries</th>
          <th>Reps</th>
          <th>Técnica</th>
          <th>Obs</th>
          <th>Descanso</th>
        </tr>
      </thead>
      <tbody>
  `;

  treino.exercicios.forEach((ex, j) => {
    const key = `d${i}_e${j}`;
    const checked = progresso[key]?.feito ? "checked" : "";
    const doneClass = progresso[key]?.feito ? "done" : "";

    html += `
      <tr class="exercise-row ${doneClass}" data-key="${key}">
        <td><input type="checkbox" ${checked}></td>
        <td>${ex[0]}</td>
        <td>${ex[1]}</td>
        <td>${ex[2]}</td>
        <td>${ex[3]}</td>
        <td>${ex[4]}</td>
        <td>
          <button class="timer-btn" onclick="iniciarTimer(this)">⏱️</button>
          <span class="timer-display">00:00</span>
        </td>
      </tr>
    `;
  });

  html += `</tbody></table>`;
  if (treino.cardio) html += `<p><strong>Cardio:</strong> ${treino.cardio}</p>`;
  card.innerHTML = html;
  treinoContainer.appendChild(card);
});

document.querySelectorAll(".exercise-row input[type='checkbox']").forEach(input => {
  input.addEventListener("change", function () {
    const row = this.closest(".exercise-row");
    const key = row.dataset.key;
    const feito = this.checked;
    row.classList.toggle("done", feito);
    progresso[key] = { feito };
    localStorage.setItem("progresso", JSON.stringify(progresso));
  });
});

function iniciarTimer(btn) {
  const span = btn.nextElementSibling;
  let tempo = 60;
  span.textContent = formatar(tempo);
  btn.disabled = true;

  const intervalo = setInterval(() => {
    tempo--;
    span.textContent = formatar(tempo);
    if (tempo <= 0) {
      clearInterval(intervalo);
      btn.disabled = false;
      span.textContent = "✔️";
    }
  }, 1000);
}

function formatar(s) {
  const m = String(Math.floor(s / 60)).padStart(2, "0");
  const sec = String(s % 60).padStart(2, "0");
  return `${m}:${sec}`;
}

const feedback = document.getElementById("feedback");
const feedbackSalvo = localStorage.getItem("feedbackGlobal");
if (feedbackSalvo) feedback.value = feedbackSalvo;

document.getElementById("salvarFeedback").addEventListener("click", () => {
  localStorage.setItem("feedbackGlobal", feedback.value);
  alert("Feedback salvo com sucesso!");
});

document.getElementById("darkToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});



