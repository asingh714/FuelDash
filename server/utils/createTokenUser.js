const createTokenUser = (user) => {
  const { _id, name, subscriptionStatus } = user;

  return { userId: _id, name, subscriptionStatus };
};

module.exports = createTokenUser;
