/* eslint-disable */
import React, { Component, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ClientHome from "./views/ClientHome";
import AllProjects from "./views/AllProjects";
import { FaSearch, FaPaperPlane } from "react-icons/fa";
import { initSocket, getSocket } from "./socket";

/* ---------------- Helpers (partagés) ---------------- */
const getId = (v) =>
  typeof v === "object" && v !== null ? (v._id || v.id) : v;

const nameFromUser = (u) => {
  if (!u || typeof u !== "object") return null;
  const nom = u?.info?.nom || u?.nom || "";
  const prenom = u?.info?.prenom || u?.prenom || "";
  const full = `${prenom} ${nom}`.trim();
  if (full) return full;
  if (u.username) return u.username;
  if (u.email) return u.email.split("@")[0];
  return null;
};

const photoFromUser = (u) => (u?.info?.photo || u?.user_image || null);

const AVATAR =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'>
       <rect width='40' height='40' fill='#eee'/>
       <text x='50%' y='54%' dominant-baseline='middle' text-anchor='middle' font-size='18' fill='#888'>U</text>
     </svg>`
  );

/* ===================== MessagesCenter (réutilisable) ===================== */
function MessagesCenter({ currentUserId }) {
  const [received, setReceived] = useState([]);
  const [sent, setSent] = useState([]);
  const [loading, setLoading] = useState(true);

  const [view, setView] = useState("all");           // all | in | out | unread
  const [mode, setMode] = useState("conversations"); // conversations | stream
  const [selectedPeer, setSelectedPeer] = useState(null); // { id, name, photo }
  const [thread, setThread] = useState([]);
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [userCache, setUserCache] = useState({});
  const endRef = useRef(null);
  const scrollToBottom = () =>
    endRef.current?.scrollIntoView({ behavior: "smooth" });

  const fetchLists = async () => {
    if (!currentUserId) return;
    try {
      setLoading(true);
      const [r, s] = await Promise.all([
        axios.get(`http://localhost:5001/messages/received/${currentUserId}`, {
          validateStatus: (x) => (x >= 200 && x < 300) || x === 404,
        }),
        axios.get(`http://localhost:5001/messages/sent/${currentUserId}`, {
          validateStatus: (x) => (x >= 200 && x < 300) || x === 404,
        }),
      ]);
      setReceived(Array.isArray(r.data) ? r.data : []);
      setSent(Array.isArray(s.data) ? s.data : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLists(); }, [currentUserId]);

  const unreadCount = useMemo(
    () => received.filter((m) => m.read === false || m.isRead === false).length,
    [received]
  );

  const extractLabel = (m, dir /* in | out */) => {
    const u = dir === "in" ? m.senderId : m.receiverId;
    const id = getId(u);
    let name = dir === "in" ? m.senderName : m.receiverName;
    let photo = dir === "in" ? m.senderPhoto : m.receiverPhoto;
    if (!name) name = nameFromUser(u);
    if (!photo) photo = photoFromUser(u);
    if (!name && userCache[id]?.name) name = userCache[id].name;
    if (!photo && userCache[id]?.photo) photo = userCache[id].photo;
    return { id, name, photo };
  };

  const fetchUserLabel = async (id) => {
    if (!id || userCache[id]) return;
    try {
      const f = await axios.get(
        `http://localhost:5001/freelancer/byUser/${id}`,
        { validateStatus: (s) => (s >= 200 && s < 300) || s === 404 }
      );
      if (f.status !== 404 && f.data) {
        const name =
          `${f.data?.info?.prenom || ""} ${f.data?.info?.nom || ""}`.trim() ||
          f.data?.userId?.username ||
          f.data?.userId?.email?.split("@")[0] ||
          "Utilisateur";
        const photo = f.data?.info?.photo || f.data?.userId?.user_image || null;
        setUserCache((p) => ({ ...p, [id]: { name, photo } }));
        return;
      }
      const u = await axios.get(`http://localhost:5001/users/${id}`, {
        validateStatus: (s) => (s >= 200 && s < 300) || s === 404,
      });
      if (u.status !== 404 && u.data) {
        const name =
          `${u.data?.prenom || ""} ${u.data?.nom || ""}`.trim() ||
          u.data?.username ||
          u.data?.email?.split("@")[0] ||
          "Utilisateur";
        const photo = u.data?.user_image || null;
        setUserCache((p) => ({ ...p, [id]: { name, photo } }));
        return;
      }
      setUserCache((p) => ({ ...p, [id]: { name: "Utilisateur", photo: null } }));
    } catch {
      setUserCache((p) => ({ ...p, [id]: { name: "Utilisateur", photo: null } }));
    }
  };

  /* ----- Conversations list ----- */
  const peers = useMemo(() => {
    const include = (dir, m) => {
      if (view === "all") return true;
      if (view === "in") return dir === "in";
      if (view === "out") return dir === "out";
      if (view === "unread") return dir === "in" && (m.read === false || m.isRead === false);
      return true;
    };
    const map = new Map();
    const push = (m, dir) => {
      if (!include(dir, m)) return;
      const { id, name, photo } = extractLabel(m, dir);
      if (!id) return;
      const prev = map.get(id) || { id, name: name || null, photo: photo || null, last: null, count: 0 };
      if (!prev.last || new Date(m.createdAt) > new Date(prev.last.createdAt)) prev.last = m;
      if (dir === "in" && (m.read === false || m.isRead === false)) prev.count += 1;
      if (!prev.name && name) prev.name = name;
      if (!prev.photo && photo) prev.photo = photo;
      map.set(id, prev);
    };
    for (const m of received) push(m, "in");
    for (const m of sent) push(m, "out");

    let list = Array.from(map.values()).sort(
      (a, b) => new Date(b.last?.createdAt || 0) - new Date(a.last?.createdAt || 0)
    );
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => (p.name || "Utilisateur").toLowerCase().includes(q));
    }
    return list;
  }, [received, sent, view, query, userCache]);

  useEffect(() => {
    const missing = peers.filter((p) => !p.name || p.name === "Utilisateur").map((p) => p.id);
    missing.forEach((id) => fetchUserLabel(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peers.length]);

  const stream = useMemo(() => {
    let all = [
      ...received.map((m) => ({ ...m, __dir: "in" })),
      ...sent.map((m) => ({ ...m, __dir: "out" })),
    ];
    all = all.filter((m) => {
      if (view === "all") return true;
      if (view === "in") return m.__dir === "in";
      if (view === "out") return m.__dir === "out";
      if (view === "unread") return m.__dir === "in" && (m.read === false || m.isRead === false);
      return true;
    });
    if (query.trim()) {
      const q = query.toLowerCase();
      all = all.filter((m) => (m.message || "").toLowerCase().includes(q));
    }
    all.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return all;
  }, [received, sent, view, query]);

  const loadThread = async (peerId) => {
    if (!peerId) return;
    try {
      const res = await axios.get(`http://localhost:5001/message/${currentUserId}/${peerId}`);
      setThread(res.data || []);
      scrollToBottom();
    } catch {
      setThread([]);
    }
  };
  useEffect(() => {
    if (mode !== "conversations" || !selectedPeer) return;
    loadThread(selectedPeer.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPeer?.id, mode]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;
    const onReceive = (msg) => {
      const sId = getId(msg.senderId);
      const rId = getId(msg.receiverId);
      const active =
        mode === "conversations" &&
        selectedPeer &&
        ((sId === selectedPeer.id && rId === currentUserId) ||
          (sId === currentUserId && rId === selectedPeer.id));
      if (active) {
        setThread((prev) => [...prev, msg]);
        setTimeout(scrollToBottom, 0);
      }
      fetchLists();
      const otherId = sId === currentUserId ? rId : sId;
      if (otherId && !userCache[otherId]) fetchUserLabel(otherId);
    };
    socket.on("receiveMessage", onReceive);
    return () => socket.off("receiveMessage", onReceive);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserId, selectedPeer, mode, userCache]);

  useEffect(scrollToBottom, [thread]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    if (mode !== "conversations" || !selectedPeer) return;
    const socket = getSocket();
    const payload = { senderId: currentUserId, receiverId: selectedPeer.id, message: text };
    socket.emit("sendMessage", payload);
    setThread((p) => [...p, { ...payload, createdAt: new Date().toISOString() }]); // optimistic
    setDraft("");
    setTimeout(scrollToBottom, 0);
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
      <div className="row g-0" style={{ minHeight: 560, maxHeight: "72vh" }}>
        {/* LEFT */}
        <div className="col-12 col-md-4 border-end">
          <div className="p-3 bg-light">
            {/* filtres */}
            <div className="btn-group w-100 mb-2" role="group">
              <button className={`btn btn-sm ${view === "all" ? "btn-orange" : "btn-outline-secondary"}`} onClick={() => setView("all")}>Tous</button>
              <button className={`btn btn-sm ${view === "in" ? "btn-orange" : "btn-outline-secondary"}`} onClick={() => setView("in")}>
                Reçus <span className="badge bg-secondary ms-1">{received.length}</span>
              </button>
              <button className={`btn btn-sm ${view === "out" ? "btn-orange" : "btn-outline-secondary"}`} onClick={() => setView("out")}>
                Envoyés <span className="badge bg-secondary ms-1">{sent.length}</span>
              </button>
              <button className={`btn btn-sm ${view === "unread" ? "btn-orange" : "btn-outline-secondary"}`} onClick={() => setView("unread")}>
                Non lus <span className="badge bg-danger ms-1">{unreadCount}</span>
              </button>
            </div>
            {/* bascule de vue */}
            <div className="btn-group w-100 mb-2" role="group">
              <button className={`btn btn-sm ${mode === "conversations" ? "btn-orange" : "btn-outline-secondary"}`} onClick={() => setMode("conversations")}>Conversations</button>
              <button className={`btn btn-sm ${mode === "stream" ? "btn-orange" : "btn-outline-secondary"}`} onClick={() => { setMode("stream"); setSelectedPeer(null); }}>
                Tous les messages
              </button>
            </div>
            {/* recherche */}
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0"><FaSearch /></span>
              <input className="form-control border-start-0" placeholder="Rechercher…" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
          </div>

          {/* liste gauche avec scrollbar grise */}
          <div className="custom-scroll" style={{ overflowY: "auto", maxHeight: "calc(72vh - 140px)" }}>
            {loading && <p className="text-center text-muted py-3">Chargement…</p>}

            {mode === "conversations" && !loading && (
              peers.length === 0 ? (
                <p className="text-center text-muted py-4">Aucune conversation</p>
              ) : peers.map((p) => {
                const last = p.last?.message || "";
                const time = p.last?.createdAt ? new Date(p.last.createdAt).toLocaleString() : "";
                const name = p.name || userCache[p.id]?.name || "Utilisateur";
                const photo = p.photo || userCache[p.id]?.photo || null;
                const active = selectedPeer?.id === p.id;
                return (
                  <button
                    key={p.id}
                    className={`w-100 text-start p-3 border-0 ${active ? "bg-warning-subtle" : "bg-white"} convo-item`}
                    onClick={() => setSelectedPeer({ id: p.id, name, photo })}
                    style={{ borderBottom: "1px solid #f1f1f1" }}
                  >
                    <div className="d-flex align-items-start">
                      <img
                        src={photo ? (photo.startsWith("http") ? photo : `http://localhost:5001${photo}`) : AVATAR}
                        alt={name}
                        className="rounded-circle me-3"
                        style={{ width: 40, height: 40, objectFit: "cover" }}
                      />
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-center">
                          <strong className="text-dark">{name}</strong>
                          <small className="text-muted">{time}</small>
                        </div>
                        <div className="text-muted small text-truncate">{last}</div>
                      </div>
                      {p.count > 0 && <span className="badge bg-danger ms-2 align-self-center">{p.count}</span>}
                    </div>
                  </button>
                );
              })
            )}

            {mode === "stream" && !loading && (
              stream.length === 0 ? (
                <p className="text-center text-muted py-4">Aucun message</p>
              ) : stream.map((m) => {
                const dir = m.__dir;
                const other = dir === "in" ? m.senderId : m.receiverId;
                const otherId = getId(other);
                const name = nameFromUser(other) || userCache[otherId]?.name || (dir === "in" ? m.senderName : m.receiverName) || "Utilisateur";
                const photo = photoFromUser(other) || userCache[otherId]?.photo || (dir === "in" ? m.senderPhoto : m.receiverPhoto) || null;
                return (
                  <div key={m._id} className="p-3 border-bottom">
                    <div className="d-flex align-items-start">
                      <img
                        src={photo ? (photo.startsWith("http") ? photo : `http://localhost:5001${photo}`) : AVATAR}
                        alt={name}
                        className="rounded-circle me-2"
                        style={{ width: 36, height: 36, objectFit: "cover" }}
                      />
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between">
                          <strong>{name}</strong>
                          <small className="text-muted">{new Date(m.createdAt).toLocaleString()}</small>
                        </div>
                        <div className="small text-muted mb-1">{dir === "in" ? "Reçu" : "Envoyé"}</div>
                        <div>{m.message}</div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-12 col-md-8 d-flex flex-column">
          <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
            <div className="d-flex align-items-center">
              {mode === "conversations" && selectedPeer?.photo && (
                <img
                  src={selectedPeer.photo.startsWith("http") ? selectedPeer.photo : `http://localhost:5001${selectedPeer.photo}`}
                  alt={selectedPeer.name}
                  className="rounded-circle me-2"
                  style={{ width: 36, height: 36, objectFit: "cover" }}
                />
              )}
              <h5 className="mb-0">
                {mode === "conversations" ? (selectedPeer?.name || "Sélectionnez une conversation") : "Tous les messages"}
              </h5>
            </div>
          </div>

          <div className="flex-grow-1 p-3 custom-scroll" style={{ overflowY: "auto" }}>
            {mode === "conversations" && !selectedPeer && (
              <div className="h-100 d-flex align-items-center justify-content-center text-muted">
                Choisissez une conversation à gauche
              </div>
            )}

            {mode === "conversations" && selectedPeer && thread.map((m, i) => {
              const mine = getId(m.senderId) === currentUserId;
              return (
                <div key={m._id || i} className={`d-flex ${mine ? "justify-content-end" : "justify-content-start"} mb-2`}>
                  <div
                    className="px-3 py-2 rounded-3"
                    style={{ maxWidth: "75%", background: mine ? "#f59e0b" : "#e5e7eb", color: mine ? "white" : "black" }}
                  >
                    <div className="small">{m.message}</div>
                    <div className="text-white-50 text-muted small mt-1" style={{ opacity: 0.8 }}>
                      {new Date(m.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            })}

            {mode === "stream" && stream.map((m) => {
              const mine = getId(m.senderId) === currentUserId;
              return (
                <div key={`s-${m._id}`} className={`d-flex ${mine ? "justify-content-end" : "justify-content-start"} mb-2`}>
                  <div
                    className="px-3 py-2 rounded-3"
                    style={{ maxWidth: "75%", background: mine ? "#f59e0b" : "#e5e7eb", color: mine ? "white" : "black" }}
                  >
                    <div className="small">{m.message}</div>
                    <div className="text-white-50 text-muted small mt-1" style={{ opacity: 0.8 }}>
                      {new Date(m.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={endRef} />
          </div>

          <div className="p-3 border-top">
            <div className="input-group">
              <input
                className="form-control"
                placeholder={
                  mode === "conversations"
                    ? (selectedPeer ? "Écrire un message…" : "Sélectionnez une conversation pour écrire…")
                    : "Basculer sur 'Conversations' pour écrire"
                }
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && draft.trim() && send()}
                disabled={mode !== "conversations" || !selectedPeer}
              />
              <button className="btn btn-orange" onClick={send} disabled={mode !== "conversations" || !selectedPeer || !draft.trim()}>
                <FaPaperPlane className="me-1" /> Envoyer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* styles: “la3sa” grise + hover + bg subtle */}
      <style>{`
        .bg-warning-subtle { background-color: rgba(245, 158, 11, .08); }
        .convo-item:hover { background-color: #fff7ed; }
        .custom-scroll::-webkit-scrollbar { width: 10px; }
        .custom-scroll::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 8px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #c9c9c9; border-radius: 8px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #b3b3b3; }
      `}</style>
    </div>
  );
}

/* ============================ PAGE (class) ============================ */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSection: "profile",
      user: null,
      loading: true,
      error: null,
      showEditModal: false,
      editForm: { username: "", email: "", phone: "", address: "", bio: "" },
    };
  }

  componentDidMount() {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      this.setState({ error: "Aucun utilisateur connecté", loading: false });
      return;
    }

    // init socket pour la page
    try { initSocket(userId); } catch {}

    axios
      .get(`http://localhost:5001/users/getUserById/${userId}`)
      .then((res) => {
        this.setState({
          user: res.data.user,
          loading: false,
          editForm: {
            username: res.data.user.username || "",
            email: res.data.user.email || "",
            phone: res.data.user.phone || "",
            address: res.data.user.address || "",
            bio: res.data.user.bio || "",
          },
        });
      })
      .catch((err) => {
        this.setState({ error: err.message, loading: false });
      });
  }

  componentWillUnmount() {
    try { getSocket()?.disconnect(); } catch {}
  }

  showSection = (sectionName) => this.setState({ activeSection: sectionName });

  handleEditChange = (e) =>
    this.setState({ editForm: { ...this.state.editForm, [e.target.name]: e.target.value } });

  handleUpdateUser = () => {
    const userId = localStorage.getItem("userId");
    axios
      .put(`http://localhost:5001/users/updateuserById/${userId}`, this.state.editForm)
      .then((res) => {
        this.setState({ user: res.data.updated, showEditModal: false });
        setTimeout(() => window.location.reload(), 500);
      })
      .catch((err) => alert("Erreur lors de la mise à jour : " + err.message));
  };

  render() {
    const { activeSection, user, loading, error, showEditModal, editForm } = this.state;
    const currentUserId = localStorage.getItem("userId");

    return (
      <div>
        {/* Sidebar */}
        <div className="sidebar" id="sidebar">
          <div className="sidebar-header">
            <div className="sidebar-brand">
              <div className="brand-icon"><i className="fas fa-user"></i></div>
              <div>
                <h5 className="mb-0 fw-bold text-dark">MyProfile</h5>
                <small className="text-muted">Dashboard</small>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-light w-100 mt-3"
              onClick={() => (window.location.href = "http://localhost:3000/")}
            >
              <i className="fas fa-home me-2"></i> Home
            </button>
          </div>

          <nav className="sidebar-nav">
            {[
              { id: "profile", icon: "fas fa-user", label: "Profile" },
              { id: "stats", icon: "fas fa-chart-bar", label: "Add Project" },
              { id: "messages", icon: "fas fa-comments", label: "Messages" },
              { id: "settings", icon: "fas fa-cog", label: "All Project" },
            ].map((item) => (
              <div className="nav-item" key={item.id}>
                <button
                  className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                  onClick={() => this.showSection(item.id)}
                >
                  <i className={item.icon}></i>
                  <span>{item.label}</span>
                </button>
              </div>
            ))}
          </nav>

          <button className="nav-link logout-btn">
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Profile */}
          {activeSection === "profile" && (
            <div id="profile-section" className="content-section">
              {loading && <p>Chargement...</p>}
              {error && <p className="text-danger">{error}</p>}
              {user && (
                <>
                  <div className="d-flex justify-content-between align-items-start mb-4">
                    <div>
                      <h1 className="display-6 fw-bold text-dark mb-1">My Profile</h1>
                      <p className="text-muted">Manage your personal information</p>
                    </div>
                    <button
                      className="btn btn-orange"
                      onClick={() => this.setState({ showEditModal: true })}
                    >
                      <i className="fas fa-edit me-2"></i> Edit
                    </button>
                  </div>

                  <div className="card mb-4 overflow-hidden">
                    <div className="profile-header"></div>
                    <div className="card-body px-4 pb-4">
                      <div className="row align-items-start">
                        <div className="col mt-4">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <h2 className="h3 fw-bold text-dark mb-1">{user.username}</h2>
                              <p className="text-warning fw-medium mb-2">{user.role}</p>
                              <div className="d-flex gap-3 text-muted small">
                                <div className="d-flex align-items-center gap-1">
                                  <i className="fas fa-envelope"></i>
                                  <span>{user.email}</span>
                                </div>
                                <div className="d-flex align-items-center gap-1">
                                  <i className="fas fa-calendar"></i>
                                  <span>Membre depuis {new Date(user.createdAt).getFullYear()}</span>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex gap-2">
                              <span className="badge-online">Online</span>
                              {user.role === "client" && (
                                <span className="badge-pro">
                                  <i className="fas fa-crown me-1"></i> Client
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6 mb-4">
                      <div className="card h-100">
                        <div className="card-body">
                          <h5 className="card-title fw-semibold mb-4">Contact Information</h5>
                          <div className="contact-item">
                            <div className="contact-icon"><i className="fas fa-envelope"></i></div>
                            <div>
                              <small className="text-muted d-block">Email</small>
                              <span className="fw-medium">{user.email}</span>
                            </div>
                          </div>
                          <div className="contact-item">
                            <div className="contact-icon"><i className="fas fa-phone"></i></div>
                            <div>
                              <small className="text-muted d-block">Phone</small>
                              <span className="fw-medium">{user.phone || "Non renseigné"}</span>
                            </div>
                          </div>
                          <div className="contact-item">
                            <div className="contact-icon"><i className="fas fa-map-marker-alt"></i></div>
                            <div>
                              <small className="text-muted d-block">Address</small>
                              <span className="fw-medium">{user.address}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6 mb-4">
                      <div className="card h-100">
                        <div className="card-body">
                          <h5 className="card-title fw-semibold mb-4">About</h5>
                          <p className="text-muted mb-4">{user.bio || "Aucune description fournie"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Add Project */}
          {activeSection === "stats" && (
            <div id="stats-section" className="content-section">
              <ClientHome />
            </div>
          )}

          {/* Messages (👉 la section réglée) */}
          {activeSection === "messages" && (
            <div id="messages-section" className="content-section">
              <h1 className="display-6 fw-bold text-dark mb-4">Messages</h1>
              <MessagesCenter currentUserId={currentUserId} />
            </div>
          )}

          {/* All Projects */}
          {activeSection === "settings" && (
            <div id="settings-section" className="content-section">
              <AllProjects clientId={currentUserId} />
            </div>
          )}
        </div>

        {/* Modal Edit */}
        {showEditModal && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modifier Profil</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => this.setState({ showEditModal: false })}
                  ></button>
                </div>
                <div className="modal-body">
                  <input className="form-control mb-2" name="username" value={editForm.username} onChange={this.handleEditChange} placeholder="Nom d'utilisateur" />
                  <input className="form-control mb-2" name="email" value={editForm.email} onChange={this.handleEditChange} placeholder="Email" />
                  <input className="form-control mb-2" name="phone" value={editForm.phone} onChange={this.handleEditChange} placeholder="Téléphone" />
                  <input className="form-control mb-2" name="address" value={editForm.address} onChange={this.handleEditChange} placeholder="Adresse" />
                  <textarea className="form-control mb-2" name="bio" value={editForm.bio} onChange={this.handleEditChange} placeholder="Bio" />
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => this.setState({ showEditModal: false })}>Annuler</button>
                  <button className="btn btn-orange" onClick={this.handleUpdateUser}>Enregistrer</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
