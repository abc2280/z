/* ==================================================
   MOMENT — ZIA'S BIRTHDAY EXPERIENCE
   Pure Handcrafted 5-Page Journey
   Pure Silence • Zero Forced Scrolling • Mobile-First
   ================================================== */

'use strict';

/* ------------------------------------------
   GLOBAL STATE
   ------------------------------------------ */
const State = {
  currentPage: 0,
  transitioning: false,
  flowersBloomed: false,
  flowersBlooming: false,
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
};

/* ------------------------------------------
   CACHED DOM ELEMENTS
   ------------------------------------------ */
let DOM = {};

function cacheDOM() {
  DOM = {
    // Canvas Particles
    canvas: document.getElementById('particles'),

    // Scenes / Pages
    scenes: document.querySelectorAll('.scene'),

    // Page 1 Elements (Preserved 100%)
    openingSeq: document.getElementById('opening-seq'),
    oLines: document.querySelectorAll('#opening-seq .o-line'),
    ziaReveal: document.getElementById('zia-reveal'),
    ziaName: document.querySelector('.zia-name'),
    ziaSub: document.querySelector('.zia-sub'),
    ziaNote: document.querySelector('.zia-note'),
    cta0: document.getElementById('cta-0'),

    // Page 2: The Flowers (Lilies Masterpiece)
    pageFlowers: document.getElementById('page-2'),
    bouquetWrap: document.getElementById('bouquet-wrap'),
    bouquetSvg: document.getElementById('lily-bouquet-svg'),
    bouquetMaster: document.getElementById('bouquet-master'),
    bouquetHit: document.querySelector('.bouquet-hit'),
    stems: document.querySelectorAll('#bouquet-stems .stem'),
    leaves: document.querySelectorAll('.foliage-group .leaf'),
    flowers: document.querySelectorAll('.lily-unit'),
    ribbon: document.getElementById('bouquet-ribbon'),
    wrapping: document.getElementById('bouquet-wrapping'),
    butterfly: document.getElementById('flower-butterfly'),
    driftingPetal: document.getElementById('drifting-petal'),
    flowersTextWrap: document.getElementById('flowers-text-wrap'),
    fIntro: document.getElementById('f-intro'),
    fAccent: document.getElementById('f-accent'),
    fSub: document.getElementById('f-sub'),
    ctaFlowers: document.getElementById('cta-flowers'),

    // Page 3: Compliments & Playful Roast
    cardCompliments: document.getElementById('card-compliments'),
    cLines: document.querySelectorAll('#card-compliments .c-line'),
    ctaCompliments: document.getElementById('cta-compliments'),

    // Page 4: Wish
    cardWish: document.getElementById('card-wish'),
    wLines: document.querySelectorAll('#card-wish .w-line'),
    ctaWish: document.getElementById('cta-wish'),

    // Page 5: Conclusion
    cardConclusion: document.getElementById('card-conclusion'),
    endIllustration: document.querySelector('.end-illustration'),
    endLines: document.querySelectorAll('#card-conclusion .end-line'),
    endBrand: document.querySelector('.end-brand'),
    btnReplay: document.getElementById('btn-replay')
  };
}

/* ------------------------------------------
   EVENT LISTENERS
   ------------------------------------------ */
function initEventListeners() {
  // Page 1 Continue
  if (DOM.cta0) {
    DOM.cta0.addEventListener('click', () => goToPage(1));
  }

  // Page 2 Bouquet Tap
  if (DOM.bouquetWrap) {
    const handleBouquetTap = (e) => {
      e.stopPropagation();
      triggerBouquetReaction();
    };
    DOM.bouquetWrap.addEventListener('click', handleBouquetTap);
    DOM.bouquetWrap.addEventListener('touchend', (e) => {
      e.preventDefault();
      handleBouquetTap(e);
    });
  }

  // Page 2 Continue
  if (DOM.ctaFlowers) {
    DOM.ctaFlowers.addEventListener('click', () => goToPage(2));
  }

  // Page 3 Continue
  if (DOM.ctaCompliments) {
    DOM.ctaCompliments.addEventListener('click', () => goToPage(3));
  }

  // Page 4 Continue
  if (DOM.ctaWish) {
    DOM.ctaWish.addEventListener('click', () => goToPage(4));
  }

  // Page 5 Replay
  if (DOM.btnReplay) {
    DOM.btnReplay.addEventListener('click', () => resetExperience());
  }

  // Keyboard accessibility
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      if (State.currentPage < 4 && !State.transitioning) {
        goToPage(State.currentPage + 1);
      }
    }
  });
}

