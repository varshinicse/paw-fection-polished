import { createFileRoute } from "@tanstack/react-router";
import { PawcareApp } from "@/components/pawcare-app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PAWCARE — Pet Health & Care Companion" },
      { name: "description", content: "Track pet health, reminders, AI care guidance, community stories, and essentials with PAWCARE." },
      { property: "og:title", content: "PAWCARE — Pet Health & Care Companion" },
      { property: "og:description", content: "A joyful, intelligent care companion for healthier pets and happier families." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PawcareApp,
});
