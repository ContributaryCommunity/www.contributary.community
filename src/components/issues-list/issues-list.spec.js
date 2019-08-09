import { html } from 'lit-element';
import { render } from 'lit-html';
import './issues-list';

describe('Issues List Component', () => {

  describe('Default Behavior', () => {
    let list;

    beforeEach(async () => {
      list = document.createElement('cc-issues-list');

      document.body.appendChild(list);

      await list.updateComplete;
    });

    afterEach(() => {
      list.remove();
      list = null;
    });

    it('should have one table element', () => {
      const table = list.shadowRoot.querySelectorAll('table');

      expect(table.length).toBe(1);
    });

    it('should have one table head element', () => {
      const thead = list.shadowRoot.querySelectorAll('table thead');

      expect(thead.length).toBe(1);
    });

    it('should have two table head rows', () => {
      const thead = list.shadowRoot.querySelectorAll('table thead tr th');

      expect(thead.length).toBe(3);
      expect(thead[0].innerHTML).toBe('Issue No.');
      expect(thead[1].innerHTML).toBe('Title');
      expect(thead[2].innerHTML).toBe('Labels');
    });

    it('should have one table body', () => {
      const tbody = list.shadowRoot.querySelectorAll('table tbody');

      expect(tbody.length).toBe(1);
    });

    it('should have no issue rows', () => {
      const select = list.shadowRoot.querySelectorAll('select');

      expect(select.length).toBe(0);
    });

  });

  describe('Passing Multiple Issues', () => {
    let testBed;
    let template;
    let list;
    const numItems = 6;
    const issues = new Array(numItems).fill(null).map((key, index) => {
      return {
        title: `title${index}`,
        url: `http://github.com/issue/${index + 1}`,
        number: index.toString(),
        labels: [{
          name: `name${index}`,
          color: index % 2 === 0 ? '010101' : 'aaaaaa'
        }]
      };
    });

    beforeEach(async () => {
      testBed = document.createElement('div');
      template = html`
        <cc-issues-list .issues="${issues}" />
      `;

      render(template, testBed);
      document.body.appendChild(testBed);
      list = testBed.firstElementChild;

      await list.updateComplete;
    });

    afterEach(() => {
      list.remove();
      list = null;
    });

    it(`should have ${numItems} table rows`, () => {
      const rows = list.shadowRoot.querySelectorAll('table tbody tr');

      expect(rows.length).toBe(numItems);
    });

    it(`should have the correct data for all ${numItems} table rows`, () => {
      const rows = list.shadowRoot.querySelectorAll('table tbody tr');

      rows.forEach((row, index) => {
        const issue = issues[index];
        const td = row.querySelectorAll('td');
        const a = td[1].querySelectorAll('a')[0];
        const labels = td[2].querySelectorAll('span');

        expect(td[0].innerHTML).toMatch(issue.number);
        expect(a.href).toMatch(issue.url);
        expect(a.target).toBe('_blank');
        expect(a.innerHTML).toMatch(issue.title);

        expect(labels.length).toBe(1);
        // comes back as rgb? - http://forums.mozillazine.org/viewtopic.php?t=18738
        // expect(labels[0].style.backgroundColor).toMatch(`background-color: #${issue.labels[0].color}`);
        expect(labels[0].innerHTML).toMatch(`${issue.labels[0].name}`);
      });
    });

  });

  describe('Using Filters: Good First Issue', () => {
    let testBed;
    let template;
    let list;
    const filters = ['good first issue'];
    const numItems = 6;
    const expectedItems = numItems / 2;
    const issues = new Array(numItems).fill(null).map((key, index) => {
      return {
        title: `title${index}`,
        url: `http://github.com/issue/${index + 1}`,
        number: index.toString(),
        labels: [{
          name: index % 2 === 0 ? `name${index}` : 'good first issue',
          color: index % 2 === 0 ? '010101' : 'aaaaaa'
        }]
      };
    });

    beforeEach(async () => {
      testBed = document.createElement('div');
      template = html`
        <cc-issues-list .issues="${issues}" .labelFilters="${filters}" />
      `;

      render(template, testBed);
      document.body.appendChild(testBed);
      list = testBed.firstElementChild;

      await list.updateComplete;
    });

    afterEach(() => {
      list.remove();
      list = null;
    });

    it(`should show ${expectedItems} issues when the good first issue filter is provided`, () => {
      const rows = list.shadowRoot.querySelectorAll('table tbody tr');

      expect(rows.length).toBe(expectedItems);
    });

  });

});