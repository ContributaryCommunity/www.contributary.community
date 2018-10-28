# contributary

## Overview
The goal of Contributary is to help those looking to get started with contributing to OSS projects by providing a convenient and easy way to search for great projects on GitHub that could use their help!

## Usage
To use the application, follow the prompts
1. Pick a language
1. Based on language selection, select a project
1. Based on project selection, pick a repository
1. Browse issues
1. ???
1. Profit

## Architecture
This is the main UI to the entire project.  It maps a custom topology created to help the UI stitch together repositories and issues for given GitHub projects.

Essentially, the topology is heirachical based on
```shell
- language: it all starts with a programming language

  - projects: array of projects (orgs, users) which is right now a static list

    - repostiories: array or repos, this can be a wildcard (`*`), which will be fetched from GitHub, or as a static list
      
      - issues: array of issues from a repo, and not part of the topology here as issues will always be fetched from GitHub
```

Here a small example:
```json
{
  "language": {
    "javascript": {
      "label": "JavaScript",
      "projects": [{
        "name": "ProjectEvergreen",
        "type": "org",
        "repositories": ["*"]
      }, {
        "name": "thescientist13",
        "type": "user",
        "repositories": [{
          "name": "github-dashboard"
        }]
      }]
    },
    "php": {
      "label": "PHP",
      "projects": [{
        "name": "composer",
        "type": "org",
        "repositories": ["*"]
      }]
    },
    "etc": {
      /* ... */
    }
  }
}
```

For more information, visit the [wiki](TODO).

## Development
This project is an evergreen web application, bootstrapped from [Create Evergeen App](https://github.com/ProjectEvergreen/create-evergreen-app) using modern JavaScript and CSS features, powered by [`LitElement`](https://github.com/Polymer/lit-element) and [Web Components](https://www.webcomponents.org/).  


### Setup
To start developing, you will need:
1. [NodeJS LTS](https://nodejs.org) 8.x
1. [Yarn](https://yarnpkg.com/) >= 1.x
1. Clone this repo
1. Run `yarn install`

### Tasks
Tasks are defined per [Create Evergreen App](https://github.com/ProjectEvergreen/create-evergreen-app#development).