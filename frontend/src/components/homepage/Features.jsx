import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faTags,
  faUmbrellaBeach,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";

const features = [
  {
    icon: faGlobe,
    title: "Discover the possibilities",
    description:
      "With nearly half a million attractions, hotels & more, you're sure to find joy.",
  },
  {
    icon: faTags,
    title: "Enjoy deals & delights",
    description:
      "Quality activities. Great prices. Plus, earn credits to save more.",
  },
  {
    icon: faUmbrellaBeach,
    title: "Exploring made easy",
    description:
      "Book last minute, skip lines & get free cancellation for easier exploring.",
  },
  {
    icon: faShieldAlt,
    title: "Travel you can trust",
    description:
      "Read reviews & get reliable customer support. We're with you at every step.",
  },
];

const Features = () => {
  return (
    <div className="bg-white py-16 px-8">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center">
          {features.map((feature, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
              <div className="text-center">
                <FontAwesomeIcon
                  icon={feature.icon}
                  className="text-4xl text-blue-600 mb-4"
                />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
