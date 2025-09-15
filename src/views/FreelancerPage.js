/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Navbar from "components/Navbars/IndexNavbar";

export default function BuyerFreelancerPage() {
  const location = useLocation();
  const history = useHistory();
  const barRef = useRef(null);
  const [activeTab, setActiveTab] = useState("freelancer");

  // Scroll vers la barre
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
    if (tab === "buyer") {
      history.push("/how-it-works"); // Redirection Buyer
    }
    // Freelancer = rien (inactif)
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* ===== Section présentation ===== */}
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
            FREE<span style={{ color: "#ea580c" }}>&</span>LANCE connects clients to expert freelancers
            who are available to hire by the hour or project.
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

      {/* ===== Onglets Buyer / Freelancer ===== */}
      <div
        id="button-bar"
        ref={barRef}
        className="border-b flex justify-start space-x-6 py-2 px-6 h-14 shadow-sm"
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
              transition-colors duration-300
              focus:outline-none focus:ring-2 rounded-t-md
              flex items-center justify-center
            `}
            style={{
              color: activeTab === tab ? "#ea580c" : "#6b7280",
              cursor: tab === "freelancer" ? "default" : "pointer",
              focusRingColor: "#ea580c"
            }}
            onMouseEnter={(e) => {
              if (tab !== "freelancer") e.target.style.color = "#ea580c";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = activeTab === tab ? "#ea580c" : "#6b7280";
            }}
            aria-pressed={activeTab === tab}
            disabled={tab === "freelancer"}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {activeTab === tab && (
              <span className="absolute left-0 bottom-0 w-full h-1.5 rounded-t" style={{ backgroundColor: "#ea580c" }}></span>
            )}
          </button>
        ))}
      </div>

      {/* ===== Contenu avec marges 2cm ===== */}
      <div style={{ marginLeft: "2cm", marginRight: "2cm", backgroundColor: "#faf9f6", minHeight: "100vh", paddingBottom: "40px" }}>

        {/* Section 1 */}
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
              Join the elite
            </p>
            <h2 style={{ fontSize: "48px", fontWeight: "800", color: "#1f2937", marginBottom: "24px" }}>
              Apply to become a certified freelancer
            </h2>
            <p style={{ color: "#6b7280", marginBottom: "24px", lineHeight: "1.6" }}>
              Complete an online application to join the exclusive PeoplePerHour freelancer community. Every
              application is reviewed and approved by our moderation team, ensuring only the best freelancers are
              matched to client projects.
            </p>
            <p style={{ color: "#6b7280", marginBottom: "32px", lineHeight: "1.6" }}>
              Once approved, you'll gain access to a stream of projects from our international client community. Now
              you're ready to provide your services to thousands of business — go get 'em!
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
              BECOME A FREELANCER
            </button>
          </div>
          <div style={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
            <img
              src="https://d1a29h5kxv3oc2.cloudfront.net/dist/img/mobile.d8880d277bb5c92030e8b9f2f54774d8.png"
              alt="Become a freelancer"
              style={{ width: "70%", height: "auto", objectFit: "cover", borderRadius: "16px", boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
            />
          </div>
        </section>

        {/* Section 2 */}
        <section style={{ display: "flex", width: "100%", minHeight: "600px", backgroundColor: "#fefdfb", borderRadius: "16px", marginBottom: "32px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
          <div style={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
            <img
              src="https://d1a29h5kxv3oc2.cloudfront.net/dist/img/mobile.d090bebbaaa2caed2158003350ced8c5.png"
              alt="Build profile"
              style={{ width: "70%", height: "auto", objectFit: "cover", borderRadius: "16px", boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
            />
          </div>
          <div
            style={{
              width: "50%",
              padding: "40px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <p style={{ color: "#ea580c", textTransform: "uppercase", marginBottom: "12px", fontWeight: "600" }}>
              Make yourself stand out
            </p>
            <h2 style={{ fontSize: "48px", fontWeight: "800", color: "#1f2937", marginBottom: "24px" }}>
              Build a great profile
            </h2>
            <p style={{ color: "#6b7280", marginBottom: "24px", lineHeight: "1.6" }}>
              Your profile is your most valuable resource. Clients browse your profile when deciding who to work with
              on a project, so it's essential that you present yourself in the best way possible. Personalise your
              profile by sharing your career experience, define your skills and tell your own story. Show examples of
              your work in your portfolio, be descriptive and keep your profile up-to-date.
            </p>
          </div>
        </section>

        {/* Section 3 (avec bouton Search Projects) */}
        <section style={{ display: "flex", width: "100%", minHeight: "600px", backgroundColor: "#fefdfb", borderRadius: "16px", marginBottom: "32px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
          <div style={{ width: "50%", padding: "40px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ color: "#ea580c", textTransform: "uppercase", marginBottom: "12px", fontWeight: "600" }}>
              Search and saved-searches
            </p>
            <h2 style={{ fontSize: "48px", fontWeight: "800", color: "#1f2937", marginBottom: "24px" }}>
              Find the perfect projects for you
            </h2>
            <p style={{ color: "#6b7280", marginBottom: "24px", lineHeight: "1.6" }}>
              As a freelancer on PeoplePerHour, our artificial intelligence system matches you to the most suitable
              projects based on your profile and abilities. You can search for projects manually or save automatic
              searches to notify you of new projects. Find projects that match your skill and ability then submit a
              compelling proposal to win the project. Send 15 proposals per month for free, if you want to quote on
              more projects you can buy additional credit.
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
              onClick={() => history.push("/find-project-page")}
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
              Search Projects
            </button>
          </div>
          <div style={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
            <img
              src="https://d1a29h5kxv3oc2.cloudfront.net/dist/img/mobile.f59c6ab3fd8259285b1fd3ae36e69bc7.png"
              alt="Find projects"
              style={{ width: "70%", height: "auto", objectFit: "cover", borderRadius: "16px", boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
            />
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
              Your proposal, your way
            </h2>
            <p style={{ color: '#6b7280', marginBottom: '24px', lineHeight: '1.6' }}>
              When a project takes your eye, complete a proposal and respond to the client. If you have questions – ask them, if you have suggestions – make them. Set realistic budgets and achievable milestones. It's that easy! You're protected from the moment your proposal is selected as clients pay a deposit into an escrow account, which is held safe until you complete the project and raise an invoice.
            </p>
          </div>

          {/* Partie image */}
          <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: "20px" }}>
            <img
              src="https://d1a29h5kxv3oc2.cloudfront.net/dist/img/mobile.7ea8629f1e2875dde4f81fae6c1e34b0.png"
              alt="Your proposal"
              style={{ width: '70%', height: 'auto', objectFit: 'cover', borderRadius: '16px', boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
            />
          </div>
        </section>

        <section style={{ display: 'flex', width: '100%', minHeight: "600px", backgroundColor: "#fefdfb", borderRadius: "16px", marginBottom: "32px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
          {/* Partie image */}
          <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: "20px" }}>
            <img
              src="https://d1a29h5kxv3oc2.cloudfront.net/dist/img/mobile.988cef21b276fda5dd552d61d4be5185.png"
              alt="Easy invoicing"
              style={{ width: '70%', height: 'auto', objectFit: 'cover', borderRadius: '16px', boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
            />
          </div>

          {/* Partie texte centrée */}
          <div
            style={{
              width: '50%',
              padding: '40px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%'
            }}
          >
            <h2 style={{ fontSize: '48px', fontWeight: '800', color: '#1f2937', marginBottom: '24px' }}>
              Easy invoicing
            </h2>
            <p style={{ color: '#6b7280', marginBottom: '24px', lineHeight: '1.6' }}>
              Once you've completed a project, effortlessly raise an invoice directly from your project stream. Everything is prepared for you — all invoice data is automatically populated based on your project. You decide if you're ready to invoice the full amount or enter your own values. Your client is notified instantly and once they authorise payment funds are moved from the project's protected escrow account into your PeoplePerHour account.
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
              Build lasting relationships with clients
            </h2>
            <p style={{ color: '#6b7280', marginBottom: '24px', lineHeight: '1.6' }}>
              Clients love completing projects through PeoplePerHour because they are engaged in the new skills and abilities you provide. During a project, you'll uncover many insights to your client's business and these are a great opportunity to develop lasting working relationships. The project stream is designed for you to manage ongoing and recurring work including auto-invoicing on set dates.
            </p>
          </div>

          {/* Partie image */}
          <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: "20px" }}>
            <img
              src="https://d1a29h5kxv3oc2.cloudfront.net/dist/img/mobile.257ab13603d22e27dd5687f0a48a3bd7.png"
              alt="Build relationships"
              style={{ width: '70%', height: 'auto', objectFit: 'cover', borderRadius: '16px', boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
            />
          </div>
        </section>

        <section style={{ display: 'flex', width: '100%', minHeight: "600px", backgroundColor: "#fefdfb", borderRadius: "16px", marginBottom: "32px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
          {/* Partie image */}
          <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: "20px" }}>
            <img
              src="https://d1a29h5kxv3oc2.cloudfront.net/dist/img/mobile.cdb919496848d9196a0b43a50fe028f3.png"
              alt="Quality experiences"
              style={{ width: '70%', height: 'auto', objectFit: 'cover', borderRadius: '16px', boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
            />
          </div>

          {/* Partie texte centrée */}
          <div
            style={{
              width: '50%',
              padding: '40px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%'
            }}
          >
            <h2 style={{ fontSize: '48px', fontWeight: '800', color: '#1f2937', marginBottom: '24px' }}>
              Provide quality experiences
            </h2>
            <p style={{ color: '#6b7280', marginBottom: '24px', lineHeight: '1.6' }}>
              PeoplePerHour is a professional platform and clients expect professional experiences. Your client reviews you at the end of every project on the quality of their experience. Freelancers who are consistently rated highly benefit from higher rankings, increased visibility and greater success on the platform
            </p>
          </div>
        </section>
      </div>
    </>
  );
}