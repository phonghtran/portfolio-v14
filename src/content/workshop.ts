/**
 * Personal tools shown on /workshop. These are not case studies: each entry is
 * a small, real app built for my own life, with one design decision called out.
 *
 * `usage` is intentionally left for me to fill in with honest numbers
 * (e.g. "Used every other day since July 2026"). Entries without it simply
 * don't render a usage line.
 */

export type WorkshopArea =
  | 'Family & home'
  | 'Training'
  | 'Everyday AI'
  | 'Ambient'
  | 'Music & data';

export type WorkshopAudience = 'For me' | 'For us two' | 'For family';

export interface WorkshopTool {
  id: string;
  name: string;
  area: WorkshopArea;
  audience: WorkshopAudience;
  /** The need, in plain words. */
  need: string;
  /** One-line summary for the homepage contents list. */
  tagline: string;
  /** One decision worth noticing. */
  decision: string;
  /** How AI was involved in building it, e.g. "Claude Code". */
  builtWith?: string;
  /** AI the product itself calls at runtime, e.g. "Gemini". */
  runsOn?: string;
  stack: string[];
  /** Month the first commit landed, "YYYY-MM". */
  started: string;
  usage?: string;
  /** Optional screenshot under /public. Screens use made-up data. */
  image?: WorkshopImage;
}

export interface WorkshopImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  /**
   * phone: a tall phone capture, shown as a cropped "peek" of the screen.
   * device: a fixed-size device screen (e.g. e-ink), shown whole in a bezel.
   * screen: a desktop capture, shown edge to edge.
   */
  kind: 'phone' | 'device' | 'screen';
  /** CSS object-position for the crop, e.g. '50% 100%' to show the bottom. */
  focus?: string;
}

export const featuredTools: WorkshopTool[] = [
  {
    id: 'family-tree',
    name: 'Gia Phả',
    area: 'Family & home',
    audience: 'For family',
    tagline:
      'A family tree relatives can search without learning genealogy software.',
    need: 'Several family lines, three spellings of every name, and relatives who want to look someone up without learning a genealogy app.',
    decision:
      'Search ignores Vietnamese accents and matches nicknames, so "dieu linh" finds Diệu-Linh. Each family line gets its own band, and cross-family marriages are drawn in both.',
    builtWith: 'Claude Code',
    stack: ['Vanilla JS', 'D3', 'Firebase Auth', 'Firestore'],
    started: '2026-10',
    image: {
      src: '/images/workshop/family-tree-search.png',
      alt: 'Gia Phả family tree with an accent-free search for "dieu linh" highlighting Võ Thị Diệu-Linh. Names are invented.',
      width: 1920,
      height: 1440,
      kind: 'screen',
      focus: '50% 0%',
    },
  },
  {
    id: 'babytimeline',
    name: 'Baby Timeline',
    area: 'Family & home',
    audience: 'For us two',
    tagline:
      'One shared timeline for two new parents, with reminders on both phones.',
    need: 'Two new parents, one shared timeline from prep through the first months, and reminders that show up on both phones without a server to run.',
    decision:
      'Designed as an HTML prototype first, then built as a native SwiftUI app synced over iCloud sharing. I reviewed the generated code and fixed two bugs it shipped with.',
    builtWith: 'Claude',
    stack: ['SwiftUI', 'CloudKit', 'Local notifications'],
    started: '2026-07',
    image: {
      src: '/images/workshop/baby-timeline-real.png',
      alt: 'Baby Timeline on iPhone: upcoming appointments and prep tasks such as finishing the hospital bag, counting down to the due date.',
      width: 1206,
      height: 2622,
      kind: 'phone',
      focus: '50% 0%',
    },
  },
  {
    id: 'workout-timeline',
    name: 'Workout Timeline',
    area: 'Training',
    audience: 'For me',
    tagline: 'A six-week strength program that survives a missed day.',
    need: 'A six-week strength program that doesn’t fall apart the first time I miss a day.',
    decision:
      'You rate a set (👍 / 👎 / skip) before logging it, and the log sheet pre-fills with last time’s numbers from my gym log. Missed sessions move forward from today.',
    builtWith: 'Claude Code',
    stack: ['Svelte 5', 'Tailwind', 'Firestore', 'GitHub Actions'],
    started: '2026-07',
    image: {
      src: '/images/workshop/workout-timeline.png',
      alt: 'Workout Timeline log sheet for Dumbbell Step-ups, pre-filled with last session’s weight from the gym log.',
      width: 1170,
      height: 2532,
      kind: 'phone',
      focus: '50% 100%',
    },
  },
  {
    id: 'linkbutler',
    name: 'LinkButler',
    area: 'Everyday AI',
    audience: 'For me',
    tagline:
      'Saved spots from Maps, Instagram and Yelp, findable on a Friday night.',
    need: 'Restaurants and bars saved across Google Maps, Instagram and Yelp, and none of them findable on a Friday night.',
    decision:
      'Paste any link and the AI fills in the place. Chat search handles "dinner under $30, somewhere new", and when the assistant wants to change something it proposes the edit and waits for me to confirm.',
    builtWith: 'Claude Code',
    runsOn: 'Gemini',
    stack: ['SvelteKit', 'Cloud Functions', 'Firestore'],
    started: '2026-05',
    image: {
      src: '/images/workshop/linkbutler.png',
      alt: 'LinkButler chat proposing new tags and a note for a saved restaurant, with Apply and Dismiss buttons.',
      width: 1170,
      height: 2532,
      kind: 'phone',
      focus: '50% 92%',
    },
  },
  {
    id: 'keepsake',
    name: 'Keepsake',
    area: 'Everyday AI',
    audience: 'For me',
    tagline: 'Remember the wine or snack you liked from a photo of its label.',
    need: 'Remembering the wine, snack or face cleanser I liked, without typing up a label in the store aisle.',
    decision:
      'Snap a photo and Gemini reads the label into structured fields. There’s no server: App Check makes sure only my app can spend the AI budget.',
    builtWith: 'Claude Code',
    runsOn: 'Gemini',
    stack: ['Plain HTML/JS', 'Firebase AI Logic', 'Firestore', 'PWA'],
    started: '2026-10',
    image: {
      src: '/images/workshop/keepsake-real.png',
      alt: 'Keepsake log showing a sunscreen and a box of bandages, each with brand and name read from the photo.',
      width: 1206,
      height: 1361,
      kind: 'phone',
      focus: '50% 0%',
    },
  },
  {
    id: 'mta-trmnl',
    name: 'Next Train, on the Wall',
    area: 'Ambient',
    audience: 'For us two',
    tagline:
      'The next subway and bus arrivals on an e-ink display by the door.',
    need: 'Knowing whether to run for the train or wait for the bus, without unlocking a phone on the way out the door.',
    decision:
      'A tiny API that boils MTA subway and bus feeds down to the next few arrivals, rendered on an e-ink display by the door. You glance at it; nothing to tap.',
    stack: ['Cloud Functions', 'MTA GTFS-RT', 'TRMNL'],
    started: '2026-04',
    image: {
      src: '/images/workshop/next-train.png',
      alt: 'E-ink transit display listing the next subway and bus arrivals with minutes until each.',
      width: 1600,
      height: 960,
      kind: 'device',
    },
  },
];

