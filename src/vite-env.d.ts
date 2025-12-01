/// <reference types="vite/client" />

// Allow importing SVGs (and other common assets) as URLs.
declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

// Allow importing Markdown files as raw strings via Vite '?raw' modifier.
declare module '*.md?raw' {
  const src: string;
  export default src;
}