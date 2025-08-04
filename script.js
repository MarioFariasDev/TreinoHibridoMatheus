const treinos = [
  {
    dia: "DIA 1 – Peito + Tríceps + Core",
    tecnica: "Reverse Pyramid + Pré-exaustão",
    objetivo: "Hipertrofia estética com foco em peitoral e tríceps",
    exercicios: [
      ["Crossover polia baixa", "3", "15", "Pré-exaustão reversa", "Foco em alongamento"],
      ["Supino reto barra", "4", "6-8-10-12", "Reverse pyramid", "Começa pesado e reduz carga"],
      ["Supino inclinado com halteres", "3", "10", "Pausa 1s no topo", "Controle de amplitude"],
      ["Tríceps testa barra W", "3", "12", "Cadência controlada", "Evitar abrir demais os cotovelos"],
      ["Tríceps corda", "3", "15", "Rest-pause na última", "5s de pausa e completar repetições"],
      ["Prancha com elevação de pernas", "3", "30s + 15", "Bi-set", "Core ativo"]
    ]
  },
  {
    dia: "DIA 2 – Costas + Bíceps",
    tecnica: "Cluster Sets + Cadência",
    objetivo: "Espessura dorsal e definição de bíceps",
    exercicios: [
      ["Puxada frente pegada média", "4", "10", "Cadência 3-0-1", "Controle no retorno"],
      ["Remada unilateral halter", "3", "12 cada", "Conexão mente-músculo", "Foco na contração"],
      ["Remada baixa máquina", "4", "16 (4x4)", "Cluster set", "15s de descanso interno"],
      ["Rosca direta barra", "3", "10", "Drop-set final", "Última série até falha"],
      ["Rosca alternada inclinada", "3", "12", "-", "Rotação ao subir"],
      ["Rosca concentrada", "2", "Até falha", "Pausa no topo", "Segurar 2s"]
    ]
  },
  {
    dia: "DIA 3 – Posteriores + Core",
    tecnica: "Tensão contínua + Isometria",
    objetivo: "Ênfase em glúteo e posterior com controle",
    exercicios: [
      ["Stiff com halteres pesados", "4", "8", "3s descida", "Explodir na subida"],
      ["Mesa flexora", "4", "12", "Isometria 1s no topo", "Ativação consciente"],
      ["Passada estacionária com halteres", "3", "10/10", "Profunda e controlada", "Sem balanço"],
      ["Elevação pélvica com peso", "3", "15", "Pausa no topo", "Sustentar 1s"],
      ["Abdômen oblíquo + prancha lateral", "3", "15 + 30s", "Bi-set", "Estabilidade e rotação"]
    ]
  },
  {
    dia: "DIA 4 – Ombros + Trapézio + Antebraço",
    tecnica: "Drop-set sequencial + Supersérie",
    objetivo: "Definição do deltoide e vascularização de antebraço",
    exercicios: [
      ["Desenvolvimento com halteres sentado", "4", "10", "Drop-set na última", "Foco em amplitude"],
      ["Elevação lateral + frontal", "3", "12+12", "Supersérie", "Sem descanso entre movimentos"],
      ["Crucifixo inverso na polia", "3", "15", "Tempo sob tensão 2-1-2", "Deltoide posterior"],
      ["Encolhimento com barra", "3", "15", "Pausa no topo", "Segurar 1s"],
      ["Rosca punho + rosca inversa", "3", "15+12", "Bi-set", "Foco vascular"]
    ]
  },
  {
    dia: "DIA 5 – Peito Variado + Core",
    tecnica: "Rest-Pause + Pump focalizado",
    objetivo: "Estímulos variados no peitoral superior e core",
    exercicios: [
      ["Supino inclinado com barra", "4", "8-8-6-6", "Rest-pause na última", "Recuperação curta"],
      ["Crossover em Y (ângulo alto)", "3", "15", "Pump", "Pausa de 1s na contração"],
      ["Supino reto com halteres", "3", "10", "Amplitude + contração", "Controle da fase excêntrica"],
      ["Flexão com isometria no fundo", "2", "Até falha", "Segurar 2s no ponto mais baixo", "-"],
      ["Crunch com peso + prancha dinâmica", "3", "15 + 30s", "Bi-set", "Core completo"]
    ]
  },
  {
    dia: "DIA 6 – Braços + Peito Pump",
    tecnica: "Bi-set pesado + Pump",
    objetivo: "Volume e estética em braços com pump final de peito",
    exercicios: [
      ["Tríceps corda + testa (bi-set)", "3", "12+12", "-", "Sem descanso entre"],
      ["Rosca direta + martelo (bi-set)", "3", "10+10", "-", "Conexão e pico"],
      ["Rosca Scott com pausa final", "3", "10", "Pausa 2s no topo", "Maximizar tensão"],
      ["Crossover alto + baixo", "3", "15+15", "Combo pump", "Estética total"],
      ["Flexão diamante", "2", "Até falha", "Controle lento", "-"]
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

