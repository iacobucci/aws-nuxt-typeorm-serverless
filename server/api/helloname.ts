export default defineEventHandler(event => {
	const query = getQuery(event)
	return 'Hello ' + query.name + '!'
})
