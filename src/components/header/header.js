import { html, LitElement } from '@polymer/lit-element';
import css from './header.css';

class HeaderComponent extends LitElement {

  render() {
    return html`      
      <style>
        ${css}
      </style>

      <header>

        <h1>Welcome to Contributary!</h1>

      </header>
    `;
  }
}

customElements.define('eve-header', HeaderComponent);