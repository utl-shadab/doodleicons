import type { Category } from "./types.js";
export const categories = [
  {
    id: "interface",
    label: "Interface & navigation",
    description: "The everyday language of a clear interface.",
    target: 500,
  },
  {
    id: "actions",
    label: "Actions & status",
    description: "Small signals that help people take the next step.",
    target: 500,
  },
  {
    id: "communication",
    label: "Communication & social",
    description: "Conversations, connections, and people.",
    target: 500,
  },
  {
    id: "technology",
    label: "AI & technology",
    description: "Thoughtful symbols for the things we build.",
    target: 500,
  },
  {
    id: "commerce",
    label: "Commerce & finance",
    description: "From a small purchase to a big idea.",
    target: 500,
  },
  {
    id: "creative",
    label: "Media & creative",
    description: "Tools for making, sharing, and playing.",
    target: 500,
  },
  {
    id: "health",
    label: "Health & lifestyle",
    description: "Movement, wellbeing, and everyday rituals.",
    target: 500,
  },
  {
    id: "productivity",
    label: "Files & productivity",
    description: "A little more order for your working day.",
    target: 500,
  },
  {
    id: "travel",
    label: "Travel & environment",
    description: "Getting out, finding your way, and looking around.",
    target: 500,
  },
  {
    id: "expressive",
    label: "Shapes & expression",
    description: "A little personality goes a long way.",
    target: 500,
  },
] as const satisfies readonly Category[];
