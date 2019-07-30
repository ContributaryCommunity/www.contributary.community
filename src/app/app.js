import { html, LitElement } from 'lit-element';
import '../components/footer/footer.js';
import '../components/header/header.js';
import '../pages/home/home.js';
import css from './app.css';

class AppComponent extends LitElement {

  render() {
    return html`
      <style>
        ${css}
      </style>
      
      <div>

        <section>
          <cc-header></cc-header>
        </section>
        
        <section class="cc-page">
          <cc-home-page></cc-home-page>
        </section>

        <section>
          <cc-footer></cc-footer>
        </section>

      </div>
    `;
  }
}

customElements.define('cc-app', AppComponent);