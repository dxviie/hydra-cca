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

for (const cb of codeblocks) {
  if (initialized == false) {
    eval(cb.textContent);
    initialized = true;
  }

  var observer = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting === true) {
      let code = cb.textContent
        .split('\n')
        .filter(line => !line.trim().startsWith('//'))
        .join('\n')
        .replace(/\n/g, '')
        .replace(/ /g, '');
      render(o0);
      setTimeout(() => {
        eval(code)
      }, 60);
    }
  }, { threshold: [0.7] });

  observer.observe(cb);
}
