
# SkeletonJS

SkeletonJS is a lightweight JavaScript library that converts HTML elements into animated skeleton loaders. It’s designed to help you create visually appealing loading placeholders with minimal configuration. SkeletonJS uses CSS custom properties and a default shimmer animation to display skeleton states for your content.

## Features

- **Simple CSS-based Skeleton Loader:**  
  Easily convert HTML elements to skeleton loaders using CSS classes and custom properties.

- **Customization Options:**  
  Customize the background color, border radius, animation duration, animation type, and gradient background via inline styles or data attributes.

- **Dynamic Cloning:**  
  Use the `data-skeletons-count` attribute to clone an element multiple times, useful for simulating lists or grids of content.

- **Static Loader Option:**  
  For static content, simply add the `.skeletonJS` class and configure CSS variables—no JavaScript initialization required.

- **Image Replacement:**  
  Automatically replaces `<img>` tags with `<span>` elements to hide the actual image content and display the skeleton style instead.

## Getting Started

### Installation

Clone the repository or download the source code. Then, build the project using your preferred bundler (e.g., Webpack). The compiled files (CSS and JS) will be located in the `dist` folder.

```bash
git clone https://github.com/deepansumor/SkeletonJS.git
cd SkeletonJS
npm install
npm run build
```

### LOCAL
```html
<script src="../dist/skeleton.min.js"></script>
```

### CDN
```html
<script src="https://cdn.jsdelivr.net/gh/deepansumor/SkeletonJS@latest/dist/skeleton.min.js"></script>
```

### Usage

#### Dynamic Skeleton Loader (with JS initialization)

Include the generated CSS and JS files in your HTML. Then, add the `.skeletonJS` class along with any custom properties or data attributes.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>SkeletonJS Dynamic Example</title>
    <!-- Link the SkeletonJS CSS -->
    <link rel="stylesheet" href="../dist/skeleton.css" />
    <!-- Load SkeletonJS script (synchronously or with defer as needed) -->
    <script src="../dist/skeleton.js"></script>
  </head>
  <body>
    <h1>SkeletonJS Dynamic Example</h1>

    <!-- Dynamic Skeleton: clones itself based on data-skeletons-count -->
    <div
      class="skeletonJS"
      data-skeletons-count="10"
      style="--skeleton-background-color: #e0e0e0;
             --skeleton-border-radius: 4px;
             --skeleton-animation-duration: 1s;
             --skeleton-animation-type: shimmer;
             --skeleton-animation-background: rgba(255,255,255,0.2);"
    >
      <h2>Title</h2>
      <p>This is a paragraph that will be skeletonized.</p>
      <!-- The image will be replaced by a span to hide its content -->
      <img
        src="https://plus.unsplash.com/premium_photo-1681487548276-48a2c640ade9?q=80&w=2070&auto=format&fit=crop"
        alt="Placeholder image"
        style="width: 100%; height: 200px;"
      />
    </div>

    <!-- Initialize SkeletonJS -->
    <script>
      // This will convert all elements with the .skeletonJS class into skeleton loaders.
      SkeletonJS.init(document.querySelectorAll(".skeletonJS"));
    </script>
  </body>
</html>
```

#### Static Skeleton Loader (CSS Only)

For static content, simply add the `.skeletonJS` class and define your CSS custom properties. No JS initialization is required.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>SkeletonJS Static Example</title>
    <!-- Link the SkeletonJS CSS -->
    <link rel="stylesheet" href="../dist/skeleton.css" />
  </head>
  <body>
    <h1>SkeletonJS Static Example</h1>

    <!-- Static Skeleton: purely CSS-based -->
    <div
      class="skeletonJS"
      style="--skeleton-background-color: #e0e0e0;
             --skeleton-border-radius: 4px;"
    >
      <h2>Title</h2>
      <p>This is a paragraph that will be skeletonized.</p>
      <div style="width: 100px; height: 100px;"></div>
    </div>
  </body>
</html>
```

## API

### `SkeletonJS.init(elements, options)`

Initializes SkeletonJS on one or more target elements.

- **Parameters:**
  - `elements`: A query selector string, an HTMLElement, a NodeList of HTMLElements, or an array of HTMLElements.
  - `options` (optional): An object conforming to the `SkeletonOptions` interface. Options provided here override any data attributes on the elements.

### SkeletonOptions Interface

```ts
interface SkeletonOptions {
  backgroundcolor?: string;        // Background color of the skeleton (e.g., "#e0e0e0")
  borderRadius?: string;           // Border radius (e.g., "4px")
  color?: string;                  // Text color (generally set to transparent)
  animationDuration?: string;      // Animation duration (e.g., "1s")
  animationType?: string;          // Animation type (default: "shimmer")
  animationBackground?: string;    // Animation gradient background (e.g., "rgba(255,255,255,0.2)")
}
```

## How It Works

1. **Style Injection:**  
   SkeletonJS injects a CSS `<style>` element containing the base skeleton styles and shimmer animation into the document head (once per page load).

2. **Custom Properties:**  
   CSS custom properties (variables) are used to allow easy customization of the skeleton loader’s appearance.

3. **Data Attributes & Options:**  
   Options can be specified via data attributes on HTML elements or passed programmatically when initializing SkeletonJS.

4. **Dynamic Cloning:**  
   If an element has the `data-skeletons-count` attribute, SkeletonJS will clone the element the specified number of times to simulate multiple loading items.

5. **Image Replacement:**  
   Any `<img>` elements inside a skeleton loader are replaced with `<span>` elements, ensuring that the skeleton appearance is maintained.

## Development

### Build

SkeletonJS uses Webpack for bundling. To build the project, run:

```bash
npm run build
```

This will compile the TypeScript and LESS files into the `dist` directory.

### Testing

To test the library locally, open one of the example HTML files in your browser or set up a local server.

## License

This project is licensed under the MIT License.

## Author

**Deepansu Mor**  
[GitHub: deepansumor](https://github.com/deepansumor)
