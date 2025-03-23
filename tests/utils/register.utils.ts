import { faker } from "@faker-js/faker";

export function registerDataFaker(){
    return{
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipcode: faker.location.zipCode(),
        phone: faker.phone.number(),
        ssn: faker.helpers.replaceSymbols('###-##-####'),
        username: faker.internet.username(),
        password: faker.internet.password(),
    }
}