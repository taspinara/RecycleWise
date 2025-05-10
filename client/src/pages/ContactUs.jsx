import { useState } from 'react';
import leavesSection from '../assets/leaves-section.png';

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your server
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#F7F0E5] py-16 px-6 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-gray-800 text-center mb-4">Contact Us</h2>
      <p className="text-gray-600 text-center max-w-2xl mb-12">
        We’d love to hear from you! Whether you have a question, feedback, or want to get involved —
        just drop us a message.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl items-start">
        {/* 📝 Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full">
          <div className="mb-4">
            <label className="label font-medium text-gray-700">Name</label>
            <input
              name="name"
              type="text"
              className="input input-bordered w-full"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="label font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              className="input input-bordered w-full"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label className="label font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              rows="5"
              className="textarea textarea-bordered w-full"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {submitted && (
            <div className="alert alert-success shadow mb-4">
              ✅ Your message has been sent. Thank you!
            </div>
          )}

          <button type="submit" className="btn w-full bg-green-600 hover:bg-green-700 text-white">
            Send Message
          </button>
        </form>

        {/* 🌿 Visual Section */}
        <div className="flex flex-col items-center justify-center">
          <img src={leavesSection} alt="Contact visual" className="w-3/4 max-w-sm mb-6" />
          <p className="text-gray-700 text-center">
            Or email us directly at{' '}
            <a href="mailto:info@recyclewise.org" className="text-green-700 underline">
              info@recyclewise.org
            </a>
          </p>
        </div>
      </div>

      {/* 🗺 Google Map */}
      <section className="w-full mt-20">
        <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">Find Us on the Map</h3>
        <div className="w-full h-[400px] max-w-6xl mx-auto rounded-lg overflow-hidden shadow-lg">
          <iframe
            title="RecycleWise Office Map"
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.076768010635!2d28.97835821559926!3d41.008237279302236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x1d1c5b4aefad9c4!2sRecycleWise%20Headquarters!5e0!3m2!1sen!2str!4v1700000000000!5m2!1sen!2str"
          ></iframe>
        </div>
      </section>
        {/* 🧭 Directions Link */}
        <div className="mt-6 text-center">
        <p className="text-gray-700 mb-2">
            📍 <strong>RecycleWise HQ</strong><br />
            123 Green Avenue, Kadıköy, Istanbul, Turkey
        </p>
        <a
            href="https://www.google.com/maps/dir/?api=1&destination=RecycleWise+Headquarters+Istanbul"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-2 pt-1.5 btn bg-green-600 hover:bg-green-700 text-white"
        >
            Get Directions
        </a>
        </div>
    </div>
  );
}
