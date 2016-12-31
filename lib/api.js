const faker = require('faker')

let allFriends

function config () {
  const defaultMaxFriends = 24
  return {
    getTotal: defaultMaxFriends
  }
}

function generateFriend () {
  return {
    name:    faker.name.findName(),
    email:   faker.internet.email(),
    address: faker.address.streetAddress(),
    bio:     faker.lorem.sentence(),
    image:   faker.image.avatar(),
    id:      faker.random.uuid(),
    lat:     faker.address.latitude(),
    long:    faker.address.longitude()
  }
}

function generateUser () {
  return {
    name:    faker.name.findName(),
    email:   faker.internet.email(),
    address: faker.address.streetAddress(),
    bio:     faker.lorem.sentence(),
    image:   faker.image.avatar(),
    id:      faker.random.uuid(),
    lat:     faker.address.latitude(),
    long:    faker.address.longitude()
  }
}

module.exports = {

  getFriend (id) {
    let foundFriend

    allFriends.forEach(function (friend) {
      if (friend.id === id) {
        foundFriend = friend
      }
    })

    return foundFriend
  },

  getFriends () {
    let friends = []

    while (friends.length < config().getTotal) {
      friends.push(generateFriend())
    }

    allFriends = friends
    return friends
  },

  getUser () {
    return generateUser()
  }
}
