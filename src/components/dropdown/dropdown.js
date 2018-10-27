import { html, LitElement } from '@polymer/lit-element'; 

class DropdownComponent extends LitElement {

  static get properties() {
    return {
      optionSelectedCallback: {
        type: Function
      },
      label: {
        type: String
      },
      options: {
        type: Array
      }
    };
  }

  /* eslint-disable indent */
  render() {
    const { options, label, optionSelectedCallback } = this;

    return html`
      <select @change="${optionSelectedCallback}">
        <option value="">${label}</option>

        ${options.map((option) => {
            return html`<option value="${option.name}">${option.name}</option>`;
          })
        }                        
      </select>
    `;
  }
  /* eslint-enable indent */
}

customElements.define('eve-dropdown', DropdownComponent);