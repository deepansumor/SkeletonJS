/**
 * SkeletonJS - A lightweight library for converting HTML elements into 
 * skeleton loaders with a default shimmer animation.
 *
 * Features:
 *  - Applies a CSS skeleton loader style with a default shimmer animation.
 *  - Allows customization of background color, border radius, animation duration,
 *    type, and animation background through data attributes or JS options.
 *  - Replaces images with spans to hide actual image content.
 *  - Clones elements based on the provided skeleton count.
 *
 * @author
 * Deepansu Mor
 * @github https://github.com/deepansumor
 */


// The skeleton CSS string defines the base styling and shimmer animation for skeleton loaders.
const style = `/* Define CSS custom properties on :root for easy theming. */
:root {
    --skeleton-background-color: #e0e0e0;
    --skeleton-animation-duration: 1.5s;
    --skeleton-animation-type: shimmer; // default animation
}

/* Base skeleton style. */
.skeletonJS {
    * {
        background-color: var(--skeleton-background-color);
        border-radius: var(--skeleton-border-radius, 0);
        position: relative;
        overflow: hidden;
        color: transparent !important;
    }

    /* Create the shimmer effect overlay */
    *::after {
        content: '';
        position: absolute;
        top: 0;
        left: -150%;
        width: 150%;
        height: 100%;
        background: linear-gradient(90deg, transparent, var(--skeleton-animation-background, rgba(255, 255, 255, 0.2)), transparent);
        animation: var(--skeleton-animation-type) var(--skeleton-animation-duration) infinite;
    }

    /* For nested skeleton elements, hide inner content. */
    .skeletonJS * {
        visibility: hidden !important;
    }
}

/* Default shimmer animation keyframes */
@keyframes shimmer {
    0% {
        left: -150%;
    }
    50% {
        left: 100%;
    }
    100% {
        left: 100%;
    }
}`;

/**
 * injectStyleOnce
 * Injects the skeleton CSS into the document head only once.
 */
function injectStyleOnce() {
  const styleId = 'skeletonjs-style';
  // Check if the style element is already added
  if (!document.getElementById(styleId)) {
    const styleEl = document.createElement('style');
    styleEl.id = styleId;
    styleEl.textContent = style;
    document.head.appendChild(styleEl);
  }
}

/**
 * SkeletonOptions - Interface defining the customizable options for the skeleton.
 *
 * @property backgroundcolor - The background color of the skeleton.
 * @property borderRadius - The border radius of the skeleton.
 * @property color - Text color (typically set to transparent).
 * @property animationDuration - Duration of the skeleton animation.
 * @property animationType - The type of animation (default: "shimmer").
 * @property animationBackground - The background gradient used in the animation.
 */
interface SkeletonOptions {
  backgroundcolor?: string;
  borderRadius?: string;
  color?: string;
  animationDuration?: string;
  animationType?: string;
  animationBackground?: string;
  // Additional properties can be added as needed.
}

// Default configuration options for the skeleton loader.
const defaultOptions: SkeletonOptions = {
  backgroundcolor: '#e0e0e0',
  borderRadius: '4px',
  animationDuration: "1s",
  animationType: "shimmer"
};

/**
 * applySkeletonStyle
 * Applies the skeleton styling to an element by setting CSS custom properties
 * based on the provided configuration.
 *
 * @param element - The HTMLElement to which the skeleton style will be applied.
 * @param config - SkeletonOptions containing styling configuration.
 */
function applySkeletonStyle(element: HTMLElement, config: SkeletonOptions): void {
  element.classList.add('skeletonJS');
  if (config.backgroundcolor) {
    element.style.setProperty('--skeleton-background-color', config.backgroundcolor);
  }
  if (config.borderRadius) {
    element.style.setProperty('--skeleton-border-radius', config.borderRadius);
  }
  if (config.animationDuration) {
    element.style.setProperty('--skeleton-animation-duration', config.animationDuration);
  }
  if (config.animationType) {
    element.style.setProperty('--skeleton-animation-type', config.animationType);
  }
  if (config.animationBackground) {
    element.style.setProperty('--skeleton-animation-background', config.animationBackground);
  }
}

