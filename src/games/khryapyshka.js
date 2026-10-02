import { khryapyshkaSVG } from "../characters.js";
import { gsap, shakeWrong, pulseWin, floatBurst, setMeter } from "../anim.js";
import { clearStage, showFeedback } from "./puzzle.js";

const NEED = 8;
const TARGET_EMOJIS = ["🎯", "🎯", "🎃", "🥫", "📦"];

/** Khryapyshka: shooting gallery — hit popping targets */
export function playKhryapyshka(stage, meter, screen, { onWin }) {
  clearStage(stage);
  stage.classList.add("stage-tactical", "stage-shoot");
  setMeter(meter, 0);

  stage.innerHTML = `
    <p class="puzzle-live-hint">Стрельба по мишеням! Тапай по 🎯, пока не исчезли. Нужно ${NEED} попаданий.</p>
    <div class="score-badge"><span id="score">0</span>/${NEED}</div>
    <div class="tactical-label">тактический цып</div>
    <img class="khryap-photo" src="/pets/khryapyshka.png" alt="Хряпышка" />
    <div class="shoot-range" id="range">
      <div class="crosshair" id="cross" aria-hidden="true"></div>
      <div class="shooter" id="shooter">${khryapyshkaSVG()}</div>
    </div>
  `;

  const range = stage.querySelector("#range");
  const cross = stage.querySelector("#cross");
  const shooter = stage.querySelector("#shooter");
  const svg = stage.querySelector(".pet-svg");
  const scoreEl = stage.querySelector("#score");

  let hits = 0;
  let won = false;
  let alive = true;
  let spawnTimer = null;
  let active = 0;

  const aim = (e) => {
    const rect = range.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cross.style.left = `${x}px`;
    cross.style.top = `${y}px`;
    const tilt = (x / rect.width - 0.5) * 16;
    gsap.to(shooter, { rotation: tilt, duration: 0.12, overwrite: true });
  };

  range.addEventListener("pointermove", aim);
  range.addEventListener("pointerdown", aim);

  const muzzleFlash = () => {
    const flash = document.createElement("span");
    flash.className = "muzzle-flash";
    flash.textContent = "💥";
    shooter.appendChild(flash);
    gsap.fromTo(
      flash,
      { scale: 0.4, opacity: 1, y: 0 },
      { scale: 1.3, opacity: 0, y: -18, duration: 0.28, onComplete: () => flash.remove() }
    );
    gsap.fromTo(svg, { y: 0 }, { y: 4, duration: 0.06, yoyo: true, repeat: 1 });
  };

  const queueSpawn = (delay = 520) => {
    if (!alive || won || !stage.isConnected) return;
    clearTimeout(spawnTimer);
    spawnTimer = setTimeout(spawnTarget, delay);
  };

  const spawnTarget = () => {
    if (!alive || won || !stage.isConnected) return;
    if (active >= 3) {
      queueSpawn(350);
      return;
    }

    active += 1;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "shoot-target";
    btn.textContent = TARGET_EMOJIS[Math.floor(Math.random() * TARGET_EMOJIS.length)];
    const left = 12 + Math.random() * 70;
    const top = 12 + Math.random() * 48;
    btn.style.left = `${left}%`;
    btn.style.top = `${top}%`;
    range.appendChild(btn);

    gsap.fromTo(
      btn,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.28, ease: "back.out(1.8)" }
    );
    gsap.to(btn, {
      y: -8,
      duration: 0.55,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    let hit = false;
    const lifetime = setTimeout(() => {
      if (hit || !btn.isConnected) return;
      active -= 1;
      gsap.to(btn, {
        scale: 0,
        opacity: 0,
        duration: 0.2,
        onComplete: () => btn.remove(),
      });
      queueSpawn(220);
    }, 1600 + Math.random() * 700);

    btn.addEventListener("pointerdown", (e) => {
      e.stopPropagation();
      if (won || hit) return;
      hit = true;
      clearTimeout(lifetime);
      active -= 1;
      muzzleFlash();

      hits += 1;
      scoreEl.textContent = String(hits);
      setMeter(meter, (hits / NEED) * 100);

      gsap.killTweensOf(btn);
      gsap.to(btn, {
        scale: 1.5,
        opacity: 0,
        rotation: 20,
        duration: 0.28,
        onComplete: () => btn.remove(),
      });
      floatBurst(stage, ["✨", "🎯", "🐥"], 4);
      showFeedback(stage, "В цель!", true);

      if (hits >= NEED) {
        won = true;
        alive = false;
        clearTimeout(spawnTimer);
        range.querySelectorAll(".shoot-target").forEach((t) => t.remove());
        svg.classList.add("love-glow");
        pulseWin(svg);
        floatBurst(stage, ["🐥", "🎯", "♥", "🧤"], 14);
        showFeedback(stage, "Хряпышка — снайпер!", true);
        onWin();
        return;
      }
      queueSpawn(280);
    });

    queueSpawn(600 + Math.random() * 400);
  };

  range.addEventListener("pointerdown", (e) => {
    if (won) return;
    if (e.target.closest(".shoot-target")) return;
    muzzleFlash();
    shakeWrong(cross);
    showFeedback(stage, "Мимо!", false);
  });

  spawnTarget();
  queueSpawn(500);
}
