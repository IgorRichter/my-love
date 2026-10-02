/** Animated SVG pet characters */

export function caseySVG() {
  return `
  <svg class="pet-svg casey-svg" viewBox="0 0 200 180" aria-hidden="true">
    <ellipse class="shadow" cx="100" cy="168" rx="48" ry="8" fill="rgba(60,40,30,.18)"/>
    <g class="body-group">
      <ellipse cx="100" cy="118" rx="52" ry="38" fill="#3a2418"/>
      <ellipse cx="100" cy="122" rx="40" ry="28" fill="#4a3022"/>
      <g class="tail">
        <path d="M148 110 Q178 90 168 60" fill="none" stroke="#3a2418" stroke-width="12" stroke-linecap="round"/>
      </g>
      <g class="head-group">
        <ellipse cx="100" cy="72" rx="42" ry="36" fill="#3a2418"/>
        <path d="M68 48 L58 22 L78 40 Z" fill="#3a2418"/>
        <path d="M132 48 L142 22 L122 40 Z" fill="#3a2418"/>
        <path d="M68 48 L62 28 L76 42 Z" fill="#5a4030" opacity=".5"/>
        <path d="M132 48 L138 28 L124 42 Z" fill="#5a4030" opacity=".5"/>
        <g class="eyes">
          <ellipse class="eye-l" cx="84" cy="70" rx="10" ry="12" fill="#d4e06a"/>
          <ellipse class="eye-r" cx="116" cy="70" rx="10" ry="12" fill="#d4e06a"/>
          <ellipse class="pupil" cx="86" cy="72" rx="4.5" ry="7" fill="#1a120c"/>
          <ellipse class="pupil" cx="118" cy="72" rx="4.5" ry="7" fill="#1a120c"/>
          <circle cx="88" cy="68" r="2" fill="#fff" opacity=".85"/>
          <circle cx="120" cy="68" r="2" fill="#fff" opacity=".85"/>
        </g>
        <ellipse cx="100" cy="84" rx="5" ry="3.5" fill="#1a120c"/>
        <path d="M100 87 Q92 94 86 90" fill="none" stroke="#2a1a12" stroke-width="1.5"/>
        <path d="M100 87 Q108 94 114 90" fill="none" stroke="#2a1a12" stroke-width="1.5"/>
        <g class="whiskers" stroke="#e8e0d8" stroke-width="1.2" opacity=".9">
          <line x1="60" y1="82" x2="30" y2="76"/>
          <line x1="60" y1="88" x2="28" y2="90"/>
          <line x1="140" y1="82" x2="170" y2="76"/>
          <line x1="140" y1="88" x2="172" y2="90"/>
        </g>
      </g>
      <ellipse class="paw" cx="72" cy="148" rx="14" ry="10" fill="#2e1c14"/>
      <ellipse class="paw" cx="128" cy="148" rx="14" ry="10" fill="#2e1c14"/>
    </g>
  </svg>`;
}

export function toffiSVG() {
  return `
  <svg class="pet-svg toffi-svg" viewBox="0 0 260 160" aria-hidden="true">
    <ellipse class="shadow" cx="130" cy="148" rx="70" ry="8" fill="rgba(60,40,30,.18)"/>
    <g class="body-group">
      <g class="tail">
        <path d="M48 90 Q20 70 28 48" fill="none" stroke="#4a2a18" stroke-width="10" stroke-linecap="round"/>
        <path d="M48 90 Q20 70 28 48" fill="none" stroke="#c48a4a" stroke-width="5" stroke-linecap="round" opacity=".4"/>
      </g>
      <ellipse cx="130" cy="100" rx="78" ry="32" fill="#4a2a18"/>
      <ellipse cx="130" cy="104" rx="62" ry="22" fill="#5c3420"/>
      <ellipse cx="130" cy="112" rx="40" ry="14" fill="#c89858"/>
      <g class="legs">
        <rect class="leg" x="78" y="118" width="12" height="22" rx="6" fill="#4a2a18"/>
        <rect class="leg" x="102" y="118" width="12" height="22" rx="6" fill="#4a2a18"/>
        <rect class="leg" x="146" y="118" width="12" height="22" rx="6" fill="#4a2a18"/>
        <rect class="leg" x="170" y="118" width="12" height="22" rx="6" fill="#4a2a18"/>
        <ellipse cx="84" cy="140" rx="9" ry="6" fill="#c89858"/>
        <ellipse cx="108" cy="140" rx="9" ry="6" fill="#c89858"/>
        <ellipse cx="152" cy="140" rx="9" ry="6" fill="#c89858"/>
        <ellipse cx="176" cy="140" rx="9" ry="6" fill="#c89858"/>
      </g>
      <g class="head-group">
        <ellipse cx="210" cy="78" rx="36" ry="32" fill="#4a2a18"/>
        <ellipse cx="210" cy="86" rx="22" ry="16" fill="#c89858"/>
        <g class="ear-l">
          <ellipse cx="188" cy="58" rx="16" ry="22" fill="#4a2a18" transform="rotate(-25 188 58)"/>
        </g>
        <g class="ear-r">
          <ellipse cx="228" cy="56" rx="16" ry="22" fill="#4a2a18" transform="rotate(20 228 56)"/>
        </g>
        <ellipse cx="198" cy="52" rx="7" ry="5" fill="#c89858"/>
        <ellipse cx="222" cy="52" rx="7" ry="5" fill="#c89858"/>
        <g class="eyes">
          <ellipse class="eye-l" cx="200" cy="74" rx="7" ry="8" fill="#2a1810"/>
          <ellipse class="eye-r" cx="220" cy="74" rx="7" ry="8" fill="#2a1810"/>
          <circle cx="202" cy="72" r="2" fill="#fff" opacity=".8"/>
          <circle cx="222" cy="72" r="2" fill="#fff" opacity=".8"/>
        </g>
        <ellipse cx="210" cy="88" rx="6" ry="4" fill="#8a5a40"/>
        <path d="M210 92 Q204 98 198 96" fill="none" stroke="#6a4030" stroke-width="1.5"/>
        <path d="M210 92 Q216 98 222 96" fill="none" stroke="#6a4030" stroke-width="1.5"/>
      </g>
    </g>
  </svg>`;
}

