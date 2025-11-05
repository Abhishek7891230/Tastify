import { useNavigate } from "react-router-dom";
import "../styles/showcase.css";

export function Showcase() {
  const navigate = useNavigate();

  const foods = [
    {
      name: "Biryani",
      img: "https://media.istockphoto.com/id/1056663060/photo/indian-traditional-chicken-biryani-in-handi-dish.jpg?s=612x612&w=0&k=20&c=Emaz4NISjTrd4c76r-o6gMx1QiDQloTjb91-nPmbIYU=",
    },
    {
      name: "Paneer Masala",
      img: "https://media.istockphoto.com/id/968502144/photo/indian-food-or-indian-curry-in-a-copper-brass-serving-bowl.jpg?s=612x612&w=0&k=20&c=3tsRoD85cxRN_RC27n9NmMa3o6sQZTJCQqv5D_TsboQ=",
    },
    {
      name: "Burger",
      img: "https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4124.png",
    },
    {
      name: "Pizza",
      img: "https://pngimg.com/uploads/pizza/pizza_PNG44073.png",
    },
    {
      name: "Cake",
      img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2025/10/28/eaf9f255-02d3-4bac-adef-09a9552dac9e_570511.JPG",
    },
  ];

  return (
    <section className="showcase-root relative z-10">
      <div className="showcase-headline">
        <h1 className="showcase-title">
          You bring the hunger, we bring the heat
        </h1>
        <p className="showcase-subtitle">Food made to match your moment</p>
        <div className="mt-6">
          <button
            className="showcase-btn text-lg md:text-xl font-bold"
            onClick={() => navigate("/menu")}
          >
            Grab a Bite <span className="inline-block text-2xl ml-1">→</span>
          </button>
        </div>
      </div>

      <div className="h-[120vh]"></div>

      <div className="showcase-cards-container px-6 py-12">
        <p className="mb-4 ml-7 font-bold">What's on your mind ?</p>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 py-8">
          {foods.map((food, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-2 transition-all duration-300 cursor-pointer z-10 hover:scale-105"
            >
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={food.img}
                  alt={food.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-gray-800 font-semibold text-lg">
                  {food.name}
                </h3>
                <span className="mt-5 text-3xl text-red-500 block">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="lower-section">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Not Just Food. It's a Whole Mood 😋
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Late-night hunger or mid-day craving, we've got you covered.
              Crafted with flavor, served with speed — because good food should
              always feel effortless.Your cravings deserve more than ordinary.
              From freshly baked pizzas to smooth, rich desserts, our menu is
              made to delight and delivered quickly — every time, with care.
            </p>
            <button
              className="bg-black z-10 text-white cursor-pointer px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300"
              onClick={() => navigate("/menu")}
            >
              Explore the Menu 🍕
            </button>
          </div>

          <div className="flex-1">
            <img
              src="https://media.istockphoto.com/id/1190330112/photo/fried-pork-and-vegetables-on-white-background.jpg?s=612x612&w=0&k=20&c=TzvLLGGvPAmxhKJ6fz91UGek-zLNNCh4iq7MVWLnFwo="
              alt="Delicious dish"
              className="rounded-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>
    </section>
  );
}
