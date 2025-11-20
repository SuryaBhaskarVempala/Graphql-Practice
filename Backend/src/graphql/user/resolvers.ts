import { User, Post } from "../../models"

const Queries = {
    getUsers: async () => {
        return await User.findAll();
    },

    // Fetch single user by ID
    getUser: async (_: any, args: { id: number }) => {
        return await User.findByPk(args.id);
    },

    // Fetch all posts
    getPosts: async () => {
        return await Post.findAll();
    },
};



const Mutations = {
    addUser: async (_: any, args: { name: string; email: string; password: string }) => {
        const { name, email, password } = args;

        if (!name) throw new Error("name is required.");
        if (!email) throw new Error("email is required.");
        if (!password) throw new Error("password is required.");

        return await User.create({ name, email, password });
    },

    updateUser: async (_: any, args: { id: number; name?: string; email?: string; password?: string }) => {
        const user = await User.findByPk(args.id);
        if (!user) throw new Error("User not found.");

        if (args.name !== undefined) user.name = args.name;
        if (args.email !== undefined) user.email = args.email;
        if (args.password !== undefined) user.password = args.password;

        await user.save();
        return user;
    },

    deleteUser: async (_: any, args: { id: number }) => {
        // Use transaction for deleting user and their posts
        return await User.sequelize?.transaction(async (tx) => {
            await Post.destroy({ where: { userId: args.id }, transaction: tx });
            const deleted = await User.destroy({ where: { id: args.id }, transaction: tx });
            return deleted;
        });
    },

    addPost: async (_: any, args: { userId: number; title: string }) => {
        return await Post.create({
            title: args.title,
            userId: args.userId,
        });
    },
};




const UserResolver = {
    posts: async (parent: { id: number }) => {
        return await Post.findAll({ where: { userId: parent.id } });
    },
};




const PostResolver = {
    user: async (parent: { userId: number }) => {
        return await User.findByPk(parent.userId);
    },
};





export const resolvers = {
    Queries,
    Mutations,
    User: UserResolver,
    Post: PostResolver,
};
