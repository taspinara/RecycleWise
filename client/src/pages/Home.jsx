import React from "react";

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Header Section */}
            <header className="bg-green-600 text-white py-6">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <h1 className="text-3xl font-bold">RecycleWise</h1>
                    <nav>
                        <ul className="flex space-x-6">
                            <li>
                                <a href="#about" className="hover:underline">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#services" className="hover:underline">
                                    Services
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="hover:underline">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-white py-20 flex-grow">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Make Recycling Easy and Efficient
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Join us in creating a sustainable future by recycling smarter.
                    </p>
                    <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
                        Get Started
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section id="about" className="py-20 bg-gray-50 flex-grow">
                <div className="container mx-auto px-4">
                    <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">
                        Why Choose RecycleWise?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h4 className="text-xl font-bold text-gray-800 mb-2">
                                Easy to Use
                            </h4>
                            <p className="text-gray-600">
                                Our platform is designed to make recycling simple and accessible
                                for everyone.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h4 className="text-xl font-bold text-gray-800 mb-2">
                                Eco-Friendly
                            </h4>
                            <p className="text-gray-600">
                                We prioritize sustainability and environmental impact.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h4 className="text-xl font-bold text-gray-800 mb-2">
                                Community Driven
                            </h4>
                            <p className="text-gray-600">
                                Join a community of like-minded individuals working towards a
                                greener planet.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="bg-green-600 text-white py-6">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; 2025 RecycleWise. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
