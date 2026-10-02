import { caseySVG } from "../characters.js";
import { gsap, shakeWrong, pulseWin, floatBurst, setMeter } from "../anim.js";
import { clearStage, showFeedback } from "./puzzle.js";

/** Casey: pet head or belly — only tail punishes. Fill the love meter. */
export function playCasey(stage, meter, screen, { onWin }) {
  clearStage(stage);
  setMeter(meter, 0);

  stage.innerHTML = `
    <p class="puzzle-live-hint">Гладь голову и животик. Хвост — Кейси обидится.</p>
    <div class="pet-aura" id="aura"></div>
    <div class="hotspot-map">
      ${caseySVG()}
      <button type="button" class="hotspot head" data-zone="head" aria-label="голова"></button>
      <button type="button" class="hotspot belly" data-zone="belly" aria-label="живот"></button>
      <button type="button" class="hotspot tail" data-zone="tail" aria-label="хвост"></button>
    </div>
  `;

  const svg = stage.querySelector(".pet-svg");
  const aura = stage.querySelector("#aura");
  let score = 0;
  let stroking = false;
  let last = null;
  let won = false;

  gsap.from(svg, { y: 16, opacity: 0, duration: 0.45, ease: "back.out(1.5)" });

  const ringHearts = () => {
    aura.innerHTML = "";
    for (let i = 0; i < 8; i++) {
      const h = document.createElement("span");
      h.className = "orbit-heart";
      h.textContent = i % 2 ? "♡" : "♥";
      h.style.setProperty("--i", String(i));
      h.style.setProperty("--n", "8");
      aura.appendChild(h);
    }
    aura.classList.add("on");
  };

  const petGood = () => {
    if (won) return;
    score = Math.min(100, score + 3);
    setMeter(meter, score);
    svg.classList.add("casey-happy");
    gsap.to(svg, { scale: 1.03, duration: 0.1, yoyo: true, repeat: 1, transformOrigin: "50% 80%" });
    if (Math.random() > 0.7) {
      const heart = document.createElement("span");
      heart.className = "heart-burst";
      heart.textContent = "♥";
      heart.style.left = `${40 + Math.random() * 40}%`;
      heart.style.top = `${20 + Math.random() * 30}%`;
      stage.appendChild(heart);
      setTimeout(() => heart.remove(), 900);
    }
    if (score >= 100) {
      won = true;
      stroking = false;
      ringHearts();
      svg.classList.add("love-glow");
      floatBurst(stage, ["♥", "♡", "✨"], 10);
      pulseWin(svg);
      onWin();
    }
  };

  stage.querySelectorAll(".hotspot").forEach((zone) => {
    zone.addEventListener("pointerdown", (e) => {
      stroking = true;
      last = { x: e.clientX, y: e.clientY };
      zone.setPointerCapture(e.pointerId);
    });
    zone.addEventListener("pointermove", (e) => {
      if (!stroking || !last || won) return;
      const dist = Math.hypot(e.clientX - last.x, e.clientY - last.y);
      if (dist < 10) return;
      last = { x: e.clientX, y: e.clientY };

      if (zone.dataset.zone === "head" || zone.dataset.zone === "belly") {
        petGood();
      } else {
        score = Math.max(0, score - 10);
        setMeter(meter, score);
        svg.classList.remove("casey-happy");
        shakeWrong(svg);
        showFeedback(stage, "Кейси: хвост мой!", false);
      }
    });
    zone.addEventListener("pointerup", () => {
      stroking = false;
      last = null;
    });
  });
}
