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

        console.log(args);

        if (!name) throw new Error("name is required.");
        if (!email) throw new Error("email is required.");
        if (!password) throw new Error("password is required.");

        return await User.create({ name, email, password });
    },

    updateUser: async (_: any, args: { id: number; name?: string; email?: string; password?: string }) => {
        console.log(args);
        const user = await User.findByPk(args.id);
        if (!user) throw new Error("User not found.");

        if (args.name !== undefined) user.name = args.name;
        if (args.email !== undefined) user.email = args.email;
        if (args.password !== undefined) user.password = args.password;

        await user.save();
        return user;
    },

    deleteUser: async (_: any, args: { id: number }) => {
        return await User.sequelize?.transaction(async (tx) => {
            // Step 1: Find user
            const user = await User.findByPk(args.id, { transaction: tx });

            // Step 2: If no user, return null (GraphQL will return null)
            if (!user) {
                return null;
            }

            // Step 3: Delete posts
            await Post.destroy({ where: { userId: args.id }, transaction: tx });

            // Step 4: Delete user
            await User.destroy({ where: { id: args.id }, transaction: tx });

            // Step 5: Return the deleted user's data
            return user;
        });
    },


    addPost: async (_: any, args: { userId: number; title: string }) => {
        console.log(args);

        return await Post.create({
            title: args.title,
            userId: Number(args.userId),
        });
    }

};




const UserResolver = {
    posts: async (parent: { id: number }) => {
        const user_posts = await Post.findAll({ where: { userId: parent.id } });
        return user_posts || [];
    },
};




const PostResolver = {
    user: async (parent: { userId: number }) => {
        const post_user = await User.findByPk(parent.userId);
        return post_user || [];
    },
};





export const resolvers = {
    Queries,
    Mutations,
    User: UserResolver,
    Post: PostResolver,
};
