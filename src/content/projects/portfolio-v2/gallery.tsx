export default function GallerySection() {
  return (
    <div>
      <div className="imageGrid">
        <figure>
          <img
            src="/images/projects/portfolio-v2/home-customizing.jpg"
            alt="Homepage customizing itself: the chat shows Customizing the website while the contents dim"
          />
          <figcaption>
            The first message: &ldquo;Customizing the website…&rdquo; while the
            contents dim and the site tailors itself.
          </figcaption>
        </figure>
        <figure>
          <img
            src="/images/projects/portfolio-v2/color-scales.jpg"
            alt="Eight 11-step color scales generated from coral #E76E50"
          />
          <figcaption>
            Eight color scales, all generated from one coral.
          </figcaption>
        </figure>
        <figure>
          <img
            src="/images/projects/portfolio-v2/theme-tokens.jpg"
            alt="Theme tokens with light and dark values"
          />
          <figcaption>Semantic tokens, Light and Dark.</figcaption>
        </figure>
        <figure>
          <img
            src="/images/projects/portfolio-v2/chat-states.jpg"
            alt="Chat states board"
          />
          <figcaption>Chat states, drafted for review.</figcaption>
        </figure>
        <figure>
          <img
            src="/images/projects/portfolio-v2/dark-mode.jpg"
            alt="Dark mode screens"
          />
          <figcaption>Dark mode from the same variables.</figcaption>
        </figure>
      </div>
    </div>
  );
}
