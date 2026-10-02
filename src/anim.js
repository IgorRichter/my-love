import gsap from "gsap";

export { gsap };

export function shakeWrong(el) {
  return gsap.fromTo(
    el,
    { x: 0 },
    { x: 0, duration: 0.45, keyframes: { x: [-8, 8, -6, 6, -3, 3, 0] }, ease: "power2.out" }
  );
}

export function popIn(el, delay = 0) {
  return gsap.fromTo(
    el,
    { opacity: 0, y: 14, scale: 0.92 },
    { opacity: 1, y: 0, scale: 1, duration: 0.45, delay, ease: "back.out(1.6)" }
  );
}

export function pulseWin(el) {
  return gsap.fromTo(
    el,
    { scale: 1 },
    { scale: 1.08, duration: 0.28, yoyo: true, repeat: 3, ease: "power1.inOut" }
  );
}

export function floatBurst(container, glyphs = ["♥", "✨", "♡"], count = 8) {
  const rect = container.getBoundingClientRect();
  for (let i = 0; i < count; i++) {
    const bit = document.createElement("span");
    bit.className = "fx-float";
    bit.textContent = glyphs[i % glyphs.length];
    bit.style.left = `${20 + Math.random() * 60}%`;
    bit.style.top = `${40 + Math.random() * 30}%`;
    container.appendChild(bit);
    gsap.to(bit, {
      y: -60 - Math.random() * 40,
      x: (Math.random() - 0.5) * 50,
      opacity: 0,
      scale: 1.3,
      duration: 0.8 + Math.random() * 0.4,
      ease: "power2.out",
      onComplete: () => bit.remove(),
    });
  }
  return rect;
}

export function setMeter(meter, value) {
  gsap.to(meter, { width: `${Math.max(0, Math.min(100, value))}%`, duration: 0.35, ease: "power2.out" });
}
