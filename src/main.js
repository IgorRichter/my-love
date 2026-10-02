import "./style.css";
import { caseySVG, toffiSVG, levaSVG, khryapyshkaSVG, igorSVG, nastyaSVG } from "./characters.js";
import { playCasey } from "./games/casey.js";
import { playToffi } from "./games/toffi.js";
import { playLeva } from "./games/leva.js";
import { playKhryapyshka } from "./games/khryapyshka.js";
import { playConnect } from "./games/connect.js";
import { gsap, popIn } from "./anim.js";

const UNLOCK_DATE = new Date(2026, 9, 11, 0, 0, 0); // 11 Oct 2026 local
const STORAGE_KEY = "anastasia-pets-progress-v2";

const PETS = {
  casey: {
    id: "casey",
    name: "Кейси",
    role: "Тёмная Кошка",
    photo: "/pets/casey.png",
    svg: caseySVG,
    task: "Погладь Кейси",
    hint: "Гладь голову и животик. Хвост трогать нельзя.",
  },
  toffi: {
    id: "toffi",
    name: "Тоффи",
    role: "Таксочка",
    photo: "/pets/toffi.png",
    svg: toffiSVG,
    task: "Покорми Тоффи",
    hint: "Лови падающую еду. Плохие штуки (🍫🍇🧅) — пропускай.",
  },
  leva: {
    id: "leva",
    name: "Лева",
    role: "Чеширский Кот",
    photo: "/pets/leva.png",
    svg: levaSVG,
    task: "Поиграй с Левой",
    hint: "Таскай клубок — поймай 5 прыжков охоты.",
  },
  khryapyshka: {
    id: "khryapyshka",
    name: "Хряпышка",
    role: "секретный цыплёнок",
    photo: "/pets/khryapyshka.png",
    svg: khryapyshkaSVG,
    task: "Стрельба по мишеням",
    hint: "Тапай по мишеням 🎯 — Хряпышка стреляет. Нужно 8 попаданий.",
  },
  connect: {
    id: "connect",
    name: "Настя ♥ Игорь",
    role: "Россия ⟷ Тайланд",
    photo: "/people/igor.png",
    svg: () => `
      <div class="duo-svg">
        ${nastyaSVG()}
        ${igorSVG()}
      </div>`,
    task: "Обняться на расстоянии",
    hint: "Тапай — Игорь из России и Настя из Тая бегут обниматься.",
  },
};

const state = {
  screen: "hero",
  done: loadProgress(),
};

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { casey: false, toffi: false, leva: false, khryapyshka: false, connect: false };
    return {
      casey: false,
      toffi: false,
      leva: false,
      khryapyshka: false,
      connect: false,
      ...JSON.parse(raw),
    };
  } catch {
    return { casey: false, toffi: false, leva: false, khryapyshka: false, connect: false };
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.done));
}

function allDone() {
  return state.done.casey && state.done.toffi && state.done.leva && state.done.connect;
}

function isUnlocked() {
  return new Date() >= UNLOCK_DATE;
}

function isDateUnlocked() {
  return new Date() >= UNLOCK_DATE;
}

function msUntilUnlock() {
  return Math.max(0, UNLOCK_DATE - Date.now());
}

const app = document.querySelector("#app");

function spawnFloaties() {
  const layer = document.createElement("div");
  layer.className = "floaties";
  const glyphs = ["♥", "✦", "🐾", "·", "❀", "♡"];
  for (let i = 0; i < 18; i++) {
    const el = document.createElement("span");
    el.className = "floaty";
    el.textContent = glyphs[i % glyphs.length];
    el.style.left = `${Math.random() * 100}%`;
    el.style.animationDuration = `${12 + Math.random() * 18}s`;
    el.style.animationDelay = `${Math.random() * 12}s`;
    el.style.fontSize = `${0.8 + Math.random() * 1.1}rem`;
    layer.appendChild(el);
  }
  return layer;
}

function render() {
  app.innerHTML = "";
  app.appendChild(spawnFloaties());

  if (state.screen === "hero") renderHero();
  else if (state.screen === "hub") renderHub();
  else if (state.screen.startsWith("play:")) renderChallenge(state.screen.slice(5));
  else if (state.screen === "secret") renderSecret();
  else if (state.screen === "babies") renderBabies();
}

