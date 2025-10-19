"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  FaHome,
  FaBuilding,
  FaTruck,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

export default function App() {
  const form = useRef();
  const [menuOpen, setMenuOpen] = useState(false);

  const [formData, setFormData] = useState({
    user_name: "",
    user_phone: "",
    user_email: "",
    service_type: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendEmail = (e) => {
  e.preventDefault();

  // 1️⃣ Email to you (the business)
  emailjs
    .sendForm(
      "Bryans-mom",          // your service ID
      "template_business",    // template for owner notification
      form.current,
      "qfeJyGAl1NmZJ7-yq"
    )
    .then(
      () => {
        console.log("Owner email sent successfully!");
      },
      (error) => {
        console.error("Owner email failed:", error);
      }
    );

  // 2️⃣ Confirmation email to customer
  emailjs
    .send(
      "Bryans-mom",           // same service ID
      "template_customer",    // template for customer confirmation
      {
        user_name: formData.user_name,
        user_email: formData.user_email,
        service_type: formData.service_type,
      },
      "qfeJyGAl1NmZJ7-yq"
    )
    .then(
      () => {
        console.log("Customer confirmation email sent!");
        alert("✅ Message sent! Check your email for confirmation.");
        setFormData({
          user_name: "",
          user_phone: "",
          user_email: "",
          service_type: "",
          message: "",
        });
      },
      (error) => {
        console.error("Customer email failed:", error);
        alert("❌ Something went wrong. Please try again later.");
      }
    );
};
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen text-gray-800 font-poppins relative overflow-x-hidden">
      {/* Navbar */}
<nav className="fixed top-0 left-0 right-0 bg-brandblue text-white px-6 py-4 z-50 shadow-lg backdrop-blur-md bg-opacity-95">
  <div className="max-w-7xl mx-auto flex justify-between items-center">
    {/* Logo */}
    <h1
      className="text-2xl font-bold cursor-pointer tracking-wide"
      onClick={() => scrollTo("home")}
    >
      Magic Cleaning Services
    </h1>

    {/* Desktop Menu */}
    <ul className="hidden md:flex gap-6">
      {["home", "services", "about", "gallery", "testimonials", "contact"].map(
        (sec) => (
          <li
            key={sec}
            className="cursor-pointer hover:text-brandblueLight transition"
            onClick={() => scrollTo(sec)}
          >
            {sec.toUpperCase()}
          </li>
        )
      )}
    </ul>

    {/* Mobile Hamburger */}
    <button
      className="md:hidden flex flex-col gap-1 focus:outline-none"
      onClick={() => setMenuOpen((prev) => !prev)}
    >
      <span
        className={`w-6 h-0.5 bg-white transition-all ${
          menuOpen ? "rotate-45 translate-y-2" : ""
        }`}
      ></span>
      <span
        className={`w-6 h-0.5 bg-white transition-all ${
          menuOpen ? "opacity-0" : ""
        }`}
      ></span>
      <span
        className={`w-6 h-0.5 bg-white transition-all ${
          menuOpen ? "-rotate-45 -translate-y-2" : ""
        }`}
      ></span>
    </button>
  </div>

  {/* Mobile Dropdown */}
  {menuOpen && (
    <div className="md:hidden bg-brandblue/95 backdrop-blur-md mt-4 rounded-lg shadow-lg">
      <ul className="flex flex-col gap-4 py-4 text-center">
        {["home", "services", "about", "gallery", "testimonials", "contact"].map(
          (sec) => (
            <li
              key={sec}
              className="cursor-pointer hover:text-brandblueLight transition"
              onClick={() => {
                scrollTo(sec);
                setMenuOpen(false);
              }}
            >
              {sec.toUpperCase()}
            </li>
          )
        )}
      </ul>
    </div>
  )}
</nav>

      {/* Hero Section */}
      <motion.section
        id="home"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 1 }}
        className="relative min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-brandblue to-brandblueLight text-white pt-32 px-6 overflow-hidden"
      >
        <div className="absolute w-96 h-96 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <h2 className="text-5xl md:text-6xl font-bold mb-4">
          Professional Cleaning Services
        </h2>
        <p className="text-xl md:text-2xl max-w-2xl mb-8">
          Bringing shine and freshness to your home or business.
        </p>
        <button
          onClick={() => scrollTo("contact")}
          className="px-8 py-4 rounded-full bg-white text-brandblue font-bold shadow-lg hover:scale-105 transition"
        >
          Get Started
        </button>
      </motion.section>

      {/* Services */}
      <motion.section
        id="services"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="relative py-24 px-6 bg-gradient-to-b from-gray-50 via-white to-gray-100 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_70%)]"></div>
        <h2 className="text-4xl font-bold text-center mb-16">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: <FaHome className="text-4xl text-brandblue mb-4" />,
              title: "Residential Cleaning",
              desc: "Keep your home spotless with our trusted professionals.",
            },
            {
              icon: <FaBuilding className="text-4xl text-brandblue mb-4" />,
              title: "Commercial Cleaning",
              desc: "From offices to retail spaces, we make your business shine.",
            },
            {
              icon: <FaTruck className="text-4xl text-brandblue mb-4" />,
              title: "Move-In / Move-Out",
              desc: "We ensure your space looks perfect for your next step.",
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              transition={{ delay: i * 0.15 }}
              className="bg-white/90 backdrop-blur-md rounded-xl p-8 shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl text-center"
            >
              {s.icon}
              <h3 className="text-2xl font-semibold mb-4">{s.title}</h3>
              <p className="text-gray-600">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

{/* About */}
<motion.section
  id="about"
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.8 }}
  className="relative py-24 px-6 bg-gradient-to-br from-white via-gray-50 to-brandblueLight/20 overflow-hidden"
