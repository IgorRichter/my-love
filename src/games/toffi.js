import { toffiSVG } from "../characters.js";
import { gsap, shakeWrong, pulseWin, floatBurst, setMeter } from "../anim.js";
import { clearStage, showFeedback } from "./puzzle.js";

const GOOD = [
  { emoji: "🍎", label: "яблоко" },
  { emoji: "🥩", label: "мясо" },
  { emoji: "🌯", label: "шаверма" },
  { emoji: "🍉", label: "арбуз" },
  { emoji: "🍗", label: "курочка" },
  { emoji: "🧀", label: "сыр" },
  { emoji: "🍌", label: "банан" },
  { emoji: "🥐", label: "круассан" },
];

const BAD = [
  { emoji: "🍫", label: "шоколад" },
  { emoji: "🍇", label: "виноград" },
  { emoji: "🧅", label: "лук" },
  { emoji: "☕", label: "кофе" },
];

const PHRASES = ["ау ау афу", "я тоффа тоффа тоффочкин", "гаф гаф"];

/** Toffi: catch falling good food, avoid bad food. Need 5 good. */
export function playToffi(stage, meter, screen, { onWin }) {
  clearStage(stage);
  setMeter(meter, 0);

  stage.innerHTML = `
    <p class="puzzle-live-hint">Лови вкусняшки для Тоффи. Тёмные «плохие» — не трогай (шоколад, лук…).</p>
    <div class="score-badge"><span id="score">0</span>/5</div>
    <div class="toffi-arena">
      <div class="toffi-speech" id="toffi-speech" hidden></div>
      <div class="toffi-stage-pet">${toffiSVG()}</div>
    </div>
  `;

  const svg = stage.querySelector(".pet-svg");
  const scoreEl = stage.querySelector("#score");
  const speechEl = stage.querySelector("#toffi-speech");
  let caught = 0;
  let won = false;
  let alive = true;
  let spawnTimer = null;
  let phraseIdx = -1;

  gsap.from(svg, { y: 20, opacity: 0, duration: 0.4, ease: "back.out(1.5)" });

  const showPhrase = () => {
    if (!alive || !stage.isConnected || !speechEl) return;
    phraseIdx = (phraseIdx + 1) % PHRASES.length;
    speechEl.textContent = PHRASES[phraseIdx];
    speechEl.hidden = false;
    gsap.fromTo(
      speechEl,
      { scale: 0.92, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(1.8)" }
    );
  };

  const hidePhrase = () => {
    if (!alive || !stage.isConnected || !speechEl) return;
    gsap.to(speechEl, {
      opacity: 0,
      scale: 0.94,
      duration: 0.2,
      onComplete: () => {
        if (speechEl) speechEl.hidden = true;
      },
    });
  };

  // show 2s → pause 2s → show 2s → …
  let speaking = true;
  showPhrase();
  const speechTimer = setInterval(() => {
    if (!alive || !stage.isConnected) {
      clearInterval(speechTimer);
      return;
    }
    if (speaking) {
      hidePhrase();
      speaking = false;
    } else {
      showPhrase();
      speaking = true;
    }
  }, 2000);

  const queueSpawn = (delay = 450) => {
    if (!alive || won || !stage.isConnected) return;
    clearTimeout(spawnTimer);
    spawnTimer = setTimeout(spawn, delay);
  };

  const spawn = () => {
    if (!alive || won || !stage.isConnected) return;

    const isBad = Math.random() < 0.32;
    const item = isBad
      ? BAD[Math.floor(Math.random() * BAD.length)]
      : GOOD[Math.floor(Math.random() * GOOD.length)];

    const el = document.createElement("button");
    el.type = "button";
    el.className = `fall-food ${isBad ? "bad" : "good"}`;
    el.textContent = item.emoji;
    el.title = item.label;
    el.style.left = `${8 + Math.random() * 78}%`;
    stage.appendChild(el);

    const duration = 2.2 + Math.random() * 1.1;
    const tween = gsap.fromTo(
      el,
      { top: -10, opacity: 1, rotate: -10 },
      {
        top: "88%",
        rotate: 15,
        duration,
        ease: "none",
        onComplete: () => {
          if (el.isConnected && !el.dataset.hit) el.remove();
          queueSpawn(280);
        },
      }
    );

    el.addEventListener("click", (e) => {
      e.stopPropagation();
      if (won || el.dataset.hit) return;
      el.dataset.hit = "1";
      tween.kill();
      queueSpawn(320);

      if (isBad) {
        shakeWrong(svg);
        shakeWrong(el);
        showFeedback(stage, `${item.label} нельзя!`, false);
        caught = Math.max(0, caught - 1);
        scoreEl.textContent = String(caught);
        setMeter(meter, (caught / 5) * 100);
        gsap.to(el, {
          scale: 0,
          opacity: 0,
          duration: 0.25,
          onComplete: () => el.remove(),
        });
        return;
      }

      caught += 1;
      scoreEl.textContent = String(caught);
      setMeter(meter, (caught / 5) * 100);
      floatBurst(stage, ["✨", "😋", "♥"], 5);
      gsap.fromTo(
        svg,
        { scale: 1 },
        { scale: 1.08, duration: 0.15, yoyo: true, repeat: 1, transformOrigin: "50% 80%" }
      );
      gsap.to(el, {
        scale: 1.4,
        opacity: 0,
        y: -30,
        duration: 0.3,
        onComplete: () => el.remove(),
      });

      if (caught >= 5) {
        won = true;
        alive = false;
        clearTimeout(spawnTimer);
        clearInterval(speechTimer);
        speechEl.hidden = true;
        gsap.killTweensOf(speechEl);
        svg.classList.add("love-glow", "toffi-happy");
        pulseWin(svg);
        floatBurst(stage, ["🍎", "🥩", "🍉", "✨"], 12);
        showFeedback(stage, "Тоффи наелся!", true);
        onWin();
      }
    });
  };

  spawn();
  queueSpawn(700);
}
