describe("Internal Application", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the header correctly", () => {
    cy.get('[data-testid="header"]').should("exist");
    cy.get('[data-testid="app-title"]').should("contain", "Sistema Interno");
    cy.get('[data-testid="main-nav"]').should("exist");
  });

  describe("Navigation", () => {
    it("should navigate to the rooms page", () => {
      cy.get('[data-testid="nav-rooms"]').click();
      cy.url().should("include", "/rooms/");
      cy.get('[data-testid="room-select-container"]').should("exist");
    });

    it("should navigate to the students page", () => {
      cy.get('[data-testid="nav-students"]').click();
      cy.url().should("include", "/students/");
      cy.get('[data-testid="student-select-container"]').should("exist");
    });

    it("should navigate to the inventory page", () => {
      cy.get('[data-testid="nav-inventory"]').click();
      cy.url().should("include", "/inventory");
      cy.get('[data-testid="inventory-list"]').should("exist");
    });
  });

  describe("Rooms", () => {
    beforeEach(() => {
      cy.visit("/rooms/1");
    });

    it("should display the room selector", () => {
      cy.get('[data-testid="room-select"]').should("exist");
      cy.get('[data-testid="room-select"] option').should("have.length.gt", 0);
    });

    it("should allow changing rooms", () => {
      cy.get('[data-testid="room-select"] option').then(($options) => {
        if ($options.length > 1) {
          const firstRoomId = $options.eq(0).val();
          const secondRoomId = $options.eq(1).val();

          cy.get('[data-testid="room-select"]').select(secondRoomId as string);
          cy.url().should("include", `/rooms/${secondRoomId}`);

          cy.get('[data-testid="room-select"]').select(firstRoomId as string);
          cy.url().should("include", `/rooms/${firstRoomId}`);
        }
      });
    });

    it("should display the booking calendar", () => {
      cy.get('[data-testid="room-calendar"]').should("exist");
    });
  });

  describe("Students", () => {
    beforeEach(() => {
      cy.visit("/students/10810");
    });

    it("should display the student selector", () => {
      cy.get('[data-testid="student-select"]').should("exist");
      cy.get('[data-testid="student-select"] option').should(
        "have.length.gt",
        0,
      );
    });

    it("should allow changing students", () => {
      cy.get('[data-testid="student-select"] option').then(($options) => {
        if ($options.length > 1) {
          const firstStudentId = $options.eq(0).val();
          const secondStudentId = $options.eq(1).val();

          cy.get('[data-testid="student-select"]').select(
            secondStudentId as string,
          );
          cy.url().should("include", `/students/${secondStudentId}`);

          cy.get('[data-testid="student-select"]').select(
            firstStudentId as string,
          );
          cy.url().should("include", `/students/${firstStudentId}`);
        }
      });
    });

    it("should display the booking calendar", () => {
      cy.get('[data-testid="student-calendar"]').should("exist");
    });
  });

  describe("Inventory", () => {
    beforeEach(() => {
      cy.visit("/inventory");

      cy.get('[data-testid="inventory-list"]', { timeout: 1000 }).should(
        "exist",
      );
    });

    it("should display the inventory sectors and items", () => {
      cy.get('[data-testid^="inventory-item-"]', { timeout: 5000 }).should(
        "have.length.at.least",
        1,
      );

      cy.get('[data-testid^="inventory-item-"]').each(($item) => {
        cy.wrap($item).within(() => {
          cy.get('[data-testid^="inventory-item-"]').should(
            "have.length.at.least",
            1,
          );
        });
      });

      cy.get('[data-testid^="inventory-item-"]')
        .first()
        .within(() => {
          cy.contains("microphone").should("exist");
          cy.contains("Sennheiser").should("exist");
          cy.contains("e981").should("exist");
        });
    });
  });
});
