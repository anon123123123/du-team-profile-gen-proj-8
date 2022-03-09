const Employee = require('../lib/Employee');

describe('Employee', () => {
  describe('Initialization', () => {
    // Positive test
    it("Should create an object with name, id, email and associated methods", () => {
      // Arrange
      const name = 'Tester';
      const id = 1337;
      const email = "test@example.com"

      // Act
      const obj = new Employee(name, id, email);

      // Assert
      expect(obj.name).toEqual(name);
      expect(obj.id).toEqual(id);
      expect(obj.email).toEqual(email);
      expect(obj.getName()).toEqual(name);
      expect(obj.getRole()).toEqual('Employee');
    });

    // Exception test
    it("should throw an error if not provided a 'text' value for name and email and number value for id", () => {
      // Arrange
      const cb = () => new Employee();
      const err = new Error(
        "Expected parameter 'name' to be a non empty string"
      );

      // Assert
      expect(cb).toThrowError(err);
    });
  });
});