>
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.08),transparent_70%)]"></div>
  <h2 className="text-4xl font-bold text-center mb-12">About Us</h2>
  <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center relative z-10">
    <motion.div variants={fadeUp}>
      <p className="text-gray-700 leading-relaxed mb-4">
        Magic Cleaning Services provides reliable, affordable, and high-quality
        cleaning solutions for homes and businesses.
      </p>
      <p className="text-gray-700 leading-relaxed mb-4">
        Our team is trained, professional, and equipped with the latest tools
        to make your space sparkle. Customer satisfaction is our top priority.
      </p>
      <p className="text-gray-700 leading-relaxed">
        With years of experience and a passion for spotless results, we take
        pride in transforming every space we touch.
      </p>
    </motion.div>

    <motion.div
      variants={fadeUp}
      transition={{ delay: 0.2 }}
      className="relative rounded-xl shadow-xl overflow-hidden"
    >
      <img
        src="/images/crew.jpg"
        alt="Our Cleaning Crew"
        className="w-full h-64 md:h-80 object-cover transform hover:scale-105 transition duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
    </motion.div>
  </div>
</motion.section>

      {/* Gallery */}
      <motion.section
        id="gallery"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="relative py-24 px-6 bg-gradient-to-b from-gray-100 via-white to-gray-50 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.05),transparent_70%)]"></div>
        <h2 className="text-4xl font-bold text-center mb-12 relative z-10">
          Our Work Speaks for Itself
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto relative z-10">
          {["./images/clean1.jpg", "/images/clean2.jpg", "/images/clean3.jpg",
           "/images/clean4.jpg", "/images/clean5.jpg", "/images/clean6.jpg"].map((img, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl overflow-hidden shadow-lg hover:scale-105 transition transform"
            >
              <img src={img} alt="Cleaning example" className="w-full h-64 object-cover" />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        id="testimonials"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="relative py-24 px-6 bg-gradient-to-br from-white via-gray-50 to-brandblue/10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.06),transparent_70%)]"></div>
        <h2 className="text-4xl font-bold text-center mb-12 relative z-10">
          What Our Clients Say
        </h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 relative z-10">
          {[
            {
              name: "Sarah M.",
              quote: "They did an amazing job! My house looks spotless.",
            },
            {
              name: "David L.",
              quote: "Professional and reliable team. Highly recommend.",
            },
            {
              name: "Rachel T.",
              quote: "They made my move-out cleaning stress-free!",
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              transition={{ delay: i * 0.2 }}
              className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <p className="text-gray-700 italic mb-4">“{t.quote}”</p>
              <h4 className="font-semibold text-brandblue">{t.name}</h4>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Contact */}
      <motion.section
        id="contact"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="relative py-24 px-6 bg-gradient-to-t from-gray-100 to-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.08),transparent_70%)]"></div>
        <h2 className="text-4xl font-bold text-center mb-12 relative z-10">Contact Us</h2>

        <form
          ref={form}
          onSubmit={sendEmail}
          className="max-w-lg mx-auto flex flex-col gap-5 relative z-10"
        >
          {/* Name */}
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            value={formData.user_name}
            onChange={handleInputChange}
            required
            className="px-5 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brandblue transition"
          />

          {/* Phone */}
          <input
            type="tel"
            name="user_phone"
            placeholder="Your Phone Number"
            value={formData.user_phone}
            onChange={handleInputChange}
            required
            className="px-5 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brandblue transition"
          />

          {/* Email */}
          <input
            type="email"
            name="user_email"
            placeholder="Your Email Address"
            value={formData.user_email}
            onChange={handleInputChange}
            required
            className="px-5 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brandblue transition"
          />

          {/* Service */}
          <select
            name="service_type"
            value={formData.service_type}
            onChange={handleInputChange}
            required
            className="px-5 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brandblue transition"
          >
            <option value="">Select a Service</option>
            <option>Residential Cleaning</option>
            <option>Commercial Cleaning</option>
            <option>Move-In / Move-Out</option>
            <option>Deep Cleaning</option>
            <option>One-Time / Special Event</option>
          </select>

          {/* Message / Special Instructions */}
          <textarea
            name="message"
            placeholder="Special instructions or mentions..."
            value={formData.message}
            onChange={handleInputChange}
            rows={5}
            className="px-5 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brandblue transition resize-none"
          />

          <button
            type="submit"
            className="bg-brandblue text-white py-4 rounded-full font-bold shadow-lg hover:scale-105 transition"
          >
            Send Message
          </button>
        </form>
      </motion.section>

      {/* Footer */}
      <footer className="bg-brandblue text-white py-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 text-center md:text-left px-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Magic Cleaning Services</h3>
            <p>Bringing shine and freshness since 2020.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1">
              <li>
                <a href="#services" className="hover:text-brandblueLight">
                  Services
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-brandblueLight">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-brandblueLight">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Follow Us</h4>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#">
                <FaFacebookF className="hover:text-brandblueLight" />
              </a>
              <a href="#">
                <FaInstagram className="hover:text-brandblueLight" />
              </a>
              <a href="#">
                <FaTwitter className="hover:text-brandblueLight" />
              </a>
            </div>
          </div>
        </div>
        <p className="text-center text-sm mt-8">
          © {new Date().getFullYear()} Magic Cleaning Services. All rights
          reserved.
        </p>
      </footer>

      {/* Floating Button */}
      <button
        onClick={() => scrollTo("contact")}
        className="fixed bottom-6 right-6 bg-brandblue text-white px-6 py-3 rounded-full shadow-lg hover:scale-110 transition z-50"
      >
        Book Now
      </button>
    </div>
  );
}
