import { useCountries } from "../context/CountriesContext";

const HeroSection = () => {
  const { setSearchInput } = useCountries();

  return (
    <div className=" h-screen w-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/images/hero-bg.jpg")',
        }}
      ></div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 w-full">
        <h1 className="text-5xl md:text-7xl text-white font-bold mb-4 text-center mt-16">
          Discover the Wonders of
          <br />
          the World
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl text-center mb-8 mt-16">
          Explore detailed information about countries around the globe. <br />
          Learn about their populations, capitals, languages, and more. Save
          your favorite countries and embark on a journey of discovery.
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-center">
        <p className="mb-2">Scroll to explore countries</p>
        <svg
          className="w-6 h-6 mx-auto animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
