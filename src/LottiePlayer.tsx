import { useEffect, useRef } from 'react';
// The light SVG-only build: our animations are Telegram stickers (TGS), which have no expressions.
import lottie from 'lottie-web/build/player/lottie_light';

// The stickers are 60 fps but shown at ~50 px: 30 fps looks the same and halves the main-thread work,
// and an off-screen sticker does not draw at all. Playing at 60 fps forever took about half of a slow
// phone's main thread (Lighthouse, 2026-11-15).
const FRAME_MS = 1000 / 30;

export default function LottiePlayer({ animationData, className }: { animationData: object; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = ref.current!;
    const anim = lottie.loadAnimation({ container, renderer: 'svg', loop: true, autoplay: false, animationData });
    const step = anim.frameRate / 30;
    let frame = 0;
    let last = 0;
    let raf = 0;
    const tick = (time: number) => {
      raf = requestAnimationFrame(tick);
      if (time - last < FRAME_MS - 1) return;
      last = time;
      frame = (frame + step) % anim.totalFrames;
      anim.goToAndStop(frame, true);
    };
    const visibility = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting) raf = requestAnimationFrame(tick);
    });
    anim.goToAndStop(0, true);
    visibility.observe(container);
    return () => {
      visibility.disconnect();
      cancelAnimationFrame(raf);
      anim.destroy();
    };
  }, [animationData]);
  return <div ref={ref} className={className} />;
}
