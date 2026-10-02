import { levaSVG } from "../characters.js";
import { gsap, pulseWin, floatBurst, setMeter } from "../anim.js";
import { clearStage, showFeedback } from "./puzzle.js";

const NEED = 5;

/** Leva: drag the yarn — he chases and pounces. Catch NEED pounces. */
export function playLeva(stage, meter, screen, { onWin }) {
  clearStage(stage);
  setMeter(meter, 0);

  stage.innerHTML = `
    <p class="puzzle-live-hint">Таскай клубок — Лева охотится. Замани его и поймай прыжок ×${NEED}.</p>
    <div class="score-badge"><span id="score">0</span>/${NEED}</div>
    <div class="yarn" id="yarn"></div>
    <div id="leva-wrap">${levaSVG()}</div>
  `;

  const yarn = stage.querySelector("#yarn");
  const svg = stage.querySelector(".pet-svg");
  const scoreEl = stage.querySelector("#score");

  let catches = 0;
  let yarnX = 0;
  let yarnY = 70;
  let dragging = false;
  let petX = 0;
  let petY = 28;
  let cooldown = false;
  let running = true;
  let won = false;

  const layout = () => {
    yarnX = stage.clientWidth * 0.55;
    petX = stage.clientWidth * 0.4;
    yarn.style.left = `${yarnX - 17}px`;
    yarn.style.top = `${yarnY - 17}px`;
    svg.style.position = "absolute";
    svg.style.left = `${petX - 90}px`;
    svg.style.bottom = `${petY}px`;
    svg.style.transform = "none";
    svg.style.width = "170px";
  };
  layout();
  gsap.from(svg, { opacity: 0, x: -20, duration: 0.4 });

  const placeYarn = (x, y) => {
    yarnX = Math.max(20, Math.min(stage.clientWidth - 20, x));
    yarnY = Math.max(20, Math.min(stage.clientHeight - 55, y));
    yarn.style.left = `${yarnX - 17}px`;
    yarn.style.top = `${yarnY - 17}px`;
  };

  yarn.addEventListener("pointerdown", (e) => {
    dragging = true;
    yarn.setPointerCapture(e.pointerId);
  });
  yarn.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const rect = stage.getBoundingClientRect();
    placeYarn(e.clientX - rect.left, e.clientY - rect.top);
  });
  yarn.addEventListener("pointerup", () => {
    dragging = false;
  });

  stage.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".yarn")) return;
    const rect = stage.getBoundingClientRect();
    placeYarn(e.clientX - rect.left, e.clientY - rect.top);
  });

  const loop = () => {
    if (!running || !stage.isConnected || stateGone()) return;

    const dx = yarnX - petX;
    petX += dx * 0.1;
    const petCenterY = stage.clientHeight - petY - 70;
    const dist = Math.hypot(yarnX - petX, yarnY - petCenterY);

    svg.style.left = `${petX - 90}px`;
    if (dx > 4) svg.style.transform = "scaleX(1)";
    if (dx < -4) svg.style.transform = "scaleX(-1)";

    if (!cooldown && !won && dist < 56 && yarnY > stage.clientHeight * 0.3) {
      cooldown = true;
      catches += 1;
      scoreEl.textContent = String(catches);
      setMeter(meter, (catches / NEED) * 100);

      const flash = document.createElement("div");
      flash.className = "pounce-flash";
      stage.appendChild(flash);
      setTimeout(() => flash.remove(), 400);

      gsap.fromTo(svg, { bottom: petY }, { bottom: petY + 36, duration: 0.18, yoyo: true, repeat: 1 });
      floatBurst(stage, ["🧶", "✨"], 4);
      showFeedback(stage, "Прыжок!", true);

      placeYarn(40 + Math.random() * (stage.clientWidth - 80), 36 + Math.random() * 70);

      if (catches >= NEED) {
        won = true;
        running = false;
        svg.classList.add("love-glow");
        pulseWin(svg);
        floatBurst(stage, ["🧶", "♥", "✨"], 10);
        onWin();
        return;
      }
      setTimeout(() => {
        cooldown = false;
      }, 800);
    }

    requestAnimationFrame(loop);
  };

  function stateGone() {
    return !document.body.contains(stage);
  }

  requestAnimationFrame(loop);
}
