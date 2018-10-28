import { html, LitElement } from '@polymer/lit-element'; 
import css from './issues-list.css';

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
      <style>
        ${css}
      </style>

      <table>
        <thead>
          <tr>
            <th>Issue No.</th>  
            <th>Title</th>
          </tr>
        </thead>

        <tbody>
        ${issues.map((issue) => {
          const labels = issue.labels.map((label) => {
            return html`
              <span
                style="background-color: #${label.color}"
                class="issue-label">${label.name}
              </span>
            `;
          });

          return html`
            <tr class="issue-row">
              <td><a href="${issue.url}" target="_blank">${issue.number}</a></td>
              <td><a href="${issue.url}" target="_blank">${issue.title}</a></td>
              ${labels}
            </tr>
          `;
        })}
        </tbody>
      </table>
    `;
  }
  /* eslint-enable indent */
}

customElements.define('eve-issues-list', IssuesListComponent);