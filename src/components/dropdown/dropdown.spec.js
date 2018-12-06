import { html } from '@polymer/lit-element';
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

    beforeEach(async () => {
      testBed = document.createElement('div');
      template = html`
        <cc-dropdown label="${label}" .options="${options}"></cc-dropdown>
      `;

      render(template, testBed);
      dropdown = testBed.firstElementChild;

      await dropdown.updateComplete;
    });

    afterEach(() => {
      dropdown.remove();
      dropdown = null;
    });

    it('should have one default element', () => {
      const select = dropdown.shadowRoot.querySelectorAll('#option_def');

      expect(select.length).toBe(1);
    });

    it(`should have ${numOptions} options`, () => {
      const selectOptions = dropdown.shadowRoot.querySelectorAll('.dropdown-el input');

      // +1  accounts for default option
      expect(selectOptions.length).toBe(numOptions + 1);
    });

    it('first option should have no value', () => {
      const defaultSelectOption = dropdown.shadowRoot.querySelectorAll('.dropdown-el input')[0];

      expect(defaultSelectOption.value).toBe('');
    });

    it('should have a label for default option that matches the passed in label', () => {
      const defaultSelectOption = dropdown.shadowRoot.querySelectorAll('.dropdown-el label')[0];

      expect(defaultSelectOption.innerText).toMatch(label);
    });

    it('should have option values that match the passed in options', () => {
      const userSelectOptions = Array.from(dropdown.shadowRoot.querySelectorAll('.dropdown-el input')).filter((option) => {
        return option.value !== '';
      });

      userSelectOptions.forEach((option, index) => {
        expect(option.value).toBe(options[index].value);
        expect(option.value).toMatch(options[index].value);
      });
    });
  });

});