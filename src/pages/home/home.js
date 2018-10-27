import { html, LitElement } from '@polymer/lit-element';
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

        <img src="${avatarUrl}" alt="${username}"/>
        
        <p>Hello ${username}!</p>

      </div>
    `;
  }
}

customElements.define('eve-home-page', HomePageComponent);