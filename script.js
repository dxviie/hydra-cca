let hydra, hydraCanvas;
hydraCanvas = document.createElement("canvas");
hydraCanvas.width = window.innerWidth;
hydraCanvas.height = window.innerHeight;
hydraCanvas.id = "hydraCanvas";

hydra = new Hydra({
  canvas: hydraCanvas,
  detectAudio: false,
  enableStreamCapture: false,
  width: window.innerWidth,
  height: window.innerHeight,
});

document.body.appendChild(hydraCanvas);


const codeblocks = document.querySelectorAll("code");

let initialized = false;

/*
// Usage
const code = `
solid(0, 0, 0)
  .layer(src(o0)
  .scale(1.01).mask(
    shape(99)
    .scale(1.5, 1.5, () => window.innerWidth / window.innerHeight)))
  .blend(
    shape(99)
    .scale(1.5, 1.5, () => window.innerWidth / window.innerHeight)
    .mult(osc(20, 0.1, 2))
    , 0.1)
  .out()
`;

const highlighted = highlightHydraCode(code);
document.body.innerHTML = `<pre>${highlighted}</pre>`;*/

for (const cb of codeblocks) {
  if (initialized == false) {
    eval(cb.textContent);
    initialized = true;
  }

  var observer = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting === true) {
      let code = cb.innerText
        .split('\n')
        .filter(line => !line.trim().startsWith('//'))
        .map(line => line.trim())
        .join('')
        .replace(/\s+/g, ' ')  // first convert all whitespace sequences to single spaces
        .replace(/\s*([{,();}])\s*/g, '$1')  // remove spaces around brackets/punctuation
        .replace(/\s+/g, '')  // remove remaining spaces, except...
        .replace(/return(\w)/, 'return $1');  // add back space after return
      render(o0);
      setTimeout(() => {
        eval(code)
      }, 60);
    }
  }, { threshold: [0.7] });

  observer.observe(cb);
}


// Mostly generated using Claude AI

function highlightHydraCode(code) {
  // Define method groups with their respective colors
  const methodGroups = {
    source: {
      methods: [
        "noise",
        "voronoi",
        "osc",
        "shape",
        "gradient",
        "src",
        "solid",
        "prev"
      ],
      color: "#ee866d" // Orange
    },
    geometry: {
      methods: [
        "rotate",
        "scale",
        "pixelate",
        "repeat",
        "repeatX",
        "repeatY",
        "kaleid",
        "scroll",
        "scrollX",
        "scrollY"
      ],
      color: "#fbe77a" // Yellow
    },
    color: {
      methods: [
        "posterize",
        "shift",
        "invert",
        "contrast",
        "brightness",
        "luma",
        "thresh",
        "color",
        "saturate",
        "hue",
        "colorama",
        "sum",
        "r",
        "g",
        "b",
        "a"
      ],
      color: "#c3fd7c" // Light Green
    },
    blend: {
      methods: ["add", "sub", "layer", "blend", "mult", "diff", "mask"],
      color: "#8ff78a" // Blue
    },
    modulate: {
      methods: [
        "modulateRepeat",
        "modulateRepeatX",
        "modulateRepeatY",
        "modulateKaleid",
        "modulateScrollX",
        "modulateScrollY",
        "modulate",
        "modulateScale",
        "modulatePixelate",
        "modulateRotate",
        "modulateHue"
      ],
      color: "#92fce6" // Sea form green
    },
    externalSources: {
      methods: [
        "initCam",
        "initImage",
        "initVideo",
        "init",
        "initStream",
        "initScreen"
      ],
      color: "#77b0f7" // Light blue
    },
    synthSettings: {
      methods: [
        "render",
        "update",
        "setResolution",
        "hush",
        "setFunction",
        "speed",
        "bpm",
        "width",
        "height",
        "time",
        "mouse"
      ],
      color: "#7b67f7" // Purple
    },
    array: {
      methods: ["fast", "smooth", "ease", "offset", "fit"],
      color: "#d36cf3" // Pink/Purple
    },
    audio: {
      methods: [
        "fft",
        "setSmooth",
        "setCutoff",
        "setBins",
        "setScale",
        "hide",
        "show"
      ],
      color: "#ed70b1" // Pink
    },
    // Other words we want to highgliht
    other: {
      methods: ["window", "o0", "o1", "o2"],
      color: "#7ad" // Blue
    }
  };

  // Create a map of all methods to their colors for easier lookup
  const methodColorMap = {};
  Object.values(methodGroups).forEach((group) => {
    group.methods.forEach((method) => {
      methodColorMap[method] = group.color;
    });
  });

  // Helper function to escape special characters in string for regex
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // Create regex pattern for all methods
  const methodPattern = Object.keys(methodColorMap)
    .sort((a, b) => b.length - a.length) // Sort by length to match longer methods first
    .map((method) => escapeRegExp(method))
    .join("|");

  // Replace methods with colored spans
  let highlightedCode = code.replace(
    new RegExp(`\\b(${methodPattern})\\b`, "g"),
    (match) => `<span style="color: ${methodColorMap[match]}">${match}</span>`
  );

  // Highlight numbers
  highlightedCode = highlightedCode.replace(
    /\b(\d*\.?\d+)\b/g,
    '<span style="color: #c7a3ff">$1</span>' // Light purple for numbers
  );

  return highlightedCode;
}
