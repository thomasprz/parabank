import { faker } from "@faker-js/faker";

export function payeeInformationFaker() {
  return {
    name: faker.person.firstName(),
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    phoneNumber: faker.phone.number(),
    accountNumber: faker.string.numeric(5)
  };
}