const treinos = [
  {
    dia: "DIA 1 – Peito + Tríceps + Core",
    tecnica: "Rest-pause e FST-7",
    objetivo: "Hipertrofia estética e ativação completa do peitoral",
    exercicios: [
      ["Supino Reto Barra", "4", "10-8-6-6", "Rest-pause final", "Última série com falha controlada"],
      ["Supino Inclinado Máquina", "3", "10-10-8", "FST-7", "30s de descanso entre séries"],
      ["Crucifixo Inclinado Halter", "3", "12", "Cadência 3-0-1", "Amplitude total"],
      ["Tríceps Paralela", "3", "Até a falha", "-", "Inclinar corpo à frente"],
      ["Tríceps Francês Halter", "3", "10", "-", "Movimento controlado"],
      ["Prancha + Elevação de pernas", "3", "30s + 15", "Bi-set", "Core ativo"]
    ]
  },
  {
    dia: "DIA 2 – Costas + Bíceps",
    tecnica: "Bi-set e contração máxima",
    objetivo: "Espessura dorsal e pico de bíceps",
    exercicios: [
      ["Puxada Frente Pegada Aberta", "4", "12-10-8-6", "-", "Contração no final"],
      ["Remada Curvada com Barra", "4", "8-8-6-6", "-", "Tronco firme"],
      ["Pulldown Supinado", "3", "12", "Contração máxima", "Evitar balanço"],
      ["Rosca Direta Barra", "4", "10-8-8-6", "Drop-set", "Última série até falha"],
      ["Rosca Alternada Halteres", "3", "12", "-", "Rotação no final"],
      ["Rosca Scott", "2", "Até falha", "Cadência lenta", "Descer em 3s"]
    ]
  },
  {
    dia: "DIA 3 – Posterior + Core",
    tecnica: "Isometria e bi-set",
    objetivo: "Ênfase em glúteo e posterior sem carga compressiva",
    exercicios: [
      ["Stiff com Halteres", "4", "10", "Cadência 3s", "Descer até alongar posterior"],
      ["Mesa Flexora", "4", "12", "Isometria", "1s de contração no topo"],
      ["Afundo com Passada", "3", "8/8", "-", "Passos curtos e profundos"],
      ["Elevação Pélvica com Peso", "3", "12", "-", "Pausar no topo"],
      ["Crunch com peso + Prancha", "3", "15 + 30s", "Bi-set", "Foco em controle"]
    ]
  },
  {
    dia: "DIA 4 – Ombros + Trapézio + Antebraço",
    tecnica: "Superséries e cadência",
    objetivo: "Estética do deltoide e antebraço vascularizado",
    exercicios: [
      ["Desenvolvimento Halteres", "4", "10-8-8-6", "-", "Foco em controle"],
      ["Elevação Lateral + Frontal", "3", "12+12", "Bi-set", "Sem trapézio"],
      ["Crucifixo Inverso Peck-Deck", "3", "12", "-", "Deltoide posterior"],
      ["Encolhimento Halteres", "3", "15", "-", "Subir e segurar 1s"],
      ["Rosca Punho + Rosca Inversa", "3", "15 + 12", "Bi-set", "Foco vascular"]
    ]
  },
  {
    dia: "DIA 5 – Peito (superior) + Core",
    tecnica: "Pré-exaustão e pausa isométrica",
    objetivo: "Ênfase estética no peitoral superior",
    exercicios: [
      ["Crucifixo Inclinado + Supino Inclinado", "3 + 3", "15 + 10", "Pré-exaustão", "Sem descanso entre pares"],
      ["Crossover Polia Alta", "3", "12", "-", "Contrair e pausar 1s"],
      ["Supino Reto Barra", "3", "6", "Carga alta", "Descanso 90s"],
      ["Prancha com peso + Oblíquo alternado", "3", "30s + 15", "-", "Foco no core e estabilidade"]
    ]
  },
  {
    dia: "DIA 6 – Braços + Peito Estético",
    tecnica: "Drop-set e falha mecânica",
    objetivo: "Estética e volume em braços + pump de peitoral",
    exercicios: [
      ["Tríceps Testa Barra W", "4", "10", "-", "Evitar abrir demais os cotovelos"],
      ["Tríceps Corda", "3", "12-10-8", "Drop-set", "Última série com 2 drops"],
      ["Rosca Direta + Rosca Martelo", "3", "10 + 10", "Bi-set", "Sem descanso entre"],
      ["Rosca Scott", "3", "10", "Cadência 3s", "Explodir na subida"],
      ["Cross-over Alto", "3", "15", "-", "Contração máxima"],
      ["Flexão Diamante", "2", "Até falha", "-", "Lento e controlado"]
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
