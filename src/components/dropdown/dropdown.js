import { html, LitElement } from '@polymer/lit-element'; 
import css from './dropdown.css';

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
    let { options, label, optionSelectedCallback } = this;
    
    if (!options) {
      options = [];
    } 
    
    return html`
      <style>
        ${css}
      </style>
      <select @change="${optionSelectedCallback}">
        <option value="">${label}</option>

        ${options.map((option) => {
            return html`<option value="${option.value}">${option.label}</option>`;
          })
        }                        
      </select>
    `;
  }
  /* eslint-enable indent */
}

customElements.define('cc-dropdown', DropdownComponent);