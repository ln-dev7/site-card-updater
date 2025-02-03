import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HelpCircle, ArrowRight } from "lucide-react";
import NumberFlow from "@number-flow/react";

export default function App() {
  const [selectedSites, setSelectedSites] = useState<Props[]>([]);
  console.log(selectedSites);
  const totalSpend = sites.map((site) => site.price).reduce((a, b) => a + b, 0);
  const toggleSite = (siteName: Props) => {
    if (selectedSites.includes(siteName)) {
      setSelectedSites(selectedSites.filter((site) => site !== siteName));
    } else {
      setSelectedSites([...selectedSites, siteName]);
    }
  };

  const progress = (selectedSites.length / sites.length) * 100;
  const currentSpend = selectedSites
    .map((site) => site.price)
    .reduce((a, b) => a + b, 0);

  return (
    <main className="relative w-full min-h-screen flex items-start md:items-center justify-center px-4 py-10">
      <div className="max-w-2xl w-full p-6 space-y-5 bg-white rounded-2xl shadow-lg border relative">
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start">
            <h1 className="text-lg font-medium text-gray-900">
              Select the sites you want to change your card on
            </h1>

            <p className="text-gray-500">
              We found {sites.length} sites based on your browser history
            </p>
          </div>
          <button
            onClick={() => setSelectedSites([])}
            className="text-gray-500 hover:text-gray-700"
          >
            Unselect All
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sites.map((site) => (
            <motion.div key={site.name} className="">
              <div
                className={`
              relative p-4 rounded-xl border-2 cursor-pointer bg-white
              transition-all duration-300 ease-in-out
              ${
                selectedSites.includes(site)
                  ? "border-gray-900"
                  : "border-gray-200"
              }
            `}
                onClick={() => toggleSite(site)}
              >
                <div className="flex flex-col items-center space-y-2">
                  <img
                    src={site.logo}
                    alt={`${site.name} logo`}
                    className="w-12 h-12 object-contain"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    {site.name}
                  </span>
                </div>
                <AnimatePresence>
                  {selectedSites.includes(site) && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute top-2 right-2 w-5 h-5 bg-black rounded-full flex items-center justify-center"
                    >
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-medium text-gray-900">
                Estimated yearly spend
              </span>
              <HelpCircle className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-gray-900">
                <NumberFlow
                  value={currentSpend}
                  locales="en-US"
                  format={{
                    style: "currency",
                    currency: "USD",
                  }}
                />
              </span>
              <motion.span layout className="text-gray-400 text-2xl font-bold">
                / ${totalSpend}
              </motion.span>
            </div>
          </div>
          <CreditCard progress={progress} />
        </div>

        <motion.button
          className={`
          w-full py-3 rounded-lg flex items-center justify-center space-x-2 text-white font-medium
          ${
            selectedSites.length > 0
              ? "bg-black"
              : "bg-gray-200 cursor-not-allowed"
          }
        `}
          disabled={selectedSites.length === 0}
        >
          <span>Migrate my spend</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </main>
  );
}

const CreditCard = ({ progress }: { progress: number }) => {
  return (
    <motion.div className="relative w-36 h-16 bg-black/10 rounded-lg overflow-hidden">
      <div className="relative size-full z-10 flex flex-col gap-1 items-center justify-center py-1 px-3">
        <div className="w-full flex items-center justify-between">
          <span className="text-[10px] text-white font-medium">05/26</span>
          <span className="text-[10px] text-white font-medium">111</span>
        </div>
        <span className="text-[10px] text-white font-medium text-left w-full">
          4242 4242 4242 4242
        </span>
      </div>
      <motion.div
        className="absolute bottom-0 top-0 left-0 w-0 bg-black"
        style={{
          width: `${progress}%`,
          transition: "width 0.3s ease-out",
        }}
      />
    </motion.div>
  );
};

type Props = {
  name: string;
  logo: string;
  price: number;
};

const sites: Props[] = [
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/240px-Microsoft_logo.svg.png",
    price: 1341.04,
  },
  {
    name: "Spotify",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/240px-Spotify_icon.svg.png",
    price: 945.23,
  },
  {
    name: "Meta",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/240px-Meta_Platforms_Inc._logo.svg.png",
    price: 789.91,
  },
  {
    name: "Netflix",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/240px-Netflix_2015_logo.svg.png",
    price: 1059.33,
  },
  {
    name: "Twitter",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/240px-Logo_of_Twitter.svg.png",
    price: 1904.48,
  },
  {
    name: "LinkedIn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/240px-LinkedIn_logo_initials.png",
    price: 1200.76,
  },
  {
    name: "Dropbox",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Dropbox_Icon.svg/240px-Dropbox_Icon.svg.png",
    price: 587.55,
  },
  {
    name: "Airbnb",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/240px-Airbnb_Logo_B%C3%A9lo.svg.png",
    price: 1873.49,
  },
];
