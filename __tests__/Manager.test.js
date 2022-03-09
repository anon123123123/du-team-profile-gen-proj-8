const Manager = require('../lib/Manager');


describe('Intern', () => {
    describe('Initialization', () => {
        // Positive test
        it("Should create an object with Intern school and associated methods", () => {
            // Inital Obj
            const name = 'Tester';
            const id = 1337;
            const email = "test@example.com"

            // Arrange
            const officeNumber = "DU"

            // Act
            const obj = new Manager(name,id,email,officeNumber);

            // Assert
            expect(obj.getofficeNumber()).toEqual(officeNumber);
            expect(obj.getRole()).toEqual('Manager');
        });

        // Exception test
        it("should throw an error if not returning Github username and new role", () => {
            // Arrange
            const cb = () => new Manager();
            const err = new Error(
                "Expected parameter 'name' to be a non empty string"
            );

            // Assert
            expect(cb).toThrowError(err);
        });
    });
});
