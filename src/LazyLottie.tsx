import { lazy, Suspense, type ComponentType } from 'react';

// lottie-web and the animation JSON load as their own chunks after the first paint;
// until then an empty box of the same size holds the place, so nothing shifts.
const lottie = () => import('lottie-react');
const animations = {
  star: () => import('./star.json'),
  gift: () => import('./gift.json'),
};

const players = Object.fromEntries(
  Object.entries(animations).map(([name, load]) => [
    name,
    lazy(() =>
      Promise.all([lottie(), load()]).then(([{ default: Lottie }, { default: data }]) => ({
        default: ({ className }: { className?: string }) => (
          <Lottie animationData={data} loop autoplay className={`animate-[lottie-in_0.3s_ease-out] ${className ?? ''}`} />
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
