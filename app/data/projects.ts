export interface Project {
  title: string;
  summary: string;
  description: string;
  image: string;
  stack: string[];
  liveUrl: string;
  sourceUrl: string;
}

export const projects: Project[] = [
  {
    title: "Chito Khaja",
    summary: "Food ordering with eSewa payments and an admin panel.",
    description:
      "Customers browse the menu, build a cart and pay through eSewa, Nepal's most-used digital wallet. Restaurant staff manage dishes and incoming orders from a separate admin panel.",
    image: "/project/chito-khaja.jpg",
    stack: ["Next.js", "Express", "MongoDB", "Tailwind CSS", "eSewa"],
    liveUrl: "https://frontend-chito-khaja.vercel.app/",
    sourceUrl: "https://github.com/Aashish9840/frontend-Chito-Khaja",
  },
  {
    title: "MovieApp",
    summary: "Search films, check ratings and watch trailers.",
    description:
      "A movie browser backed by a public film API. Search by title, then open any film for its rating, details and trailer.",
    image: "/project/movieapp.png",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "REST API"],
    liveUrl: "https://movie-site-smoky-five.vercel.app/",
    sourceUrl: "https://github.com/Aashish9840/movie-site",
  },
];
