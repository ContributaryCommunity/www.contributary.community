import './footer.js';

describe('Footer Component', () => {
  let footer;

  beforeEach(async () => {
    footer = document.createElement('cc-footer');

    document.body.appendChild(footer);

    await footer.updateComplete;
  });

  afterEach(() => {
    footer.remove();
    footer = null;
  });

  describe('Default Behavior', () => {

    it('should have one footer element', () => {
      const footerElement = footer.shadowRoot.querySelectorAll('footer');

      expect(footerElement.length).toBe(1);
    });

    it('should have a message', () => {
      const message = footer.shadowRoot.querySelectorAll('footer span');

      expect(message.innerHTML).toBeUndefined('💙 The Contributary Community');
    });
  });

  describe('Social Media Links', () => {
    let links;
    let images;

    beforeEach(() => {
      links = footer.shadowRoot.querySelectorAll('footer a');
      images = footer.shadowRoot.querySelectorAll('footer a img');
    });

    afterEach(() => {
      links = null;
      images = null;
    });

    it('should have 2 links', () => {
      expect(links.length).toBe(2);
    });

    it('should have two images', () => {
      expect(images.length).toBe(2);
    });

    describe('GitHub Link', () => {
      const index = 0;

      it('should have a link to the Contributary GitHub repo', () => {
        expect(links[index].href).toBe('https://github.com/ContributaryCommunity');
      });

      it('should have an image inside the Contributary GitHub repo link', () => {
        expect(images[index].alt).toBe('GitHub Logo');
      });
    });

    describe('Twitter Link', () => {
      const index = 1;

      it('should have a link to the Contributary Twitter account', () => {
        expect(links[index].href).toBe('https://twitter.com/ContributaryCmt');
      });

      it('should have an image inside the Contributary Twitter account link', () => {
        expect(images[index].alt).toBe('Twitter Logo');
      });
    });
  });

});