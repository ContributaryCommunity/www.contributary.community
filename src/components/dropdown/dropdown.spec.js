import { expect } from '@esm-bundle/chai';
import { spy } from 'sinon';
import { html } from 'lit-element';
import { render } from 'lit-html';
import './dropdown.js';

describe('Dropdown Component', () => {

  describe('Passing Multiple Options', () => {
    let testBed;
    let template;
    let dropdown;
    const numOptions = 4;
    const label = 'My Label';
    const options = new Array(numOptions).fill(null).map((key, index) => {
      return {
        value: `value${index}`,
        label: `label${index}`
      };
    });
    let optionSelected = {
      index: null,
      value: null
    };

    const handleSelection = (value, index) => {
      optionSelected = {
        index,
        value
      };
    };

    beforeEach(async () => {
      optionSelected = {
        value: null,
        index: null
      };

      testBed = document.createElement('div');
      template = html`
        <cc-dropdown label="${label}" .options="${options}" .optionSelectedCallback="${handleSelection}" />
      `;

      render(template, testBed);
      document.body.appendChild(testBed);
      dropdown = testBed.firstElementChild;

      await dropdown.updateComplete;
    });

    afterEach(() => {
      dropdown.remove();
      dropdown = null;
    });

    it('should have one default element', () => {
      const select = dropdown.shadowRoot.querySelectorAll('#option_def');

      expect(select.length).to.equal(1);
    });

    it(`should have ${numOptions} options`, () => {
      const selectOptions = dropdown.shadowRoot.querySelectorAll('.dropdown-el input');

      // +1  accounts for default option
      expect(selectOptions.length).to.equal(numOptions + 1);
    });

    it('first option should have no value', () => {
      const defaultSelectOption = dropdown.shadowRoot.querySelectorAll('.dropdown-el input')[0];

      expect(defaultSelectOption.value).to.equal('');
    });

    it('should have a label for default option that matches the passed in label', () => {
      const defaultSelectOption = dropdown.shadowRoot.querySelectorAll('.dropdown-el label')[0];

      expect(defaultSelectOption.innerText).to.equal(label);
    });

    it('should have option values that match the passed in options', () => {
      const userSelectOptions = Array.from(dropdown.shadowRoot.querySelectorAll('.dropdown-el input')).filter((option) => {
        return option.value !== '';
      });

      userSelectOptions.forEach((option, index) => {
        expect(option.value).to.equal(options[index].value);
      });
    });

    it('should add a click event listener', () => {
      const button = dropdown.shadowRoot.querySelector('.dropdown-el');
      const spyEvent = spy(button, 'click');

      button.click();

      expect(spyEvent.called).to.equal(true);
    });

    it('should expand on click', () => {
      const button = dropdown.shadowRoot.querySelector('.dropdown-el');

      button.click();
      expect(Array.from(button.classList).indexOf('expanded')).to.be.greaterThanOrEqual(0);
    });

    it('should collapse after an item is clicked', () => {
      const button = dropdown.shadowRoot.querySelector('.dropdown-el');

      button.click();
      const selection = button.querySelector('[for="option_0"]');

      selection.click();

      expect(Array.from(button.classList).indexOf('expanded')).to.equal(-1);
    });

    it('should display selected item as default option', () => {
      const button = dropdown.shadowRoot.querySelector('.dropdown-el');

      button.click();
      const selection = button.querySelector('[for="option_0"]');

      selection.click();

      const defaultOption = button.querySelector('[for="option_def"]').textContent;

      expect(defaultOption).to.equal(options[0].label);
    });

    it('should pass the selected option to the optionSelectedCallback', () => {
      expect(optionSelected.value).to.equal(null);
      expect(optionSelected.index).to.equal(null);

      const button = dropdown.shadowRoot.querySelector('.dropdown-el');

      button.click();

      const selection = button.querySelector('[for="option_3"]');

      selection.click();

      expect(optionSelected.value).to.equal('value3');
      expect(optionSelected.index).to.equal(3);
    });

    it('should collapse on click anywhere else in the window', () => {
      const button = dropdown.shadowRoot.querySelector('.dropdown-el');

      button.click();

      document.body.click();

      expect(Array.from(button.classList).indexOf('expanded')).to.equal(-1);
    });
  });

});