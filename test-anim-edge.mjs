import { spawn } from 'child_process';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9237;

async function testAnimation() {
  const edge = spawn(EDGE_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--user-data-dir=C:\\temp\\edge-test-profile-' + Date.now(),
    'about:blank'
  ], { detached: true });

  await new Promise(r => setTimeout(r, 2000));
  const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
  const tabs = await res.json();
  const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);
  await new Promise(r => (ws.onopen = r));

  let id = 1;
  function evaluate(expr) {
    return new Promise(resolve => {
      const myId = id++;
      const handler = (event) => {
        const d = JSON.parse(event.data);
        if (d.id === myId) {
          ws.removeEventListener('message', handler);
          resolve(d.result?.result?.value);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({
        id: myId,
        method: 'Runtime.evaluate',
        params: { expression: expr, returnByValue: true }
      }));
    });
  }

  // Inject test HTML
  await evaluate(`
    document.body.innerHTML = \`
      <style>
        @keyframes subtleFloat {
          0% { transform: translateY(0px); translate: 0 0px; }
          100% { transform: translateY(-7px); translate: 0 -7px; }
        }
        @keyframes pureTranslate {
          0% { translate: 0 0px; }
          100% { translate: 0 -7px; }
        }
        .box1 {
          transform: rotate(20deg);
          animation: subtleFloat 5s infinite;
        }
        .box2 {
          transform: rotate(20deg);
          animation: pureTranslate 5s infinite;
        }
      </style>
      <div class="box1" id="box1">Box 1</div>
      <div class="box2" id="box2">Box 2</div>
    \`;
  `);

  const box1Transform = await evaluate('getComputedStyle(document.getElementById("box1")).transform');
  const box2Transform = await evaluate('getComputedStyle(document.getElementById("box2")).transform');
  const box2Translate = await evaluate('getComputedStyle(document.getElementById("box2")).translate');

  console.log('Box 1 (with transform in keyframe) computed transform:', box1Transform);
  console.log('Box 2 (with pure translate in keyframe) computed transform:', box2Transform);
  console.log('Box 2 computed translate:', box2Translate);

  ws.close();
  edge.kill();
  process.exit(0);
}

testAnimation().catch(console.error);
