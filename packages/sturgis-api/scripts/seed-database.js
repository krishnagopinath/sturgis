const { userData } = require('../src/common/seed')
const userModel = require('../src/user/user-model')

console.log('Begin seeding user data...')
userModel
    .insertMany(userData)
    .then(() => {
        console.log('Seeding complete! ✨')
        process.exit(0)
    })
    .catch(err => {
        console.error('Seeding error', err)
    })
