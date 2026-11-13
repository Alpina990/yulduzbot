import { useEffect, useRef } from 'react';
// The light SVG-only build: our animations are Telegram stickers (TGS), which have no expressions.
import lottie from 'lottie-web/build/player/lottie_light';

export default function LottiePlayer({ animationData, className }: { animationData: object; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const anim = lottie.loadAnimation({ container: ref.current!, renderer: 'svg', loop: true, autoplay: true, animationData });
    return () => anim.destroy();
  }, [animationData]);
  return <div ref={ref} className={className} />;
}
