import { html, LitElement } from '@polymer/lit-element';
import { GitHubService } from '../../services/github-service';
import { TopologyService } from '../../services/topology-service';

import '../../components/dropdown/dropdown';
import '../../components/issues-list/issues-list';

import css from './home.css';

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
      selectedRepositoryIndex: {
        type: Number
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
    this.topologyService.getTopology().then((response) => {      
      const hierarchies = response.language;
      const newLanguageOptions = [];

      Object.keys(hierarchies).forEach((key) => {
        newLanguageOptions.push({
          label: hierarchies[key].label,
          value: key
        });
      });
      
      this.languageOptions = [
        ...newLanguageOptions
      ];
    });
  }

  // step 1 - user selects a language from the topology to see available projects
  getSelectedLanguage(event) {
    const selectElement = event.composedPath()[0];
    const selectOptions = Array.from(selectElement.children);   
    const selectedOption = selectOptions[selectElement.selectedIndex];
    const { value } = selectedOption;
    
    if (value !== '') {
      this.selectedLanguageIndex = selectElement.selectedIndex - 1;

      this.topologyService.getTopology(true).then((response) => {
        const hierarchy = response.language[value];

        const newProjectOptions = hierarchy.projects.map((project) => {
          const { name, type, repositories } = project;

          return {
            value: name,
            label: name,
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

  // step 2 - user select a project to see available repositories for that project
  getSelectedProject(event) {
    const selectElement = event.composedPath()[0];
    const selectOptions = Array.from(selectElement.children);   
    const selectedOption = selectOptions[selectElement.selectedIndex];

    if (selectedOption.value !== '') {
      this.selectedProjectIndex = selectElement.selectedIndex - 1;

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
        label: name,
        value: name,
        name
      };
    });

    this.repositoryOptions = [
      ...newRepositoryOptions
    ];
  }

  // step 3 - user selects a repository to see available issues
  getSelectedRepository(event) {
    const selectElement = event.composedPath()[0];
    const selectOptions = Array.from(selectElement.children);   
    const selectedOption = selectOptions[selectElement.selectedIndex];

    if (selectedOption.value !== '') {
      this.selectedRepositoryIndex = selectElement.selectedIndex - 1;

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

  render() {
    const { issues, languageOptions, projectOptions, repositoryOptions } = this;

    /* eslint-disable indent */
    return html`
      <style>
        ${css}
      </style>

      <hr/>

      <div class="selection-wrapper">
        <h2>Step 1: Select a Language</h2>
        <cc-dropdown
          label="Languages.."
          .options="${languageOptions}"
          .optionSelectedCallback="${this.getSelectedLanguage.bind(this)}"
        ></cc-dropdown>
      </div>

      ${projectOptions
        ? html`
            <div class="selection-wrapper">
              <hr/>
              
              <p>Selected Language: ${languageOptions[this.selectedLanguageIndex].value}<p>
              
              <h2>Step 2: Select a Project</h2>
              <cc-dropdown 
                label="Projects..."
                .options="${projectOptions}"
                .optionSelectedCallback="${this.getSelectedProject.bind(this)}"
              ></cc-dropdown>
            </div>
          `
        : ''
      }
    
      ${repositoryOptions
        ? html`
            <div class="selection-wrapper">
              <p>Selected Project: ${projectOptions[this.selectedProjectIndex].value}<p>
      
              <hr/>
              
              <h2>Step 3: Select a Repository</h2>
              <cc-dropdown 
                label="Repositories..."
                .options="${repositoryOptions}"
                .optionSelectedCallback="${this.getSelectedRepository.bind(this)}"
              ></cc-dropdown>
            </div>
          `
        : ''
      }

      ${issues
        ? html`
            <div class="selection-wrapper">
            <p>Selected Project: ${repositoryOptions[this.selectedRepositoryIndex].value}<p>

              <hr/>

              <h2>Step 4: Find an issue and help out!</h2>

              <cc-issues-list 
                .issues="${issues}">
              </cc-issues-list>
            </div>
          `
        : ''
      }
    
    </div>
  `;
  /* eslint-enable */

  }
}

customElements.define('cc-home-page', HomePageComponent);