export function levaSVG() {
  return `
  <svg class="pet-svg leva-svg" viewBox="0 0 200 180" aria-hidden="true">
    <ellipse class="shadow" cx="100" cy="168" rx="48" ry="8" fill="rgba(60,40,30,.18)"/>
    <g class="body-group">
      <ellipse cx="100" cy="118" rx="50" ry="36" fill="#4a2e20"/>
      <ellipse cx="100" cy="124" rx="36" ry="24" fill="#6a4632"/>
      <g class="tail">
        <path d="M146 112 Q178 100 172 62" fill="none" stroke="#4a2e20" stroke-width="12" stroke-linecap="round"/>
      </g>
      <g class="head-group">
        <ellipse cx="100" cy="70" rx="40" ry="34" fill="#4a2e20"/>
        <ellipse cx="100" cy="78" rx="26" ry="18" fill="#6a4632"/>
        <path d="M70 48 L58 20 L80 40 Z" fill="#4a2e20"/>
        <path d="M130 48 L142 20 L120 40 Z" fill="#4a2e20"/>
        <path d="M70 48 L62 26 L78 42 Z" fill="#5a3828" opacity=".55"/>
        <path d="M130 48 L138 26 L122 42 Z" fill="#5a3828" opacity=".55"/>
        <g class="eyes">
          <ellipse class="eye-l" cx="84" cy="68" rx="10" ry="11" fill="#c8d45a"/>
          <ellipse class="eye-r" cx="116" cy="68" rx="10" ry="11" fill="#c8d45a"/>
          <ellipse class="pupil" cx="85" cy="70" rx="4.5" ry="6.5" fill="#1a120c"/>
          <ellipse class="pupil" cx="117" cy="70" rx="4.5" ry="6.5" fill="#1a120c"/>
          <circle cx="87" cy="66" r="2" fill="#fff" opacity=".85"/>
          <circle cx="119" cy="66" r="2" fill="#fff" opacity=".85"/>
        </g>
        <ellipse cx="100" cy="82" rx="5" ry="3.5" fill="#1a120c"/>
        <path d="M100 85 Q93 92 87 88" fill="none" stroke="#2a1a12" stroke-width="1.5"/>
        <path d="M100 85 Q107 92 113 88" fill="none" stroke="#2a1a12" stroke-width="1.5"/>
        <g class="whiskers" stroke="#e8e0d8" stroke-width="1.2" opacity=".9">
          <line x1="62" y1="80" x2="30" y2="74"/>
          <line x1="62" y1="86" x2="28" y2="88"/>
          <line x1="138" y1="80" x2="170" y2="74"/>
          <line x1="138" y1="86" x2="172" y2="88"/>
        </g>
      </g>
      <ellipse class="paw" cx="72" cy="148" rx="14" ry="10" fill="#3a2218"/>
      <ellipse class="paw" cx="128" cy="148" rx="14" ry="10" fill="#3a2218"/>
    </g>
  </svg>`;
}

