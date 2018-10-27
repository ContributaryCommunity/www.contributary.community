import { html, LitElement } from '@polymer/lit-element';
import css from './home.css';
import { GitHubService } from '../../services/github-service';

class HomePageComponent extends LitElement {
  
  static get properties() {
    return {
      username: {
        type: String
      },
      avatarUrl: {
        type: String
      }
    };
  }

  constructor() {
    super();

    new GitHubService().getUserDetails().then((data) => {
      this.username = data.username;
      this.avatarUrl = data.avatar;
    });
  }

  render() {
    const { username, avatarUrl } = this;

    return html`
      <style>
        ${css}
      </style>

      <div>

        <p>Hello ${username}!</p>
        <img src="${avatarUrl}" alt="${username}"/>

      </div>
    `;
  }
}

customElements.define('eve-home-page', HomePageComponent);