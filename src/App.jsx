import { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";

export default function App() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_l4z89tl", // EmailJS service ID
        "template_2gnrkh1", // EmailJS template ID
        form.current,
        "qfeJyGAl1NmZJ7-yq" // EmailJS public key
      )
      .then(
        () => {
          alert("✅ Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          console.error("FAILED...", error);
          alert("❌ Message failed to send. Please try again later.");
        }
      );
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <nav className="navbar">
        <h1 className="logo">Magic Cleaning Services</h1>
        <ul>
          <li onClick={() => scrollToSection("home")}>Home</li>
          <li onClick={() => scrollToSection("services")}>Services</li>
          <li onClick={() => scrollToSection("about")}>About</li>
          <li onClick={() => scrollToSection("contact")}>Contact</li>
        </ul>
      </nav>

      <section id="home" className="section home">
        <h2>Professional Cleaning Services</h2>
        <p>Bringing shine and freshness to your home or business.</p>
      </section>

      <section id="services" className="section services">
        <h2>Our Services</h2>
        <div className="cards">
          <div className="card">
            <h3>Residential Cleaning</h3>
            <p>Keep your home spotless with our trusted professionals.</p>
          </div>
          <div className="card">
            <h3>Commercial Cleaning</h3>
            <p>From offices to retail spaces, we make your business shine.</p>
          </div>
          <div className="card">
            <h3>Move-In / Move-Out</h3>
            <p>We ensure your space looks perfect for your next step.</p>
          </div>
        </div>
      </section>

      <section id="about" className="section about">
        <h2>About Us</h2>
        <p>
          Magic Cleaning Services is dedicated to providing reliable, affordable, and high-quality cleaning solutions for homes and businesses.
        </p>
      </section>

      <section id="contact" className="section contact">
        <h2>Contact Us</h2>
        <form ref={form} onSubmit={sendEmail}>
          <input type="text" name="user_name" placeholder="Your Name" required />
          <input type="tel" name="user_phone" placeholder="Your Phone Number" required />
          <select name="service_type" required>
            <option value="">Select a Service</option>
            <option value="Residential Cleaning">Residential Cleaning</option>
            <option value="Commercial Cleaning">Commercial Cleaning</option>
            <option value="Move-In / Move-Out">Move-In / Move-Out</option>
          </select>
          <button type="submit">Send Message</button>
        </form>
      </section>

      <footer>
        <p>© {new Date().getFullYear()} Magic Cleaning Services. All rights reserved.</p>
      </footer>
    </div>
  );
}
