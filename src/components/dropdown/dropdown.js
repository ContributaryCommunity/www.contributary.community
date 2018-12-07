import { html, LitElement } from '@polymer/lit-element';
import css from './dropdown.css';

class DropdownComponent extends LitElement {
  static get properties() {
    return {
      label: {
        type: String
      },
      options: {
        type: Array
      },
      selected: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this._boundListener = this.close.bind(this);
    this.setDropdown = this.handleDropdown.bind(this);
  }

  handleEvent(e) {
    e.preventDefault();
    e.stopPropagation();
    let selected = '';

    if (e.target.htmlFor) {
      selected = e.target.parentNode;
      if (e.target.htmlFor !== 'option_def') {
        this.setSelected(this.shadowRoot.querySelector('#' + e.target.htmlFor).value);
        selected.classList.add('selection');
      }
    } else {
      selected = e.target;
    }
    this.handleDropdown(selected);
    selected.classList.toggle('expanded');
  }

  setSelected(selected) {
    let idx = this.options.findIndex(({ value }) => {
      return value === selected;
    });

    let previousCheck = this.options.findIndex(({ checked }) => {
      return checked;
    });

    if (previousCheck > -1) {
      this.options[previousCheck].checked = false;
    }

    if (idx > -1) {
      this.options[idx].checked = true;
      this.selected = this.options[idx].value;
      this.optionSelectedCallback(this.selected, idx);
    }
    this.dropdown.scrollTop = 0;
  }

  handleDropdown(drop) {
    this.dropdown = drop;
  }

  connectedCallback() {
    this.shadowRoot.addEventListener('click', this.handleEvent.bind(this), true);
    window.addEventListener('click', this._boundListener, false);
  }

  disconnectedCallback() {
    this.shadowRoot.addEventListener('click', this.handleEvent.bind(this), true);
    window.addEventListener('click', this._boundListener, false);
  }

  close() {
    if (this.dropdown) {
      this.dropdown.classList.remove('expanded');
    }
  }

  renderItems(items, label) {
    const renderOption = (label, value, checked, id) => html`<input type="checkbox" name="sortType" ?checked=${checked} value=${value} id=${id}><label for=${id}>${label}</label>`;

    if (typeof label === 'undefined') {
      return items.map(({ label, value, checked }, idx) => {
        return renderOption(label, value, checked, `option_${idx}`);
      });
    }
    return renderOption(label, '', false, 'option_def');
  }

  render() {
    let { options, label } = this;

    return html`
    <style>
      ${css}
    </style>
      <span class="dropdown-el">
        ${this.renderItems(options, label)}
        ${this.renderItems(options)}
      </span>
    `;
  }
}

customElements.define('cc-dropdown', DropdownComponent);