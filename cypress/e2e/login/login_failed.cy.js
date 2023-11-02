describe('Failed login Test', () => {
  it('This test validates that a message is displayed when the username or password is incorrect.', () => {
    // Visita la página de inicio de sesión
    cy.visit('http://localhost:3000/#/login');

    // Rellena el formulario con las credenciales
    cy.get('input[name="username"]').type('leidy1993');
    cy.get('input[name="password"]').type('3118514322');

    // Envía el formulario
    cy.get('button[type="submit"]').click();

    // Verifica si se inició sesión correctamente
    cy.url().should('include', 'http://localhost:3000/#/'); // Ajusta la URL a tu redirección después del inicio de sesión

    // Verifica si el usuario está autenticado (podrías buscar un elemento específico en la página de inicio para confirmar que se ha iniciado sesión)
    cy.contains('Usuario o contraseña incorrectos'); // Ajusta el texto según lo que aparezca después del inicio de sesión
  });
});
