describe('shared-ui: BtnSearch component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=btnsearch--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to BtnSearch!');
    });
});
