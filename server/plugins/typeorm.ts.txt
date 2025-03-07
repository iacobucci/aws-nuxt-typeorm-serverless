// import { AppDataSource, initialize } from '~/server/utils/datasource'

// export default defineNitroPlugin(async () => {
// 	await initialize();
// })

import { ensureDataSource } from '~/server/utils/datasource'

export default defineNitroPlugin(async () => {
  await ensureDataSource();
})