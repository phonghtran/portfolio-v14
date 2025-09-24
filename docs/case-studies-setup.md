# Audio-Guided Case Studies - File Structure Guide

This guide explains how to organize your project assets for the audio-guided case study experience.

## Directory Structure

```
public/
├── images/
│   └── projects/
│       ├── project-1/
│       │   ├── thumbnail.jpg       # Project card thumbnail
│       │   ├── hero.jpg           # Project hero image
│       │   ├── research-1.jpg     # Section images
│       │   ├── research-2.jpg
│       │   ├── wireframes.jpg
│       │   ├── mockup-1.jpg
│       │   ├── mockup-2.jpg
│       │   └── testing.jpg
│       ├── project-2/
│       └── project-3/
└── audio/
    ├── project-1/
    │   ├── research.mp3           # Audio narration for sections
    │   ├── ideation.mp3
    │   ├── design.mp3
    │   └── testing.mp3
    ├── project-2/
    └── project-3/
```

## File Naming Conventions

### Images

- **Thumbnails**: `thumbnail.jpg` - Square aspect ratio, 400x400px minimum
- **Hero Images**: `hero.jpg` - 16:9 aspect ratio, 1200x675px minimum
- **Section Images**: Descriptive names matching your content (e.g., `wireframes.jpg`, `user-research.jpg`)
- **Format**: Use `.jpg` or `.png`. WebP recommended for better performance.

### Audio Files

- **Format**: `.mp3` files work best for web compatibility
- **Quality**: 128-192 kbps is sufficient for narration
- **Length**: Keep sections between 2-6 minutes for optimal user experience
- **Naming**: Match the section ID in your project data

## Content Guidelines

### Project Data (`/src/lib/projects-data.ts`)

Update the projects array with your actual:

- Project titles, descriptions, and metadata
- Client names and project duration
- Section content and titles
- File paths pointing to your actual assets

### Audio Narration Tips

- Speak clearly and at a moderate pace
- Include brief pauses between key concepts
- Reference visual elements users will see
- Keep a consistent tone across all sections
- Test audio levels for consistency

### Image Guidelines

- Use consistent aspect ratios within each project
- Optimize images for web (compress without losing quality)
- Include alt text descriptions in the code
- Consider dark/light theme compatibility

## Example Project Structure

```typescript
{
  id: 'my-awesome-project',
  title: 'My Awesome UX Project',
  sections: [
    {
      id: 'research',
      title: 'User Research',
      content: '...',
      images: ['/images/projects/my-awesome-project/research-personas.jpg'],
      audioTrack: '/audio/projects/my-awesome-project/research.mp3',
      duration: 240 // seconds
    }
  ]
}
```

## Adding New Projects

1. Create folders in `/public/images/projects/` and `/public/audio/`
2. Add your assets following the naming conventions
3. Update `/src/lib/projects-data.ts` with your project information
4. Test the audio player and navigation

## Testing Checklist

- [ ] All image paths load correctly
- [ ] Audio files play without errors
- [ ] Navigation syncs with audio playback
- [ ] Sections scroll into view properly
- [ ] Mobile experience works smoothly
- [ ] Audio controls function correctly
