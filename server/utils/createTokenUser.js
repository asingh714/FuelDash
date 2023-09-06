const createTokenUser = (user) => {
  const { _id, name, subscriptionStatus } = user;
  console.log("user", { userId: _id, name, subscriptionStatus });
  return { userId: _id, name, subscriptionStatus };
};

module.exports = createTokenUser;
