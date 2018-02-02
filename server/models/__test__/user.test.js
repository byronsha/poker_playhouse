const expect = require('chai').expect;
const Sequelize = require('sequelize');

describe('User model', () => {
  let db;
  let User;
  let createdUser;

  before(async () => {
    db = new Sequelize('postgresql://localhost/poker_friends_test', { logging: false });
    User = db.define('user', {
      username: Sequelize.STRING,
      password: Sequelize.STRING,
      location: Sequelize.STRING,
      bankroll: Sequelize.FLOAT,
    });
  })

  beforeEach(async () => {
    await User.sync();
    createdUser = await User.create({
      username: 'Byron',
      bankroll: 100,
    });
  })

  afterEach(async () => {
    await User.drop();
  })

  describe('finding a user by id', () => {
    it('should return the user', async () => {
      const user = await User.findById(createdUser.id)
      expect(user.username).to.equal('Byron')
      expect(user.bankroll).to.equal(100)
    })
  })

  describe('finding a user by name', () => {
    it('should return the user', async () => {
      const user = await User.findOne({ where: { username: createdUser.username } })
      expect(user.username).to.equal('Byron');
      expect(user.bankroll).to.equal(100);
    });
  });

  describe('updating the user', () => {
    it('should update the user', async () => {
      await User.update(
        { bankroll: 110 },
        { where: { id: createdUser.id }}
      )
      const user = await User.findById(createdUser.id)
      expect(user.username).to.equal('Byron')
      expect(user.bankroll).to.equal(110)
    });
  });
});