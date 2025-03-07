import "reflect-metadata";
import { DataSource } from "typeorm";
import type { DataSourceOptions } from "typeorm";
import { Client } from "pg"

import { Message } from "~/entities/Message";
import { Post } from "~/entities/Post";
import { User } from "~/entities/User";

// Inserire le classi delle entità qui
let entities = [User, Message, Post];

let options: DataSourceOptions;

if (process.env.NODE_ENV === "development") {
	options = {
		type: "postgres",
		host: "localhost",
		database: "dev",
		port: 5432,
		username: "dev",
		password: "dev",
		ssl: false,
		synchronize: true,
		logging: true,
		entities,
		migrations: [],
		subscribers: [],
	}
}

else if (process.env.NODE_ENV === "test") {
	options = {
		type: "postgres",
		host: "localhost",
		database: "test",
		port: 5432,
		username: "dev",
		password: "dev",
		ssl: false,
		synchronize: true,
		logging: true,
		entities,
		migrations: [],
		subscribers: [],
	}
	// create test database

	const client = new Client({
		host: options.host,
		port: options.port,
		user: options.username,
		password: options.password,
		database: "postgres"
	})

	try {
		await client.connect()

		// Verifica se il database esiste
		const checkDb = await client.query(
			"SELECT 1 FROM pg_database WHERE datname = $1",
			["test"]
		)

		if (checkDb.rowCount === 0) {
			// Il database non esiste, quindi lo creiamo
			await client.query("CREATE DATABASE test")
			console.log("Database 'test' creato con successo")
		}
	} catch (error) {
		console.error("Errore durante la creazione del database:", error)
		throw error
	} finally {
		await client.end()
	}

}

else {
	options = {
		type: "postgres",
		host: process.env.DB_HOSTNAME,
		database: process.env.DB_NAME,
		port: parseInt(process.env.DB_PORT || "5432"),
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		ssl: false,
		synchronize: false,
		logging: true,
		entities,
		migrations: [],
		subscribers: [],
		extra: {
			max: 1,
			min: 0,
			connectionTimeoutMillis: 30000,
			keepAlive: false, // Important!
			keepAliveInitialDelayMillis: 5000,
			query_timeout: 10000,
		},
		connectTimeoutMS: 30000,
	}
}

export const AppDataSource = new DataSource(options);

export async function ensureDataSource() {
	try {
		if (!AppDataSource.isInitialized) {
			await AppDataSource.initialize();
			console.log('✅ Typeorm inizializzato');
		} else {
			// Verifica se la connessione è ancora valida
			await AppDataSource.query('SELECT 1');
		}
	} catch (error) {
		console.error('❌ Errore durante la verifica o inizializzazione di Typeorm', error);
		if (AppDataSource.isInitialized) {
			await AppDataSource.destroy(); // Chiudi il DataSource esistente
		}
		await AppDataSource.initialize(); // Re-inizializza
	}
}

// let isInitializing = false;

// export async function initialize() {
// 	try {
// 		// Se è già inizializzato, restituisci subito
// 		if (AppDataSource.isInitialized) {
// 			return AppDataSource;
// 		}

// 		// Se sta già inizializzando, attendi
// 		if (isInitializing) {
// 			console.log('⏳ Attesa inizializzazione in corso...');
// 			// Attendi che l'inizializzazione in corso termini
// 			while (isInitializing && !AppDataSource.isInitialized) {
// 				await new Promise(resolve => setTimeout(resolve, 100));
// 			}
// 			return AppDataSource;
// 		}

// 		// Inizia il processo di inizializzazione
// 		isInitializing = true;
// 		console.log('🔄 Avvio inizializzazione Typeorm...');

// 		await AppDataSource.initialize();

// 		console.log('✅ Typeorm inizializzato', {
// 			type: AppDataSource.options.type,
// 			database: AppDataSource.options.database
// 		});

// 		isInitializing = false;
// 		return AppDataSource;
// 	} catch (error) {
// 		isInitializing = false;
// 		console.error('❌ Errore inizializzazione Typeorm', error);
// 		throw error;
// 	}
// }

// // Global variable maintained across Lambda invocations
// let dataSourceInitPromise: Promise<DataSource> | null = null;

// export async function initialize() {
// 	// If already initialized, return immediately
// 	if (AppDataSource.isInitialized) {
// 		return AppDataSource;
// 	}

// 	// If initialization is in progress, wait for it
// 	if (dataSourceInitPromise) {
// 		try {
// 			await dataSourceInitPromise;
// 			return AppDataSource;
// 		} catch (error) {
// 			// If previous initialization failed, we'll retry below
// 			console.log('Previous initialization failed, retrying...');
// 			dataSourceInitPromise = null;
// 		}
// 	}

// 	// Start initialization
// 	console.log('🔄 Starting TypeORM initialization...');
// 	dataSourceInitPromise = AppDataSource.initialize()
// 		.then(() => {
// 			console.log('✅ TypeORM initialized', {
// 				type: AppDataSource.options.type,
// 				database: AppDataSource.options.database
// 			});
// 			return AppDataSource;
// 		})
// 		.catch(error => {
// 			console.error('❌ TypeORM initialization error', error);
// 			dataSourceInitPromise = null;
// 			throw error;
// 		});

// 	return dataSourceInitPromise;
// }