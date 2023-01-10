const { AuthenticationError } = require('apollo-server-express');
// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            const foundUser = await User.findOne({
                $or: [{ _id: context.user ? context.user._id : args.id }, { username: args.username }],
              });
          
              if (!foundUser) {
                throw new AuthenticationError('Incorrect credentials');
              }
              return (foundUser);
        },
    },
    Mutation: {
        createUser: async(parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { username, email, password }) => {
            const user = await User.findOne({ username: username, email: email });
      
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
        },
        saveBook: async(parent, args, context) => {
            console.log(context.user);
            try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: args } },
                { new: true, runValidators: true }
            );
            return (updatedUser);
            } catch (err) {
            console.log(err);
                throw new AuthenticationError('Incorrect credentials');
            }
        },
        deleteBook: async(parent, args, context) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: args.bookId } } },
                { new: true }
            );
            if (!updatedUser) {
            throw new AuthenticationError('Incorrect credentials');
            }
            return (updatedUser);
        },
    }
}

module.exports = resolvers;