export function khryapyshkaSVG() {
  return `
  <svg class="pet-svg khryapyshka-svg" viewBox="0 0 160 160" aria-hidden="true">
    <ellipse class="shadow" cx="80" cy="148" rx="36" ry="7" fill="rgba(60,40,30,.16)"/>
    <g class="body-group">
      <ellipse cx="80" cy="95" rx="42" ry="38" fill="#f5d040"/>
      <ellipse cx="80" cy="100" rx="30" ry="26" fill="#ffe06a"/>
      <g class="wing-l">
        <ellipse cx="48" cy="100" rx="12" ry="18" fill="#e8c038" transform="rotate(-20 48 100)"/>
      </g>
      <g class="wing-r">
        <ellipse cx="112" cy="100" rx="12" ry="18" fill="#e8c038" transform="rotate(20 112 100)"/>
      </g>
      <g class="head-group">
        <circle cx="80" cy="62" r="34" fill="#f5d040"/>
        <circle cx="80" cy="64" r="26" fill="#ffe06a" opacity=".45"/>
        <g class="eyes">
          <circle class="eye-l" cx="68" cy="60" r="5" fill="#1a120c"/>
          <circle class="eye-r" cx="92" cy="60" r="5" fill="#1a120c"/>
          <circle cx="69.5" cy="58.5" r="1.5" fill="#fff" opacity=".9"/>
          <circle cx="93.5" cy="58.5" r="1.5" fill="#fff" opacity=".9"/>
        </g>
        <path d="M80 68 L72 76 L80 74 L88 76 Z" fill="#f09040"/>
        <ellipse cx="80" cy="74" rx="4" ry="2.5" fill="#e07030"/>
      </g>
      <ellipse cx="68" cy="128" rx="10" ry="7" fill="#f09040"/>
      <ellipse cx="92" cy="128" rx="10" ry="7" fill="#f09040"/>
    </g>
  </svg>`;
}

/** Igor — Russia side */
export function igorSVG() {
  return `
  <svg class="pet-svg person-svg igor-svg" viewBox="0 0 150 200" aria-hidden="true">
    <ellipse class="shadow" cx="75" cy="190" rx="34" ry="7" fill="rgba(40,30,20,.16)"/>
    <g class="body-group">
      <g class="leg-l"><rect x="57" y="148" width="14" height="34" rx="7" fill="#2c3548"/><ellipse cx="64" cy="182" rx="11" ry="7" fill="#1a2030"/></g>
      <g class="leg-r"><rect x="79" y="148" width="14" height="34" rx="7" fill="#2c3548"/><ellipse cx="86" cy="182" rx="11" ry="7" fill="#1a2030"/></g>
      <!-- arms behind torso -->
      <g class="arm-l">
        <ellipse cx="42" cy="118" rx="10" ry="26" fill="#f0d0b8"/>
        <ellipse cx="34" cy="142" rx="8" ry="7" fill="#f0d0b8"/>
      </g>
      <g class="arm-r">
        <ellipse cx="108" cy="118" rx="10" ry="26" fill="#f0d0b8"/>
        <ellipse cx="120" cy="138" rx="8" ry="7" fill="#f0d0b8"/>
      </g>
      <ellipse class="torso" cx="75" cy="120" rx="32" ry="36" fill="#e8eef6"/>
      <path d="M47 100 L47 145 Q75 152 103 145 L103 100 Z" fill="#d0dceb"/>
      <rect x="63" y="95" width="24" height="8" rx="2" fill="#ffffff" opacity=".7"/>
      <path class="scarf" d="M53 88 Q75 102 97 88 L93 118 Q75 128 57 118 Z" fill="#d52b1e"/>
      <path d="M53 88 Q75 96 97 88" fill="#0039a6"/>
      <g class="head-group">
        <circle cx="75" cy="58" r="30" fill="#f0d0b8"/>
        <path d="M47 50 Q51 20 75 16 Q99 20 103 50 Q97 32 75 30 Q53 32 47 50" fill="#c8a878"/>
        <g class="eyes">
          <ellipse cx="63" cy="58" rx="5" ry="6" fill="#fff"/>
          <ellipse cx="87" cy="58" rx="5" ry="6" fill="#fff"/>
          <ellipse class="pupil" cx="64" cy="59" rx="2.8" ry="3.5" fill="#6a8aaa"/>
          <ellipse class="pupil" cx="88" cy="59" rx="2.8" ry="3.5" fill="#6a8aaa"/>
          <circle cx="65" cy="57" r="1.2" fill="#fff"/>
          <circle cx="89" cy="57" r="1.2" fill="#fff"/>
        </g>
        <path d="M59 48 Q63 46 67 48" fill="none" stroke="#8a7060" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M83 48 Q87 46 91 48" fill="none" stroke="#8a7060" stroke-width="1.5" stroke-linecap="round"/>
        <ellipse cx="75" cy="66" rx="4" ry="3" fill="#e8b0a0"/>
        <path class="smile" d="M65 72 Q75 80 85 72" fill="none" stroke="#c07070" stroke-width="2.2" stroke-linecap="round"/>
        <rect x="83" y="108" width="14" height="10" rx="2" fill="#fff"/>
        <rect x="83" y="108" width="14" height="3.3" fill="#fff"/>
        <rect x="83" y="111.3" width="14" height="3.3" fill="#0039a6"/>
        <rect x="83" y="114.6" width="14" height="3.4" fill="#d52b1e"/>
      </g>
    </g>
  </svg>`;
}

