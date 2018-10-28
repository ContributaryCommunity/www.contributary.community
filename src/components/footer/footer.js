import { html, LitElement } from '@polymer/lit-element';
import css from './footer.css';

class FooterComponent extends LitElement {

  render() {
    return html`
      <style>
        ${css}
      </style>

      <footer>

        <a href="https://projectevergreen.github.io/" title="Contributary home link">Contributary</a>
      
      </footer>
    `;
  }
}

customElements.define('eve-footer', FooterComponent);