import Image from 'next/image';

/**
 * Large (1800px+ wide, landscape) case-study images that read as texture:
 * whiteboards, journey maps and dense screens. Seasoned Bulk is left out
 * because its case study is password protected; editor screenshots are left
 * out because their text stays legible.
 */
const textures = [
  '/images/projects/mastercard-1/mc_1.jpg',
  '/images/projects/obviously-1/journeymap.png',
  '/images/projects/obviously-1/obv1.png',
  '/images/projects/obviously-2/tracker.png',
  '/images/projects/obviously-3/miroboard.jpg',
];

/**
 * A random case-study image fixed behind the homepage at very low opacity and
 * slightly blurred, so the cream (or dark) page has a subtle texture. Picked per request on the
 * server; decorative only. Next resizes it to the viewport, so the large
 * originals never ship as-is.
 */
export function PageTexture() {
  const src = textures[Math.floor(Math.random() * textures.length)];
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        quality={60}
        fetchPriority="low"
        className="scale-105 object-cover opacity-[0.05] blur-[1.5px] grayscale dark:opacity-[0.06]"
      />
    </div>
  );
}
