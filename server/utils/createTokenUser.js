const createTokenUser = (user) => {
  const { _id, name } = user;
  console.log("createTokenUser -> user", user);
  return { userId: _id, name };
};

module.exports = createTokenUser;