function renderHero() {
  const screen = document.createElement("section");
  screen.className = "screen";
  screen.innerHTML = `
    <h1 class="brand">Настюша,<br/>любовь моя <span class="brand-heart" aria-hidden="true">♥</span></h1>
    <p class="tagline">Маленький дом, где тебя ждут Кейси, Тоффи и Лева.<br/>И ниточка к тебе — даже из Тая. ♥</p>
    <div class="hero-pets">
      ${caseySVG()}
      ${toffiSVG()}
      ${levaSVG()}
    </div>
    <button class="btn" type="button" data-go="hub">Зайти в дом</button>
  `;
  const pets = screen.querySelector(".hero-pets");
  gsap.from(pets.children, { y: 24, opacity: 0, stagger: 0.12, duration: 0.55, ease: "back.out(1.5)", delay: 0.15 });
  popIn(screen.querySelector(".btn"), 0.35);
  screen.querySelector("[data-go]").addEventListener("click", () => {
    state.screen = "hub";
    render();
  });
  app.appendChild(screen);
}

function renderHub() {
  const screen = document.createElement("section");
  screen.className = "screen";
  const mainIds = ["connect", "casey", "toffi", "leva"];
  const doneCount = mainIds.filter((id) => state.done[id]).length;

  screen.innerHTML = `
    <div class="hub">
      <div class="hub-head">
        <h1>Три хвостика</h1>
        <p>Пройди сближение и всех хвостиков — откроется секрет.</p>
      </div>
      <div class="progress-row">
        ${mainIds
          .map((id) => `<div class="pip ${state.done[id] ? "done" : ""}" title="${PETS[id].name}"></div>`)
          .join("")}
      </div>
      <div class="pet-grid">
        ${mainIds
          .map((id) => {
            const p = PETS[id];
            const photo =
              id === "connect"
                ? `<div class="connect-card-faces">
                    <img class="photo" src="/people/nastya.png" alt="Настя" />
                    <span class="card-heart" aria-hidden="true">♥</span>
                    <img class="photo" src="/people/igor.png" alt="Игорь" />
                  </div>`
                : `<img class="photo" src="${p.photo}" alt="${p.name}" onerror="this.outerHTML='<div class=\\'photo placeholder\\'>🐱</div>'" />`;
            return `
            <article class="pet-card ${id === "connect" ? "connect-card" : ""} ${state.done[id] ? "done" : ""}" data-pet="${id}">
              ${photo}
              ${p.svg()}
              <h3>${p.name}</h3>
              <p class="role">${p.role}</p>
              <p class="cta">${state.done[id] ? (id === "connect" ? "Обнялись ♥" : "Готово ♥") : p.task + " →"}</p>
            </article>`;
          })
          .join("")}
      </div>
      <div class="secret-door-wrap">
        <button
          class="secret-door ${
            !allDone() ? "" : isDateUnlocked() ? "ready" : "waiting"
          }"
          type="button"
          data-secret
          ${allDone() ? "" : "disabled"}
        >
          <span>${isDateUnlocked() ? "✦" : "🔒"}</span>
          <span>
            ${
              !allDone()
                ? `Узнать секрет · ${doneCount}/4`
                : isDateUnlocked()
                  ? "Узнать секрет"
                  : "Узнать секрет · с 11 октября"
            }
          </span>
        </button>
      </div>
    </div>
    ${
      allDone()
        ? `
      <button class="khryap-corner ${state.done.khryapyshka ? "cleared" : ""}" type="button" data-khryap title="Секретный уровень">
        <img src="/pets/khryapyshka.png" alt="Хряпышка" />
        <span class="khryap-bubble">${state.done.khryapyshka ? "ещё раз?" : "псст… секретный уровень"}</span>
        ${khryapyshkaSVG()}
      </button>`
        : ""
    }
  `;

  gsap.from(screen.querySelectorAll(".pet-card"), {
    y: 18,
    opacity: 0,
    stagger: 0.1,
    duration: 0.45,
    ease: "power2.out",
  });

  screen.querySelectorAll("[data-pet]").forEach((card) => {
    card.addEventListener("click", () => {
      state.screen = `play:${card.dataset.pet}`;
      render();
    });
  });

  screen.querySelector("[data-secret]").addEventListener("click", () => {
    if (!allDone()) return;
    state.screen = "secret";
    render();
  });

  const khryap = screen.querySelector("[data-khryap]");
  if (khryap) {
    khryap.addEventListener("click", () => {
      state.screen = "play:khryapyshka";
      render();
    });
  }

  app.appendChild(screen);
}

