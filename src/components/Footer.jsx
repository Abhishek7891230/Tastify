export function Footer() {
  return (
    <footer className="relative z-20 bg-gray-900 text-gray-300 py-6 mt-0 w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        <p className="text-sm mb-3 md:mb-0">
          © 2025 <span className="text-white font-semibold">MyWebsite</span>.
          All rights reserved.
        </p>

        <div className="flex space-x-6 text-sm">
          <a
            href="#"
            className="hover:text-white transition-colors duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-white transition-colors duration-300"
          >
            Terms of Service
          </a>
          <a
            href="https://linkedin.com/in/abhishek-poojary777"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
