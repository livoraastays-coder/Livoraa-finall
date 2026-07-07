"use client";

import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";

/**
 * Draws the LIVORAA wordmark + tracked "STAYS" + flanking rules onto an
 * offscreen 2D canvas, used as a texture on a plane. The hero arch icon
 * above this text is a separate real 3D object (see ArchGeometry.tsx's
 * HeroArchIcon) — this plane only carries the two text elements and the
 * rules, matching the official lockup's lower two-thirds.
 *
 * Reuses the site's already-loaded fonts (read from the --font-editorial
 * and --font-body CSS variables set by next/font in app/layout.tsx) so
 * no additional font asset is fetched for this texture.
 */
function buildWordmarkTexture(markColor: string): THREE.CanvasTexture {
  const scale = 2;
  const canvas = document.createElement("canvas");
  canvas.width = 1024 * scale;
  canvas.height = 420 * scale;
  const ctx = canvas.getContext("2d")!;

  const serifStack =
    getComputedStyle(document.documentElement).getPropertyValue("--font-editorial") ||
    "serif";
  const sansStack =
    getComputedStyle(document.documentElement).getPropertyValue("--font-body") ||
    "sans-serif";

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = markColor;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // "LIVORAA" wordmark
  const wordmarkY = canvas.height * 0.4;
  ctx.font = `400 ${172 * scale}px ${serifStack}`;
  ctx.fillText("LIVORAA", canvas.width / 2, wordmarkY);

  // Tracked "STAYS" with flanking rules, positioned below the wordmark
  const staysY = canvas.height * 0.74;
  const staysFontSize = 34 * scale;
  const tracking = 14 * scale; // extra gap between letters
  ctx.font = `500 ${staysFontSize}px ${sansStack}`;

  const letters = "STAYS".split("");
  const letterWidths = letters.map((ch) => ctx.measureText(ch).width);
  const staysWidth =
    letterWidths.reduce((sum, w) => sum + w, 0) + tracking * (letters.length - 1);

  let cursorX = canvas.width / 2 - staysWidth / 2;
  ctx.textAlign = "left";
  letters.forEach((ch, i) => {
    ctx.fillText(ch, cursorX, staysY);
    cursorX += letterWidths[i] + tracking;
  });

  // Flanking rules
  const ruleGap = 28 * scale;
  const ruleLength = 96 * scale;
  const ruleY = staysY;
  const ruleThickness = Math.max(1, 1.6 * scale);

  ctx.fillStyle = markColor;
  ctx.fillRect(
    canvas.width / 2 - staysWidth / 2 - ruleGap - ruleLength,
    ruleY - ruleThickness / 2,
    ruleLength,
    ruleThickness
  );
  ctx.fillRect(
    canvas.width / 2 + staysWidth / 2 + ruleGap,
    ruleY - ruleThickness / 2,
    ruleLength,
    ruleThickness
  );

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.anisotropy = 4;
  return texture;
}

export function LogoPlane({
  position,
  width,
  opacity,
  scale,
  markColor,
}: {
  position: [number, number, number];
  width: number;
  opacity: number;
  scale: number;
  markColor: string;
}) {
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
  const { invalidate } = useThree();
  const textureRef = useRef<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function draw() {
      try {
        await document.fonts.ready;
      } catch {
        // proceed with whatever font is available rather than blocking the reveal
      }
      if (cancelled) return;
      const built = buildWordmarkTexture(markColor);
      textureRef.current?.dispose();
      textureRef.current = built;
      setTexture(built);
      invalidate();
    }

    draw();
    return () => {
      cancelled = true;
    };
    // Rebuilding on markColor change is cheap (one-time canvas draw) and
    // only happens a handful of times as the palette resolves late in
    // the scroll — not per animation frame.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markColor]);

  useEffect(() => {
    return () => {
      textureRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.opacity = opacity;
    }
  }, [opacity]);

  const height = width * (420 / 1024);

  if (!texture) return null;

  return (
    <mesh position={position} scale={[scale, scale, scale]}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial
        ref={materialRef}
        map={texture}
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </mesh>
  );
}
