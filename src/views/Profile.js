import React, { useState } from "react";


import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import team2 from "assets/img/team-2-800x800.jpg";

export default function Profile() {
  const [showAdd, setShowAdd] = useState(false);
  const [showList, setShowList] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", budgetMin: "", budgetMax: "", category: "", skills: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description) return;
    setTasks([...tasks, form]);
    setForm({ title: "", description: "", budgetMin: "", budgetMax: "", category: "", skills: "" });
    setShowAdd(false);
    setShowList(true);
  };

  return (
    <>
      <Navbar fixed />

      <main>
        <section className="header relative pt-16 flex h-screen max-h-860-px items-center">
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('/assets/img/ApartmentCoder.jpg')",
              zIndex: -1,
            }}
          />

          <div className="container mx-auto z-10 relative px-4">
            <div className="w-full md:w-8/12 lg:w-6/12 xl:w-5/12">
              <h1 className="text-white font-bold text-5xl leading-tight mb-4">
                From idea to execution — find the perfect freelancer to bring your project to life.
              </h1>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl max-w-full w-full"></div>
            </div>
          </div>

          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              viewBox="0 0 2560 100"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>

        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={team2}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                     
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  
                  </div>
                </div>

                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                    Jenna Stones
                  </h3>
                  <div className="text-sm leading-normal text-blueGray-400 font-bold uppercase mb-2">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                    Los Angeles, California
                  </div>

                  <div className="my-10">
                    <button
                      onClick={() => { setShowAdd(true); setShowList(false); }}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg mr-4"
                    >➕ Add Task</button>
                    <button
                      onClick={() => { setShowList(true); setShowAdd(false); }}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg"
                    >📋 View Tasks</button>
                  </div>

                  {showAdd && (
                    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg mb-10">
                      <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Task</h2>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" placeholder="Task Title" className="w-full p-2 border rounded" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                        <textarea placeholder="Description" className="w-full p-2 border rounded" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required></textarea>
                        <div className="flex space-x-2">
                          <input type="number" placeholder="Min Budget" className="w-1/2 p-2 border rounded" value={form.budgetMin} onChange={(e) => setForm({ ...form, budgetMin: e.target.value })} required />
                          <input type="number" placeholder="Max Budget" className="w-1/2 p-2 border rounded" value={form.budgetMax} onChange={(e) => setForm({ ...form, budgetMax: e.target.value })} required />
                        </div>
                        <select className="w-full p-2 border rounded" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required>
                          <option value="">Select a category</option>
                          <option value="web">Web Development</option>
                          <option value="design">Design</option>
                          <option value="writing">Writing</option>
                          <option value="marketing">Marketing</option>
                          <option value="other">Other</option>
                        </select>
                        <input type="text" placeholder="Required Skills" className="w-full p-2 border rounded" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
                        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full">Create Task</button>
                      </form>
                    </div>
                  )}

                  {showList && (
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                      {tasks.map((task, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{task.title}</h3>
                          <p className="text-gray-600 mb-2">{task.description}</p>
                          <p className="text-sm text-gray-500">Budget: ${task.budgetMin} - ${task.budgetMax}</p>
                          <p className="text-sm text-gray-500">Category: {task.category}</p>
                          <p className="text-sm text-gray-500">Skills: {task.skills}</p>
                        </div>
                      ))}
                      {tasks.length === 0 && (
                        <p className="col-span-2 text-center text-gray-500">No tasks yet.</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <a href="#!" className="font-normal text-lightBlue-500">Show more</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
