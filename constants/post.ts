export const POST_TYPE_ICONS = {
  note: "ph:note",
  article: "ph:article-medium",
  event: "ph:calendar-plus",
  meet: "ph:users",
  review: "ph:star",
  gig: "ph:briefcase",
  ask_locals: "ph:info",
  ad: "ph:storefront",
  video: "ph:video-camera",
} as const;

export const POST_ACTIONS = {
  article: "Read More",
  meet: "Send Request",
  review: "Rate",
  gig: "Apply",
  ask_locals: "Share Info",
  ad: "Contact",
  event: "Book Now",
  note: "Comment",
  video: "Watch"
} as const;
