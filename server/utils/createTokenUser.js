const createTokenUser = (user) => {
  const { _id, name } = user;

  return { userId: _id, name };
};

module.exports = createTokenUser;
