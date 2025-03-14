import Masonry from "./Masonry";
const data = [
  { id: 1, image: "/WEB14.png", width: 300, height: 1000 }, 
  { id: 2, image: "/WEB2.png", width: 400, height: 700 }, 
  { id: 3, image: "/WEB4.png", width: 250, height: 500 }, 
  { id: 4, image: "/WEB3.png", width: 350, height: 900 }, 
   
  { id: 12, image: "/WEB12.png", width: 300, height: 400 },
  { id: 5, image: "/WEB5.png", width: 400, height: 600 }, 
  { id: 6, image: "/WEB8.png", width: 900, height: 500 },
  { id: 11, image: "/WEB11.png", width: 450, height: 500 }, 
  { id: 14, image: "/WEB15.png", width: 250, height: 1400 },
  { id: 7, image: "/WEB7.png", width: 450, height: 500 }, 
  { id: 8, image: "/WEB6.png", width: 500, height: 900 }, 
  { id: 9, image: "/WEB9.png", width: 350, height: 600 }, 
  { id: 10, image: "/WEB10.png", width: 500, height: 500 }, 
  { id: 13, image: "/WEB13.png", width: 400, height: 600 },
  
];

export default function Gallery() {
  return (
    <div className="absolute mt-40 inset-0 flex flex-col items-center justify-start bg-black text-white overflow-y-auto h-screen">
      <h1 className="text-3xl font-bold mb-4">Gallery</h1>
      <Masonry data={data} />
    </div>
  );
}

  
