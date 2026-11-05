import { site } from '@/lib/site';

export function SiteFooter() {
  const link = 'text-label text-inverse no-underline hover:underline';
  return (
    <footer className="bg-inverse">
      <div className="mx-auto flex flex-col gap-3 px-4 py-6 md:flex-row md:items-center md:justify-between md:px-[120px]">
        <p className="text-caption text-inverse-secondary">
          © {new Date().getFullYear()} {site.name}
        </p>
        <nav aria-label="Elsewhere" className="flex flex-wrap gap-x-6 gap-y-2">
          <a
            className={link}
            href={site.linkedinUrl}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            className={link}
            href={site.githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a className={link} href={`tel:${site.phone.replace(/-/g, '')}`}>
            {site.phone}
          </a>
          <a className={link} href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </nav>
      </div>
    </footer>
  );
}
