import { igorSVG, nastyaSVG } from "../characters.js";
import { gsap, pulseWin, floatBurst, setMeter } from "../anim.js";
import { clearStage, showFeedback } from "./puzzle.js";

/** Tap to bring Igor (Russia) & Nastya (Thailand) together → hug */
export function playConnect(stage, meter, screen, { onWin }) {
  clearStage(stage);
  stage.classList.add("stage-connect");
  setMeter(meter, 0);

  const NEED = 12;
  let taps = 0;
  let won = false;
  let hugging = false;
  let winReported = false;

  stage.innerHTML = `
    <p class="puzzle-live-hint">Тапай — Игорь бежит из России, Настя из Тая. Встретятся и обнимутся ♥</p>
    <div class="score-badge"><span id="score">0</span>/${NEED}</div>
    <div class="distance-track" id="track">
      <div class="land russia-land" aria-hidden="true">
        <span class="land-tag">🇷🇺 Россия</span>
        <span class="flake f1">❄</span>
        <span class="flake f2">❄</span>
        <span class="flake f3">❄</span>
      </div>
      <div class="land thai-land" aria-hidden="true">
        <span class="land-tag">🇹🇭 Тайланд</span>
        <span class="palm p1">🌴</span>
        <span class="palm p2">☀️</span>
        <span class="wave">🌊</span>
      </div>
      <div class="sky-mid" aria-hidden="true"><span class="plane">✈</span></div>
      <div class="runner igor-runner" id="igor">
        ${igorSVG()}
        <span class="runner-label">Игорь</span>
      </div>
      <div class="runner nastya-runner" id="nastya">
        ${nastyaSVG()}
        <span class="runner-label">Настюша</span>
      </div>
      <div class="mid-hearts" id="mid" hidden>💕</div>
    </div>
    <button class="tap-zone btn btn-rose" type="button" id="tap">тап — сблизить ♥</button>
    <p class="simon-status" id="status">Россия ⟷ Тайланд… тапай!</p>
  `;

  const igor = stage.querySelector("#igor");
  const nastya = stage.querySelector("#nastya");
  const tapBtn = stage.querySelector("#tap");
  const scoreEl = stage.querySelector("#score");
  const status = stage.querySelector("#status");
  const mid = stage.querySelector("#mid");
  const track = stage.querySelector("#track");

  const MEET = 50;
  const START_OFFSET = 36;
  const END_OFFSET = 9;
  const HUG_OFFSET = 6;

  gsap.set(igor, { left: `${MEET - START_OFFSET}%`, xPercent: -50 });
  gsap.set(nastya, { left: `${MEET + START_OFFSET}%`, xPercent: -50 });

  gsap.to(igor.querySelector(".body-group"), {
    y: -4,
    duration: 0.7,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
  });
  gsap.to(nastya.querySelector(".body-group"), {
    y: -4,
    duration: 0.75,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
    delay: 0.12,
  });
  gsap.to(nastya.querySelector(".ponytail"), {
    rotation: 6,
    duration: 1.1,
    yoyo: true,
    repeat: -1,
    transformOrigin: "0% 0%",
    ease: "sine.inOut",
  });
  gsap.to(stage.querySelectorAll(".flake"), {
    y: 18,
    opacity: 0.35,
    duration: 2.2,
    stagger: 0.35,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
  });
  gsap.to(stage.querySelector(".plane"), {
    x: 40,
    duration: 3.5,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
  });

  const placePair = (offset, duration = 0.28) => {
    gsap.to(igor, { left: `${MEET - offset}%`, xPercent: -50, duration, ease: "power2.out" });
    gsap.to(nastya, { left: `${MEET + offset}%`, xPercent: -50, duration, ease: "power2.out" });
  };

  const updatePositions = () => {
    const t = taps / NEED;
    const offset = START_OFFSET - (START_OFFSET - END_OFFSET) * t;
    placePair(offset);
    setMeter(meter, t * 100);

    if (t < 0.35) status.textContent = "Ещё океан между вами…";
    else if (t < 0.7) status.textContent = "Уже ближе к встрече…";
    else if (t < 1) status.textContent = "Почти обнялись!";
  };

  const playHugAnim = ({ firstTime = false } = {}) => {
    if (hugging) return;
    hugging = true;

    gsap.killTweensOf(igor.querySelector(".body-group"));
    gsap.killTweensOf(nastya.querySelector(".body-group"));
    gsap.killTweensOf(igor.querySelector(".arm-r"));
    gsap.killTweensOf(nastya.querySelector(".arm-l"));

    // briefly step back, then run into the hug again
    placePair(END_OFFSET, 0.25);
    mid.hidden = true;
    igor.classList.remove("hugging");
    nastya.classList.remove("hugging");
    gsap.set([igor.querySelector(".arm-r"), nastya.querySelector(".arm-l")], { rotation: 0 });

    gsap.delayedCall(0.28, () => {
      placePair(HUG_OFFSET, 0.5);
      gsap.set(mid, { left: `${MEET}%` });

      gsap.delayedCall(0.5, () => {
        igor.classList.add("hugging");
        nastya.classList.add("hugging");
        mid.hidden = false;
        gsap.fromTo(
          mid,
          { scale: 0, opacity: 0 },
          { scale: 1.25, opacity: 1, duration: 0.4, ease: "back.out(2)" }
        );

        gsap.to(igor.querySelector(".arm-r"), {
          rotation: 42,
          duration: 0.4,
          transformOrigin: "40% 15%",
        });
        gsap.to(nastya.querySelector(".arm-l"), {
          rotation: -42,
          duration: 0.4,
          transformOrigin: "60% 15%",
        });
        gsap.to([igor.querySelector(".body-group"), nastya.querySelector(".body-group")], {
          y: -6,
          duration: 0.55,
          yoyo: true,
          repeat: 3,
          ease: "sine.inOut",
        });

        floatBurst(stage, ["♥", "💕", "✨", "🌴", "❄"], 18);
        pulseWin(track);
        status.textContent = firstTime
          ? "Россия ♥ Тайланд — обнялись"
          : "Ещё разочек ♥";
        showFeedback(stage, firstTime ? "Даже из Тая — вместе ♥" : "Обнимашки снова ♥", true);

        if (firstTime && !winReported) {
          winReported = true;
          onWin();
        }

        gsap.delayedCall(1.4, () => {
          hugging = false;
        });
      });
    });
  };

  const doHug = () => {
    won = true;
    tapBtn.disabled = false;
    tapBtn.textContent = "обнимашки ♥";
    playHugAnim({ firstTime: true });
  };

  const onTap = () => {
    if (won || hugging) return;
    taps = Math.min(NEED, taps + 1);
    scoreEl.textContent = String(taps);

    gsap.fromTo(
      [igor.querySelector(".leg-l"), igor.querySelector(".leg-r"), nastya.querySelector(".leg-l"), nastya.querySelector(".leg-r")],
      { y: 0 },
      { y: -4, duration: 0.1, yoyo: true, repeat: 1, stagger: 0.04 }
    );
    gsap.fromTo(
      [igor.querySelector(".body-group"), nastya.querySelector(".body-group")],
      { y: -2 },
      { y: -12, duration: 0.12, yoyo: true, repeat: 1, ease: "power1.out" }
    );
    gsap.fromTo(tapBtn, { scale: 1 }, { scale: 0.94, duration: 0.08, yoyo: true, repeat: 1 });

    const heart = document.createElement("span");
    heart.className = "travel-heart";
    heart.textContent = "♥";
    heart.style.left = "50%";
    heart.style.top = "40%";
    stage.appendChild(heart);
    gsap.fromTo(
      heart,
      { scale: 0.4, opacity: 1 },
      { y: -44, scale: 1.25, opacity: 0, duration: 0.55, onComplete: () => heart.remove() }
    );

    updatePositions();
    if (taps >= NEED) doHug();
  };

  tapBtn.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    if (won) {
      playHugAnim({ firstTime: false });
      return;
    }
    onTap();
  });

  stage.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".tap-zone") || e.target.closest("button")) return;
    if (won) return;
    if (e.target.closest(".distance-track") || e.target === stage) onTap();
  });
}
