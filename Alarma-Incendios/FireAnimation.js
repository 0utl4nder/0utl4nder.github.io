// Create and animate fire and smoke

function createFire(container, config) {
  const { baseColor, flameColors, numFlames, height, flickerRange, duration } =
    config;

  // Clear previous flames
  container.innerHTML = "";

  // Function to create a single flame with natural movement
  function createFlame(
    position,
    radius,
    color,
    flickerHeight,
    flickerDuration
  ) {
    const flame = document.createElement("a-sphere");
    flame.setAttribute("position", position);
    flame.setAttribute("radius", radius);
    flame.setAttribute("color", color);
    flame.setAttribute("opacity", "0.7");

    // Animation for natural flame movement
    flame.setAttribute("animation__pos", {
      property: "position",
      to: `${position.x} ${position.y + flickerHeight} ${position.z}`,
      dur: flickerDuration,
      easing: "easeInOutSine",
      direction: "alternate",
      loop: true,
    });

    // Animation for opacity (disappear)
    flame.setAttribute("animation__opacity", {
      property: "opacity",
      to: "0",
      dur: flickerDuration / 2,
      delay: flickerDuration / 2,
      easing: "linear",
      direction: "normal",
    });

    container.appendChild(flame);
  }

  // Calculate spacing between flames
  const spacing = height / numFlames;

  // Create multiple flames
  for (let i = 0; i < numFlames; i++) {
    const position = { x: 0, y: (i + 1) * spacing, z: 0 }; // Position flames uniformly
    const radius = 0.1 + Math.random() * 0.1;
    const color = flameColors[Math.floor(Math.random() * flameColors.length)];
    const flickerHeight = 0.05 + Math.random() * flickerRange;
    const flickerDuration = duration + Math.random() * 600;

    createFlame(position, radius, color, flickerHeight, flickerDuration);
  }
}

// Configuration for the fire
const fireConfig = {
  baseColor: "#660000",
  flameColors: ["#ff3300", "#ff6600", "#ffaa00", "#ffcc00"],
  numFlames: 5,
  height: 0.2,
  flickerRange: 0.5,
  duration: 200,
};

// Function to continuously create and animate fire
function animateFire() {
  const fireContainers = document.querySelectorAll(".fire-container");
  fireContainers.forEach((container) => createFire(container, fireConfig));
}

// Function to create and animate smoke
function createSmoke(container, config) {
  const { baseColor, smokeColors, numSmokes, height, duration } = config;

  // Clear previous smoke
  container.innerHTML = "";

  // Function to create a single smoke with natural movement
  function createSmokeParticle(position, radius, color, duration) {
    const smoke = document.createElement("a-sphere");
    smoke.setAttribute("position", position);
    smoke.setAttribute("radius", radius);
    smoke.setAttribute("color", color);
    smoke.setAttribute("opacity", "0.7");

    // Animation for natural smoke movement
    smoke.setAttribute("animation__pos", {
      property: "position",
      to: `${position.x} ${position.y + height} ${position.z}`,
      dur: duration,
      easing: "linear",
      direction: "normal",
    });

    // Animation for opacity (disappear)
    smoke.setAttribute("animation__opacity", {
      property: "opacity",
      to: "0",
      dur: duration,
      easing: "linear",
      direction: "normal",
    });

    // Animation for color change (get darker)
    smoke.setAttribute("animation__color", {
      property: "color",
      to: "#333333",
      dur: duration,
      easing: "linear",
      direction: "normal",
    });

    container.appendChild(smoke);
  }

  // Calculate spacing between smoke particles
  const spacing = height / numSmokes;

  // Create multiple smoke particles
  for (let i = 0; i < numSmokes; i++) {
    const position = { x: 0, y: (i + 1) * spacing, z: 0 }; // Position smoke particles uniformly
    const radius = 0.1 + Math.random() * 0.1;
    const color = smokeColors[Math.floor(Math.random() * smokeColors.length)];
    const duration = 2000 + Math.random() * 1000;

    createSmokeParticle(position, radius, color, duration);
  }
}

// Configuration for the smoke
const smokeConfig = {
  baseColor: "#333333",
  smokeColors: ["#cccccc", "#bbbbbb", "#aaaaaa", "#999999"],
  numSmokes: 3,
  height: 3,
  duration: 3000,
};

// Function to continuously create and animate smoke
function animateSmoke() {
  const smokeContainers = document.querySelectorAll(".smoke-container");
  smokeContainers.forEach((container) => createSmoke(container, smokeConfig));
}

// Call the fire and smoke functions initially
animateFire();
animateSmoke();

// Call the functions repeatedly after a delay
setInterval(animateFire, fireConfig.duration + 600);
setInterval(animateSmoke, smokeConfig.duration + 600);