/** Nastya — Thailand side */
export function nastyaSVG() {
  return `
  <svg class="pet-svg person-svg nastya-svg" viewBox="0 0 150 200" aria-hidden="true">
    <ellipse class="shadow" cx="75" cy="190" rx="34" ry="7" fill="rgba(40,30,20,.16)"/>
    <g class="body-group">
      <g class="leg-l"><rect x="57" y="148" width="14" height="34" rx="7" fill="#f5c0c8"/><ellipse cx="64" cy="182" rx="11" ry="7" fill="#e8a0b0"/></g>
      <g class="leg-r"><rect x="79" y="148" width="14" height="34" rx="7" fill="#f5c0c8"/><ellipse cx="86" cy="182" rx="11" ry="7" fill="#e8a0b0"/></g>
      <g class="arm-l">
        <ellipse cx="42" cy="116" rx="9" ry="24" fill="#f0d0b8"/>
        <ellipse cx="34" cy="138" rx="7" ry="6" fill="#f0d0b8"/>
      </g>
      <g class="arm-r">
        <ellipse cx="108" cy="116" rx="9" ry="24" fill="#f0d0b8"/>
        <ellipse cx="116" cy="138" rx="7" ry="6" fill="#f0d0b8"/>
      </g>
      <path class="torso" d="M49 92 L45 150 Q75 160 105 150 L101 92 Q75 102 49 92" fill="#f0a8b8"/>
      <path d="M49 92 Q75 84 101 92 L101 108 Q75 118 49 108 Z" fill="#e890a8"/>
      <circle cx="75" cy="100" r="3" fill="#fff" opacity=".7"/>
      <circle cx="63" cy="112" r="2.5" fill="#fff" opacity=".5"/>
      <circle cx="87" cy="112" r="2.5" fill="#fff" opacity=".5"/>
      <g class="lei" opacity=".9">
        <circle cx="55" cy="90" r="4" fill="#ff8a9a"/>
        <circle cx="67" cy="86" r="4" fill="#ffe08a"/>
        <circle cx="83" cy="86" r="4" fill="#ff8a9a"/>
        <circle cx="95" cy="90" r="4" fill="#90e0c0"/>
      </g>
      <g class="head-group">
        <circle cx="75" cy="56" r="30" fill="#f0d0b8"/>
        <path d="M45 52 Q49 16 75 12 Q101 16 105 52 Q99 34 75 32 Q51 34 45 52" fill="#3a2418"/>
        <path class="ponytail" d="M103 48 Q123 70 113 110" fill="none" stroke="#3a2418" stroke-width="12" stroke-linecap="round"/>
        <path d="M103 48 Q117 66 109 100" fill="none" stroke="#2a1810" stroke-width="5" stroke-linecap="round" opacity=".35"/>
        <g class="hair-flower">
          <circle cx="101" cy="40" r="6" fill="#ff6b8a"/>
          <circle cx="101" cy="40" r="2.5" fill="#ffe08a"/>
        </g>
        <g class="eyes">
          <ellipse cx="63" cy="56" rx="5" ry="6.5" fill="#fff"/>
          <ellipse cx="87" cy="56" rx="5" ry="6.5" fill="#fff"/>
          <ellipse class="pupil" cx="64" cy="57" rx="2.8" ry="3.8" fill="#5a3a28"/>
          <ellipse class="pupil" cx="88" cy="57" rx="2.8" ry="3.8" fill="#5a3a28"/>
          <circle cx="65" cy="55" r="1.2" fill="#fff"/>
          <circle cx="89" cy="55" r="1.2" fill="#fff"/>
        </g>
        <path d="M59 46 Q63 44 67 46" fill="none" stroke="#2a1810" stroke-width="1.6" stroke-linecap="round"/>
        <path d="M83 46 Q87 44 91 46" fill="none" stroke="#2a1810" stroke-width="1.6" stroke-linecap="round"/>
        <ellipse cx="75" cy="64" rx="4" ry="3" fill="#e8a090"/>
        <path class="smile" d="M65 70 Q75 78 85 70" fill="none" stroke="#c07070" stroke-width="2.2" stroke-linecap="round"/>
        <circle cx="57" cy="66" r="3.5" fill="#f0a090" opacity=".45"/>
        <circle cx="93" cy="66" r="3.5" fill="#f0a090" opacity=".45"/>
        <ellipse cx="75" cy="88" rx="3" ry="3" fill="#c0c8d0"/>
      </g>
    </g>
  </svg>`;
}
