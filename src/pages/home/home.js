import { html, LitElement } from '@polymer/lit-element';
import { GitHubService } from '../../services/github-service';
import { TopologiesService } from '../../services/topologies-service';

class HomePageComponent extends LitElement {
  
  static get properties() {
    return {
      username: {
        type: String
      },
      avatarUrl: {
        type: String
      },
      topology: {
        type: Array
      },
      selectedLanguage: {
        type: String
      }
    };
  }

  constructor() {
    super();

    this.selectedLanguage = '';

    // testing github by showing user details
    new GitHubService().getUserDetails().then((data) => {
      this.username = data.username;
      this.avatarUrl = data.avatar;
    });

    // start building the experience...
    let service = new TopologiesService();

    // step 1 - get languages for dropdown
    service.getTopologyKeys().then((response) => {
      this.topology = {
        keys: response
      };
    });

    // step 2 - dropdown to browse projects per language

    // step 3 - dropdown to browse repos per project

    // step 4 - scroll to views issues per repo

    // step 5 - filtering?
  }

  getSelectedLanguage(event) {
    const selectOptions = Array.from(event.path[0].children);    
    const selectedOption = selectOptions.filter((option) => {
      return option.selected;
    })[0];

    if (selectedOption.value !== '') {
      this.selectedLanguage = selectedOption.value;
    }
  }

  render() {
    const { username, avatarUrl, topology } = this;

    /* eslint-disable indent */
    return html`

        <img src="${avatarUrl}" alt="${username}"/>
        
        <p>Hello ${username}!</p>

        <hr/>
        
        <h2>Step 1: Pick a language!</h2>

        <select @change="${this.getSelectedLanguage.bind(this)}">
          <option value="">Languages...</option>

          ${topology.keys.map((key) => {
              return html`<option value="${key}">${key}</option>`;
            })
          }                        
        </select>

        <br/>
        <br/>

        <span>Selected Language: ${this.selectedLanguage}<span>
        
        <hr/>

        <h2>Step 2: Pick a project!</h2>
        <p>TODO</p>
        <hr/>
        
        <h2>Step 3: Pick a repo!</h2>
        <p>TODO</p>
        <hr/>

        <h2>Step 4: Find an issue and help out!</h2>
        <p>TODO</p>
        <hr/>

      </div>
    `;
    /* eslint-enable */
  }
}

customElements.define('eve-home-page', HomePageComponent);