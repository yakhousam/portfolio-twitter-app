describe('shared-ui: InputSearch component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=inputsearch--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to InputSearch!');
    });
});
