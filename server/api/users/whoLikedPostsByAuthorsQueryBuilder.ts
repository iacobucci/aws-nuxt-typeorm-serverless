import type { UsersWhoLikedPostsByAuthors } from "~/types/api"
import { User } from "~/entities/User";
import { ensureDataSource } from "~/server/utils/datasource";

export default defineEventHandler(async event => {

	await ensureDataSource();

	const body = await readBody<UsersWhoLikedPostsByAuthors>(event);

	const usernames = body.usernames;

	const users = await User.createQueryBuilder("user")
		.innerJoin("user.likedPosts", "likedPost")
		.innerJoin("likedPost.author", "author")
		.where("author.username IN (:...usernames)", {
			usernames: [...usernames],
		})
		.distinct(true)
		.getMany();


	return {
		status: 200,
		body: {
			users
		}
	}

})
