const treinos = [
  {
    dia: "DIA 1 – Fullbody A (Peito/Tríceps)",
    tecnica: "Reverse Pyramid + Rest-pause",
    objetivo: "Estímulo global com foco em peitoral e tríceps",
    exercicios: [
      ["Supino reto barra", "4", "8-10", "Reverse pyramid", "Carga alta, reduzir peso a cada série"],
      ["Agachamento frontal", "4", "8-10", "Controle de core", "Postura ereta e abdômen firme"],
      ["Remada baixa máquina", "4", "10", "Cadência 3-0-2", "Foco no alongamento"],
      ["Desenvolvimento militar barra", "3", "10", "Tempo sob tensão", "Subida forte, descida controlada"],
      ["Tríceps corda", "3", "12-15", "Rest-pause final", "Última série com pausa de 5s"],
      ["Rosca direta barra", "3", "12", "-", "Foco no pico da contração"],
      ["Abdominal infra + prancha", "3", "15 + 40s", "Bi-set", "Core ativo todo tempo"]
    ]
  },
  {
    dia: "DIA 2 – Costas + Bíceps",
    tecnica: "Cluster set + Drop-set",
    objetivo: "Espessura dorsal e pico de bíceps",
    exercicios: [
      ["Puxada frente pegada supinada", "4", "10", "Cadência 3-1-1", "Controle total no retorno"],
      ["Remada unilateral halter", "3", "12", "Conexão mente-músculo", "Contração máxima"],
      ["Levantamento terra romeno", "3", "8-10", "Amplitude controlada", "Foco em posteriores e lombar"],
      ["Rosca direta barra", "3", "10", "Drop-set final", "Última série até a falha"],
      ["Rosca alternada inclinada", "3", "12", "-", "Rotação de punho ao subir"],
      ["Rosca concentrada", "2", "Até falha", "Pausa 2s no topo", "Isolamento total"]
    ]
  },
  {
    dia: "DIA 3 – Fullbody B (Pernas/Core)",
    tecnica: "Tensão contínua + Isometria",
    objetivo: "Ênfase em pernas, glúteos e core",
    exercicios: [
      ["Stiff com barra", "4", "10", "3s descida", "Explosivo na subida"],
      ["Agachamento búlgaro", "3", "10/10", "Unilateral", "Controle sem balanço"],
      ["Supino inclinado halteres", "3", "10", "Isometria no topo", "Foco em peitoral superior"],
      ["Remada curvada barra", "3", "10", "Cadência controlada", "Contração máxima"],
      ["Elevação lateral halter", "3", "12", "-", "Amplitude total"],
      ["Tríceps testa barra W", "3", "12", "-", "Controle do movimento"],
      ["Prancha lateral + abdominal oblíquo", "3", "30s + 15", "Bi-set", "Core e estabilidade lateral"]
    ]
  },
  {
    dia: "DIA 4 – Peito + Ombros + Tríceps",
    tecnica: "Rest-pause + Supersérie",
    objetivo: "Densidade no peitoral e deltoides",
    exercicios: [
      ["Supino inclinado barra", "4", "8", "Rest-pause última série", "Força máxima"],
      ["Crucifixo inclinado polia", "3", "12-15", "Pump", "Alongar e contrair bem"],
      ["Desenvolvimento halteres", "3", "10", "Amplitude total", "Controle total"],
      ["Elevação lateral + frontal", "3", "12+12", "Supersérie", "Sem descanso entre séries"],
      ["Tríceps francês + tríceps banco", "3", "12 + falha", "Bi-set", "Queima total de tríceps"],
      ["Flexão isométrica", "2", "Até falha", "Segurar 2s no fundo", "Controle lento"]
    ]
  },
  {
    dia: "DIA 5 – Braços + Core",
    tecnica: "Bi-set + Pump final",
    objetivo: "Volume em braços e pump estético",
    exercicios: [
      ["Rosca direta + martelo", "3", "10+10", "Bi-set", "Sem descanso entre variações"],
      ["Rosca Scott", "3", "10", "Pausa 2s no topo", "Tensão máxima"],
      ["Rosca alternada", "3", "12", "-", "Rotação de punho ao final"],
      ["Tríceps corda", "3", "12-15", "-", "Última série até a falha"],
      ["Tríceps testa barra", "3", "10", "-", "Controle total do movimento"],
      ["Crossover 3 ângulos", "3", "15", "Pump final", "Peitoral cheio e estético"],
      ["Abdominal supra com peso", "3", "15", "-", "Controle de lombar"]
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


