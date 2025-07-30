import React, { useState } from "react";

export default function Dashboard() {
  const [showAdd, setShowAdd] = useState(false);
  const [showList, setShowList] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    budgetMin: "",
    budgetMax: "",
    category: "",
    skills: ""
  });
  const [tasks, setTasks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks([...tasks, form]);
    setForm({
      title: "",
      description: "",
      budgetMin: "",
      budgetMax: "",
      category: "",
      skills: ""
    });
    setShowAdd(false);
    setShowList(true);
  };

  return (
    <>
      <main>
        {/* 🟦 Zone bleue */}
        <section className="relative py-32 bg-[#0288D1] min-h-[250px]">
          <h1 className="text-white text-3xl font-bold text-center">DASHBOARD</h1>
        </section>

        {/* 🟩 Carte blanche avec superposition */}
        <section className="relative py-16 bg-gray-100 min-h-screen -mt-24 z-10">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full max-w-5xl mx-auto px-8 py-10 shadow-2xl rounded-3xl">
              
              {/* ✅ Boutons stylisés */}
              <div className="flex justify-center items-center gap-6 mb-10">
                <button
                  onClick={() => {
                    setShowAdd(true);
                    setShowList(false);
                  }}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full shadow-md transition duration-200"
                >
                  <span className="text-xl">➕</span>
                  <span className="font-semibold">Add Task</span>
                </button>
                <button
                  onClick={() => {
                    setShowList(true);
                    setShowAdd(false);
                  }}
                  className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-full shadow transition duration-200"
                >
                  <span className="text-xl">📋</span>
                  <span className="font-semibold">View Tasks</span>
                </button>
              </div>

              {/* ➕ Formulaire ajout */}
              {showAdd && (
                <div className="w-full bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Task</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Task Title"
                      className="w-full p-3 border rounded"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      required
                    />
                    <textarea
                      placeholder="Description"
                      className="w-full p-3 border rounded"
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      required
                    ></textarea>
                    <div className="flex space-x-3">
                      <input
                        type="number"
                        placeholder="Min Budget"
                        className="w-1/2 p-3 border rounded"
                        value={form.budgetMin}
                        onChange={(e) => setForm({ ...form, budgetMin: e.target.value })}
                        required
                      />
                      <input
                        type="number"
                        placeholder="Max Budget"
                        className="w-1/2 p-3 border rounded"
                        value={form.budgetMax}
                        onChange={(e) => setForm({ ...form, budgetMax: e.target.value })}
                        required
                      />
                    </div>
                    <select
                      className="w-full p-3 border rounded"
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="web">Web Development</option>
                      <option value="design">Design</option>
                      <option value="writing">Writing</option>
                      <option value="marketing">Marketing</option>
                      <option value="other">Other</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Required Skills"
                      className="w-full p-3 border rounded"
                      value={form.skills}
                      onChange={(e) => setForm({ ...form, skills: e.target.value })}
                    />
                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full font-semibold"
                    >
                      Create Task
                    </button>
                  </form>
                </div>
              )}

              {/* 📋 Liste des tâches */}
              {showList && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {tasks.map((task, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{task.title}</h3>
                      <p className="text-gray-600 mb-2">{task.description}</p>
                      <p className="text-sm text-gray-500">
                        Budget: ${task.budgetMin} - ${task.budgetMax}
                      </p>
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
          </div>
        </section>
      </main>
    </>
  );
}
