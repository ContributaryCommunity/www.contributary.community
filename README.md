# contributary
[![GitHub release](https://img.shields.io/github/tag/ContributaryCommunity/www.contributary.community.svg)](https://github.com/ContributaryCommunity/www.contributary.community/tags)
![GitHub Actions status](https://github.com/ProjectEvergreen/greenwood/workflows/Master%20Integration/badge.svg)
[![GitHub issues](https://img.shields.io/github/issues-raw/ContributaryCommunity/www.contributary.community.svg)](https://github.com/ContributaryCommunity/www.contributary.community/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/ContributaryCommunity/www.contributary.community.svg)](https://github.com/ContributaryCommunity/www.contributary.community/issues)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/ContributaryCommunity/www.contributary.community/master/LICENSE.md)

## Overview
The goal of Contributary is to help those looking to get started with contributing to OSS projects by providing a convenient and easy way to search for great projects on GitHub that could use their help!

![Contributary](https://s3.amazonaws.com/hosted.contributary.community/media/contributary-screenshot-0.3.0.png)

## Usage
To use the application, follow the prompts:
1. Pick a language
1. Based on language selection, select a project
1. Based on project selection, pick a repository
1. Browse issues
1. ???
1. Profit

## Architecture
This is the main UI to the entire project.  It maps a custom topology created to help the UI stitch together repositories and issues for given GitHub projects.

Essentially, the topology is heirachical based on
- Language: it all starts with a programming language
- Projects: array of projects (orgs, users) which is right now a static list
- Repostiories: array or repos, this can be a wildcard (`*`), which will be fetched from GitHub, or as a static list
- Issues: array of issues from a repo, and not part of the topology here as issues will always be fetched from GitHub

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
      "//": "/* ... */"
    }
  }
}
```

For more information, visit the [wiki](https://github.com/ContributaryCommunity/contributary/wiki).

## Development
This project is an evergreen web application, bootstrapped from [Create Evergeen App](https://github.com/ContributaryCommunity/www.contributary.community) using modern JavaScript and CSS features, powered by [`LitElement`](https://github.com/Polymer/lit-element) and [Web Components](https://www.webcomponents.org/).  

### Setup
To start developing, you will need:
1. [NodeJS LTS](https://nodejs.org) >= 14.x
1. [Yarn](https://yarnpkg.com/) >= 1.x
1. Clone this repo
1. Run `yarn install`

### Tasks
Tasks are defined per [Create Evergreen App](https://github.com/ContributaryCommunity/www.contributary.community#development).