import type { UsersWhoLikedPostsByAuthors } from "~/types/api"
import { User } from "~/entities/User";
import { In } from "typeorm";
import { ensureDataSource } from "~/server/utils/datasource";

export default defineEventHandler(async event => {

	await ensureDataSource();

	const body = await readBody<UsersWhoLikedPostsByAuthors>(event);

	const usernames = body.usernames;

	const authors = await User.find({
		where: [{ username: In(usernames) }],
		relations: { posts: { likedBy: true } },
	});

	const usersWhoLikedAuthorsPosts: User[] = authors.flatMap((author) =>
		author.posts.flatMap((post) => post.likedBy)
	);

	const users = usersWhoLikedAuthorsPosts.sort((a, b) => a.id - b.id);

	return {
		status: 200,
		body: {
			users
		}
	}

})
