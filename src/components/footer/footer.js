import { html, LitElement } from '@polymer/lit-element';
import css from './footer.css';

class FooterComponent extends LitElement {

  render() {
    return html`
      <style>
        ${css}
      </style>

      <footer>

        <a href="https://github.com/ContributaryCommunity" 
          title="Contributary GitHub link" 
          target="_blank"
          rel="noopener"
        >💙 The Contributary Community</a>
      
      </footer>
    `;
  }
}

customElements.define('cc-footer', FooterComponent);