import * as axios from 'axios';
import { credentials } from '../credentials';

export class GitHubService {

  // TODO should use fetch
  constructor() {
    axios.defaults.headers.common.Accept = 'application/vnd.github.v3+json';
    axios.defaults.headers.common.Authorization = `token ${credentials.token}`;
  }

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
}