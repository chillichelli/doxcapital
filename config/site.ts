export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Wallet Finder",
  description: "Your average venture capital.",
  mainNav: [
    {
      title: "Property",
      href: "/",
    },
    {
      title: "Breakdown",
      href: "/breakdown",
    },
    {
      title: "Settings",
      href: "/settings",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
};
