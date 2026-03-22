import template1 from "@/assets/template-1.png";
import template2 from "@/assets/template-2.jpg";
import template3 from "@/assets/template-3.jpg";
import template4 from "@/assets/template-4.jpg";
import template5 from "@/assets/template-5.jpg";
import template6 from "@/assets/template-6.jpg";
import template7 from "@/assets/template-7.jpg";
import template8 from "@/assets/template-8.jpg";
import template9 from "@/assets/template-9.jpg";

export interface Template {
  id: number;
  name: string;
  category: string;
  image: string;
}

export const templates: Template[] = [
  { id: 1, name: "Alphabet Creative", category: "Creative", image: template1 },
  { id: 2, name: "Futuristic Exhibition", category: "Tech", image: template2 },
  { id: 3, name: "Geometric Shapes", category: "Tech", image: template3 },
  { id: 4, name: "Fashion Forward", category: "Fashion", image: template4 },
  { id: 5, name: "Polygonal Burst", category: "Creative", image: template5 },
  { id: 6, name: "Education Portal", category: "Education", image: template6 },
  { id: 7, name: "Ocean Dive", category: "Adventure", image: template7 },
  { id: 8, name: "Corporate Landing", category: "Business", image: template8 },
  { id: 9, name: "Space Creative", category: "Creative", image: template9 },
];

export const categories = ["All", "Business", "Education", "Fashion", "Tech", "Creative", "Adventure"];
