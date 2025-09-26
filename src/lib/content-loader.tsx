import { ComponentType, lazy } from 'react';

// Type for content component props
export interface ContentComponentProps {
  className?: string;
}

// Cache for dynamically imported components
const componentCache = new Map<string, ComponentType<ContentComponentProps>>();

/**
 * Dynamically loads a content component for a project section
 * @param contentFile - Path to the content file (e.g., 'mastercard-1/context')
 * @returns A lazy-loaded React component
 */
export function loadContentComponent(
  contentFile: string
): ComponentType<ContentComponentProps> {
  // Check cache first
  if (componentCache.has(contentFile)) {
    return componentCache.get(contentFile)!;
  }

  // Create lazy component with proper error handling
  const LazyComponent = lazy(async () => {
    try {
      // Dynamic import with proper path resolution
      const importedModule = await import(
        `../content/projects/${contentFile}.tsx`
      );
      return { default: importedModule.default };
    } catch (error) {
      console.error(`Failed to load content component: ${contentFile}`, error);

      // Return fallback component for missing files
      return {
        default: ({ className }: ContentComponentProps) => (
          <div className={className}>
            <div className="p-4 border border-dashed border-muted-foreground/25 rounded-lg">
              <p className="text-muted-foreground text-center">
                Content file not found: <code>{contentFile}.tsx</code>
              </p>
              <p className="text-sm text-muted-foreground text-center mt-2">
                Create this file at{' '}
                <code>src/content/projects/{contentFile}.tsx</code>
              </p>
            </div>
          </div>
        ),
      };
    }
  });

  // Add to cache
  componentCache.set(contentFile, LazyComponent);

  return LazyComponent;
}

/**
 * Preloads content components for better performance
 * @param contentFiles - Array of content file paths to preload
 */
export function preloadContentComponents(contentFiles: string[]): void {
  contentFiles.forEach(contentFile => {
    // Trigger the lazy loading but don't wait for it
    loadContentComponent(contentFile);
  });
}