function renderChallenge(petId) {
  const pet = PETS[petId];
  const screen = document.createElement("section");
  screen.className = "screen";
  screen.innerHTML = `
    <div class="challenge">
      <h2>${pet.task}</h2>
      <p class="hint">${pet.hint}</p>
      <div class="stage stage-tall" id="stage"></div>
      <div class="meter"><span id="meter"></span></div>
      <div class="challenge-actions">
        <button class="btn btn-soft" type="button" data-back>Назад</button>
      </div>
    </div>
  `;

  screen.querySelector("[data-back]").addEventListener("click", () => {
    state.screen = "hub";
    render();
  });

  app.appendChild(screen);
  popIn(screen.querySelector(".challenge"));

  const stage = screen.querySelector("#stage");
  const meter = screen.querySelector("#meter");
  const ctx = { onWin: () => finishPet(petId, screen) };

  if (petId === "casey") playCasey(stage, meter, screen, ctx);
  if (petId === "toffi") playToffi(stage, meter, screen, ctx);
  if (petId === "leva") playLeva(stage, meter, screen, ctx);
  if (petId === "khryapyshka") playKhryapyshka(stage, meter, screen, ctx);
  if (petId === "connect") playConnect(stage, meter, screen, ctx);
}

function finishPet(petId, screen) {
  state.done[petId] = true;
  saveProgress();

  if (screen.querySelector(".win-banner")) return;

  const banner = document.createElement("p");
  banner.className = "win-banner";
  banner.textContent =
    petId === "khryapyshka"
      ? "Хряпышка — снайпер! тактический цып успех ♥"
      : petId === "casey"
        ? "Кейси счастлива ♥"
        : petId === "toffi"
          ? "Тоффи сыт ♥"
          : petId === "connect"
            ? "Даже из Тая мы рядом ♥"
            : "Лева доволен охотой ♥";
  screen.querySelector(".challenge-actions").before(banner);
  popIn(banner);

  const next = document.createElement("button");
  next.className = "btn btn-rose";
  next.type = "button";
  next.textContent = "К хвостикам →";
  next.addEventListener("click", () => {
    state.screen = "hub";
    render();
  });
  screen.querySelector(".challenge-actions").prepend(next);
  popIn(next, 0.1);
}

function renderSecret() {
  const screen = document.createElement("section");
  screen.className = "screen";

  if (!isUnlocked()) {
    screen.innerHTML = `
      <div class="secret-screen">
        <div class="locked-box">
          <span class="lock-icon">✦</span>
          <h1 class="brand" style="font-size:clamp(2rem,7vw,3.2rem)">Секрет закрыт</h1>
          <p class="tagline" style="animation:none;margin:0.75rem auto 0">
            Откроется <strong>11 октября</strong>.<br/>
            Пока просто подожди — ничего громкого, только правда.
          </p>
          <div class="countdown" id="countdown"></div>
          <button class="back-link" type="button" data-back>Вернуться к хвостикам</button>
        </div>
      </div>
    `;
    screen.querySelector("[data-back]").addEventListener("click", () => {
      state.screen = "hub";
      render();
    });
    app.appendChild(screen);
    tickCountdown(screen.querySelector("#countdown"));
    return;
  }

  screen.innerHTML = `
    <div class="secret-screen">
      <div class="open-box">
        <p class="secret-label">маленький секрет</p>
        <div class="letter" id="letter"></div>
        <p class="secret-after" id="after" hidden>а когда это секрет</p>
        <div class="secret-actions" id="actions" hidden>
          <button class="btn btn-rose" type="button" data-babies>увидеть бейбика</button>
          <button class="back-link" type="button" data-back id="back">к хвостикам</button>
        </div>
      </div>
    </div>
  `;
  screen.querySelector("[data-back]").addEventListener("click", () => {
    state.screen = "hub";
    render();
  });
  screen.querySelector("[data-babies]").addEventListener("click", () => {
    state.screen = "babies";
    render();
  });
  app.appendChild(screen);
  playLetter(screen);
}

