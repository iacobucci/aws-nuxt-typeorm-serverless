import { User } from "~/entities/User"
import { ensureDataSource } from "~/server/utils/datasource"

export default defineEventHandler(async (event) => {
	try {
		// Assicurati che il DataSource sia inizializzato e pronto
		await ensureDataSource();

		// Esegui la query sul database
		let users = await User.find();

		return {
			status: 200,
			body: {
				users,
			},
		};
	} catch (error) {
		console.error("Errore nell'handler:", error);
		return {
			status: 500,
			body: {
				error: "Internal Server Error",
			},
		};
	}

})