export interface BenchTool {
  name: string;
  area: WorkshopArea;
  line: string;
  runsOn?: string;
}

export const benchTools: BenchTool[] = [
  {
    name: 'Kid Plan',
    area: 'Family & home',
    line: 'A Sunday email of what’s coming up, from newborn through college, timed by age and grade.',
  },
  {
    name: 'Food Picker',
    area: 'Family & home',
    line: 'Ends the "what should we eat" loop by picking one item from each category. Web and iOS.',
  },
  {
    name: 'OOO Friend',
    area: 'Family & home',
    line: 'A calendar for when friends are out of town, kept off my real calendar.',
  },
  {
    name: 'Gym Log',
    area: 'Training',
    line: 'A searchable log of every set, which Workout Timeline reads for its suggestions.',
  },
  {
    name: 'Habit Tracker',
    area: 'Training',
    line: 'Started in 2022 and rebuilt in 2026 with weekly streaks.',
  },
  {
    name: 'Culture Radar',
    area: 'Everyday AI',
    line: 'Reads critics I trust, pulls out the works they discuss, and scores them against my taste profile in a daily digest.',
    runsOn: 'Claude',
  },
  {
    name: 'would-like',
    area: 'Everyday AI',
    line: 'A shared bucket list with friends. Paste an event link and the details fill themselves in.',
    runsOn: 'Gemini',
  },
  {
    name: 'Burnet Trivia',
    area: 'Everyday AI',
    line: 'Party games for group hangouts, joined by room code. Gemini writes the decoy lies in Two Truths and a Lie, the horoscopes, and the dream images.',
    runsOn: 'Gemini',
  },
  {
    name: 'Concert Preview',
    area: 'Music & data',
    line: 'Upcoming NYC shows near me, with a player that previews each artist’s newest release.',
  },
  {
    name: 'Annual Music Recap',
    area: 'Music & data',
    line: 'My most-played songs by year, built from years of music library exports.',
  },
];
