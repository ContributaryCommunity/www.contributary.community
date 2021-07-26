import { expect } from '@esm-bundle/chai';
import './header.js';

describe('Header Component', () => {
  let header;

  beforeEach(async () => {
    header = document.createElement('cc-header');

    document.body.appendChild(header);

    await header.updateComplete;
  });

  afterEach(() => {
    header.remove();
    header = null;
  });

  describe('Default Behavior', () => {
    
    describe('Greeting', () => {
      
      it('should have a greeting', () => { 
        const greeting = header.shadowRoot.querySelectorAll('header h1')[0];
  
        expect(greeting.innerHTML).to.equal('Welcome to Contributary!');
      });
    });
    
  });

});