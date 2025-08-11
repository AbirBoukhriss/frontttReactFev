// src/pages/HowItWorksPage.jsx
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

      {/* Contenu principal */}
      <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-200 p-6 lg:p-16 gap-10 pt-20">
        <div className="lg:w-1/2">
          <h3 className="text-xl font-bold text-purple-900 mb-4">
            How FREE<span className="text-orange-500">&</span>LANCE Works
          </h3>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-purple-900 leading-tight mb-6">
            Get the most from FREE<span className="text-orange-500">&</span>LANCE <br />
            and live your work dream.
          </h1>
          <p className="text-lg text-purple-800 mb-6">
            FREE<span className="text-orange-500">&</span>LANCE connects clients to expert freelancers who are available
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
  className="bg-gray-200 border-b-2 border-gray-300 flex justify-start space-x-6 py-2 px-6 h-14 shadow-sm"
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
        ${activeTab === tab ? "text-orange-600" : "text-gray-500"}
        cursor-pointer
        hover:text-orange-600
        transition-colors duration-300
        focus:outline-none focus:ring-2 focus:ring-orange-400 rounded-t-md
        flex items-center justify-center
      `}
      aria-pressed={activeTab === tab}
    >
      {tab.charAt(0).toUpperCase() + tab.slice(1)}
      {activeTab === tab && (
        <span className="absolute left-0 bottom-0 w-full h-1.5 bg-orange-500 rounded-t"></span>
      )}
    </button>
  ))}
</div>

















<section style={{ display: 'flex', width: '100vw', height: '600px' }}>
  {/* Partie texte */}
  <div
    style={{
      width: '50%',
      padding: '40px',
      backgroundColor: '#ffffff',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <p style={{ color: '#5b21b6', textTransform: 'uppercase', marginBottom: '12px' }}>
      No project too big or too small
    </p>
    <h2 style={{ fontSize: '48px', fontWeight: '800', color: '#4c1d95', marginBottom: '24px' }}>
      Post a project
    </h2>
    <p style={{ color: '#5b21b6', marginBottom: '24px' }}>
      Use our quick and easy form to describe the project you’ve got in mind. The more detail you can give, the more relevant freelancers you’ll attract.
    </p>
    <button
      style={{
        backgroundColor: '#f97316',
        color: 'white',
        padding: '16px 32px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
      }}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#ea580c')}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#f97316')}
    >
      POST A PROJECT
    </button>
  </div>

  {/* Partie image */}
  <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <img
      src="https://d1a29h5kxv3oc2.cloudfront.net/dist/img/mobile.046272223703ce38da91fbe6d6feee80.png"
      alt="Post a Project"
      style={{ width: '70%', height: 'auto', objectFit: 'cover', borderRadius: '16px' }}
    />
  </div>
</section>












<section style={{ display: 'flex', width: '100vw', height: '600px' }}>
  {/* Partie image */}
  <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <img 
      src="https://d1a29h5kxv3oc2.cloudfront.net/dist/img/mobile.05a8836a72e937b333ad3c98d16da602.png" 
      alt="Post a Project" 
      style={{ width: '70%', height: 'auto', objectFit: 'cover', borderRadius: '16px' }} 
    />
  </div>

  {/* Partie texte */}
  <div style={{ width: '50%', padding: '40px', backgroundColor: '#ffffff', boxSizing: 'border-box' }}>
    <p style={{ color: '#5b21b6', textTransform: 'uppercase', marginBottom: '12px' }}>
      A vast collection of skills
    </p>
    <h2 style={{ fontSize: '48px', fontWeight: '800', color: '#4c1d95', marginBottom: '24px' }}>
      Discover incredible freelancers
    </h2>
    <p style={{ color: '#5b21b6', marginBottom: '24px' }}>
      Search our freelancer listings for rated and reviewed experts in every skill imaginable — One discovery could change your business forever.
    </p>
    <p style={{ color: '#3B3561', marginBottom: '32px', lineHeight: '1.6' }}>
      Refine your search by skill, location or hourly rate. Contact freelancers and request a proposal for your project.
    </p>
    <button style={{ backgroundColor: '#f97316', color: 'white', padding: '16px 32px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
      Search Freelancers
    </button>
  </div>
</section>

























































<section style={{ display: 'flex', width: '100vw', height: '600px' }}>
  {/* Partie texte */}
  <div 
    style={{ 
      width: '50%', 
      padding: '40px', 
      backgroundColor: '#ffffff', 
      boxSizing: 'border-box', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center' // centre verticalement
    }}
  >
    <h2 style={{ fontSize: '48px', fontWeight: '800', color: '#4c1d95', marginBottom: '24px' }}>
      Communicate
    </h2>
    <p style={{ color: '#5b21b6', marginBottom: '24px' }}>
      Project streams bring together everything needed to produce great work: messages, attachments, feedback, payment and a lot more — all in one place. Receive real-time notifications, track freelancer progress and revisit your chat history. Managing a freelancer has never been easier.
    </p>
  </div>

  {/* Partie image */}
  <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <img 
      src="https://d1a29h5kxv3oc2.cloudfront.net/dist/img/mobile.ffb9f07830e4075563252cc08c0fafc6.png" 
      alt="Post a Project" 
      style={{ width: '70%', height: 'auto', objectFit: 'cover', borderRadius: '16px' }} 
    />
  </div>
</section>

























<section style={{ display: 'flex', width: '100vw', height: '600px' }}>
  {/* Partie image */}
  <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <img 
      src="https://d1a29h5kxv3oc2.cloudfront.net/dist/img/mobile.776b210270866b1132b86c53d8f98713.png" 
      alt="Post a Project" 
      style={{ width: '70%', height: 'auto', objectFit: 'cover', borderRadius: '16px' }} 
    />
  </div>

  {/* Partie texte */}
  <div style={{ width: '50%', padding: '40px', backgroundColor: '#ffffff', boxSizing: 'border-box' }}>
    
    <h2 style={{ fontSize: '48px', fontWeight: '800', color: '#4c1d95', marginBottom: '24px' }}>
    Pay freelancers with a tap
    </h2>
    <p style={{ color: '#5b21b6', marginBottom: '24px' }}>
At the end of a project and only once you’re totally happy with the work done, pay freelancers with ease straight from your project stream. Click pay and funds are released to your freelancer. Top-up your PeoplePerHour account and make future payments even easier.

Your PeoplePerHour account keeps your money safe (in escrow) until you release it to your freelancer. If ever you’re not happy to release funds to a freelancer, every PeoplePerHour account comes with access to our customer support team who will help resolve any dispute — keeping your money safe, no matter what happens.    </p>
   
    
  </div>
</section>









<section style={{ display: 'flex', width: '100vw', height: '600px' }}>
  {/* Partie texte */}
  <div 
    style={{ 
      width: '50%', 
      padding: '40px', 
      backgroundColor: '#ffffff', 
      boxSizing: 'border-box', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center' // centre verticalement
    }}
  >
    <h2 style={{ fontSize: '48px', fontWeight: '800', color: '#4c1d95', marginBottom: '24px' }}>
      Rate your freelancer
    </h2>
    <p style={{ color: '#5b21b6', marginBottom: '24px' }}>
We take the quality of our freelancers very seriously. That’s why leaving your feedback after a project is so important to us. Reward your freelancer for their hard work — give them a rating out of five, write an in-depth review and share your experience with future clients. Your feedback makes a huge difference to the community.    </p>
  </div>

  {/* Partie image */}
  <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <img 
      src="https://d1a29h5kxv3oc2.cloudfront.net/dist/img/mobile.776b210270866b1132b86c53d8f98713.png"
      alt="Post a Project" 
      style={{ width: '70%', height: 'auto', objectFit: 'cover', borderRadius: '16px' }} 
    />
  </div>
</section>



















    </>
  );
};

export default HowItWorksPage;
