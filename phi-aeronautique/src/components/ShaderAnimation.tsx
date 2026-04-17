import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const THREE_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';

function loadThree(): Promise<void> {
  if ((window as any).THREE) return Promise.resolve();
  const existing = document.getElementById('three-cdn') as HTMLScriptElement | null;
  if (existing) {
    return new Promise((res) => existing.addEventListener('load', () => res(), { once: true }));
  }
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.id = 'three-cdn';
    s.src = THREE_CDN;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('THREE.js CDN failed'));
    document.head.appendChild(s);
  });
}

export default function ShaderAnimation({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId = 0;
    let disposed = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let rendererRef: any = null;

    loadThree()
      .then(() => {
        if (disposed || !canvasRef.current) return;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const THREE = (window as any).THREE;

        const w = canvas.clientWidth || 800;
        const h = canvas.clientHeight || 400;

        const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
        rendererRef = renderer;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setSize(w, h, false);

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        const geo = new THREE.PlaneBufferGeometry(2, 2);
        const mat = new THREE.ShaderMaterial({
          uniforms: {
            uTime: { value: 0 },
            uRes: { value: new THREE.Vector2(w, h) },
          },
          vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
          fragmentShader: `
            uniform float uTime;
            uniform vec2  uRes;

            float rand(vec2 n) {
              return fract(sin(dot(n, vec2(12.9898, 78.233))) * 43758.5453);
            }

            void main() {
              vec2 uv = gl_FragCoord.xy / uRes;
              float t = uTime * 0.06;

              // Three mosaic layers
              float r0 = rand(floor(uv * 32.0 + vec2( t*0.40,  t*0.20)));
              float r1 = rand(floor(uv * 16.0 + vec2(-t*0.15, -t*0.35)));
              float r2 = rand(floor(uv *  8.0 + vec2( t*0.10, -t*0.18)));

              // phi palette (linear)
              // phi-slate  #0D1B2E  (0.051, 0.106, 0.180)
              // phi-navy   #001F5B  (0.000, 0.122, 0.357)
              // phi-blue   #0050A0  (0.000, 0.314, 0.627)
              // phi-sky    #00A3E0  (0.000, 0.639, 0.878)
              vec3 cSlate = vec3(0.051, 0.106, 0.180);
              vec3 cNavy  = vec3(0.000, 0.122, 0.357);
              vec3 cBlue  = vec3(0.000, 0.314, 0.627);
              vec3 cSky   = vec3(0.000, 0.639, 0.878);

              vec3 col = cSlate;
              col = mix(col, cNavy, step(0.55, r2));
              col = mix(col, cBlue, step(0.65, r1) * 0.65);
              col = mix(col, cSky,  step(0.82, r0) * 0.50);

              // animated scan line
              float scan = step(0.996, fract(uv.y * 60.0 + t * 0.35));
              col = mix(col, cSky, scan * 0.45);

              // vignette
              vec2 c = uv * 2.0 - 1.0;
              col *= 1.05 - dot(c * 0.5, c * 0.5);

              gl_FragColor = vec4(col, 0.92);
            }
          `,
          transparent: true,
        });

        scene.add(new THREE.Mesh(geo, mat));

        const onResize = () => {
          if (!canvasRef.current) return;
          const nw = canvasRef.current.clientWidth;
          const nh = canvasRef.current.clientHeight;
          renderer.setSize(nw, nh, false);
          mat.uniforms.uRes.value.set(nw, nh);
        };
        window.addEventListener('resize', onResize);

        const t0 = performance.now();
        const tick = () => {
          if (disposed) return;
          animId = requestAnimationFrame(tick);
          mat.uniforms.uTime.value = (performance.now() - t0) / 1000;
          renderer.render(scene, camera);
        };
        tick();

        // store resize cleanup
        canvas.dataset.shaderActive = 'true';
        (canvas as any).__shaderCleanup = () => {
          window.removeEventListener('resize', onResize);
          mat.dispose();
          geo.dispose();
        };
      })
      .catch(() => { /* silently ignore CDN errors */ });

    return () => {
      disposed = true;
      cancelAnimationFrame(animId);
      if ((canvas as any).__shaderCleanup) (canvas as any).__shaderCleanup();
      if (rendererRef) rendererRef.dispose();
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`block w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
}
