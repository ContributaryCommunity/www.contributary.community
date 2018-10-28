import './footer.js';

describe('Footer Component', () => {
  let footer;

  beforeEach(async () => {
    footer = document.createElement('eve-footer');

    document.body.appendChild(footer);

    await footer.updateComplete;
  });

  afterEach(() => {
    footer.remove();
    footer = null;
  });

  describe('Default Behavior', () => {
      
    describe('Link', () => {
      let link;

      beforeEach(() => {
        link = footer.shadowRoot.querySelectorAll('footer a')[0];
      });

      afterEach(() => {
        link = null;
      });

      it('should have a href that links to Project Evergreen', () => {   
        expect(link.href).toBe('https://projectevergreen.github.io/');
      });

      it('should have a title with a meaningful value', () => {   
        expect(link.title).toBe('Contributary home link');
      });

      it('should say Contributary', () => {   
        expect(link.innerHTML).toBe('Contributary');
      });

    });
    
  });

});