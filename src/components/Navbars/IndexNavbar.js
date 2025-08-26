/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";
import IndexDropdown from "components/Dropdowns/IndexDropdown.js";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-2 navbar-expand-lg bg-white shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          
          {/* Partie gauche */}
          <div className="flex items-center gap-3">
            {/* Logo */}
            <Link
              to="/"
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            >
              <span className="text-black">FREE</span>
              <span className="text-orange-500">&</span>
              <span className="text-black">Lance</span>
            </Link>

            {/* Home */}
            <Link
              to="/"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              Home
            </Link>

            {/* Find a Freelancer */}
            <Link
              to="/landing"
              className="px-4 py-2 bg-white text-black border rounded-lg hover:bg-orange-500 hover:text-white hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              Find a Freelancer
            </Link>

            {/* Find a Project */}
            <Link
              to="/find-project-page"
              className="px-4 py-2 bg-white text-black border rounded-lg hover:bg-orange-500 hover:text-white hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              Find a Project
            </Link>

            {/* How it Works */}
            <Link
              to="/how-it-works"
              className="px-4 py-2 bg-white text-black border rounded-lg hover:bg-orange-500 hover:text-white hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              How it Works
            </Link>
          </div>

          {/* Partie droite */}
          <div
            className={
              "lg:flex flex-grow items-center justify-end bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto items-center gap-3">
              <li className="flex items-center">
                <IndexDropdown />
              </li>
              <li className="flex items-center">
                <a
                  className="hover:text-orange-500 text-black px-3 py-2 flex items-center text-xs uppercase font-bold"
                  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-react%2F%23%2F"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook text-lg leading-lg" />
                </a>
              </li>
              <li className="flex items-center">
                <a
                  className="hover:text-orange-500 text-orange-500 px-3 py-2 flex items-center text-xs uppercase font-bold"
                  href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-react%2F%23%2F"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-twitter text-lg leading-lg" />
                </a>
              </li>
              <li className="flex items-center">
                <a
                  className="hover:text-orange-500 text-black px-3 py-2 flex items-center text-xs uppercase font-bold"
                  href="https://github.com/creativetimofficial/notus-react"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github text-lg leading-lg" />
                </a>
              </li>
              {/* Sign in */}
              <li className="flex items-center">
                <Link
                  to="/auth/login"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 ease-in-out"
                >
                  Sign in
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
