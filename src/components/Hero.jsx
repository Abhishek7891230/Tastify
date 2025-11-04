import "../styles/Hero.css";

export function Hero() {
  return (
    <div className="fixed inset-0 -z-0 pointer-events-none">
      <div className="diagonal-part clip-diagonal"></div>

      <img
        src="https://png.pngtree.com/png-clipart/20240615/original/pngtree-pizza-slice-png-image_15340723.png"
        alt="Pizza slice"
        className="floating-img animate-float"
      />
    </div>
  );
}
