import { html, LitElement } from '@polymer/lit-element'; 

class IssuesListComponent extends LitElement {

  static get properties() {
    return {
      issues: {
        type: Array
      }
    };
  }

  /* eslint-disable indent */
  render() {
    let { issues } = this;

    if (!issues) {
      issues = [];
    }

    return html`
      ${issues.map((issue) => {
          return html`<p><a href="${issue.url}" target="_blank">${issue.title}</a></p>`;
        })
      }
    `;
  }
  /* eslint-enable indent */
}

customElements.define('eve-issues-list', IssuesListComponent);