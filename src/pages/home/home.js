import { html, LitElement } from '@polymer/lit-element';
import { GitHubService } from '../../services/github-service';
import { TopologyService } from '../../services/topology-service';

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
        type: Object
      },
      selectedLanguage: {
        type: String
      }
    };
  }

  constructor() {
    super();

    // TODO handle defaults
    this.selectedLanguage = 'javascript';
    this.topology = {
      javascript: {
        projects: []
      }
    };

    // testing github by showing user details
    new GitHubService().getUserDetails().then((data) => {
      this.username = data.username;
      this.avatarUrl = data.avatar;
    });

    // start building the experience...
    this.topologyService = new TopologyService();

    // step 1 - get languages for dropdown
    this.topologyService.getTopologyKeys().then((response) => {
      response.forEach((key) => {
        this.topology = {
          ...this.topology,
          [key]: {
            projects: []
          }
        };
      });
    });

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
      this.hydrateTopologyByKey(this.selectedLanguage);
    }
  }

  getSelectedProject(event) {
    console.log('getSelectedProjectLanguage', event);
    // const selectOptions = Array.from(event.path[0].children);    
    // const selectedOption = selectOptions.filter((option) => {
    //   return option.selected;
    // })[0];

    // if (selectedOption.value !== '') {
    //   this.selectedLanguage = selectedOption.value;
    //   this.hydrateTopologyByKey(this.selectedLanguage);
    // }
  }

  // step 2 - dropdown to browse projects per language auto populated by step 1
  hydrateTopologyByKey(key) {
    this.topologyService.getFullTopologyByKey(key).then((response) => {
      this.topology = {
        ...this.topology,
        [key]: response
      };
    });
  }

  // TODO conditional rendering
  render() {
    const { username, avatarUrl, topology } = this;
    
    console.log('render', topology);

    /* eslint-disable indent */
    return html`

        <img src="${avatarUrl}" alt="${username}"/>
        
        <p>Hello ${username}!</p>

        <hr/>
        
        <h2>Step 1: Pick a language!</h2>

        <select @change="${this.getSelectedLanguage.bind(this)}">
          <option value="">Languages...</option>

          ${Object.keys(topology).map((key) => {
              return html`<option value="${key}">${key}</option>`;
            })
          }                        
        </select>

        <br/>
        <br/>

        <span>Selected Language: ${this.selectedLanguage}<span>
        
        <hr/>

        <h2>Step 2: Pick a project!</h2>
        <select @change="${this.getSelectedProject.bind(this)}">
          <option value="">Projects...</option>

          ${topology[this.selectedLanguage].projects.map((project) => {
              return html`<option value="${project.name}">${project.name}</option>`;
            })
          }                        
        </select>

        <br/>
        <br/>
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