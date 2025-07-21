const treinos = [
  {
    dia: "DIA 1 – Peito + Tríceps + Core",
    tecnica: "Pré-exaustão reversa e isometria",
    objetivo: "Hipertrofia estética com foco em peitoral e tríceps",
    exercicios: [
      ["Crossover polia baixa", "3", "15", "Pré-exaustão reversa", "-"],
      ["Supino reto com barra", "4", "10-8-6-6", "-", "-"],
      ["Supino declinado com halteres", "3", "10", "-", "-"],
      ["Tríceps corda", "3", "15", "Pausa 2s na contração", "-"],
      ["Tríceps banco", "3", "Até a falha", "-", "-"],
      ["Abdominal infra + prancha", "3", "15 + 40s", "Bi-set", "-"]
    ]
  },
  {
    dia: "DIA 2 – Costas + Bíceps",
    tecnica: "Drop-set e cadência 4-0-2",
    objetivo: "Espessura dorsal e pico de bíceps",
    exercicios: [
      ["Pulldown pegada supinada", "4", "10", "Cadência 4-0-2", "-"],
      ["Remada baixa na máquina", "4", "10-8-6-6", "-", "-"],
      ["Remada unilateral com halter", "3", "12", "Conexão mente-músculo", "-"],
      ["Rosca direta com barra", "3", "10", "Drop-set final", "-"],
      ["Rosca alternada com rotação", "3", "12", "-", "-"],
      ["Rosca concentrada", "2", "Até a falha", "-", "-"]
    ]
  },
  {
    dia: "DIA 3 – Pernas (posterior) + Core",
    tecnica: "Amplitude e falha mecânica",
    objetivo: "Ênfase em glúteo e posterior",
    exercicios: [
      ["Stiff com barra", "4", "10", "Amplitude total", "-"],
      ["Mesa flexora unilateral", "4", "12", "Pausa 1s no pico", "-"],
      ["Passada no Smith", "3", "8/8", "Profunda e controlada", "-"],
      ["Elevação pélvica com halter", "3", "15", "Pausa no topo", "-"],
      ["Prancha + elevação de pernas", "3", "30s + 15", "Bi-set", "-"]
    ]
  },
  {
    dia: "DIA 4 – Ombros + Trapézio + Core",
    tecnica: "Supersérie e tempo sob tensão",
    objetivo: "Definição de deltoides e trapézio",
    exercicios: [
      ["Desenvolvimento com barra guiada", "4", "10", "Lento até o topo", "-"],
      ["Elevação lateral + frontal", "3", "12+12", "Supersérie", "-"],
      ["Crucifixo inverso na polia", "3", "15", "Tempo sob tensão", "-"],
      ["Encolhimento com halteres", "3", "20", "Segura 1s no topo", "-"],
      ["Prancha lateral + abdominal reto", "3", "30s + 15", "-", "-"]
    ]
  },
  {
    dia: "DIA 5 – Peito (ângulos variados)",
    tecnica: "Rest-pause e isometria",
    objetivo: "Ênfase em peitoral superior e variedade de estímulo",
    exercicios: [
      ["Supino inclinado com halteres", "4", "8-8-6-6", "Rest-pause na última", "-"],
      ["Crossover polia alta", "3", "15", "Foco em contração e alongamento", "-"],
      ["Supino reto na máquina", "3", "10", "-", "-"],
      ["Flexão com pausa isométrica", "2", "Até a falha", "Pausa 2-3s no fundo", "-"],
      ["Abdominal oblíquo + prancha", "3", "15 + 30s", "-", "-"]
    ]
  },
  {
    dia: "DIA 6 – Braços + Peito Pump",
    tecnica: "Drop-set e falha mecânica",
    objetivo: "Pump extremo em braços e peitoral",
    exercicios: [
      ["Tríceps francês banco + corda", "3", "10+10", "Bi-set", "-"],
      ["Tríceps testa + paralela", "3", "10 + até falha", "Bi-set", "-"],
      ["Rosca direta + martelo", "3", "10+10", "Bi-set", "-"],
      ["Rosca Scott com isometria", "3", "10", "Pausa 2s no pico", "-"],
      ["Crossover 3 ângulos", "3", "15", "Estética total", "-"],
      ["Flexão diamante", "2", "Até a falha", "-", "-"]
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
