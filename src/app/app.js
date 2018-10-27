import { html, LitElement } from '@polymer/lit-element';
import '../pages/home/home.js';
import css from './app.css';

class AppComponent extends LitElement {

  render() {
    return html`
      <style>
        ${css}
      </style>
      
      <div>

        <h1>Welcome to Contributary!</h1>
        
        <section>
          <eve-home-page></eve-home-page>
        </section>

      </div>
    `;
  }
}

customElements.define('eve-app', AppComponent);