// Resolve a path in the /public folder against Vite's base URL so it works both
// locally (base '/') and on GitHub Pages (base '/portfolio/'). Vite rewrites
// asset URLs in index.html automatically, but not absolute paths used at runtime
// in templates or data — those must go through here.
export const asset = (path: string): string =>
  import.meta.env.BASE_URL + path.replace(/^\//, '')