/* ------------------------------------------
   PAGE NAVIGATION ENGINE
   ------------------------------------------ */
function goToPage(index) {
  if (State.transitioning || index === State.currentPage || index < 0 || index > 4) return;
  State.transitioning = true;

  const fromScene = DOM.scenes[State.currentPage];
  const toScene = DOM.scenes[index];

  const tl = gsap.timeline({
    onComplete: () => {
      fromScene.classList.remove('active');
      State.currentPage = index;
      State.transitioning = false;
      enterPage(index);
    }
  });

  // Smooth GPU-friendly cross-fade (no expensive blur filters)
  tl.to(fromScene, {
    opacity: 0,
    y: -10,
    duration: 0.4,
    ease: 'power2.in'
  });

  tl.set(toScene, { opacity: 0, y: 12 });
  tl.add(() => {
    toScene.classList.add('active');
    if (index !== 1) Particles.stop();
  });

  tl.to(toScene, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: 'power2.out'
  }, '-=0.08');
}

function enterPage(index) {
  switch (index) {
    case 0: startOpening(); break;
    case 1: enterFlowers(); break;
    case 2: enterCompliments(); break;
    case 3: enterWish(); break;
    case 4: enterConclusion(); break;
  }
}

/* ------------------------------------------
   PAGE 1: OPENING SEQUENCE (PRESERVED 100%)
   ------------------------------------------ */
