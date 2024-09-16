describe('E2E Test für Benutzer-Workflows', () => {
    before(() => {
      // Besucht die Anmeldeseite
      cy.visit('http://localhost:3000/de');
    });
    
    it('Benutzer wird nach dem Einloggen auf das Dashboard weitergeleitet', () => {
      // Klickt auf "Anmelden" in der Navigationsleiste
      cy.get('a.nav-link').contains('Anmelden').click();
      // Benutzeranmeldedaten eingeben
      cy.get('input[placeholder="Email"]').type('tchokotemarion@gmail.com');
      cy.get('input[placeholder="Passwort"]').type('qwertz');
      
      // Anmeldetaste klicken
      cy.get('button').contains('Anmelden').click();
      cy.wait(2000);
      cy.visit('http://localhost:3000/de/dashbord');
      // Überprüft, ob die Seite auf das Dashboard umleitet
      cy.url().should('include', '/dashbord');

      // Gehe zur Seite, um eine neue These zu erstellen
      cy.visit('http://localhost:3000/de/thesis/list');
      cy.get('button').contains('Neue These').click();

      // Formularfelder ausfüllen
      cy.get('input[placeholder="Titel"]').type('Neue Testthese');
      cy.get('select[id="level-select"]').select('BACHELOR');
      cy.get('select[id="status-select"]').select('OPEN');
      cy.get('.CodeMirror').then((editor) => {
        // Casting des Editors auf das korrekte Typ, um die CodeMirror-Instanz zu erhalten
        const cmInstance = (editor[0] as any).CodeMirror; 
        cmInstance.setValue('Beschreibung der Testthese'); // Setzt den Wert direkt im Editor
      });
      cy.get('input[type="date"]').first().type('2024-09-12');
      cy.get('input[type="date"]').eq(1).type('2024-09-15');
      cy.get('input[type="date"]').last().type('2024-12-15');
      cy.get('button').contains('Thema erstellen').click();

      // Überprüfen, ob die neue These in der Liste angezeigt wird
      cy.url().should('include', '/thesis/list');

      cy.get('button')
      .filter(':has(svg[width="15"][height="15"][viewBox="0 0 15 15"])') // Selektor für den Button mit dem SVG
      .last() // Falls es mehrere Buttons gibt, wird der letzte verwendet
      .click();

      cy.contains('Neue Testthese').should('be.visible');
      //Wählt die bestehende These aus, die bearbeitet werden soll
      cy.contains('Neue Testthese').click();

      //Änderungen an einer bestehenden These werden korrekt gespeichert
      cy.get('button').contains('These bearbeiten').click();
      cy.get('input[placeholder="Titel"]').clear().type('Geänderte Testthese');
      cy.get('select[id="level-select"]').select('MASTER');
      cy.get('.CodeMirror').then((editor) => {
        // Casting des Editors auf das korrekte Typ, um die CodeMirror-Instanz zu erhalten
        const cmInstance = (editor[0] as any).CodeMirror; 
        cmInstance.setValue('Geänderte Beschreibung der Testthese'); // Setzt den Wert direkt im Editor
      });
      cy.get('button').contains('Thema aktualisieren').click();
      cy.contains('Geänderte Testthese').should('be.visible');
      cy.contains('Geänderte Beschreibung der Testthese').should('be.visible');
    });
  });
  