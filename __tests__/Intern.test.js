const Intern = require('../lib/Intern');


describe('Intern', () => {
    describe('Initialization', () => {
        // Positive test
        it("Should create an object with Intern school and associated methods", () => {
            // Inital Obj
            const name = 'Tester';
            const id = 1337;
            const email = "test@example.com"

            // Arrange
            const school = "DU"

            // Act
            const obj = new Intern(name,id,email,school);

            // Assert
            expect(obj.getSchool()).toEqual(school);
            expect(obj.getRole()).toEqual('Intern');
        });

        // Exception test
        it("should throw an error if not returning Github username and new role", () => {
            // Arrange
            const cb = () => new Intern();
            const err = new Error(
                "Expected parameter 'name' to be a non empty string"
            );

            // Assert
            expect(cb).toThrowError(err);
        });
    });
});