function tickCountdown(el) {
  const paint = () => {
    if (!el.isConnected) return;
    const ms = msUntilUnlock();
    const total = Math.floor(ms / 1000);
    const d = Math.floor(total / 86400);
    const h = Math.floor((total % 86400) / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    el.innerHTML = `
      <div><strong>${d}</strong><span>дней</span></div>
      <div><strong>${String(h).padStart(2, "0")}</strong><span>часов</span></div>
      <div><strong>${String(m).padStart(2, "0")}</strong><span>минут</span></div>
      <div><strong>${String(s).padStart(2, "0")}</strong><span>секунд</span></div>
    `;
    if (ms <= 0) {
      render();
      return;
    }
    setTimeout(paint, 1000);
  };
  paint();
}

function playLetter(screen) {
  const letter = screen.querySelector("#letter");
  const lines = [
    ["в", "2027", "ты", "точно"],
    ["будешь", "уже", "не", "просто"],
    ["девушкой"],
    ["а", "моей", "женой", "♥"],
  ];
  const accents = new Set(["2027", "девушкой", "женой", "♥"]);

  let delay = 0;
  lines.forEach((words) => {
    const line = document.createElement("div");
    line.className = "letter-line";
    words.forEach((word) => {
      const span = document.createElement("span");
      span.className = `letter-word${accents.has(word) ? " accent" : ""}`;
      span.textContent = word;
      line.appendChild(span);
      const showAt = delay;
      setTimeout(() => span.classList.add("show"), showAt);
      delay += 480;
    });
    letter.appendChild(line);
    delay += 320;
  });

  setTimeout(() => {
    screen.querySelector("#after").hidden = false;
    screen.querySelector("#after").classList.add("show");
    const actions = screen.querySelector("#actions");
    actions.hidden = false;
    actions.classList.add("show");
  }, delay + 400);
}

function renderBabies() {
  const screen = document.createElement("section");
  screen.className = "screen";
  screen.innerHTML = `
    <div class="babies-screen">
      <p class="secret-label">бейбики</p>
      <div class="baby-stage" id="baby-stage">
        <div class="baby-frame girl-frame show" id="frame-girl">
          <div class="frame-inner">
            <img src="/babies/girl.jpg" alt="Бейби-девочка" />
          </div>
          <p class="baby-caption">девочка</p>
        </div>
        <div class="baby-frame boy-frame" id="frame-boy" hidden>
          <div class="frame-inner">
            <img src="/babies/boy.jpg" alt="Бейби-мальчик" />
          </div>
          <p class="baby-caption">мальчик</p>
        </div>
      </div>
      <div class="baby-actions">
        <button class="btn btn-rose" type="button" id="want-boy" hidden>хочу мальчика 😏</button>
        <button class="back-link" type="button" data-back>назад к секрету</button>
      </div>
    </div>
  `;

  const girl = screen.querySelector("#frame-girl");
  const boy = screen.querySelector("#frame-boy");
  const wantBoy = screen.querySelector("#want-boy");

  setTimeout(() => {
    wantBoy.hidden = false;
    wantBoy.classList.add("pop-in");
  }, 900);

  wantBoy.addEventListener("click", () => {
    girl.classList.remove("show");
    girl.classList.add("hide");
    setTimeout(() => {
      girl.hidden = true;
      boy.hidden = false;
      requestAnimationFrame(() => boy.classList.add("show"));
      wantBoy.hidden = true;
    }, 420);
  });

  screen.querySelector("[data-back]").addEventListener("click", () => {
    state.screen = "secret";
    render();
  });

  app.appendChild(screen);
}

render();