/**
 * transformKey
 * Transforms a dataset key by removing the "skeleton" prefix and converting the 
 * first character of the remaining string to lowercase.
 *
 * @param key - The key from the dataset.
 * @returns The transformed key.
 */
function transformKey(key: string): string {
  // Remove "skeleton" prefix (case-sensitive)
  const withoutPrefix = key.replace(/^skeleton/, '');
  if (!withoutPrefix) return key; // fallback if empty
  // Lowercase the first character of the remaining string
  return withoutPrefix.charAt(0).toLowerCase() + withoutPrefix.slice(1);
}

/**
 * transformDataset
 * Converts a DOMStringMap (element.dataset) into an object with transformed keys.
 *
 * @param dataset - The dataset from an element.
 * @returns An object with transformed key-value pairs.
 */
function transformDataset(dataset: DOMStringMap): { [key: string]: string } {
  const output: { [key: string]: string } = {};
  Object.entries(dataset).forEach(([key, value]) => {
    const newKey = transformKey(key);
    if (value) output[newKey] = value;
  });
  return output;
}

/**
 * convert
 * Converts a single HTML element into a skeleton loader. It injects styles,
 * applies the skeleton styling, replaces images with spans, and handles cloning
 * if a data-skeletons-count attribute is specified.
 *
 * @param element - The HTMLElement to convert.
 * @param options - Optional SkeletonOptions to override defaults or dataset values.
 */
function convert(element: HTMLElement, options?: SkeletonOptions) {
  // Ensure our style is injected only once.
  injectStyleOnce();

  // Read options from data attributes and transform them.
  const dataOptions: SkeletonOptions = transformDataset(element.dataset);

  // Merge options: data attributes take precedence over defaults, then function parameters.
  const config = { ...dataOptions, ...options };

  // Apply the skeleton style to the element.
  applySkeletonStyle(element, config);

  // Replace images with spans to hide the actual image content.
  const images = Array.from(element.querySelectorAll('img')) as HTMLImageElement[];
  images.forEach((image) => {
    const span = document.createElement("span");
    // Copy inline styles from the image.
    span.setAttribute('style', image.getAttribute("style") || "");
    span.style.display = "inline-block";
    image.replaceWith(span);
  });

  // Handle cloning of the element if data-skeletons-count is set.
  const countAttr = element.getAttribute('data-skeletons-count');
  const count = countAttr ? parseInt(countAttr, 10) : 1;

  if (count > 1 && element.parentElement) {
    // Clone the element the specified number of times.
    const clones = Array.from({ length: count }, () => element.cloneNode(true)) as HTMLElement[];
    const parent = element.parentElement;
    // Replace the original element with the first clone.
    parent.replaceChild(clones[0], element);
    // Append the remaining clones after the first one.
    clones.slice(1).forEach(clone => {
      parent.insertBefore(clone, clones[0].nextSibling);
    });
  }
}

/**
 * init
 * Initializes SkeletonJS on the provided element(s). Accepts a query selector string,
 * a single HTMLElement, a NodeList of HTMLElements, or an array of HTMLElements.
 *
 * @param elements - The target element(s) to initialize as skeleton loaders.
 * @param options - Optional SkeletonOptions to override defaults.
 */
const init = (
  elements: string | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>,
  options?: SkeletonOptions
): void => {
  let elems: HTMLElement[] = [];

  if (typeof elements === 'string') {
    elems = Array.from(document.querySelectorAll<HTMLElement>(elements));
  } else if (elements instanceof HTMLElement) {
    elems = [elements];
  } else if (elements instanceof NodeList || Array.isArray(elements)) {
    elems = Array.from(elements as NodeListOf<HTMLElement>);
  }

  elems.forEach(elem => convert(elem, options));
};

// Expose the init function as part of the SkeletonJS library.
const SkeletonJS = { init };
export default SkeletonJS;
