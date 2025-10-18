/* eslint-disable */
import React, { useEffect, useRef, useState, useMemo } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import FreelancerHome from "views/FreelancerHome";
import { useHistory } from "react-router-dom";
import { FaSearch, FaPaperPlane } from "react-icons/fa";
import { initSocket, getSocket } from "./socket";

/* ---------------- Helpers ---------------- */
const getId = (maybeObj) =>
  typeof maybeObj === "object" && maybeObj !== null ? (maybeObj._id || maybeObj.id) : maybeObj;

const buildNameFromUserObj = (u) => {
  if (!u || typeof u !== "object") return null;
  const nom = u.info?.nom || u.nom || "";
  const prenom = u.info?.prenom || u.prenom || "";
  const full = `${prenom} ${nom}`.trim();
  if (full) return full;
  if (u.username) return u.username;
  if (u.email) return u.email.split("@")[0];
  return null;
};

const buildPhotoFromUserObj = (u) => {
  if (!u || typeof u !== "object") return null;
  return u.info?.photo || u.user_image || null;
};

// safe placeholder (data URI)
const AVATAR_PLACEHOLDER =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'>
       <rect width='40' height='40' fill='#eee'/>
       <text x='50%' y='54%' dominant-baseline='middle' text-anchor='middle' font-size='18' fill='#888'>U</text>
     </svg>`
  );

/* ================ MessagesCenter (Messenger-like + filtres + bascule vue) ================ */
function MessagesCenter({ currentUserId }) {
  const [received, setReceived] = useState([]);
  const [sent, setSent] = useState([]);
  const [loading, setLoading] = useState(true);

  const [view, setView] = useState("all"); // 'all' | 'in' | 'out' | 'unread'
  const [mode, setMode] = useState("conversations"); // 'conversations' | 'stream'
  const [selectedPeer, setSelectedPeer] = useState(null); // { id, name, photo? }
  const [thread, setThread] = useState([]);
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const endRef = useRef(null);
  const [userCache, setUserCache] = useState({}); // { [userId]: {name, photo} }

  const scrollToBottom = () => endRef.current?.scrollIntoView({ behavior: "smooth" });

  const fetchLists = async () => {
    if (!currentUserId) return;
    try {
      setLoading(true);
      const inboxReq = axios.get(`http://localhost:5001/messages/received/${currentUserId}`, {
        validateStatus: (s) => (s >= 200 && s < 300) || s === 404,
      });
      const sentReq = axios.get(`http://localhost:5001/messages/sent/${currentUserId}`, {
        validateStatus: (s) => (s >= 200 && s < 300) || s === 404,
      });
      const [r, s] = await Promise.all([inboxReq, sentReq]);
      setReceived(Array.isArray(r.data) ? r.data : []);
      setSent(Array.isArray(s.data) ? s.data : []);
    } catch (e) {
      console.error("❌ load inbox/sent:", e);
      setReceived([]);
      setSent([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLists(); }, [currentUserId]);

  const extractLabelFromMsg = (m, dir /* 'in' or 'out' */) => {
    const userObj = dir === "in" ? m.senderId : m.receiverId;
    const id = getId(userObj);
    let name = dir === "in" ? m.senderName : m.receiverName;
    let photo = dir === "in" ? m.senderPhoto : m.receiverPhoto;

    if (!name) name = buildNameFromUserObj(userObj);
    if (!photo) photo = buildPhotoFromUserObj(userObj);

    if (!name && id && userCache[id]?.name) name = userCache[id].name;
    if (!photo && id && userCache[id]?.photo) photo = userCache[id].photo;

    return { id, name, photo };
  };

  const fetchUserLabel = async (id) => {
    if (!id || userCache[id]) return;
    try {
      const f = await axios.get(`http://localhost:5001/freelancer/byUser/${id}`, {
        validateStatus: (s) => (s >= 200 && s < 300) || s === 404,
      });
      if (f.status !== 404 && f.data) {
        const name =
          `${f.data?.info?.prenom || ""} ${f.data?.info?.nom || ""}`.trim() ||
          f.data?.userId?.username ||
          f.data?.userId?.email?.split("@")[0] ||
          "Utilisateur";
        const photo = f.data?.info?.photo || f.data?.userId?.user_image || null;
        setUserCache((prev) => ({ ...prev, [id]: { name, photo } }));
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
        setUserCache((prev) => ({ ...prev, [id]: { name, photo } }));
        return;
      }
      setUserCache((prev) => ({ ...prev, [id]: { name: "Utilisateur", photo: null } }));
    } catch {
      setUserCache((prev) => ({ ...prev, [id]: { name: "Utilisateur", photo: null } }));
    }
  };

  const unreadCount = useMemo(
    () => received.filter((m) => m.read === false || m.isRead === false).length,
    [received]
  );

  /* ---------- Conversations list (peers) + filter ---------- */
  const peers = useMemo(() => {
    const map = new Map();

    const includeByView = (dir, msg) => {
      if (view === "all") return true;
      if (view === "in") return dir === "in";
      if (view === "out") return dir === "out";
      if (view === "unread") return dir === "in" && (msg.read === false || msg.isRead === false);
      return true;
    };

    const push = (m, dir) => {
      if (!includeByView(dir, m)) return;
      const label = extractLabelFromMsg(m, dir);
      const counterpartId = label.id;
      if (!counterpartId) return;
      const prev = map.get(counterpartId) || {
        id: counterpartId,
        name: label.name || null,
        photo: label.photo || null,
        last: null,
        count: 0,
      };
      if (!prev.last || new Date(m.createdAt) > new Date(prev.last.createdAt)) prev.last = m;
      if (dir === "in" && (m.read === false || m.isRead === false)) prev.count += 1;
      if (!prev.name && label.name) prev.name = label.name;
      if (!prev.photo && label.photo) prev.photo = label.photo;
      map.set(counterpartId, prev);
    };

    for (const m of received) push(m, "in");
    for (const m of sent) push(m, "out");

    let list = Array.from(map.values()).sort((a, b) => {
      const da = a.last ? new Date(a.last.createdAt).getTime() : 0;
      const db = b.last ? new Date(b.last.createdAt).getTime() : 0;
      return db - da;
    });

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          (p.name || "Utilisateur").toLowerCase().includes(q) ||
          (p.id || "").toString().toLowerCase().includes(q)
      );
    }
    return list;
  }, [received, sent, query, userCache, view]);

  /* ---------- Flat stream (all messages) + filter ---------- */
  const stream = useMemo(() => {
    let all = [
      ...received.map((m) => ({ ...m, __dir: "in" })),
      ...sent.map((m) => ({ ...m, __dir: "out" })),
    ];

    if (view !== "all") {
      all = all.filter((m) => {
        if (view === "in") return m.__dir === "in";
        if (view === "out") return m.__dir === "out";
        if (view === "unread") return m.__dir === "in" && (m.read === false || m.isRead === false);
        return true;
      });
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      all = all.filter((m) => (m.message || "").toLowerCase().includes(q));
    }

    all.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return all;
  }, [received, sent, view, query]);

  useEffect(() => {
    const missing = peers.filter((p) => !p.name || p.name === "Utilisateur").map((p) => p.id);
    missing.forEach((id) => fetchUserLabel(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peers.length]);

  const loadThread = async (peerId) => {
    if (!peerId) return;
    try {
      const res = await axios.get(`http://localhost:5001/message/${currentUserId}/${peerId}`);
      setThread(res.data || []);
      scrollToBottom();
    } catch (e) {
      console.error("❌ load thread:", e);
      setThread([]);
    }
  };

  useEffect(() => {
    if (!selectedPeer || mode !== "conversations") return;
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
      const counterpartId = sId === currentUserId ? rId : sId;
      if (counterpartId && !userCache[counterpartId]) fetchUserLabel(counterpartId);
    };
    socket.on("receiveMessage", onReceive);
    return () => socket.off("receiveMessage", onReceive);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserId, selectedPeer, userCache, mode]);

  useEffect(scrollToBottom, [thread]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    if (mode === "conversations" && !selectedPeer) return;
    const socket = getSocket();

    if (mode === "conversations") {
      const payload = {
        senderId: currentUserId,
        receiverId: selectedPeer.id,
        message: text,
      };
      socket.emit("sendMessage", payload);
      setThread((prev) => [...prev, { ...payload, createdAt: new Date().toISOString() }]);
    } else {
      alert("Choisissez une conversation (mode Conversations) pour envoyer un message.");
    }

    setDraft("");
    setTimeout(scrollToBottom, 0);
  };

  /* ================= UI ================= */
  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
      <div className="row g-0" style={{ minHeight: 560, maxHeight: "72vh" }}>
        {/* LEFT: filtres + recherche + liste */}
        <div className="col-12 col-md-4 border-end">
          <div className="p-3 bg-light">
            {/* Ligne 1: filtres */}
            <div className="btn-group w-100 mb-2" role="group" aria-label="Filtrer les conversations">
              <button type="button" className={`btn btn-sm ${view === "all" ? "btn-orange" : "btn-outline-secondary"}`} onClick={() => setView("all")}>
                Tous
              </button>
              <button type="button" className={`btn btn-sm ${view === "in" ? "btn-orange" : "btn-outline-secondary"}`} onClick={() => setView("in")}>
                Reçus <span className="badge bg-secondary ms-1">{received.length}</span>
              </button>
              <button type="button" className={`btn btn-sm ${view === "out" ? "btn-orange" : "btn-outline-secondary"}`} onClick={() => setView("out")}>
                Envoyés <span className="badge bg-secondary ms-1">{sent.length}</span>
              </button>
              <button type="button" className={`btn btn-sm ${view === "unread" ? "btn-orange" : "btn-outline-secondary"}`} onClick={() => setView("unread")}>
                Non lus <span className="badge bg-danger ms-1">{unreadCount}</span>
              </button>
            </div>

            {/* Ligne 2: bascule vue */}
            <div className="btn-group w-100 mb-2" role="group" aria-label="Mode d'affichage">
              <button type="button" className={`btn btn-sm ${mode === "conversations" ? "btn-orange" : "btn-outline-secondary"}`} onClick={() => setMode("conversations")}>
                Conversations
              </button>
              <button
                type="button"
                className={`btn btn-sm ${mode === "stream" ? "btn-orange" : "btn-outline-secondary"}`}
                onClick={() => { setMode("stream"); setSelectedPeer(null); }}
              >
                Tous les messages
              </button>
            </div>

            {/* Recherche */}
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0"><FaSearch /></span>
              <input
                className="form-control border-start-0"
                placeholder="Rechercher…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Liste gauche — أضفت nice-scroll + stable gutter */}
          <div
            className="nice-scroll"
            style={{ overflowY: "auto", maxHeight: "calc(72vh - 140px)", scrollbarGutter: "stable" }}
          >
            {loading && <p className="text-center text-muted py-3">Chargement…</p>}

            {!loading && mode === "conversations" && (
              <>
                {peers.length === 0 && <p className="text-center text-muted py-4">Aucune conversation</p>}
                {peers.map((p) => {
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
                          src={photo ? (photo.startsWith("http") ? photo : `http://localhost:5001${photo}`) : AVATAR_PLACEHOLDER}
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
                })}
              </>
            )}

            {!loading && mode === "stream" && (
              <>
                {stream.length === 0 && <p className="text-center text-muted py-4">Aucun message</p>}
                {stream.map((m) => {
                  const dir = m.__dir; // 'in' or 'out'
                  const other = dir === "in" ? m.senderId : m.receiverId;
                  const otherId = getId(other);
                  const name =
                    buildNameFromUserObj(other) || userCache[otherId]?.name || (dir === "in" ? m.senderName : m.receiverName) || "Utilisateur";
                  const photo =
                    buildPhotoFromUserObj(other) || userCache[otherId]?.photo || (dir === "in" ? m.senderPhoto : m.receiverPhoto) || null;

                  return (
                    <div key={m._id} className="p-3 border-bottom">
                      <div className="d-flex align-items-start">
                        <img
                          src={photo ? (photo.startsWith("http") ? photo : `http://localhost:5001${photo}`) : AVATAR_PLACEHOLDER}
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
                          <div className="">{m.message}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>

        {/* RIGHT: thread/stream — زدت border-left وفعلت nice-scroll */}
        <div className="col-12 col-md-8 d-flex flex-column" style={{ borderLeft: "1px solid #edf1f5" }}>
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

          <div className="flex-grow-1 p-3 nice-scroll" style={{ overflowY: "auto", scrollbarGutter: "stable" }}>
            {mode === "conversations" && !selectedPeer && (
              <div className="h-100 d-flex align-items-center justify-content-center text-muted">
                Choisissez une conversation à gauche
              </div>
            )}

            {mode === "conversations" && selectedPeer && thread.map((m, i) => {
              const sId = getId(m.senderId);
              const mine = sId === currentUserId;
              return (
                <div key={m._id || i} className={`d-flex ${mine ? "justify-content-end" : "justify-content-start"} mb-2`}>
                  <div
                    className="px-3 py-2 rounded-3"
                    style={{
                      maxWidth: "75%",
                      background: mine ? "#f59e0b" : "#e5e7eb",
                      color: mine ? "white" : "black",
                    }}
                  >
                    <div className="small">{m.message}</div>
                    <div className="text-white-50 text-muted small mt-1" style={{ opacity: 0.8 }}>
                      {new Date(m.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            })}

            {mode === "stream" && (
              <>
                {stream.length === 0 && (
                  <div className="h-100 d-flex align-items-center justify-content-center text-muted">
                    Aucun message selon le filtre
                  </div>
                )}
                {stream.map((m) => {
                  const mine = getId(m.senderId) === currentUserId;
                  return (
                    <div key={`r-${m._id}`} className={`d-flex ${mine ? "justify-content-end" : "justify-content-start"} mb-2`}>
                      <div
                        className="px-3 py-2 rounded-3"
                        style={{
                          maxWidth: "75%",
                          background: mine ? "#f59e0b" : "#e5e7eb",
                          color: mine ? "white" : "black",
                        }}
                      >
                        <div className="small">{m.message}</div>
                        <div className="text-white-50 text-muted small mt-1" style={{ opacity: 0.8 }}>
                          {new Date(m.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}

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
              <button
                className="btn btn-orange"
                onClick={send}
                disabled={mode !== "conversations" || !selectedPeer || !draft.trim()}
              >
                <FaPaperPlane className="me-1" /> Envoyer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollbar styling — la3sa grise */}
      <style>{`
        .bg-warning-subtle { background-color: rgba(245, 158, 11, .08); }
        .convo-item:hover { background-color: #fff7ed; }

        .nice-scroll {
          scrollbar-width: thin;                 /* Firefox */
          scrollbar-color: #c7c7c7 transparent; /* Firefox */
        }
        .nice-scroll::-webkit-scrollbar { width: 10px; }
        .nice-scroll::-webkit-scrollbar-track { background: transparent; }
        .nice-scroll::-webkit-scrollbar-thumb {
          background: #cfcfcf;
          border-radius: 8px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }
        .nice-scroll::-webkit-scrollbar-thumb:hover { background: #bdbdbd; }
      `}</style>
    </div>
  );
}

/* ============================ ProfileFr page ============================ */
export default function ProfileFr() {
  const [freelancer, setFreelancer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("profile");

  const [showEditModal, setShowEditModal] = useState(false);

  const [editUser, setEditUser] = useState({
    username: "", email: "", phone: "", address: "", bio: "",
  });

  const [editFree, setEditFree] = useState({
    nom: "", prenom: "", specialite: "",
    competences: "", experiences: "", certifications: "", formations: "", projets: "",
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [cvFile, setCvFile] = useState(null);

  const userId = localStorage.getItem("userId");
  const history = useHistory();
  const goHome = () => history.push("/");


  const fetchFreelancer = async () => {
    if (!userId) { setLoading(false); return; }
    try {
      const res = await axios.get(`http://localhost:5001/freelancer/byUser/${userId}`);
      setFreelancer(res.data);
    } catch (err) {
      console.error("❌ Erreur récupération freelancer :", err);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchFreelancer(); }, [userId]);
  useEffect(() => { if (userId) initSocket(userId); }, [userId]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5001/users/logout", {}, { withCredentials: true }).catch(() => {});
    } finally {
      try { getSocket()?.disconnect(); } catch {}
      localStorage.removeItem("userId"); localStorage.removeItem("username"); localStorage.removeItem("role");
      history.push("/auth/login");
    }
  };

  const openEditModal = () => {
    const u = freelancer?.userId || {};
    const info = freelancer?.info || {};
    setEditUser({
      username: u.username || "", email: info.email || u.email || "",
      phone: u.phone || "", address: u.address || "", bio: info.bio || "",
    });
    setEditFree({
      nom: info.nom || "", prenom: info.prenom || "", specialite: freelancer?.specialite || "",
      competences: Array.isArray(freelancer?.competences) ? freelancer.competences.join(", ") : (freelancer?.competences || ""),
      experiences: Array.isArray(freelancer?.experiences) ? freelancer.experiences.join(", ") : (freelancer?.experiences || ""),
      certifications: Array.isArray(freelancer?.certifications) ? freelancer.certifications.join(", ") : (freelancer?.certifications || ""),
      formations: Array.isArray(freelancer?.formations) ? freelancer.formations.join(", ") : (freelancer?.formations || ""),
      projets: Array.isArray(freelancer?.projets) ? freelancer.projets.join(", ") : (freelancer?.projets || ""),
    });
    setPhotoFile(null); setCvFile(null); setShowEditModal(true);
  };

  const onUserChange = (e) => setEditUser((p) => ({ ...p, [e.target.name]: e.target.value }));
  const onFreeChange = (e) => setEditFree((p) => ({ ...p, [e.target.name]: e.target.value }));
  const onPhoto = (e) => setPhotoFile(e.target.files?.[0] || null);
  const onCv = (e) => setCvFile(e.target.files?.[0] || null);

  const handleSaveAll = async () => {
    if (!userId) return;
    const toArray = (s) => (s || "").split(",").map((t) => t.trim()).filter(Boolean);
    try {
      await axios.put(`http://localhost:5001/users/updateuserById/${userId}`, {
        email: editUser.email, username: editUser.username, phone: editUser.phone, address: editUser.address, bio: editUser.bio
      });

      const data = new FormData();
      data.append("nom", editFree.nom);
      data.append("prenom", editFree.prenom);
      data.append("specialite", editFree.specialite);
      data.append("competences", JSON.stringify(toArray(editFree.competences)));
      data.append("experiences", JSON.stringify(toArray(editFree.experiences)));
      data.append("certifications", JSON.stringify(toArray(editFree.certifications)));
      data.append("formations", JSON.stringify(toArray(editFree.formations)));
      data.append("projets", JSON.stringify(toArray(editFree.projets)));
      data.append("email", editUser.email || "");
      data.append("bio", editUser.bio || "");
      if (photoFile) data.append("photo", photoFile);
      if (cvFile) data.append("cv", cvFile);

      await axios.put(`http://localhost:5001/freelancer/updateByUser/${userId}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setShowEditModal(false);
      await fetchFreelancer();
      alert("✅ Profil mis à jour !");
    } catch (err) {
      console.error("❌ Erreur sauvegarde profil:", err);
      alert(err?.response?.data?.message || "Erreur lors de la sauvegarde.");
    }
  };

  return (
    <div className="d-flex">
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
        </div>
{/* Bouton Home */}
<div className="px-3 mb-3">
  <button
    className="nav-link w-100 d-flex align-items-center"
    onClick={goHome}
    style={{ background: "#fff7ed", borderRadius: 12, padding: "10px 14px" }}
  >
    <i className="fas fa-home" style={{ marginRight: 10 }}></i>
    <span>Home</span>
  </button>
</div>

        <nav className="sidebar-nav">
          {[
            { id: "profile", icon: "fas fa-user", label: "Profile" },
            { id: "stats", icon: "fas fa-plus-circle", label: "Build Your Profile" },
            { id: "messages", icon: "fas fa-comments", label: "Messages" },
          ].map((item) => (
            <div className="nav-item" key={item.id}>
              <button className={`nav-link ${activeSection === item.id ? "active" : ""}`} onClick={() => setActiveSection(item.id)}>
                <i className={item.icon}></i><span>{item.label}</span>
              </button>
            </div>
          ))}
        </nav>

        <button className="nav-link logout-btn" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i><span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content flex-grow-1 p-4">
        {loading && <p className="text-center mt-5">⏳ Chargement...</p>}
        {!loading && !freelancer && <p className="text-center mt-5">⚠ Aucun profil trouvé.</p>}

        {/* Profile */}
        {activeSection === "profile" && freelancer && (
          <div id="profile-section" className="content-section">
            <div className="d-flex justify-content-between align-items-start mb-4">
              <div>
                <h1 className="display-6 fw-bold text-dark mb-1">My Profile</h1>
                <p className="text-muted">Manage your personal information</p>
              </div>
              <button className="btn btn-orange" onClick={openEditModal}>
                <i className="fas fa-edit me-2"></i> Edit
              </button>
            </div>

            <div className="card mb-4 overflow-hidden">
              <div className="profile-header"></div>
              <div className="card-body px-4 pb-4">
                <div className="row align-items-start">
                  <div className="col-auto">
                    <img
                      src={
                        freelancer.info?.photo
                          ? `http://localhost:5001${freelancer.info.photo}`
                          : freelancer.userId?.user_image
                          ? `http://localhost:5001${freelancer.userId.user_image}`
                          : "https://via.placeholder.com/150"
                      }
                      alt="Photo profil"
                      className="profile-avatar"
                    />
                  </div>
                  <div className="col mt-4">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h2 className="h3 fw-bold text-dark mb-1">
                          {freelancer.info?.prenom || ""} {freelancer.info?.nom || ""}
                        </h2>
                        <p className="text-warning fw-medium mb-2">{freelancer.specialite || "Freelancer"}</p>
                        <div className="d-flex gap-3 text-muted small">
                          <div className="d-flex align-items-center gap-1">
                            <i className="fas fa-map-marker-alt"></i>
                            <span>{freelancer.userId?.address || "N/A"}</span>
                          </div>
                          <div className="d-flex align-items-center gap-1">
                            <i className="fas fa-calendar"></i>
                            <span>Member since {new Date(freelancer.createdAt).getFullYear()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex gap-2">
                        <span className="badge-online">Online</span>
                        <span className="badge-pro"><i className="fas fa-crown me-1"></i> Pro</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="row">
              <div className="col-lg-6 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title fw-semibold mb-4">Contact Information</h5>
                    <div className="contact-item">
                      <div className="contact-icon"><i className="fas fa-envelope"></i></div>
                      <div><small className="text-muted d-block">Email</small>
                        <span className="fw-medium">{freelancer.info?.email || freelancer.userId?.email}</span>
                      </div>
                    </div>
                    <div className="contact-item">
                      <div className="contact-icon"><i className="fas fa-phone"></i></div>
                      <div><small className="text-muted d-block">Phone</small>
                        <span className="fw-medium">{freelancer.userId?.phone || "N/A"}</span>
                      </div>
                    </div>
                    <div className="contact-item">
                      <div className="contact-icon"><i className="fas fa-map-marker-alt"></i></div>
                      <div><small className="text-muted d-block">Address</small>
                        <span className="fw-medium">{freelancer.userId?.address || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title fw-semibold mb-4">About</h5>
                    <p className="text-muted mb-4">
                      {freelancer.info?.bio || "No biography available yet. You can add one by editing your profile."}
                    </p>
                    <div>
                      <h6 className="fw-medium text-dark mb-3">Main Skills</h6>
                      <div>
                        {freelancer.competences?.length > 0
                          ? freelancer.competences.map((skill, i) => <span key={i} className="skill-tag">{skill}</span>)
                          : <p className="text-muted">Aucune compétence ajoutée.</p>}
                      </div>
                      <div>
                        {freelancer.experiences?.length > 0
                          ? freelancer.experiences.map((skill, i) => <span key={i} className="skill-tag">{skill}</span>)
                          : <p className="text-muted">Aucune experience ajoutée.</p>}
                      </div>
                      <div>
                        {freelancer.projets?.length > 0
                          ? freelancer.projets.map((skill, i) => <span key={i} className="skill-tag">{skill}</span>)
                          : <p className="text-muted">Aucun projet ajouté.</p>}
                      </div>
                      <div>
                        {freelancer.formations?.length > 0
                          ? freelancer.formations.map((skill, i) => <span key={i} className="skill-tag">{skill}</span>)
                          : <p className="text-muted">Aucune formation ajoutée.</p>}
                      </div>
                      <div>
                        {freelancer.certifications?.length > 0
                          ? freelancer.certifications.map((skill, i) => <span key={i} className="skill-tag">{skill}</span>)
                          : <p className="text-muted">Aucune certification ajoutée.</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CV */}
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title fw-semibold mb-3">CV</h5>
                {freelancer.cv ? (
                  <a href={`http://localhost:5001${freelancer.cv}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary">📄 Voir le CV</a>
                ) : <p className="text-muted">Aucun CV ajouté.</p>}
              </div>
            </div>
          </div>
        )}

        {/* Build Profile */}
        {activeSection === "stats" && (
          <div id="add-project-section" className="content-section">
            <FreelancerHome />
          </div>
        )}

        {/* Messages */}
        {activeSection === "messages" && (
          <div id="messages-section" className="content-section">
            <h1 className="display-6 fw-bold text-dark mb-4">Messages</h1>
            <MessagesCenter currentUserId={userId} />
          </div>
        )}
      </div>

      {/* Modal Edit */}
      {showEditModal && (
        <>
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modifier le profil</h5>
                  <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6 mb-2">
                      <input className="form-control" name="nom" value={editFree.nom} onChange={onFreeChange} placeholder="Nom" />
                    </div>
                    <div className="col-md-6 mb-2">
                      <input className="form-control" name="prenom" value={editFree.prenom} onChange={onFreeChange} placeholder="Prénom" />
                    </div>
                    <div className="col-md-12 mb-2">
                      <input className="form-control" name="specialite" value={editFree.specialite} onChange={onFreeChange} placeholder="Spécialité (ex: Web Dev)" />
                    </div>
                    <div className="col-12 mb-2">
                      <label className="form-label small text-muted">Compétences (séparées par virgule)</label>
                      <textarea className="form-control" rows={2} name="competences" value={editFree.competences} onChange={onFreeChange} placeholder="React, Node.js, Figma..." />
                    </div>
                    <div className="col-12 mb-2">
                      <label className="form-label small text-muted">Expériences (séparées par virgule)</label>
                      <textarea className="form-control" rows={2} name="experiences" value={editFree.experiences} onChange={onFreeChange} placeholder="Stage X, CDI Y..." />
                    </div>
                    <div className="col-12 mb-2">
                      <label className="form-label small text-muted">Certifications (séparées par virgule)</label>
                      <textarea className="form-control" rows={2} name="certifications" value={editFree.certifications} onChange={onFreeChange} placeholder="AWS, Google..." />
                    </div>
                    <div className="col-12 mb-2">
                      <label className="form-label small text-muted">Formations (séparées par virgule)</label>
                      <textarea className="form-control" rows={2} name="formations" value={editFree.formations} onChange={onFreeChange} placeholder="Licence, Mastère..." />
                    </div>
                    <div className="col-12 mb-3">
                      <label className="form-label small text-muted">Projets (séparés par virgule)</label>
                      <textarea className="form-control" rows={2} name="projets" value={editFree.projets} onChange={onFreeChange} placeholder="P1, P2..." />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Photo</label>
                      <input type="file" className="form-control" accept="image/*" onChange={onPhoto} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">CV (PDF/Word)</label>
                      <input type="file" className="form-control" accept=".pdf,.doc,.docx" onChange={onCv} />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Annuler</button>
                  <button className="btn btn-orange" onClick={handleSaveAll}>Enregistrer</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
}
