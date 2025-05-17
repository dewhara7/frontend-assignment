import { Link } from "react-router-dom";

const CountryCard = ({ country }) => {
  const { name, population, region, capital, flags, cca3 } = country;

  return (
    <Link to={`/country/${cca3}`} className="block h-full">
      <div className="w-full max-w-sm h-[420px] w-[320px] rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300">

        <img
          src={flags.png}
          alt={`Flag of ${name.common}`}
          className=" w-[320px] h-48 object-cover"
        />
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            {name.common}
          </h2>
          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            <p>
              <span className="font-semibold">Population:</span>{" "}
              {population.toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Region:</span> {region}
            </p>
            <p>
              <span className="font-semibold">Capital:</span>{" "}
              {capital?.[0] || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
