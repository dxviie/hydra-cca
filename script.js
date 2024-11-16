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
