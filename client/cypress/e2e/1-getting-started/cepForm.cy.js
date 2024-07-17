describe("Consulta de CEP", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173"); 
  });

  it("deve retornar um endereço válido para um CEP existente", () => {
    const cep = "21210-140"; 

    cy.get("input#cep").type(cep);
    cy.get("button").contains("Enviar").click();

    cy.get(".bg-white").should("exist");
    cy.get(".bg-white").contains("Praça Nupeba"); 
  });

  it("deve mostrar um erro para um CEP inválido", () => {
    const cep = "00000-000"; 

    cy.get("input#cep").type(cep);
    cy.get("button").contains("Enviar").click();

    cy.get(".bg-red-100").should("exist"); 
    cy.get(".bg-red-100").contains("CEP não encontrado ou inválido."); 
  });
});
