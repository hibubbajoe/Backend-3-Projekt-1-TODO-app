const { checkNoEmptyFieldsOnRegistration } = require('../utils/userTests');

test('Test that checkNoEmptyFieldsOnRegister returns true if registering correctly', () => {
    const email = "test@test.com";
    let password = "testtest";

    const checkPassed = checkNoEmptyFieldsOnRegistration(email, password);
    expect(checkPassed).toBeTruthy();
})

test('Test that checkNoEmptyFieldsOnRegister returns false if registering incorrectly', () => {
    const email = "test@test.com";
    let password = "";
    const checkFailed = checkNoEmptyFieldsOnRegistration(email, password);
    expect(checkFailed).toBeFalsy();
})