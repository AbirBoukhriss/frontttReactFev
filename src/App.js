/* eslint-disable */
import React, { Component } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ClientHome from "./views/ClientHome"; 
import AllProjects from "./views/AllProjects"; 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSection: 'profile',
      user: null,
      loading: true,
      error: null,
      showEditModal: false, // 👉 toggle modal
      editForm: { username: "", email: "", phone: "", address: "", bio: "" }
    };
  }

  componentDidMount() {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      this.setState({ error: "Aucun utilisateur connecté", loading: false });
      return;
    }

    axios.get(`http://localhost:5001/users/getUserById/${userId}`)
      .then((res) => {
        this.setState({ 
          user: res.data.user, 
          loading: false,
          editForm: {
            username: res.data.user.username || "",
            email: res.data.user.email || "",
            phone: res.data.user.phone || "",
            address: res.data.user.address || "",
            bio: res.data.user.bio || ""
          }
        });
      })
      .catch((err) => {
        this.setState({ error: err.message, loading: false });
      });
  }

  showSection = (sectionName) => {
    this.setState({ activeSection: sectionName });
  };

  handleEditChange = (e) => {
    this.setState({
      editForm: { ...this.state.editForm, [e.target.name]: e.target.value }
    });
  };

handleUpdateUser = () => {
  const userId = localStorage.getItem("userId");
  axios
    .put(`http://localhost:5001/users/updateuserById/${userId}`, this.state.editForm)
    .then((res) => {
      this.setState({
        user: res.data.updated, // ton backend renvoie `updated`, pas `updatedUser`
        showEditModal: false,
      });

      // 👉 Forcer refresh après la mise à jour
      setTimeout(() => {
        window.location.reload();
      }, 500);
    })
    .catch((err) => {
      alert("Erreur lors de la mise à jour : " + err.message);
    });
};


  render() {
    const { activeSection, user, loading, error, showEditModal, editForm } = this.state;

    return (
      <div>
        {/* Sidebar */}
        <div className="sidebar" id="sidebar">
          <div className="sidebar-header">
            <div className="sidebar-brand">
              <div className="brand-icon">
                <i className="fas fa-user"></i>
              </div>
              <div>
                <h5 className="mb-0 fw-bold text-dark">MyProfile</h5>
                <small className="text-muted">Dashboard</small>
              </div>
            </div>
          </div>

          <nav className="sidebar-nav">
            {[
              { id: 'profile', icon: 'fas fa-user', label: 'Profile' },
              { id: 'stats', icon: 'fas fa-chart-bar', label: 'Add Project' },
              { id: 'messages', icon: 'fas fa-comments', label: 'Messages' },
              { id: 'notifications', icon: 'fas fa-bell', label: 'Notifications' },
              { id: 'settings', icon: 'fas fa-cog', label: 'All Project' }
            ].map((item) => (
              <div className="nav-item" key={item.id}>
                <button
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
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

          {/* Profile Section */}
          {activeSection === 'profile' && (
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
                      <i className="fas fa-edit me-2"></i>
                      Edit
                    </button>
                  </div>

                  {/* Profile Card */}
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
                                  <i className="fas fa-crown me-1"></i>
                                  Client
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
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

                    {/* About Section */}
                    <div className="col-lg-6 mb-4">
                      <div className="card h-100">
                        <div className="card-body">
                          <h5 className="card-title fw-semibold mb-4">About</h5>
                          <p className="text-muted mb-4">
                            {user.bio || "Aucune description fournie"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Stats Section */}
          {activeSection === 'stats' && (
            <div id="stats-section" className="content-section">
              <ClientHome />
            </div>
          )}

          {/* All Projects Section */}
          {activeSection === 'settings' && (
            <div id="settings-section" className="content-section">
              <AllProjects clientId={localStorage.getItem("userId")} />
            </div>
          )}
        </div>

        {/* Modal Edit Profile */}
        {showEditModal && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modifier Profil</h5>
                  <button type="button" className="btn-close" onClick={() => this.setState({ showEditModal: false })}></button>
                </div>
                <div className="modal-body">
                  <input className="form-control mb-2" name="username" value={editForm.username} onChange={this.handleEditChange} placeholder="Nom d'utilisateur" />
                  <input className="form-control mb-2" name="email" value={editForm.email} onChange={this.handleEditChange} placeholder="Email" />
                  <input className="form-control mb-2" name="phone" value={editForm.phone} onChange={this.handleEditChange} placeholder="Téléphone" />
                  <input className="form-control mb-2" name="address" value={editForm.address} onChange={this.handleEditChange} placeholder="Adress" />
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
