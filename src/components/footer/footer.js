import { html, LitElement } from '@polymer/lit-element';
import css from './footer.css';

class FooterComponent extends LitElement {

  render() {
    return html`
      <style>
        ${css}
      </style>

      <footer>

        <a href="https://www.contributary.community" title="Contributary home link">💙 The Contributary Community</a>
      
      </footer>
    `;
  }
}

customElements.define('eve-footer', FooterComponent);