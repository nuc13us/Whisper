const crypto = require('crypto');

// Defining separate email validation middleware
const validator = require('validator').default;

// BAD: Has 'schemaDirectives'
//ruleid: schema-directives
const apollo_server_1 = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives: {
        rateLimit: rateLimitDirective
    },
});

// Good: Does not have 'schemaDirectives'
//ok: schema-directives
const apollo_server_3 = new ApolloServer({
    typeDefs,
    resolvers,
});

const emailValidator = (req, res, next) => {
  const { email } = req.body;

  if (typeof email !== 'string' || !validator.isEmail(email)) {
    return res.status(NOT_ACCEPTABLE).json({
      message: 'Email is invalid',
    });
  } else {
    next();
  }
  
};


function generateObjectId() {
  return crypto.randomBytes(12).toString('hex');
}

module.exports = {
  emailValidator,
  generateObjectId,
};
