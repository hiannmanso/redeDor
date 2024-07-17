describe("Consulta de CEP", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173"); // URL do seu app rodando com Vite
  });

  it("deve retornar um endereço válido para um CEP existente", () => {
    const cep = "21210-140"; // Substitua pelo CEP que você está testando

    cy.get("input#cep").type(cep);
    cy.get("button").contains("Enviar").click();

    cy.get(".bg-white").should("exist"); // Verifica se o endereço foi exibido
    cy.get(".bg-white").contains("Praça Nupeba"); // Verifica se o endereço correto foi exibido
  });

  it("deve mostrar um erro para um CEP inválido", () => {
    const cep = "00000-000"; // Substitua por um CEP que você sabe que não existe

    cy.get("input#cep").type(cep);
    cy.get("button").contains("Enviar").click();

    cy.get(".bg-red-100").should("exist"); // Verifica se a mensagem de erro foi exibida
    cy.get(".bg-red-100").contains("CEP não encontrado ou inválido."); // Verifica a mensagem de erro
  });
});
