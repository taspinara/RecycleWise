import React, { useState, useEffect, useRef } from "react";

const Speedometer = ({
  percentage,
  label,
  bgColor,
  strokeColor,
  textColor,
}) => {
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const circleRef = useRef(null);

  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;

  const strokeDashoffset =
    circumference - (currentPercentage / 100) * circumference;

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = useRef(
    new IntersectionObserver(observerCallback, {
      threshold: 0.5,
    })
  );

  useEffect(() => {
    if (circleRef.current) {
      observer.current.observe(circleRef.current);
    }

    return () => {
      observer.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      let startTime;
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const animationPercentage = Math.min(
          (progress / 2000) * percentage,
          percentage
        );
        setCurrentPercentage(animationPercentage);

        if (animationPercentage < percentage) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isVisible, percentage]);

  useEffect(() => {
    setCurrentPercentage(0);
  }, [percentage]);

  return (
    <div className="relative flex flex-col items-center" ref={circleRef}>
      <svg
        className="transform rotate-[-90deg]"
        width="200"
        height="200"
        viewBox="0 0 120 120"
      >
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke={bgColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-3/2 text-3xl font-bold"
        style={{ color: textColor }}
      >
        {Math.round(currentPercentage)}%
      </div>
      <div className="mt-2">
        <button
          className="text-white py-4 px-8 w-full rounded-full hover:bg-opacity-80 transition text-lg font-bold hover:shadow-lg hover:scale-105 cursor-pointer"
          style={{ backgroundColor: strokeColor }}
        >
          {label}
        </button>
      </div>
    </div>
  );
};

const SpeedometerDashboard = () => {
  const speedometersData = [
    {
      id: 1,
      percentage: 9,
      label: "Plastic",
      bgColor: "#F5F5DC",
      strokeColor: "#2E7D32",
      textColor: "#263238",
    },
    {
      id: 2,
      percentage: 35,
      label: "Metal",
      bgColor: "#F5F5DC",
      strokeColor: "#16A34A",
      textColor: "#263238",
    },
    {
      id: 3,
      percentage: 60,
      label: "Paper",
      bgColor: "#F5F5DC",
      strokeColor: "#2E7D32",
      textColor: "#263238",
    },
    {
      id: 4,
      percentage: 25,
      label: "Glass",
      bgColor: "#F5F5DC",
      strokeColor: "#16A34A",
      textColor: "#263238",
    },
    {
      id: 5,
      percentage: 50,
      label: "Organic",
      bgColor: "#F5F5DC",
      strokeColor: "#2E7D32",
      textColor: "#263238",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center mt-10 mb-10">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">
        RecycleWise <br />
        Dashboard
      </h1>
      <p className="text-lg mb-6 text-gray-600">
        Precentage of Recyclable Waste Every Day
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-30 justify-between place-items-center mb-10 mt-10">
        {speedometersData.map((speedometer) => (
          <div className="col-span-1" key={speedometer.id}>
            <Speedometer
              percentage={speedometer.percentage}
              label={speedometer.label}
              bgColor={speedometer.bgColor}
              strokeColor={speedometer.strokeColor}
              textColor={speedometer.textColor}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpeedometerDashboard;
