import { html, LitElement } from 'lit';
import css from './header.css?type=raw';
// import logo from './logo.png';

class HeaderComponent extends LitElement {

  render() {
    return html`
      <style>
        ${css}
      </style>

      <header>

        <h1>Welcome to Contributary!</h1>
        <img src="/assets/logo.png" alt="Contributary logo"/>
        <h3><i>Helping connect open source with the open source community.</i></h3>

      </header>
    `;
  }
}

customElements.define('cc-header', HeaderComponent);