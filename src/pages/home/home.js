import { html, LitElement } from '@polymer/lit-element';
import { GitHubService } from '../../services/github-service';
import { TopologyService } from '../../services/topology-service';

import '../../components/dropdown/dropdown';
import '../../components/issues-list/issues-list';

class HomePageComponent extends LitElement {
  
  static get properties() {
    return {
      languageOptions: {
        type: Array
      },
      projectOptions: {
        type: Array
      },
      repositoryOptions: {
        type: Array
      },
      selectedProjectIndex: {
        type: Number
      },
      selectedLanguageIndex: {
        type: Number
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
      selectedLanguage: {
        type: String
      },
      username: {
        type: String
      },
      avatarUrl: {
        type: String
      },
      selectedLanguage: {
        type: String
      },
      issues: {
        type: Array
      }
    };
  }

  constructor() {
    super();

    this.topologyService = new TopologyService();
    this.githubService = new GitHubService();
  }

  // step 0 - populate topology key (language) dropdown 
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
      const newLanguageOptions = response.map((key) => {
        return {
          value: key
        };
      });
      
      this.languageOptions = [
        ...newLanguageOptions
      ];
    });
  }

  // step 1 - user selects a language from the topology to see available projects
  getSelectedLanguage(event) {
    const selectElement = event.path[0];
    const selectOptions = Array.from(selectElement.children);   
    const selectedOption = selectOptions[selectElement.selectedIndex];

    if (selectedOption.value !== '') {
      this.selectedLanguage = selectedOption.value;
      this.selectedLanguageIndex = selectElement.selectedIndex - 1;

      this.topologyService.getFullTopologyByKey(this.selectedLanguage).then((response) => {
        const newProjectOptions = response.projects.map((project) => {
          const { name, type, repositories } = project;

          return {
            value: name,
            type,
            name,
            repositories
          };
        });

        this.projectOptions = [
          ...newProjectOptions
        ];
      });
    }
  }

  // step 3 - user select a project to see available repositories for that project
  getSelectedProject(event) {
    const selectElement = event.path[0];
    const selectOptions = Array.from(selectElement.children);   
    const selectedOption = selectOptions[selectElement.selectedIndex];

    if (selectedOption.value !== '') {
      this.selectedProjectIndex = selectElement.selectedIndex - 1;
      this.selectedProjectName = selectedOption.value;

      const projectRepositories = this.projectOptions[this.selectedProjectIndex].repositories;

      if (projectRepositories[0] === '*') {
        this.fetchRepositoriesForProject();
      } else {
        this.setRepositoriesForProject(projectRepositories);
      }
    }
  }

  fetchRepositoriesForProject() {
    const project = this.projectOptions[this.selectedProjectIndex];
    
    this.githubService.getRepositoriesForProject(project.name, project.type).then((response) => {
      this.setRepositoriesForProject(response);
    });
  }

  setRepositoriesForProject(repositories) {
    const newRepositoryOptions = repositories.map((repository) => {
      const { name } = repository;

      return {
        value: name,
        name
      };
    });

    this.repositoryOptions = [
      ...newRepositoryOptions
    ];
  }

  // step 4 - user selects an repository to see available issues
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

  getIssuesForRepository() {
    const currentProjectName = this.projectOptions[this.selectedProjectIndex].name;
    const currentRepoName = this.repositoryOptions[this.selectedRepositoryIndex].name;

    this.githubService.getIssuesForRepository(currentProjectName, currentRepoName).then(response => {
      this.issues = [
        ...response
      ];
    });
  }

  // TODO conditional rendering
  render() {
    const { username, avatarUrl, issues } = this;
    const { languageOptions, projectOptions, repositoryOptions } = this;

    /* eslint-disable */
    return html`

      <img src="${avatarUrl}" alt="${username}"/>
      <p>Hello ${username}!</p>

      <hr/>
      
      <h2>Step 1: Pick a language!</h2>
      <eve-dropdown 
        label="Languages.."
        .options="${languageOptions}"
        .optionSelectedCallback="${this.getSelectedLanguage.bind(this)}"
      ></eve-dropdown>

      <p>Selected Language: ${this.selectedLanguage}<p>
      
      <hr/>
    
      <h2>Step 2: Pick a project!</h2>
      <eve-dropdown 
        label="Projects..."
        .options="${projectOptions}"
        .optionSelectedCallback="${this.getSelectedProject.bind(this)}"
      ></eve-dropdown>

      <p>Selected Project: ${this.selectedProjectName}<p>
          
      <hr/>

      <h2>Step 3: Pick a repo!</h2>
      <eve-dropdown 
        label="Repositories..."
        .options="${repositoryOptions}"
        .optionSelectedCallback="${this.getSelectedRepository.bind(this)}"
      ></eve-dropdown>

      <br/>
      <br/>

      <p>Selected Repo: ${this.selectedRepositoryName}<p>

      <hr/>

      <h2>Step 4: Find an issue and help out!</h2>
      <eve-issues-list 
        .issues="${issues}">
      </eve-issues-list>

    </div>
  `;

    /* eslint-enable */
  }
}

customElements.define('eve-home-page', HomePageComponent);