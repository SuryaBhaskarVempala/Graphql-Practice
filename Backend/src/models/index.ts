import { User } from "./User";
import { Post } from "./Post";

// One user can have many posts
User.hasMany(Post, { foreignKey: "userId", as: "posts" });
Post.belongsTo(User, { foreignKey: "userId", as: "users" });

export { User, Post };
