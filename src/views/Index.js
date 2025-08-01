import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/tailwind.css";

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

        {/* 📄 Contenu principal */}
        <div className="container mx-auto relative z-10 flex items-center h-full px-4">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-5/12">
            <h1 className="text-white font-bold text-5xl leading-tight mb-4">
              Connecting clients in need to freelancers who deliver.
            </h1>
            <p className="text-blueGray-200 text-lg mb-8">
              Connect with top talent and work on your terms. Our platform
              empowers freelancers and clients alike to collaborate and grow.
            </p>

            {/* 🔍 Recherche */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl w-full">
              {/* Onglets */}
              <div className="flex mb-6 gap-2">
                {/* ⬇️ remplacé <a href="#"> par <button> */}
                <button
                  type="button"
                  className="w-1/2 text-center py-3 rounded-full font-semibold text-gray-800 bg-white hover:bg-gray-200 transition"
                  aria-label="Find Talent"
                >
                  Find Talent
                </button>
                <button
                  type="button"
                  className="w-1/2 text-center py-3 rounded-full font-semibold text-gray-800 bg-white hover:bg-gray-200 transition"
                  aria-label="Browse Jobs"
                >
                  Browse Jobs
                </button>
              </div>

              {/* Barre de recherche */}
              <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md border border-gray-300 mb-6">
                <input
                  type="text"
                  placeholder="Search by role, skills, or keywords"
                  className="flex-grow outline-none text-gray-800 px-2 bg-transparent"
                />
                <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition flex items-center">
                  🔍 Search
                </button>
              </div>

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
        </div>
      </section>

      <div className="w-full pt-32 px-4 bg-gray-50">
        <div className="px-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Popular services :</h2>
        </div>

        {/* Carrousel horizontal */}
        <div className="overflow-x-auto px-12 pb-8">
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
              // ⬇️ navigation interne avec Link (meilleur DX)
              <Link
                key={index}
                to={item.link}
                className="min-w-[300px] max-w-[300px] flex-shrink-0 rounded-xl overflow-hidden shadow-lg bg-white scroll-snap-align-start transform transition duration-300 hover:scale-105"
              >
                <img src={item.src} alt={item.title} className="w-full h-48 object-cover" />
                <div className="text-center p-3 text-gray-800 font-semibold text-lg bg-white">
                  {item.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-48 md:mt-40 pb-40 relative bg-blueGray-100">
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
              className="text-blueGray-100 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                <video className="w-full rounded-t-lg" autoPlay muted loop playsInline>
                  <source
                    src="https://res.cloudinary.com/upwork-cloud-acquisition-prod/video/upload/brontes/hiw-v2/hiw-freelancer.mp4"
                    type="video/mp4"
                  />
                </video>

                <blockquote className="relative p-8 mb-4">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="absolute left-0 w-full block h-95-px -top-94-px"
                  >
                    <polygon
                      points="-30,95 583,95 583,65"
                      className="text-lightBlue-500 fill-current"
                    ></polygon>
                  </svg>
                  <h4 className="text-xl font-bold text-white">Posting jobs is always free</h4>
                  <p className="text-md font-light mt-2 text-white">
                    Looking for top talent? Post your project for free and start receiving
                    offers within minutes.
                  </p>
                </blockquote>
              </div>
            </div>

            <div className="w-full md:w-6/12 px-4">
              <div className="flex flex-wrap">
                <div className="w-full md:w-6/12 px-4">
                  <div className="relative flex flex-col mt-4">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-sitemap"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">Post Your Project</h6>
                      <p className="mb-4 text-blueGray-500">
                        As a client, you describe what you need—clearly and precisely. Whether
                        it's a website, an app, or a design, just post it for free.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-drafting-compass"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">Private Discussion</h6>
                      <p className="mb-4 text-blueGray-500">
                        Once you find a profile that fits, start a private chat to discuss
                        details, timelines, and expectations.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 px-4">
                  <div className="relative flex flex-col min-w-0 mt-4">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-newspaper"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">Freelancers Engage</h6>
                      <p className="mb-4 text-blueGray-500">
                        Talented freelancers will comment on your post, showcase interest, and
                        ask clarifying questions if needed.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-file-alt"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">Work & Payment</h6>
                      <p className="mb-4 text-blueGray-500">
                        If you’re satisfied with the discussion and the proposal, you proceed
                        with the project and make payment securely when you’re ready.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto overflow-hidden pb-20">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-4/12 px-12 md:px-4 ml-auto mr-auto mt-48">
              <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <i className="fas fa-sitemap text-xl"></i>
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal">CSS Components</h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                Every element that you need in a product comes built in as a component. All
                components fit perfectly with each other and can have different colours.
              </p>
              <div className="block pb-6">
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Buttons
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Inputs
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Labels
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Menus
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Navbars
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Pagination
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Progressbars
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Typography
                </span>
              </div>
              <a
                href="https://www.creative-tim.com/learning-lab/tailwind/react/alerts/notus?ref=nr-index"
                target="_blank"
                rel="noreferrer"   /* ⬅️ ajouté */
                className="font-bold text-blueGray-700 hover:text-blueGray-500 ease-linear transition-all duration-150"
              >
                View All{" "}
                <i className="fa fa-angle-double-right ml-1 leading-relaxed"></i>
              </a>
            </div>

            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto mt-32">
              <div className="relative flex flex-col min-w-0 w-full mb-6 mt-48 md:mt-0">
                <img
                  alt="..."
                  src={require("assets/img/component-btn.png").default}
                  className="w-full align-middle rounded absolute shadow-lg max-w-100-px z-3 left-145-px -top-29-px"
                />
                <img
                  alt="..."
                  src={require("assets/img/component-profile-card.png").default}
                  className="w-full align-middle rounded-lg absolute shadow-lg -top-160-px left-260-px max-w-210-px"
                />
                <img
                  alt="..."
                  src={require("assets/img/component-info-card.png").default}
                  className="w-full align-middle rounded-lg absolute shadow-lg max-w-180-px -top-225-px left-40-px z-2"
                />
                <img
                  alt="..."
                  src={require("assets/img/component-info-2.png").default}
                  className="w-full align-middle rounded-lg absolute shadow-2xl max-w-200-px -left-50-px top-25-px"
                />
                <img
                  alt="..."
                  src={require("assets/img/component-menu.png").default}
                  className="w-full align-middle rounded absolute shadow-lg max-w-580-px -left-20-px top-210-px"
                />
                <img
                  alt="..."
                  src={require("assets/img/component-btn-pink.png").default}
                  className="w-full align-middle rounded absolute shadow-xl max-w-120-px left-195-px top-95-px"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bloc Bordeaux */}
        <div className="relative rounded-2xl overflow-hidden min-h-[300px] text-center flex flex-col items-center justify-center px-8 py-20 shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1612831661122-7f1ef4e51870?auto=format&fit=crop&w=1600&q=80"
              alt="Bordeaux background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#4b1224] opacity-90"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-white text-4xl sm:text-5xl font-light leading-tight">
              Freelance services at your{" "}
              <span className="text-orange-500 font-serif italic tracking-wide">
                fingertips
              </span>
            </h2>

            <a
              href="about:blank"
              target="_blank"
              rel="noreferrer"  /* ⬅️ sécurisé */
              className="mt-8 inline-block bg-white text-black px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition duration-300 shadow"
            >
              Join Fiverr
            </a>
          </div>
        </div>
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

        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center bg-white shadow-xl rounded-lg -mt-64 py-16 px-12 relative z-10">
            <div className="w-full text-center lg:w-8/12">
              <p className="text-4xl text-center">
                <span role="img" aria-label="love">
                  😍
                </span>
              </p>
              <h3 className="font-semibold text-3xl">Do you love this Starter Kit?</h3>
              <p className="text-blueGray-500 text-lg leading-relaxed mt-4 mb-4">
                Cause if you do, it can be yours now. Hit the buttons below to navigate to
                get the Free version for your next project. Build a new web app or give an
                old project a new look!
              </p>
              <div className="sm:block flex flex-col mt-10">
                <a
                  href="https://www.creative-tim.com/learning-lab/tailwind/react/overview/notus?ref=nr-index"
                  target="_blank"
                  rel="noreferrer"   /* ⬅️ ajouté */
                  className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-2 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                >
                  Get started
                </a>
                <a
                  href="https://github.com/creativetimofficial/notus-react?ref=nr-index"
                  target="_blank"
                  rel="noreferrer"   /* ⬅️ ajouté */
                  className="github-star sm:ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg"
                >
                  <i className="fab fa-github text-lg mr-1"></i>
                  <span>Help With a Star</span>
                </a>
              </div>
              <div className="text-center mt-16"></div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
