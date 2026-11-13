import { lazy, Suspense, type ComponentType } from 'react';

// The player (light lottie-web) and the animation JSON load as their own chunks after the first paint;
// until then an empty box of the same size holds the place, so nothing shifts.
const player = () => import('./LottiePlayer');
const animations = {
  star: () => import('./star.json'),
  gift: () => import('./gift.json'),
};

const players = Object.fromEntries(
  Object.entries(animations).map(([name, load]) => [
    name,
    lazy(() =>
      Promise.all([player(), load()]).then(([{ default: LottiePlayer }, { default: data }]) => ({
        default: ({ className }: { className?: string }) => (
          <LottiePlayer animationData={data} className={`animate-[lottie-in_0.3s_ease-out] ${className ?? ''}`} />
        ),
      })),
    ),
  ]),
) as Record<keyof typeof animations, ComponentType<{ className?: string }>>;

export default function LazyLottie({ name, className }: { name: keyof typeof animations; className?: string }) {
  const Player = players[name];
  return (
    <Suspense fallback={<div className={className} />}>
      <Player className={className} />
    </Suspense>
  );
}
