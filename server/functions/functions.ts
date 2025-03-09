import { Post } from '~/entities/Post';
import { User } from '~/entities/User';
import { ensureDataSource } from "~/server/utils/datasource";

export async function getAllUsers(page: number) {
	await ensureDataSource();
	const pagesize = 100;
	return User.find(
		{
			skip: (page - 1) * pagesize
			, take: pagesize
		}
	);
}

export async function getPostsByAuthor(username: string) {
	await ensureDataSource();
	return Post.find({
		where: { author: { username } },
		relations: ['author']
	})
}

export async function getLikedPosts(username: string) {
	await ensureDataSource();
	return Post.find({ where: { likedBy: { username } } });
}

export async function getPostById(id: number) {
	await ensureDataSource();
	return Post.findOneOrFail({ where: { id }, relations: { author: true, likedBy: true } });
}

export async function getUser(username: string) {
	await ensureDataSource();
	return User.findOneOrFail({ where: { username } });
}

export async function userPage(username: string) {
	await ensureDataSource();
	return {
		user: await getUser(username),
		posts: await getPostsByAuthor(username),
	}
}