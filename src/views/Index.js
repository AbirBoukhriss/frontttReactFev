import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/tailwind.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // nécessaire pour carrousel
import { Navigate } from 'react-router-dom';

// components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Index() {
  return (
    <>
      <IndexNavbar fixed />

      {/* 🎥 Vidéo de fond */}
      <section className="header relative pt-16 h-screen max-h-860-px overflow-hidden">
        <video
          src="https://fiverr-res.cloudinary.com/video/upload/f_auto:video,q_auto:best/v1/video-attachments/generic_asset/asset/18ad23debdc5ce914d67939eceb5fc27-1738830703211/Desktop%20Header%20new%20version"
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        />
<br></br>

        {/* 📄 Contenu principal */}
        <div className="container mx-auto relative z-10 flex items-center h-full px-4">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-5/12">
            <h1 className="text-white font-bold text-5xl leading-tight mb-4">
              Connecting clients in need to freelancers who deliver.
            </h1>
          

             
             <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md border border-gray-300 mb-6 w-full max-w-3xl">
  <input
    type="text"
    placeholder="Search for any service"
    className="flex-grow outline-none text-gray-800 px-4 bg-transparent placeholder-gray-400"
  />
  <button className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full transition">
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 5a7.5 7.5 0 010 10.65z"
      />
    </svg>
  </button>
</div>

<div className="flex gap-3 mt-4 justify-center flex-nowrap">
  {[
    { label: "Web Dev", path: "/web-development" },
    { label: "designer", path: "/designer" },
    { label: "Data Scientist", path: "/data-scientist" },
    { label: "IA", path: "/ai" },
  ].map((item, index) => (
    <Link to={item.path} key={index}>
      <button
        className="px-3 py-1 text-sm text-white border border-white rounded-full flex items-center gap-1 hover:bg-white hover:text-orange-500 transition whitespace-nowrap"
      >
        {item.label}
        <span className="text-orange-500 text-base">➜</span>
      </button>
    </Link>
  ))}
</div>


              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
             
         
            
              {/* Logos "Trusted by" */}
              <div className="mt-4 flex items-center gap-y-4 text-white text-sm">
                <span className="font-semibold whitespace-nowrap mr-4">
                  Trusted by:
                </span>
                <div className="flex items-center gap-x-6">
                  {[
                    {
                      alt: "Meta",
                      src: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta.ff37dd3.svg",
                    },
                    {
                      alt: "Google",
                      src: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google.e74f4d9.svg",
                    },
                    {
                      alt: "Netflix",
                      src: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.b310314.svg",
                    },
                    {
                      alt: "P&G",
                      src: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pg.22fca85.svg",
                    },
                    {
                      alt: "PayPal",
                      src: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal.d398de5.svg",
                    },
                    {
                      alt: "Payoneer",
                      src: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/payoneer.7c1170d.svg",
                    },
                  ].map((logo, index) => (
                    <img key={index} src={logo.src} alt={logo.alt} className="h-6" />
                  ))}
                </div>
              </div>
            </div>
          </div>
       
      </section>


























<div className="w-full bg-gray-50 py-20 px-4">
  <div className="max-w-6xl mx-auto px-12">
    {/* Titre */}
    <h2 className="text-4xl font-bold text-center text-purple-900 mb-12">
      What Makes Us Different?
    </h2>

    {/* Contenu principal */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      {/* Texte à gauche */}
      <div className="space-y-8">
        {/* Bloc 1 */}
        <div className="flex items-start gap-3">
          <span className="text-green-500 text-2xl">✔</span>
          <div>
            <h3 className="font-bold text-lg">Vetted Talent, Trusted Community</h3>
            <p className="text-gray-700">
              Every freelancer on PeoplePerHour is hand-reviewed and approved,
              ensuring quality work, every time.
            </p>
          </div>
        </div>

        {/* Bloc 2 */}
        <div className="flex items-start gap-3">
          <span className="text-green-500 text-2xl">✔</span>
          <div>
            <h3 className="font-bold text-lg">Built for the UK, Open to the World</h3>
            <p className="text-gray-700">
              We’re UK-first and proud—60% of our freelancers and clients are UK-based,
              but our reach is global, with users in over 100 countries.
            </p>
          </div>
        </div>

        {/* Bloc 3 */}
        <div className="flex items-start gap-3">
          <span className="text-green-500 text-2xl">✔</span>
          <div>
            <h3 className="font-bold text-lg">AI-Powered, Human-Driven</h3>
            <p className="text-gray-700">
              Our smart AI matches you with the <em>best humans</em> for your job—fast,
              efficient, and tailored to your needs.
            </p>
          </div>
        </div>

        {/* Bouton */}
        <a
          href="/auth/login"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-md inline-block text-center"
        >
          START NOW FOR FREE
        </a>
      </div>

      {/* Image à droite */}
      <div className="rounded-2xl overflow-hidden">
        <img
          src="https://d1a29h5kxv3oc2.cloudfront.net/dist/img/Image1.98cf3b5ac78cb0e5b1d8a03a2429a96d.png"
          alt="Content Creator"
          className="w-full h-auto"
        />
      </div>
    </div>
  </div>
</div>














<div className="w-full pt-32 px-4 bg-gray-50">
  <div className="px-12">
    <h2 className="text-4xl font-bold text-gray-800 mb-6">
      <span className="text-orange-500">Popular</span> Services
    </h2>
  </div>

  {/* Carrousel horizontal */}
  <div className="overflow-x-auto px-12 pb-10 no-scrollbar">
    <div
      className="flex gap-6 transition-all duration-300 ease-in-out scroll-smooth"
      style={{
        scrollSnapType: "x mandatory",
      }}
    >
      {[
        {
          src: "https://www.f-cdn.com/assets/main/en/assets/enterprise/landing-page/talent-networks-5-highres.jpg",
          title: "Data Scientist",
          link: "/data-scientist",
        },
        {
          src: "https://www.f-cdn.com/assets/main/en/assets/enterprise/landing-page/talent-networks-6-highres.jpg",
          title: "Machine Learning",
          link: "/machine-learning",
        },
        {
          src: "https://www.f-cdn.com/assets/main/en/assets/enterprise/landing-page/talent-networks-7-highres.jpg",
          title: "Designer",
          link: "/designer",
        },
        {
          src: "https://www.f-cdn.com/assets/main/en/assets/enterprise/landing-page/talent-networks-1-highres.jpg",
          title: "AI",
          link: "/ai",
        },
        {
          src: "https://www.f-cdn.com/assets/main/en/assets/enterprise/landing-page/talent-networks-8-highres.jpg",
          title: "Software Development",
          link: "/software-development",
        },
        {
          src: "https://www.f-cdn.com/assets/main/en/assets/enterprise/landing-page/talent-networks-2-highres.jpg",
          title: "Web Development",
          link: "/web-development",
        },
      ].map((item, index) => (
        <Link
          key={index}
          to={item.link}
          className="no-underline min-w-[280px] max-w-[280px] flex-shrink-0 rounded-2xl overflow-hidden bg-gradient-to-t from-orange-100 via-white to-white shadow-md hover:shadow-orange-300 transition-all duration-300 scroll-snap-align-start mb-2 group"
        >
          <div className="relative w-full h-48 overflow-hidden">
            <img
              src={item.src}
              alt={item.title}
              className="w-full h-full object-cover rounded-t-2xl transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 w-full bg-white/80 backdrop-blur-sm px-4 py-2">
              <p className="text-md font-semibold text-gray-900">{item.title}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
</div>




















































<br></br>
<br></br>
<br></br>
<br></br>




<section className="relative bg-gray-50 py-24">
  {/* SVG Top Decoration */}
  <div className="absolute top-0 left-0 w-full h-20 -mt-20" style={{ transform: "translateZ(0)" }}>
    <svg
      className="absolute bottom-0"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      viewBox="0 0 2560 100"
    >
      <polygon className="text-gray-50 fill-current" points="2560 0 2560 100 0 100" />
    </svg>
  </div>

  <div className="container mx-auto px-6 lg:px-20">
    <div className="flex flex-col lg:flex-row items-center gap-20">
      {/* Video Block */}
      <div className="w-full lg:w-5/12 group relative overflow-hidden rounded-3xl shadow-xl">
        <div className="relative z-10">
          <video
            className="rounded-3xl w-full h-[360px] object-cover transition-transform duration-500 group-hover:scale-105"
            autoPlay
            muted
            loop
            playsInline
          >
            <source
              src="https://res.cloudinary.com/upwork-cloud-acquisition-prod/video/upload/brontes/hiw-v2/hiw-freelancer.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-3xl z-20">
          <h4 className="text-xl font-semibold text-white">Posting jobs is always free</h4>
          <p className="text-sm text-white mt-1">
            Start receiving offers within minutes from talented freelancers.
          </p>
        </div>
      </div>

      {/* Text Blocks */}
      <div className="w-full lg:w-7/12">
        <h2 className="text-4xl font-bold text-gray-800 mb-10">
          <span className="text-orange-500">How it works</span> for clients
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
            <div className="w-12 h-12 flex items-center justify-center bg-orange-100 text-orange-500 rounded-full mb-4 text-xl">
              <i className="fas fa-sitemap"></i>
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Post Your Project</h4>
            <p className="text-sm text-gray-600">
              Clearly describe your needs. Whether it's an app, a design, or a site — post it for free.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
            <div className="w-12 h-12 flex items-center justify-center bg-purple-100 text-purple-500 rounded-full mb-4 text-xl">
              <i className="fas fa-comments"></i>
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Private Discussion</h4>
            <p className="text-sm text-gray-600">
              Chat directly with freelancers. Discuss details, set timelines and clarify everything.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
            <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-500 rounded-full mb-4 text-xl">
              <i className="fas fa-users"></i>
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Freelancers Engage</h4>
            <p className="text-sm text-gray-600">
              Pros will show interest, comment, and ask questions to better understand your project.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
            <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-500 rounded-full mb-4 text-xl">
              <i className="fas fa-lock"></i>
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Work & Payment</h4>
            <p className="text-sm text-gray-600">
              When you're ready, start the project and pay securely once you're satisfied.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>




























        <br></br>
        <br></br>
        <br></br>



















<div className="w-full bg-gray-50 py-20 px-4">
  <div className="max-w-6xl mx-auto text-center">
   <h2 className="text-3xl font-semibold text-gray-800 mb-2">
  What clients say about <span className="text-orange-500">Freelance</span>
</h2>
<h3 className="text-2xl font-bold text-orange-500 mb-6">Reviews</h3>


    <div className="flex justify-center items-center gap-4">
      {/* Flèche gauche */}
      <button
        className="w-10 h-10 rounded-full border border-orange-300 text-orange-500 hover:bg-orange-100 transition duration-300 flex items-center justify-center"
        onClick={() => {
          const container = document.getElementById("scrollContainer");
          if (container) {
            container.scrollBy({ left: -320, behavior: "smooth" });
          }
        }}
      >
        &lt;
      </button>

      {/* Conteneur scrollable */}
      <div
        id="scrollContainer"
        className="overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth whitespace-nowrap px-2 py-4 max-w-[90vw]"
      >
        {[
          {
            name: "Yosr Mrabet",
            role: "Tech Recruiter",
            company: "Google",
            message: "Exceptional work! The freelancer delivered a scalable backend ahead of schedule.",
            img: "https://randomuser.me/api/portraits/women/45.jpg",
          },
          {
            name: "Ali Ben Salah",
            role: "HR Manager",
            company: "Orange",
            message: "Clean code, great communication and fast delivery. Highly recommended!",
            img: "https://randomuser.me/api/portraits/men/32.jpg",
          },
          {
            name: "Julie Moreau",
            role: "Talent Acquisition",
            company: "Capgemini",
            message: "UI/UX design was modern, intuitive and delivered with impressive attention to detail.",
            img: "https://randomuser.me/api/portraits/women/65.jpg",
          },
          {
            name: "Ahmed Zouari",
            role: "Engineering Manager",
            company: "Amazon",
            message: "Great experience working with this freelancer on our cloud migration project.",
            img: "https://randomuser.me/api/portraits/men/55.jpg",
          },
          {
            name: "Lina Bakkar",
            role: "Recruitment Lead",
            company: "Meta",
            message: "We needed urgent frontend fixes and they handled it flawlessly. Great job!",
            img: "https://randomuser.me/api/portraits/women/30.jpg",
          },
          {
            name: "Rami Haddad",
            role: "Product Lead",
            company: "Spotify",
            message: "Very creative and professional. Will definitely hire again for future projects.",
            img: "https://randomuser.me/api/portraits/men/20.jpg",
          },
        ].map((post, index) => (
          <div
            key={index}
            className="inline-block min-w-[280px] max-w-[300px] mx-2 bg-white rounded-xl shadow-md p-6 snap-start text-left transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center mb-4">
              <img
                src={post.img}
                alt={post.name}
                className="w-10 h-10 rounded-full mr-3 object-cover"
              />
              <div>
                <p className="font-semibold text-gray-800">{post.name}</p>
                <p className="text-sm text-orange-500">
                  {post.role} - {post.company}
                </p>
              </div>
            </div>
            <p className="text-gray-600 italic mb-4">“{post.message}”</p>
            <div className="flex justify-between text-sm text-gray-400">
              <span>🔥 {Math.floor(Math.random() * 40) + 80}</span>
              <span>💬 {Math.floor(Math.random() * 20) + 20}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Flèche droite */}
      <button
        className="w-10 h-10 rounded-full border border-orange-300 text-orange-500 hover:bg-orange-100 transition duration-300 flex items-center justify-center"
        onClick={() => {
          const container = document.getElementById("scrollContainer");
          if (container) {
            container.scrollBy({ left: 320, behavior: "smooth" });
          }
        }}
      >
        &gt;
      </button>
    </div>
  </div>
</div>



























<div className="w-full bg-gray-50 px-4 py-16">
  <div className="max-w-6xl mx-auto">
    <div className="flex justify-between gap-6">

      {/* Bloc 1 */}
      <div className="flex-1 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-orange-500 text-2xl font-bold mb-2">3 million</h3>
        <p className="text-purple-900 text-base leading-snug">
          rated freelancers, covering<br />
          8,766 skills
        </p>
      </div>

      {/* Bloc 2 */}
      <div className="flex-1 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-orange-500 text-2xl font-bold mb-2">$150 million</h3>
        <p className="text-purple-900 text-base leading-snug">
          earned by freelancers, with<br />
          top freelancers earning over<br />
          $7,000/m
        </p>
      </div>

      {/* Bloc 3 */}
      <div className="flex-1 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-orange-500 text-2xl font-bold mb-2">10 minutes</h3>
        <p className="text-purple-900 text-base leading-snug">
          to task a freelancer, with 90%<br />
          of projects completed in 7<br />
          days
        </p>
      </div>

    </div>
  </div>
</div>











<div className="w-full flex justify-center px-4 py-10">
  <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-xl shadow-md overflow-hidden">
    
    {/* Bloc gauche - texte avec fond noir */}
    <div className="bg-black text-white p-8 md:w-1/2 flex flex-col justify-center">
      <p className="text-orange-500 text-sm font-semibold mb-2">Grow your business</p>
      <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-snug">
        Trusted globally by over 1 million businesses, small to large
      </h2>
      <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-5 rounded mt-4 w-fit">
        START NOW FOR FREE
      </button>
    </div>

    {/* Bloc droit - image */}
    <div className="md:w-1/2">
      <img
        src="https://d1a29h5kxv3oc2.cloudfront.net/dist/img/BuyerImage.a6699409ec16f54074a839d35edf7560.png"
        alt="Business woman"
        className="w-full h-full object-cover"
      />
    </div>

  </div>
</div>


































<br></br>
<br></br>
<br></br>
<br></br>
<br></br>











      </section>

      <section className="block relative z-1 bg-blueGray-600">
        <div className="container mx-auto">
          <div className="justify-center flex flex-wrap">
            <div className="w-full lg:w-12/12 px-4  -mt-24">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-4/12 px-4">
                  <h5 className="text-xl font-semibold pb-4 text-center">
                    Login Page
                  </h5>
                  <Link to="/auth/login">
                    <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <img
                        alt="..."
                        className="align-middle border-none max-w-full h-auto rounded-lg"
                        src={require("assets/img/login.jpg").default}
                      />
                    </div>
                  </Link>
                </div>

                <div className="w-full lg:w-4/12 px-4">
                  <h5 className="text-xl font-semibold pb-4 text-center">
                    Profile Page
                  </h5>
                  <Link to="/profile">
                    <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <img
                        alt="..."
                        className="align-middle border-none max-w-full h-auto rounded-lg"
                        src={require("assets/img/profile.jpg").default}
                      />
                    </div>
                  </Link>
                </div>

                <div className="w-full lg:w-4/12 px-4">
                  <h5 className="text-xl font-semibold pb-4 text-center">
                    Landing Page
                  </h5>
                  <Link to="/landing">
                    <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <img
                        alt="..."
                        className="align-middle border-none max-w-full h-auto rounded-lg"
                        src={require("assets/img/landing.jpg").default}
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-blueGray-600 overflow-hidden">
        <div className="container mx-auto pb-64">
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-5/12 px-12 md:px-4 ml-auto mr-auto md:mt-64">
              <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <i className="fas fa-code-branch text-xl"></i>
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal text-white">
                Open Source
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-400">
                Since{" "}
                <a
                  href="https://tailwindcss.com/?ref=creativetim"
                  className="text-blueGray-300"
                  target="_blank"
                  rel="noreferrer"   /* ⬅️ ajouté */
                >
                  Tailwind CSS
                </a>{" "}
                is an open source project we wanted to continue this movement
                too. You can give this version a try to feel the design and also
                test the quality of the code!
              </p>
              <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-400">
                Get it free on Github and please help us spread the news with a
                Star!
              </p>
              <a
                href="https://github.com/creativetimofficial/notus-react?ref=nr-index"
                target="_blank"
                rel="noreferrer"   /* ⬅️ ajouté */
                className="github-star mt-4 inline-block text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg"
              >
                Github Star
              </a>
            </div>

            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto mt-32 relative">
              <i className="fab fa-github text-blueGray-700 absolute -top-150-px -right-100 left-auto opacity-80 text-55"></i>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 bg-blueGray-200 relative pt-32">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

       
      </section>

      <Footer />
    </>
  );
}
