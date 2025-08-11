import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// ✅ Import unique des vues
import DataScientist from "./views/DataScientist";
import WebDevelopment from "./views/webDevelopment";
import SoftwareDevelopment from "./views/softwareDevelopment";
import Designer from "./views/designer";
import Ai from "./views/Ai";
import MachineLearning from "./views/machineLearning";
import FindProjectPage from "views/FindProjectPage";
import HowItWorksPage from "views/HowItWorksPage";
import FreelancerPage from "./views/FreelancerPage";
 // ✅ export default obligatoire

// ✅ Import des layouts
import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// ✅ Import des vues sans layout
import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";

// ✅ Import des styles
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* ✅ Routes des services */}
      <Route path="/freelancer-page" component={FreelancerPage} />
      <Route path="/how-it-works" component={HowItWorksPage} />
      <Route path="/find-project-page" component={FindProjectPage} />
      <Route path="/data-scientist" component={DataScientist} />
      <Route path="/software-development" component={SoftwareDevelopment} />
      <Route path="/ai" component={Ai} />
      <Route path="/machine-learning" component={MachineLearning} />
      <Route path="/web-development" component={WebDevelopment} />
      <Route path="/designer" component={Designer} />

      {/* ✅ Layouts */}
      <Route path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />

      {/* ✅ Vues sans layout */}
      <Route path="/landing" exact component={Landing} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/" exact component={Index} />

      {/* ✅ Redirection par défaut */}
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
