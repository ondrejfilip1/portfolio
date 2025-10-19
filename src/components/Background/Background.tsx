import { useRef, useEffect, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

type Props = {
  noiseImageUrl?: string;
  debug?: boolean;
};

const vertexShader = `
varying vec2 vUv;

void main() {
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  vUv = uv;
}`;

const fragmentShader = `
varying vec2 vUv;

uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;
uniform float uSize;
uniform vec2 uOffset;
uniform float uSpeed;
uniform sampler2D uNoiseTexture;
uniform sampler2D uSimulationTexture;
uniform vec2 uResolution;
uniform float uColorMixer;
uniform float uMenuMode;
uniform float uAdditionalZoom;
uniform vec2 uAdditionalOffset;
uniform float uScrollOffset;

void main() {
    vec2 nUv = (-.5 + vUv) * 2.;
    if( uResolution.x < uResolution.y ) {
        nUv.x *= uResolution.x / uResolution.y;
    } else {
        nUv.y *= uResolution.y / uResolution.x;
    }
    nUv = nUv / 2. + .5;

    float additionalZoom = uAdditionalZoom * (1. - uMenuMode);
    vec2 offset = uOffset + uAdditionalOffset * (1. - uMenuMode);
    offset.y -= uScrollOffset;

    vec2 bUv = nUv * (uSize * 2. + additionalZoom) + offset * uMenuMode; // dUv
    vec2 nUv1 = bUv + offset * (1. - uMenuMode) + uTime * uSpeed;
    bUv.y -= .5;
    vec2 nUv2 = bUv + offset * (1. - uMenuMode) - uTime * uSpeed;

    vec4 noiseColor1 = texture2D(uNoiseTexture, nUv1);
    float noise1 = noiseColor1.r;

    vec4 noiseColor2 = texture2D(uNoiseTexture, nUv2);
    float noise2 = noiseColor2.r;

    float noise = clamp((noise1 + noise2) / 2., 0., 1.);

    vec2 nUv3 = bUv + noise * .5;
    noise = texture2D(uNoiseTexture, nUv3).r;

    vec3 color = vec3(0.);
    noise = mix(noise, noise * 1.25 + .15, uMenuMode);
    if (noise < 0.25) {
        color = mix(uColor1, uColor2, noise / 0.25);
    } else if (noise < 0.5) {
        color = mix(uColor2, uColor3, (noise - 0.25) / 0.25);
    } else if (noise < 0.75) {
        color = mix(uColor3, uColor4, (noise - 0.5) / 0.25);
    } else {
        color = uColor4;
    }

    vec3 alt = pow(color, vec3(2.));
    alt = alt * 1. - step(.01, color);
    color = mix(color, alt, uColorMixer);

    gl_FragColor = vec4(color, 1.);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}`;

function GradientMaterial({
  noiseTexture,
}: {
  noiseTexture: THREE.Texture;
  debug?: boolean;
}) {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color("#c4774b") },
      uColor2: { value: new THREE.Color("#ce9169") },
      uColor3: { value: new THREE.Color("#ddb594") },
      uColor4: { value: new THREE.Color("#ddb594") },
      uSize: { value: 0.4 },
      uOffset: { value: new THREE.Vector2(0.42, 0.6) },
      uSpeed: { value: 0.02 },
      uNoiseTexture: { value: noiseTexture },
      uSimulationTexture: { value: null },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uColorMixer: { value: 0 },
      uMenuMode: { value: 0 },
      uAdditionalZoom: { value: 0 },
      uAdditionalOffset: { value: new THREE.Vector2(0, 0) },
      uScrollOffset: { value: 0 },
    }),
    [noiseTexture]
  );

  useEffect(() => {
    const onResize = () => {
      if (uniforms.uResolution && uniforms.uResolution.value) {
        uniforms.uResolution.value.set(size.width, size.height);
      }
    };
    onResize();
  }, [size, uniforms]);

  useEffect(() => {
    const onScroll = () => {
      if (uniforms.uScrollOffset) {
        uniforms.uScrollOffset.value = window.scrollY / window.innerHeight;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [uniforms]);

  useFrame((_state, delta) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value += delta;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
        onUpdate={() => {
          noiseTexture.wrapS = noiseTexture.wrapT = THREE.RepeatWrapping;
          noiseTexture.needsUpdate = true;
        }}
      />
    </mesh>
  );
}

export default function Background({
  noiseImageUrl = "src/assets/images/noise.png",
  debug = false,
}: Props) {
  const tex = useMemo(
    () => new THREE.TextureLoader().load(noiseImageUrl),
    [noiseImageUrl]
  );
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;

  const [clipPath, setClipPath] = useState(
    "polygon(0 0, 88% 0, 100% 100%, 12% 100%)"
  );

  useEffect(() => {
    const multiplier = 6;
    let target = { x: 0, y: 0 };
    let current = { x: 0, y: 0 };
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      target.x = e.clientX / window.innerWidth;
      target.y = e.clientY / window.innerHeight;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      current.x = lerp(current.x, target.x, 0.08);
      current.y = lerp(current.y, target.y, 0.08);

      const p1 = 88 + current.x * multiplier;
      const p2 = 12 - current.x * multiplier;
      const p3 = 100 - current.y * multiplier;
      const p4 = current.y * multiplier;

      const polygon = `polygon(0 ${p4}%, ${p1}% 0, 100% ${p3}%, ${p2}% 100%)`;
      setClipPath(polygon);

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 h-screen flex justify-center items-center w-full">
      <div
        style={{
          display: "block",
          width: "40dvw",
          height: "40dvw",
          clipPath,
        }}
      >
        <Canvas
          gl={{ antialias: true, alpha: false }}
          camera={{ position: [0, 0, 1], fov: 50 }}
          style={{position: "absolute"}}
        >
          <ambientLight intensity={0.5} />
          <GradientMaterial noiseTexture={tex} debug={debug} />
        </Canvas>
        <div className="mix-blend-screen w-full background-image-overlay h-full bg-repeat bg-fixed opacity-15" />
      </div>
    </div>
  );
}
