import * as axios from 'axios';
import { credentials } from '../credentials';

export class GitHubService {

  constructor() {
    axios.defaults.headers.common.Accept = 'application/vnd.github.v3+json';
    axios.defaults.headers.common.Authorization = `token ${credentials.token}`;
  }

  // https://developer.github.com/v3/users/
  getUserDetails() {
    return axios.get('https://api.github.com/user')
      .then((response) => {
        const data = response.data;
        const user = {
          avatar: data.avatar_url,
          username: data.login
        };

        return user;
      });
  }

  // https://developer.github.com/v3/repos/#get
  getRepositoriesForProject(projectName, type) {
    const urlSuffix = type === 'org'
      ? `orgs/${projectName}/repos`
      : `users/${projectName}/repos`;

    return axios.get(`https://api.github.com/${urlSuffix}`)
      .then((response) => {
        return response.data.map((repo) => {
          return {
            id: repo.id,
            name: repo.name
          };
        });
      });
  }

  // https://developer.github.com/v3/issues/
  // application/vnd.github.symmetra-preview+json
  getIssuesForRepository(projectName, repositoryName) {
    const urlMidfix = `${projectName}/${repositoryName}`;

    return axios.get(`https://api.github.com/repos/${urlMidfix}/issues`)
      .then((response) => {
        return response.data.map((issue) => {
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