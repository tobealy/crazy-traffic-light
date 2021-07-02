import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Keycloak from 'keycloak-js'
let initOptions = {
  url: 'http://localhost:8181', realm: 'secured-app', clientId: 'react', onLoad: 'login-required'
}

let keycloak = Keycloak(initOptions);

// keycloak.init({ onLoad: initOptions.onLoad }).then((auth) => {
//   if (!auth) {
//     window.location.reload();
//   } else {
    // console.log("Authenticated");
    // console.log(keycloak.idToken)
    // console.log(keycloak.resourceAccess)
    // localStorage.setItem('roles', JSON.stringify(keycloak.realmAccess.roles))
    // console.log(keycloak.realmAccess.roles)
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root')
    );

//   }
// })