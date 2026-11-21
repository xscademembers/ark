export type ProjectData = {
  title: string;
  accentColor: string;
  bgColor: string;
  titleColor: string;
  description: string;
  client: string;
  industry: string;
  sector: string;
  images: string[];
};

export const projectsData: Record<string, ProjectData> = {
  "Beverly-Hills": {
    title: "BEVERLY HILLS",
    accentColor: "#1a3a6b",
    bgColor: "#dce8f7",
    titleColor: "#1a3a6b",
    description: `Beverly Hills is an exclusive 10,650 square foot luxury residential enclave thoughtfully positioned along the bay, offering a refined
            blend of contemporary architecture and serene natural surroundings. Comprising only five meticulously designed residences, this
            limited-edition development presents a rare opportunity for discerning homeowners seeking privacy, elegance, and exclusivity.
            Nestled between scenic hills and enveloped by lush landscaped greenery, the project offers an immersive living experience where
            nature and modern luxury coexist harmoniously. Each residence is carefully planned to maximize natural light, ventilation, and spatial
            efficiency, delivering an atmosphere of comfort and sophistication.
            The elevated terrace garden serves as a tranquil retreat, providing panoramic views of the surrounding landscape and bay — an ideal
            setting for relaxation, social gatherings, and everyday rejuvenation. Beverly Hills redefines premium living by combining architectural
            excellence, thoughtful planning, and a privileged location to create a truly exceptional residential address.`,
    client: "Customer Experience Center",
    industry: "Industrial & Commercial",
    sector: "Educational & Technology, AV",
    images: [
      "/images/projects/Beverly-Hills/1.png",
      "/images/projects/Beverly-Hills/2.png",
      "/images/projects/Beverly-Hills/3.png",
      "/images/projects/Beverly-Hills/4.png",
      "/images/projects/Beverly-Hills/5.png",
      "/images/projects/Beverly-Hills/6.png",
      "/images/projects/Beverly-Hills/7.png",
      "/images/projects/Beverly-Hills/8.png",
    ],
  },
  "Winds-Willow-Reserve": {
    title: "WINDS WILLOW RESERVE",
    accentColor: "#14532d",
    bgColor: "#d1fae5",
    titleColor: "#14532d",
    description: `Where Nature and Modern Living Breathe as One At Winds Willow Reserve, life slows to nature’s rhythm. Designed for those who
            seek balance, this estate blends contemporary architecture with timeless serenity. Here, sustainability becomes the highest form of
            luxury — every window frames a living canvas of trees, and every path whisper calm. Wake up to birdsong, sunlight, and the rare
            peace of true belonging. This is more than a home; it’s a return to what matters most — clarity, connection, and harmony with the
            earth. Winds Willow Reserve — where “Home Close to Nature” becomes your reality. <br /><br />
            <b>Where Architecture Meets the Art of Living </b><br /><br />
            At Winds Willow Reserve, each home is a blend of European grace and natural abundance. The French-style villas, carefully designed,
            reflect timeless elegance — from their arched facades to their warm terracotta roofs. Beyond the villa lies what truly defines this
            community — vast plantations that fill every plot with life, fragrance, and calm. Together, they form an estate reminiscent of a French
            countryside colony, where beauty, balance, and nature coexist effortlessly. Here, architecture isn’t just built — it blossoms.`,
    client: "Tech Innovations Inc.",
    industry: "Technology & Start-ups",
    sector: "Commercial Office, Smart Building",
    images: [
      "/images/projects/Winds-Willow-Reserve/1.png",
      "/images/projects/Winds-Willow-Reserve/2.png",
      "/images/projects/Winds-Willow-Reserve/3.png",
      "/images/projects/Winds-Willow-Reserve/4.png",
      "/images/projects/Winds-Willow-Reserve/5.png",
      "/images/projects/Winds-Willow-Reserve/6.png",
      "/images/projects/Winds-Willow-Reserve/7.png",
    ],
  },
};

export const projectOrder = ["Beverly-Hills", "Winds-Willow-Reserve"] as const;
export const projectKeys = Object.keys(projectsData);
