import { html, LitElement } from 'lit';
import { GitHubService } from '../../services/github-service.js';
import { TopologyService } from '../../services/topology-service.js';

import '../../components/dropdown/dropdown.js';
import '../../components/issues-list/issues-list.js';

import css from './home.css?type=css';

class HomePageComponent extends LitElement {

  static get properties() {
    return {
      message: {
        type: String
      },
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
      },
      filterByGoodFirstIssue: {
        type: Boolean
      }
    };
  }

  constructor() {
    super();

    this.message = '';
    this.topologyService = new TopologyService();
    this.githubService = new GitHubService();
  }

  // step 0 - populate topology key (language) dropdown
  connectedCallback() {
    super.connectedCallback();
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
  getSelectedLanguage(value, idx) {
    this.reset();
    this.projects = [];
    this.selectedProjectIndex = 0;
    this.projectOptions = [];
    
    if (value !== '') {
      this.selectedLanguageIndex = idx;

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
        this.repositoryOptions = null;
        this.issues = null;
      });
    }
  }

  // step 2 - user select a project to see available repositories for that project
  getSelectedProject(value, idx) {
    this.reset();

    if (value !== '') {
      this.selectedProjectIndex = idx;

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
      if (!response.error) {
        this.setRepositoriesForProject(response);
      } else {
        this.message = response.message;
      }
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
    this.issues = null;
  }

  // step 3 - user selects a repository to see available issues
  getSelectedRepository(value, idx) {
    if (value !== '') {
      this.selectedRepositoryIndex = idx;

      this.getIssuesForRepository();
    }
  }

  reset() {
    this.message = null;
    this.repositories = [];
    this.selectedRepositoryIndex = 0;
    this.repositoryOptions = [];
  }

  getIssuesForRepository() {
    this.message = null;
    const currentProjectName = this.projectOptions[this.selectedProjectIndex].name;
    const currentRepoName = this.repositoryOptions[this.selectedRepositoryIndex].name;

    this.githubService.getIssuesForRepository(currentProjectName, currentRepoName).then(response => {
      if (!response.error) {
        this.issues = [
          ...response
        ];
      } else {
        this.message = response.message;
      }
    });
  }

  render() {
    const { issues, languageOptions, message, projectOptions, repositoryOptions, filterByGoodFirstIssue } = this;
    const labelFilters = [];

    if (filterByGoodFirstIssue) {
      labelFilters.push('good first issue');
      labelFilters.push('good first contribution');
    }

    /* eslint-disable indent, max-len */
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

      ${repositoryOptions && repositoryOptions.length
        ? html`
            <div class="selection-wrapper">
              <h2>Step 3: Select a Repository</h2>
              <cc-dropdown
                label="Repositories..."
                .options="${repositoryOptions}"
                .optionSelectedCallback="${this.getSelectedRepository.bind(this)}"
              ></cc-dropdown>
            </div>
          `
        : repositoryOptions && !repositoryOptions.length
          ? html`
          <div class="selection-wrapper">
            <h3>No repositories found for the selected project</h3>
          </div>
        `
          : ''
      }

      ${issues && issues.length
        ? html`
            <div class="selection-wrapper">
              <h2>Step 4: Find an issue and help out!</h2>
              <label for="gfi">Filter By Good First Issue</label>
              <input type="checkbox" @change="${() => this.filterByGoodFirstIssue = !this.filterByGoodFirstIssue}"/>

              <cc-issues-list
                .issues="${issues}"
                .labelFilters="${labelFilters}">
              </cc-issues-list>
            </div>
          `
        : issues && !issues.length
          ? html`
            <div class="selection-wrapper">
              <h3>No issues found for the selected repository</h3>
            </div>
          `
          : ''
      }

      ${message 
        ? html`
          <div class="selection-wrapper">
            <h3 class="error">Oops, there was an issue with this request: <i>${message}</i>.<br/>  Please consider opening an issue at our <a href="https://github.com/ContributaryCommunity/www.contributary.community/issues" target="_blank" rel="noopener noreferrer">repo issue tracker</a> with the repo name and message you received.
            </h3>
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