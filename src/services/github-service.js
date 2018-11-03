export class GitHubService {

  constructor() {
    this.baseUrl = '/api/github';
  }

  getRepositoriesForProject(projectName, repoType) {
    const query = `projectName=${projectName}&repoType=${repoType}`;

    return fetch(`${this.baseUrl}/repositories?${query}`)
      .then((resp) => { return resp.json(); })
      .then((response) => {
        return response.map((repo) => {
          return {
            id: repo.id,
            name: repo.name
          };
        });
      });
  }

  getIssuesForRepository(projectName, repositoryName) {
    const query = `projectName=${projectName}&repoName=${repositoryName}`;

    return fetch(`${this.baseUrl}/issues?${query}`)
      .then((resp) => { return resp.json(); })
      .then((response) => {
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
      });
  }
}