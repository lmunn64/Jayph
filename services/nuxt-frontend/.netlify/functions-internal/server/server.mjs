export { default } from "./main.mjs";
export const config = {
  name: "server handler",
  generator: "nuxt@3.18.0",
  path: "/*",
  nodeBundler: "none",
  includedFiles: ["**"],
  excludedPath: ["/.netlify/*","/Jayph/_nuxt/builds/meta/*","/Jayph/_nuxt/builds/*","/Jayph/_fonts/*","/Jayph/_nuxt/*"],
  preferStatic: true,
};