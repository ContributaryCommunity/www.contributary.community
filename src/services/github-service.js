export class GitHubService {

  constructor() {
    this.baseUrl = '/api/github';
  }

  getRepositoriesForProject(projectName, repositoryType) {
    const query = `projectName=${projectName}&repoType=${repositoryType}`;

    return fetch(`${this.baseUrl}/repositories?${query}`)
      .then((resp) => resp.json())
      .then((response) => {
        const repositories = [];

        if (response && response.length) {
          response.forEach((repository) => {
            repositories.push({
              id: repository.id,
              name: repository.name
            });
          });
        }

        return repositories;
      });
  }

  getIssuesForRepository(projectName, repositoryName) {
    const query = `projectName=${projectName}&repoName=${repositoryName}`;

    return fetch(`${this.baseUrl}/issues?${query}`)
      .then((resp) => resp.json())
      .then((response) => {
        if (response.length) {
          return response.map((issue) => {
            return {
              id: issue.id,
              title: issue.title,
              url: issue.html_url,
              labels: issue.labels,
              assignees: issue.assignee ? [issue.assignee] : issue.assignees,
              number: issue.number
            };
          });
        } else {
          return {
            error: true,
            ...response
          };
        }
      });
  }
}