import { html, LitElement } from '@polymer/lit-element';
import githubLogo from './images/github-logo.png';
import twitterLogo from './images/twitter-logo.png';
import css from './footer.css';

class FooterComponent extends LitElement {

  render() {
    return html`
      <style>
        ${css}
      </style>

      <footer>

        <span>💙 The Contributary Community</span>

        <div>
          <a href="https://github.com/ContributaryCommunity" class="social-icon" target="_blank" rel="noopener">
            <img src="${githubLogo}" alt="GitHub Logo"/>
          </a>

          <a href="https://twitter.com/ContributaryCmt" class="social-icon" target="_blank" rel="noopener">
            <img src="${twitterLogo}" alt="Twitter Logo"/>
          </a>
        </div>
      
      </footer>
    `;
  }
}

customElements.define('cc-footer', FooterComponent);