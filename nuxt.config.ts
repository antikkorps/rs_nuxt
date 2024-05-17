// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@pinia/nuxt", "@sidebase/nuxt-auth"],
  colorMode: {
    preference: "dark",
  },
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "~/tailwind.config.js",
    config: {},
    viewer: true,
  },
  extends: ["nuxt-emoji"],
  auth: {
    baseURL: "/api/auth",
    provider: {
      type: "local",
    },
    endpoints: {
      signIn: { path: "/login", method: "post", credentials: true },
      signOut: { path: "/logout", method: "post", credentials: true },
      signUp: { path: "/register", method: "post", credentials: true },
      getSession: { path: "/session", method: "get", credentials: true },
    },
    token: { signInResponseTokenPointer: "/token/accessToken" },
  },
})
