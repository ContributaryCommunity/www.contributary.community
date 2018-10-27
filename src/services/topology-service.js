import topology from './topologies.json';

// static?
export class TopologyService {
  constructor() {
    this.topology = topology;
  }

  getTopologies() {
    return new Promise((resolve) => {
      resolve(this.topologies);
    });
  }

  getTopologyKeys() {
    return new Promise((resolve) => {
      const keys = Object.keys(this.topology.language);

      resolve(keys);
    });
  }

  getFullTopologyByKey(key) {
    return new Promise((resolve) => {
      resolve(this.topology.language[key]);
    });
  }

  // getLanguages() {
  //   return new Promise((resolve) => {
  //     const languages = this.topologies.languages;

  //     console.log('languages', languages);

  //     resolve(languages);
  //   });
  // }

  // getProjectsForLanguage(language) {
  //   return new Promise((resolve) => {
  //     const projects = this.topologies[language];

  //     console.log('projects', projects);

  //     resolve(projects);
  //   });
  // }

  // getRepositoriesForProjectsByLangauge(language, project) {
  //   return new Promise((resolve) => {
  //     const repos = this.topologies[language][project];

  //     console.log('repos', repos);

  //     resolve(repos);
  //   });
  // }

  // getIssueForProject(language, project, repo) {
  //   return new Promise((resolve) => {
  //     const issues = this.topologies[language][project][repo];

  //     console.log('issues', issues);

  //     resolve(issues);
  //   });
  // }
}