function startOpening() {
  const pauses = Array.from(DOM.oLines);
  const tl = gsap.timeline();
  let t = 0.5;

  pauses.forEach(line => {
    if (line.classList.contains('o-pause')) {
      t += 0.5;
    } else {
      gsap.set(line, { y: 10, filter: 'blur(4px)', opacity: 0 });
      tl.to(line, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power2.out' }, t);
      t += 1.1;
    }
  });

  // ZIA reveal with majestic typography
  tl.to(DOM.ziaReveal, { opacity: 1, duration: 0.3 }, t + 0.3);
  tl.fromTo(DOM.ziaName,
    { scale: 0.5, opacity: 0, filter: 'blur(8px)', letterSpacing: '0.05em' },
    { scale: 1, opacity: 1, filter: 'blur(0px)', letterSpacing: '0.15em', duration: 0.9, ease: 'back.out(1.8)' },
    t + 0.4
  );
  tl.fromTo(DOM.ziaSub,
    { opacity: 0, y: 8 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
    t + 1.1
  );
  tl.add(() => {
    const underline = document.querySelector('.zia-underline');
    if (underline) underline.classList.add('drawn');
  }, t + 1.4);
  tl.fromTo(DOM.ziaNote,
    { opacity: 0 },
    { opacity: 1, duration: 0.5 },
    t + 1.6
  );

  // CTA
  tl.to(DOM.cta0, {
    opacity: 1,
    duration: 0.5,
    ease: 'power2.out',
    onStart: () => { DOM.cta0.style.pointerEvents = 'auto'; }
  }, t + 2.0);
}

/* ------------------------------------------
   PAGE 2: THE FLOWERS (BLOOMING LILIES)
   ------------------------------------------ */
let bouquetIdleTween = null;

function enterFlowers() {
  Particles.setType('pollen');
  Particles.start();

  if (State.flowersBloomed) {
    startBouquetIdleSway();
    DOM.ctaFlowers.classList.remove('hidden');
    gsap.set(DOM.ctaFlowers, { opacity: 1, y: 0 });
    return;
  }

  State.flowersBlooming = true;
  const tl = gsap.timeline({
    onComplete: () => {
      // Explicit guarantee that CTA is always unhidden and interactive
      DOM.ctaFlowers.classList.remove('hidden');
      gsap.to(DOM.ctaFlowers, { opacity: 1, y: 0, duration: 0.35, overwrite: 'auto' });
    }
  });

  // 1. Background corner botanical details settle in softly
  const cornerSprigs = document.querySelectorAll('.f-corner-sprig');
  tl.fromTo(cornerSprigs,
    { opacity: 0 },
    { opacity: 1, duration: 0.5, ease: 'power1.out' },
    0.05
  );

  // 2. Stems gently rise from bottom gathering
  tl.fromTo(DOM.stems,
    { scaleY: 0, transformOrigin: '190px 415px' },
    { scaleY: 1, duration: 0.65, ease: 'power2.out', stagger: 0.03 },
    0.15
  );

  // 3. Arching foliage leaves unfold
  tl.fromTo(DOM.leaves,
    { scale: 0, opacity: 0, transformOrigin: '190px 400px' },
    { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.04 },
    0.45
  );

  // 4. Paper wrap & Ribbon tie emerge
  if (DOM.wrapping) {
    tl.fromTo(DOM.wrapping,
      { scale: 0.7, opacity: 0, transformOrigin: 'center bottom' },
      { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.2)' },
      0.65
    );
  }
  if (DOM.ribbon) {
    tl.fromTo(DOM.ribbon,
      { scale: 0.6, opacity: 0, transformOrigin: 'center center' },
      { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.3)' },
      0.72
    );
  }

  // 5. STAGGERED FLOWER BLOOMING (Flower 1 -> Flower 2 -> Flower 3 -> Supporting tier)
  // --- Flower 1 (Central Queen Lily) ---
  const lily1 = document.getElementById('lily-1');
  if (lily1) {
    const outPetals = lily1.querySelectorAll('.petal-out');
    const inPetals = lily1.querySelectorAll('.petal-in');
    const stamens = lily1.querySelector('.lily-stamens');

    tl.fromTo(lily1, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.85);
    tl.fromTo(outPetals,
      { scale: 0.18, transformOrigin: '0px 0px' },
      { scale: 1, duration: 0.85, ease: 'back.out(1.3)', stagger: 0.04 },
      0.85
    );
    tl.fromTo(inPetals,
      { scale: 0.2, transformOrigin: '0px 0px' },
      { scale: 1, duration: 0.8, ease: 'back.out(1.35)', stagger: 0.04 },
      0.95
    );
    if (stamens) {
      tl.fromTo(stamens,
        { scale: 0, opacity: 0, transformOrigin: '0px 0px' },
        { scale: 1, opacity: 1, duration: 0.55, ease: 'back.out(1.8)' },
        1.15
      );
    }
  }

  // --- Flower 2 (Right Lily) ---
  const lily2 = document.getElementById('lily-2');
  if (lily2) {
    const outPetals = lily2.querySelectorAll('.petal-out');
    const inPetals = lily2.querySelectorAll('.petal-in');
    const stamens = lily2.querySelector('.lily-stamens');

    tl.fromTo(lily2, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 1.35);
    tl.fromTo(outPetals,
      { scale: 0.18, transformOrigin: '0px 0px' },
      { scale: 1, duration: 0.8, ease: 'back.out(1.3)', stagger: 0.04 },
      1.35
    );
    tl.fromTo(inPetals,
      { scale: 0.2, transformOrigin: '0px 0px' },
      { scale: 1, duration: 0.75, ease: 'back.out(1.35)', stagger: 0.04 },
      1.45
    );
    if (stamens) {
      tl.fromTo(stamens,
        { scale: 0, opacity: 0, transformOrigin: '0px 0px' },
        { scale: 1, opacity: 1, duration: 0.55, ease: 'back.out(1.8)' },
        1.65
      );
    }
  }

  // --- Flower 3 (Left Lily) ---
  const lily3 = document.getElementById('lily-3');
  if (lily3) {
    const outPetals = lily3.querySelectorAll('.petal-out');
    const inPetals = lily3.querySelectorAll('.petal-in');
    const stamens = lily3.querySelector('.lily-stamens');

    tl.fromTo(lily3, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 1.85);
    tl.fromTo(outPetals,
      { scale: 0.18, transformOrigin: '0px 0px' },
      { scale: 1, duration: 0.8, ease: 'back.out(1.3)', stagger: 0.04 },
      1.85
    );
    tl.fromTo(inPetals,
      { scale: 0.2, transformOrigin: '0px 0px' },
      { scale: 1, duration: 0.75, ease: 'back.out(1.35)', stagger: 0.04 },
      1.95
    );
    if (stamens) {
      tl.fromTo(stamens,
        { scale: 0, opacity: 0, transformOrigin: '0px 0px' },
        { scale: 1, opacity: 1, duration: 0.55, ease: 'back.out(1.8)' },
        2.15
      );
    }
  }

  // --- Supporting Flowers Tier (Lilies 4, 5 & Buds) ---
  const supportingLilies = [document.getElementById('lily-4'), document.getElementById('lily-5')].filter(Boolean);
  supportingLilies.forEach((el, idx) => {
    const outPetals = el.querySelectorAll('.petal-out');
    const inPetals = el.querySelectorAll('.petal-in');
    const stamens = el.querySelector('.lily-stamens');

    tl.fromTo(el, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 2.35 + idx * 0.15);
    tl.fromTo(outPetals,
      { scale: 0.2, transformOrigin: '0px 0px' },
      { scale: 1, duration: 0.75, ease: 'back.out(1.25)' },
      2.35 + idx * 0.15
    );
    tl.fromTo(inPetals,
      { scale: 0.25, transformOrigin: '0px 0px' },
      { scale: 1, duration: 0.7, ease: 'back.out(1.3)' },
      2.42 + idx * 0.15
    );
    if (stamens) {
      tl.fromTo(stamens,
        { scale: 0, opacity: 0, transformOrigin: '0px 0px' },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' },
        2.55 + idx * 0.15
      );
    }
  });

  const buds = document.querySelectorAll('.lily-bud');
  tl.fromTo(buds,
    { scale: 0.4, opacity: 0, transformOrigin: '0px 0px' },
    { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.2)', stagger: 0.08 },
    2.45
  );

  // 6. Charming butterfly & drifting petal
  if (DOM.butterfly) {
    tl.add(() => DOM.butterfly.classList.add('active'), 2.6);
    tl.fromTo(DOM.butterfly,
      { opacity: 0, x: -25, y: -15, scale: 0.7 },
      { opacity: 0.9, x: 0, y: 0, scale: 1, duration: 1.2, ease: 'power1.out' },
      2.6
    );
    tl.add(() => DOM.butterfly.classList.remove('active'), 4.0);
  }

  if (DOM.driftingPetal) {
    tl.fromTo(DOM.driftingPetal,
      { opacity: 0, y: 0, x: 0, rotation: 0 },
      { opacity: 0.85, y: 90, x: -14, rotation: 30, duration: 2.0, ease: 'sine.inOut' },
      2.7
    );
    tl.to(DOM.driftingPetal, { opacity: 0, duration: 0.6 }, 4.2);
  }

  // 7. Bouquet takes one collective gentle breath and begins single idle sway
  tl.add(() => {
    State.flowersBloomed = true;
    State.flowersBlooming = false;
    startBouquetIdleSway();
  }, 3.2);

  // 8. The "WOW" Moment: Editorial Reveal (GPU opacity + translateY, zero blur)
  tl.fromTo(DOM.fIntro,
    { opacity: 0, y: 6 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
    3.4
  );

  // Illustrated botanical accent flourish
  tl.fromTo(DOM.fAccent,
    { opacity: 0, scale: 0.6 },
    { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.8)' },
    3.9
  );

  // "Happy birthday, Zia."
  tl.fromTo(DOM.fSub,
    { opacity: 0, y: 6 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
    4.3
  );

  // 9. Continuation CTA - guaranteed unhidden and visible
  tl.add(() => {
    DOM.ctaFlowers.classList.remove('hidden');
  }, 4.8);
  tl.fromTo(DOM.ctaFlowers,
    { opacity: 0, y: 6 },
    { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
    4.9
  );
}

function startBouquetIdleSway() {
  if (State.reducedMotion || bouquetIdleTween) return;
  bouquetIdleTween = gsap.to(DOM.bouquetMaster, {
    rotation: 1.0,
    duration: 2.5,
    ease: 'sine.out',
    transformOrigin: '190px 415px',
    onComplete: () => {
      bouquetIdleTween = gsap.to(DOM.bouquetMaster, {
        rotation: -1.0,
        duration: 5.0,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        transformOrigin: '190px 415px'
      });
    }
  });
}

function triggerBouquetReaction() {
  if (State.reducedMotion) return;

  // Gentle natural sway response
  if (bouquetIdleTween) {
    bouquetIdleTween.kill();
    bouquetIdleTween = null;
  }
  gsap.killTweensOf(DOM.bouquetMaster);
  gsap.timeline({
    onComplete: () => {
      startBouquetIdleSway();
    }
  })
  .to(DOM.bouquetMaster, {
    rotation: -1.8,
    duration: 0.35,
    ease: 'power1.out',
    transformOrigin: '190px 415px'
  })
  .to(DOM.bouquetMaster, {
    rotation: 0.9,
    duration: 0.45,
    ease: 'power1.inOut',
    transformOrigin: '190px 415px'
  })
  .to(DOM.bouquetMaster, {
    rotation: 0,
    duration: 0.5,
    ease: 'sine.out',
    transformOrigin: '190px 415px'
  });

  // Soft upward burst of golden pollen motes (subtle, lightweight 8 particles)
  if (DOM.bouquetWrap) {
    const rect = DOM.bouquetWrap.getBoundingClientRect();
    const cx = rect.left + rect.width * 0.5;
    const cy = rect.top + rect.height * 0.42;
    Particles.burst(cx, cy, 8);
  }
}

/* ------------------------------------------
   PAGE 3: PLAYFUL ROAST + COMPLIMENTS + FLIRT
   ------------------------------------------ */
function enterCompliments() {
  Particles.setType('dust');
  const lines = Array.from(DOM.cLines);
  const tl = gsap.timeline();
  let t = 0.35;

  lines.forEach((line, idx) => {
    gsap.set(line, { y: 8, filter: 'blur(2px)', opacity: 0 });
    tl.to(line, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.5,
      ease: 'power2.out'
    }, t);
    
    // Playful timing between punchlines
    if (idx === 0) t += 0.8;       // intro
    else if (idx === 1) t += 0.85;  // fun to talk to
    else if (idx === 2) t += 1.05;  // inconvenient (pause)
    else if (idx === 3) t += 0.85;  // good vibe
    else if (idx === 4) t += 1.05;  // not annoying (pause)
    else if (idx === 5) t += 0.85;  // kinda funny
    else if (idx === 6) t += 1.05;  // I said kinda (pause)
    else if (idx === 7) t += 0.7;   // And okay...
    else if (idx === 8) t += 1.1;   // kinda pretty too (pause)
    else if (idx === 9) t += 0.8;   // there. I said it.
    else if (idx === 10) t += 0.8;  // head
    else t += 0.9;
  });

  // CTA
  tl.fromTo(DOM.ctaCompliments,
    { opacity: 0, y: 8 },
    { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
    t + 0.3
  );
}

/* ------------------------------------------
   PAGE 4: BIRTHDAY WISH (WARM & SUBSTANTIAL)
   ------------------------------------------ */
function enterWish() {
  Particles.setType('dust');
  const lines = Array.from(DOM.wLines);
  const tl = gsap.timeline();
  let t = 0.35;

  lines.forEach((line, idx) => {
    const isFinal = line.classList.contains('w-final');
    gsap.set(line, { y: 8, filter: 'blur(2px)', opacity: 0 });

    tl.to(line, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: isFinal ? 0.85 : 0.48,
      ease: isFinal ? 'back.out(1.4)' : 'power2.out'
    }, t);

    if (isFinal) {
      t += 1.1;
    } else if (idx === 0 || idx === 6) {
      t += 0.9;
    } else {
      t += 0.65; // brisk, warm, conversational cadence
    }
  });

  // CTA
  tl.fromTo(DOM.ctaWish,
    { opacity: 0, y: 8 },
    { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
    t + 0.2
  );
}

/* ------------------------------------------
   PAGE 5: CONCLUSION (SOFT & MEMORABLE)
   ------------------------------------------ */
function enterConclusion() {
  Particles.setType('pollen');
  const lines = Array.from(DOM.endLines);
  const tl = gsap.timeline();
  let t = 0.35;

  // Fade in miniature illustration
  if (DOM.endIllustration) {
    tl.fromTo(DOM.endIllustration,
      { opacity: 0, scale: 0.85, y: -6 },
      { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'back.out(1.3)' },
      0.2
    );
  }

  lines.forEach(line => {
    gsap.set(line, { y: 8, filter: 'blur(2px)', opacity: 0 });
    tl.to(line, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.55,
      ease: 'power2.out'
    }, t);
    t += 0.85;
  });

  // ZIA ✦ Brand Mark
  tl.fromTo(DOM.endBrand,
    { opacity: 0, scale: 0.94 },
    { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.5)' },
    t + 0.25
  );

  // Replay CTA
  tl.fromTo(DOM.btnReplay,
    { opacity: 0, y: 8 },
    { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
    t + 0.9
  );
}

/* ------------------------------------------
   RESET EXPERIENCE (REPLAY)
   ------------------------------------------ */
function resetExperience() {
  Particles.stop();
  if (bouquetIdleTween) {
    bouquetIdleTween.kill();
    bouquetIdleTween = null;
  }

  State.currentPage = 0;
  State.transitioning = false;
  State.flowersBloomed = false;
  State.flowersBlooming = false;

  // Reset Page 1
  DOM.oLines.forEach(l => gsap.set(l, { opacity: 0, y: 10, filter: 'blur(4px)' }));
  gsap.set(DOM.ziaReveal, { opacity: 0 });
  const underline = document.querySelector('.zia-underline');
  if (underline) underline.classList.remove('drawn');
  DOM.cta0.style.pointerEvents = 'none';
  gsap.set(DOM.cta0, { opacity: 0 });

  // Reset Page 2
  gsap.set(DOM.stems, { scaleY: 1 });
  gsap.set(DOM.leaves, { scale: 1, opacity: 1 });
  document.querySelectorAll('.petal').forEach(p => gsap.set(p, { scale: 1, opacity: 1 }));
  document.querySelectorAll('.stamen').forEach(s => gsap.set(s, { scale: 1, opacity: 1 }));
  document.querySelectorAll('.pistil').forEach(pi => gsap.set(pi, { scale: 1, opacity: 1 }));
  if (DOM.butterfly) gsap.set(DOM.butterfly, { opacity: 0 });
  if (DOM.driftingPetal) gsap.set(DOM.driftingPetal, { opacity: 0 });
  gsap.set(DOM.bouquetMaster, { rotation: 0 });
  gsap.set([DOM.fIntro, DOM.fAccent, DOM.fSub, DOM.ctaFlowers], { opacity: 0 });
  DOM.ctaFlowers.classList.add('hidden');

  // Reset Pages 3, 4, 5
  DOM.cLines.forEach(l => gsap.set(l, { opacity: 0 }));
  DOM.wLines.forEach(l => gsap.set(l, { opacity: 0 }));
  DOM.endLines.forEach(l => gsap.set(l, { opacity: 0 }));
  if (DOM.endIllustration) gsap.set(DOM.endIllustration, { opacity: 0 });
  gsap.set(DOM.endBrand, { opacity: 0 });
  gsap.set([DOM.ctaCompliments, DOM.ctaWish, DOM.btnReplay], { opacity: 0 });

  // Set active scene to Page 1
  DOM.scenes.forEach((s, idx) => {
    if (idx === 0) {
      s.classList.add('active');
      gsap.set(s, { opacity: 1, y: 0, filter: 'none' });
    } else {
      s.classList.remove('active');
      gsap.set(s, { opacity: 0 });
    }
  });

  startOpening();
}

/* ------------------------------------------
   PARTICLE ENGINE (AMBIENT POLLEN & DUST)
   ------------------------------------------ */
const Particles = {
  canvas: null,
  ctx: null,
  particles: [],
  type: 'pollen',
  animId: null,
  running: false,

  init() {
    this.canvas = DOM.canvas;
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });
  },

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  },

  setType(type) {
    this.type = type;
  },

  start() {
    if (this.running) return;
    this.running = true;
    this.particles = [];
    // Subtle, lightweight particle count on mobile (only 6 particles)
    const count = 6;
    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticle(true));
    }
    this.loop();
  },

  stop() {
    this.running = false;
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  },

  createParticle(randomY = false) {
    const isPollen = this.type === 'pollen';
    return {
      x: Math.random() * window.innerWidth,
      y: randomY ? Math.random() * window.innerHeight : window.innerHeight + 10,
      r: isPollen ? (Math.random() * 1.3 + 0.9) : (Math.random() * 1.1 + 0.6),
      color: isPollen
        ? (Math.random() > 0.5 ? 'rgba(230, 168, 92, 0.4)' : 'rgba(243, 216, 220, 0.5)')
        : 'rgba(216, 206, 232, 0.3)',
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.3 + 0.15),
      alpha: Math.random() * 0.45 + 0.25,
      pulse: Math.random() * Math.PI * 2
    };
  },

  burst(x, y, count = 8) {
    if (!this.running) this.start();
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 1.4 + 0.7;
      this.particles.push({
        x: x + (Math.random() - 0.5) * 14,
        y: y + (Math.random() - 0.5) * 14,
        r: Math.random() * 1.6 + 0.9,
        color: Math.random() > 0.4 ? 'rgba(230, 168, 92, 0.7)' : 'rgba(243, 216, 220, 0.8)',
        vx: Math.cos(angle) * speed * 0.7,
        vy: Math.sin(angle) * speed * 0.7 - 0.5,
        alpha: 0.85,
        decay: Math.random() * 0.018 + 0.012,
        pulse: 0
      });
    }
  },

  loop() {
    if (!this.running) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += 0.03;

      if (p.decay) {
        p.alpha -= p.decay;
        if (p.alpha <= 0) {
          this.particles.splice(i, 1);
          continue;
        }
      } else {
        if (p.y < -20 || p.x < -20 || p.x > window.innerWidth + 20) {
          this.particles[i] = this.createParticle(false);
        }
      }

      // Fast paint without ctx.save() and ctx.restore() overhead
      this.ctx.globalAlpha = Math.max(0, p.alpha * (0.8 + 0.2 * Math.sin(p.pulse)));
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.animId = requestAnimationFrame(() => this.loop());
  }
};

/* ------------------------------------------
   INITIALIZATION
   ------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
  cacheDOM();
  initEventListeners();
  Particles.init();
  startOpening();
});
