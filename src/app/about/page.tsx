import { PageHeader } from '@/components/layout/page-header';

export default function About() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader title="About - phonghtran" />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">About Me</h2>

          <div className="max-w-none">
            <p className="text-lg text-muted-foreground mb-4">
              Welcome to my portfolio! I'm a UX designer and front-end developer
              passionate about creating beautiful, functional digital
              experiences.
            </p>
            <p className="text-muted-foreground mb-4">
              With expertise in user experience design and modern web
              development, I bridge the gap between design and code to create
              seamless digital products.
            </p>
            <h3 className="text-xl font-semibold mt-8 mb-4">Skills</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-muted-foreground">
              <li>• UX/UI Design</li>
              <li>• Front-end Development</li>
              <li>• React & Next.js</li>
              <li>• TypeScript</li>
              <li>• Tailwind CSS</li>
              <li>• Figma & Design Systems</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-4">
              Visual Experience
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border bg-card">
                <div className="w-full h-24 rounded bg-gradient-to-r from-primary via-accent to-primary mb-3"></div>
                <h4 className="font-semibold text-sm">Dynamic Themes</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Multiple visual experiences to showcase design versatility
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <div className="w-full h-24 rounded bg-gradient-to-r from-muted via-secondary to-muted mb-3"></div>
                <h4 className="font-semibold text-sm">Responsive Design</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Seamless experience across all device sizes
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <div className="w-full h-24 rounded bg-gradient-to-r from-accent to-primary mb-3"></div>
                <h4 className="font-semibold text-sm">Smooth Interactions</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Thoughtful animations and micro-interactions
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
