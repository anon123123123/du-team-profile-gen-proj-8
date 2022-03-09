const Engineer = require('../lib/Engineer');


describe('Engineer', () => {
    describe('Initialization', () => {
        // Positive test
        it("Should create an object with name, id, email and associated methods", () => {
            // Inital Obj
            const name = 'Tester';
            const id = 1337;
            const email = "test@example.com"

            // const obj = new Employee(name, id, email);


            // Arrange
            const github = "exampleUser"

            // Act
            const obj = new Engineer(name,id,email,github);

            // Assert
            expect(obj.getGithub()).toEqual(github);
            expect(obj.getRole()).toEqual('Engineer');
        });

        // Exception test
        it("should throw an error if not returning Github username and new role", () => {
            // Arrange
            const cb = () => new Engineer();
            const err = new Error(
                "Expected parameter 'name' to be a non empty string"
            );

            // Assert
            expect(cb).toThrowError(err);
        });
    });
});
