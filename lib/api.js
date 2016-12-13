const faker = require('faker')

module.exports = {
  getUser () {
    return {
      name:    faker.name.findName(),
      email:   faker.internet.email(),
      address: faker.address.streetAddress(),
      bio:     faker.lorem.sentence(),
      image:   faker.image.avatar()
    }
  }
}
