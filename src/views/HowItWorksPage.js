/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Navbar from "components/Navbars/IndexNavbar";

const HowItWorksPage = () => {
  const location = useLocation();
  const history = useHistory();
  const barRef = useRef(null);
  const [activeTab, setActiveTab] = useState("buyer");

  const scrollToBar = (smooth = true) => {
    const el = document.getElementById("button-bar") || barRef.current;
    if (el) {
      el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
    }
  };

  useEffect(() => {
    if (location.hash === "#bar") {
      setTimeout(() => scrollToBar(true), 50);
    }
  }, [location]);

  const handleTabClick = (tab) => {
    if (tab === "freelancer") {
      history.push("/freelancer-page");
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <>
      <Navbar />

      {/* WRAPPER AVEC 2 CM DE MARGE */}
      <div style={{ marginLeft: "2cm", marginRight: "2cm", backgroundColor: "#faf9f6", minHeight: "100vh" }}>
        {/* Contenu principal */}
        <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center p-6 lg:p-16 gap-10 pt-20" style={{ backgroundColor: "#faf9f6" }}>
          <div className="lg:w-1/2">
            <h3 className="text-xl font-bold mb-4" style={{ color: "#ea580c" }}>
              How FREE<span style={{ color: "#ea580c" }}>&</span>LANCE Works
            </h3>
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6" style={{ color: "#1f2937" }}>
              Get the most from FREE<span style={{ color: "#ea580c" }}>&</span>LANCE <br />
              and live your work dream.
            </h1>
            <p className="text-lg mb-6" style={{ color: "#6b7280" }}>
              FREE<span style={{ color: "#ea580c" }}>&</span>LANCE connects clients to expert freelancers who are available
              to hire by the hour or project.
            </p>
          </div>

          <div className="lg:w-1/2 flex justify-center lg:ml-8 mt-6 lg:mt-0">
            <img
              src="https://cdn.arc.dev/arc-next-landing/images/talent-landing/hero-photo.png"
              alt="FREE&LANCE illustration"
              className="rounded-lg shadow-lg"
              style={{ width: "300px", height: "auto" }}
            />
          </div>
        </div>

        {/* ======= Onglets style Buyer/Freelancer ======= */}
        <div
          id="button-bar"
          ref={barRef}
          className="border-b-2 flex justify-start space-x-6 py-2 px-6 h-14 shadow-sm"
          style={{ backgroundColor: "#fefdfb", borderColor: "#ea580c" }}
        >
          {["buyer", "freelancer"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`
                relative
                px-4
                h-full
                font-semibold text-lg
                cursor-pointer
                transition-colors duration-300
                focus:outline-none focus:ring-2 rounded-t-md
                flex items-center justify-center
              `}
              style={{
                color: activeTab === tab ? "#ea580c" : "#6b7280",
                focusRingColor: "#ea580c"
              }}
              onMouseEnter={(e) => e.target.style.color = "#ea580c"}
              onMouseLeave={(e) => e.target.style.color = activeTab === tab ? "#ea580c" : "#6b7280"}
              aria-pressed={activeTab === tab}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <span className="absolute left-0 bottom-0 w-full h-1.5 rounded-t" style={{ backgroundColor: "#ea580c" }}></span>
              )}
            </button>
          ))}
        </div>

        {/* ==== Section Post a project ==== */}
        <section style={{ display: "flex", width: "100%", minHeight: "600px", backgroundColor: "#fefdfb", borderRadius: "16px", marginBottom: "32px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
          <div
            style={{
              width: "50%",
              padding: "40px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <p style={{ color: "#ea580c", textTransform: "uppercase", marginBottom: "12px", fontWeight: "600" }}>
              No project too big or too small
            </p>
            <h2 style={{ fontSize: "48px", fontWeight: "800", color: "#1f2937", marginBottom: "24px" }}>
              Post a project
            </h2>
            <p style={{ color: '#6b7280', marginBottom: '24px', lineHeight: '1.6' }}> 
              Use our quick and easy form to describe the project you've got in mind. The more detail you can give, the more relevant freelancers you'll attract. 
            </p>
            <button
              style={{
                backgroundColor: "#ea580c",
                color: "white",
                padding: "16px 32px",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "16px",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 6px -1px rgba(234, 88, 12, 0.3)"
              }}
              onClick={() => history.push("/auth/login")}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#dc2626";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 12px -1px rgba(234, 88, 12, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#ea580c";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 6px -1px rgba(234, 88, 12, 0.3)";
              }}
            >
              POST A PROJECT
            </button>
          </div>

          <div style={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
            <img
              src="https://d1a29h5kxv3oc2.cloudfront.net/dist/img/mobile.046272223703ce38da91fbe6d6feee80.png"
              alt="Post a Project"
              style={{ width: "70%", borderRadius: "16px", boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
            />
          </div>
        </section>

        {/* ==== Section Search freelancers ==== */}
        <section style={{ display: "flex", width: "100%", minHeight: "600px", backgroundColor: "#fefdfb", borderRadius: "16px", marginBottom: "32px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
          <div style={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
            <img
              src="https://d1a29h5kxv3oc2.cloudfront.net/dist/img/mobile.05a8836a72e937b333ad3c98d16da602.png"
              alt="Search Freelancers"
              style={{ width: "70%", borderRadius: "16px", boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
            />
          </div>

          <div style={{ width: "50%", padding: "40px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ color: "#ea580c", textTransform: "uppercase", marginBottom: "12px", fontWeight: "600" }}>
              A vast collection of skills
            </p>
            <h2 style={{ fontSize: "48px", fontWeight: "800", color: "#1f2937", marginBottom: "24px" }}>
              Discover incredible freelancers
            </h2>
            <p style={{ color: '#6b7280', marginBottom: '24px', lineHeight: '1.6' }}> 
              Search our freelancer listings for rated and reviewed experts in every skill imaginable — One discovery could change your business forever. 
            </p> 
            <p style={{ color: '#6b7280', marginBottom: '32px', lineHeight: '1.6' }}> 
              Refine your search by skill, location or hourly rate. Contact freelancers and request a proposal for your project. 
            </p>
            <button
              style={{
                backgroundColor: "#ea580c",
                color: "white",
                padding: "16px 32px",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "16px",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 6px -1px rgba(234, 88, 12, 0.3)"
              }}
              onClick={() => history.push("/landing")}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#dc2626";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 12px -1px rgba(234, 88, 12, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#ea580c";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 6px -1px rgba(234, 88, 12, 0.3)";
              }}
            >
              Search Freelancers
            </button>
          </div>
        </section>
   
        <section style={{ display: 'flex', width: '100%', minHeight: "600px", backgroundColor: "#fefdfb", borderRadius: "16px", marginBottom: "32px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
          {/* Partie texte */}
          <div
            style={{
              width: '50%',
              padding: '40px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <h2 style={{ fontSize: '48px', fontWeight: '800', color: '#1f2937', marginBottom: '24px' }}>
              Communicate
            </h2>
            <p style={{ color: '#6b7280', marginBottom: '24px', lineHeight: '1.6' }}>
              Project streams bring together everything needed to produce great work: messages, attachments, feedback, payment and a lot more — all in one place. Receive real-time notifications, track freelancer progress and revisit your chat history. Managing a freelancer has never been easier.
            </p>
          </div>

          {/* Partie image */}
          <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: "20px" }}>
            <img
              src="https://d1a29h5kxv3oc2.cloudfront.net/dist/img/mobile.ffb9f07830e4075563252cc08c0fafc6.png"
              alt="Communicate"
              style={{ width: '70%', height: 'auto', objectFit: 'cover', borderRadius: '16px', boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
            />
          </div>
        </section>

        <section style={{ display: 'flex', width: '100%', minHeight: "600px", backgroundColor: "#fefdfb", borderRadius: "16px", marginBottom: "32px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
          {/* Partie image */}
          <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: "20px" }}>
            <img
              src="https://d1a29h5kxv3oc2.cloudfront.net/dist/img/mobile.776b210270866b1132b86c53d8f98713.png"
              alt="Pay freelancers"
              style={{ width: '70%', height: 'auto', objectFit: 'cover', borderRadius: '16px', boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
            />
          </div>

          {/* Partie texte */}
          <div style={{ width: '50%', padding: '40px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: '48px', fontWeight: '800', color: '#1f2937', marginBottom: '24px' }}>
              Pay freelancers with a tap
            </h2>
            <p style={{ color: '#6b7280', marginBottom: '24px', lineHeight: '1.6' }}>
              At the end of a project and only once you're totally happy with the work done, pay freelancers with ease straight from your project stream. Click pay and funds are released to your freelancer. Top-up your PeoplePerHour account and make future payments even easier.
            </p>
            <p style={{ color: '#6b7280', marginBottom: '24px', lineHeight: '1.6' }}>
              Your PeoplePerHour account keeps your money safe (in escrow) until you release it to your freelancer. If ever you're not happy to release funds to a freelancer, every PeoplePerHour account comes with access to our customer support team who will help resolve any dispute — keeping your money safe, no matter what happens.
            </p>
          </div>
        </section>

        <section style={{ display: 'flex', width: '100%', minHeight: "600px", backgroundColor: "#fefdfb", borderRadius: "16px", marginBottom: "32px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
          {/* Partie texte */}
          <div
            style={{
              width: '50%',
              padding: '40px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <h2 style={{ fontSize: '48px', fontWeight: '800', color: '#1f2937', marginBottom: '24px' }}>
              Rate your freelancer
            </h2>
            <p style={{ color: '#6b7280', marginBottom: '24px', lineHeight: '1.6' }}>
              We take the quality of our freelancers very seriously. That's why leaving your feedback after a project is so important to us. Reward your freelancer for their hard work — give them a rating out of five, write an in-depth review and share your experience with future clients. Your feedback makes a huge difference to the community.
            </p>
          </div>

          {/* Partie image */}
          <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: "20px" }}>
            <img
              src="https://d1a29h5kxv3oc2.cloudfront.net/dist/img/mobile.776b210270866b1132b86c53d8f98713.png"
              alt="Rate freelancer"
              style={{ width: '70%', height: 'auto', objectFit: 'cover', borderRadius: '16px', boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default HowItWorksPage;