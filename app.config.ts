import { _height, _padding } from "#tailwind-config/theme"

export default defineAppConfig({
  ui: {
    card: {
      header: {
        padding: "sm:px-0 px-0 py-0",
      },
    },
    tabs: {
      list: {
        height: "h-20",
        marker: {
          background: "bg-white dark:bg-neutral-900",
        },
        tab: {
          height: "h-16",
        },
      },
    },
  },
})
