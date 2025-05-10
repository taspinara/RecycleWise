import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import leavesSection from '../assets/leaves-section.png';
import recycle from '../assets/recycle-buddy.png';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-[#F7F0E5] py-20 grid grid-cols-1 md:grid-cols-2 items-center">
        <div className="px-8 text-center md:text-left">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">About RecycleWise</h2>
          <p className="text-gray-700 mb-6">
            RecycleWise is a passionate initiative dedicated to promoting eco-conscious living.
            Our goal is to make recycling practical, educational, and accessible to communities
            everywhere.
          </p>
          <Link
            to="/"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 inline-block"
          >
            Go Back Home
          </Link>
        </div>
        <div className="flex justify-center">
          <img src={recycle} alt="Recycling Buddy" className="w-3/4 max-w-sm" />
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-gray-50 py-20 px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-green-700 mb-3">Our Mission</h3>
          <p className="text-gray-600">
            To inspire individuals and communities to actively participate in sustainable practices
            through innovative technology and engaging education.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-green-700 mb-3">Our Vision</h3>
          <p className="text-gray-600">
            A world where recycling is effortless and environmental awareness is part of everyday life.
          </p>
        </div>
      </section>

        {/* Team Section */}
        <section className="bg-gray-100 py-20 px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Member 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img
                src="https://randomuser.me/api/portraits/men/33.jpg"
                alt="Bleon ARLLATI"
                className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h4 className="text-xl font-semibold text-gray-800">Bleon ARLLATI</h4>
            <p className="text-green-600 mb-2">Full-Stack Developer</p>
            <p className="text-gray-600 text-sm mb-3">
                Passionate about clean UI and great user experience.
            </p>
            <div className="flex justify-center gap-4 text-xl text-gray-600">
                <a href="https://github.com/" target="_blank" rel="noreferrer">
                <FaGithub className="hover:text-black" />
                </a>
                <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
                <FaLinkedin className="hover:text-blue-700" />
                </a>
            </div>
            </div>

            {/* Member 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img
                src="https://randomuser.me/api/portraits/men/55.jpg"
                alt="Jacques SOVOESSI"
                className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h4 className="text-xl font-semibold text-gray-800">Jacques SOVOESSI</h4>
            <p className="text-green-600 mb-2">Full-Stack Developer</p>
            <p className="text-gray-600 text-sm mb-3">
                Loves building secure, scalable, and clean APIs.
            </p>
            <div className="flex justify-center gap-4 text-xl text-gray-600">
                <a href="https://github.com/" target="_blank" rel="noreferrer">
                <FaGithub className="hover:text-black" />
                </a>
                <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
                <FaLinkedin className="hover:text-blue-700" />
                </a>
            </div>
            </div>

            {/* Member 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Ali TASPINAR"
                className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h4 className="text-xl font-semibold text-gray-800">Ali TASPINAR</h4>
            <p className="text-green-600 mb-2">Full-Stack Developer</p>
            <p className="text-gray-600 text-sm mb-3">
                Focused on creating accessible and delightful designs.
            </p>
            <div className="flex justify-center gap-4 text-xl text-gray-600">
                <a href="https://github.com/" target="_blank" rel="noreferrer">
                <FaGithub className="hover:text-black" />
                </a>
                <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
                <FaLinkedin className="hover:text-blue-700" />
                </a>
            </div>
            </div>
        </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white py-20 px-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
                <div className="collapse collapse-arrow bg-[#F7F0E5] rounded-box shadow-md">
                <input type="checkbox" className="peer" />
                <div className="collapse-title text-lg font-medium text-gray-800">
                    How does RecycleWise work?
                </div>
                <div className="collapse-content text-gray-600">
                    RecycleWise helps you locate recycling centers, track your recycling impact, and participate in eco quizzes and events.
                </div>
                </div>

                <div className="collapse collapse-arrow bg-[#F7EFE5] rounded-box shadow-md">
                <input type="checkbox" className="peer" />
                <div className="collapse-title text-lg font-medium text-gray-800">
                    Do I need to create an account?
                </div>
                <div className="collapse-content text-gray-600">
                    You can browse most features anonymously, but registering allows you to track points, save preferences, and join community activities.
                </div>
                </div>

                <div className="collapse collapse-arrow bg-[#E5EED7] rounded-box shadow-md">
                <input type="checkbox" className="peer" />
                <div className="collapse-title text-lg font-medium text-gray-800">
                    Is RecycleWise free to use?
                </div>
                <div className="collapse-content text-gray-600">
                    Yes! RecycleWise is completely free for individuals and communities. Our goal is to support environmental awareness, not profit.
                </div>
                </div>

                <div className="collapse collapse-arrow bg-[#D6ECF2] rounded-box shadow-md">
                <input type="checkbox" className="peer" />
                <div className="collapse-title text-lg font-medium text-gray-800">
                    How can I contribute as a volunteer?
                </div>
                <div className="collapse-content text-gray-600">
                    We're always looking for eco ambassadors! Visit the Contact page and let us know how you'd like to help.
                </div>
                </div>
            </div>
        </section>

      {/* Call to Action */}
      <section className="bg-[#F7F0E5] py-20 grid grid-cols-1 md:grid-cols-2 items-center px-12">
        <div className="text-center md:text-left">
          <div className="bg-[#E5EED7] p-6 rounded-lg shadow-md">
            <h2 className="text-green-600 text-2xl font-bold mb-2">Be Part of the Change</h2>
            <p className="text-gray-800">
              Whether you're an individual, a school, or an organization — RecycleWise welcomes you to
              join our journey toward a greener tomorrow.
            </p>
            <Link
              to="/contact-us"
              className="block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 mt-4"
            >
              Contact Us
            </Link>
          </div>
        </div>
        <div className="flex justify-center mt-10 md:mt-0">
          <img src={leavesSection} alt="Leaves section" className="w-3/4 max-w-sm" />
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
