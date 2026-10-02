import { gsap, shakeWrong, popIn, pulseWin, floatBurst, setMeter } from "../anim.js";

export function mountPuzzleShell(stage, { riddle, options }) {
  const panel = document.createElement("div");
  panel.className = "puzzle-panel";
  panel.innerHTML = `
    <p class="puzzle-riddle">${riddle}</p>
    <div class="puzzle-options"></div>
  `;
  const opts = panel.querySelector(".puzzle-options");
  options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "puzzle-opt";
    btn.dataset.id = opt.id;
    btn.innerHTML = `<span class="opt-emoji">${opt.emoji || ""}</span><span>${opt.label}</span>`;
    opts.appendChild(btn);
  });
  stage.appendChild(panel);
  popIn(panel);
  return panel;
}

export function clearStage(stage) {
  const tall = stage.classList.contains("stage-tall");
  const tactical = stage.classList.contains("stage-tactical");
  stage.innerHTML = "";
  stage.className = "stage";
  if (tall) stage.classList.add("stage-tall");
  if (tactical) stage.classList.add("stage-tactical");
}

export function showFeedback(stage, text, ok = true) {
  const el = document.createElement("div");
  el.className = `puzzle-feedback ${ok ? "ok" : "bad"}`;
  el.textContent = text;
  stage.appendChild(el);
  gsap.fromTo(el, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.25 });
  gsap.to(el, {
    opacity: 0,
    y: -10,
    delay: 1.1,
    duration: 0.3,
    onComplete: () => el.remove(),
  });
}
