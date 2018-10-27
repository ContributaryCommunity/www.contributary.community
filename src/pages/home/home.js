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
      },
      selectedProjectIndex: {
        type: Number
      },
      selectedProjectName: {
        type: String
      },
      selectedRepositoryIndex: {
        type: Number
      },
      selectedRepositoryName: {
        type: String
      },
      repositoriesCache: {
        types: String
      }
    };
  }

  constructor() {
    super();

    // TODO handle defaults, index vs name?  more ambigious
    this.selectedLanguage = 'javascript';
    this.selectedProjectIndex = 0;
    this.selectedProjectName = 'ProjectEvergreen';
    this.selectedRepositoryIndex = 0;
    this.selectedRepositoryName = 'project-evergreen';
    this.topology = {
      javascript: {
        projects: [{
          repositories: []
        }]
      }
    };
    this.repositoriesCache = {
      ProjectEvergreen: {
        repositories: [{
          issues: [] 
        }]
      }
    };

    this.topologyService = new TopologyService();
    this.githubService = new GitHubService();
  }

  // step 1 - populate topology key (language) dropdown 
  connectedCallback() {
    this.getTopologyKeys();

    // testing github by showing user details
    this.githubService.getUserDetails().then((data) => {
      this.username = data.username;
      this.avatarUrl = data.avatar;
    });
  }

  getTopologyKeys() {
    this.topologyService.getTopologyKeys().then((response) => {
      response.forEach((key) => {
        this.topology = {
          ...this.topology,
          // ???
          [key]: {
            projects: [{
              repositories: []
            }]
          }
        };
      });
    });
  }

  // step 2 - select a language from the topology to get available projects
  getSelectedLanguage(event) {
    const selectElement = event.path[0];
    const selectOptions = Array.from(selectElement.children);   
    const selectedOption = selectOptions[selectElement.selectedIndex];

    if (selectedOption.value !== '') {
      this.selectedLanguage = selectedOption.value;
      
      this.topologyService.getFullTopologyByKey(this.selectedLanguage).then((response) => {
        this.topology = {
          ...this.topology,
          [this.selectedLanguage]: response
        };
      });
    }
  }

  // step 2 - select a project to get available repos
  getSelectedProject(event) {
    const selectElement = event.path[0];
    const selectOptions = Array.from(selectElement.children);   
    const selectedOption = selectOptions[selectElement.selectedIndex];

    if (selectedOption.value !== '') {
      this.selectedProjectIndex = selectElement.selectedIndex - 1;
      this.selectedProjectName = selectedOption.value; 

      // TODO if wild card, fetch from github
      if (this.topology[this.selectedLanguage].projects[this.selectedProjectIndex].repositories[0] === '*') {
        this.getRepositoriesForProject();
      }
    }
  }

  getRepositoriesForProject() {
    const project = this.topology[this.selectedLanguage].projects[this.selectedProjectIndex];
    
    console.log('****** wild card for ******!', project);
    this.githubService.getRepositoriesForProject(project.name, project.type).then((response) => {

      const repositories = response.map((repo) => {
        return {
          ...repo,
          issues: []
        };
      });

      this.repositoriesCache = {
        ...this.repositoriesCache,
        [project.name]: {
          repositories
        }
      };
    });
  }

  // step 3 - dropdown to browse repos per project
  getSelectedRepository(event) {
    const selectElement = event.path[0];
    const selectOptions = Array.from(selectElement.children);   
    const selectedOption = selectOptions[selectElement.selectedIndex];

    if (selectedOption.value !== '') {
      this.selectedRepositoryIndex = selectElement.selectedIndex - 1;
      this.selectedRepositoryName = selectedOption.value;

      this.getIssuesForRepository();
    }
  }

  // step 4 - scroll to views issues per repo
  getIssuesForRepository() {
    console.log('getIssuesForRepository');

    this.githubService.getIssuesForRepository(this.selectedProjectName, this.selectedRepositoryName).then(response => {
      console.log('response', response);
      const currentRepoName = this.selectedProjectName;
      const repositories = this.repositoriesCache[this.selectedProjectName].repositories.map((repo) => {
        return {
          ...repo,
          issues: response
        };
      });

      this.repositoriesCache = {
        ...this.repositoriesCache,
        [currentRepoName]: {
          repositories
        }
      };

      console.log('issues, shabam!', this.repositoriesCache);
    });
  }

  // TODO conditional rendering
  render() {
    // clean up mixed this. vs destructuring usage 
    const { username, avatarUrl, topology, repositoriesCache } = this;
    
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

      <span>Selected Project: ${this.selectedProjectName}<span>
          
      <hr/>
      
      <h2>Step 3: Pick a repo!</h2>
      <select @change="${this.getSelectedRepository.bind(this)}">
        <option value="">Repo...</option> 
        
        ${repositoriesCache[this.selectedProjectName].repositories.map((repo) => {
            return html`<option value="${repo.name}">${repo.name}</option>`;
          })
        }
      </select>

      <br/>
      <br/>

      <span>Selected Repo: ${this.selectedRepositoryName}<span>

      <hr/>

      <h2>Step 4: Find an issue and help out!</h2>
        ${repositoriesCache[this.selectedProjectName].repositories[this.selectedRepositoryIndex].issues.map((issue) => {
            return html`<p><a href="${issue.url}" target="_blank">${issue.title}</a></p>`;
          })
        }

    </div>
  `;
    /* eslint-enable */
  }
}

customElements.define('eve-home-page', HomePageComponent);