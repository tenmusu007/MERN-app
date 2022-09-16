import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		open: true,
		host: true,
		port : 5000,
		proxy: {
			"/auth": {
				target: "http://localhost:9000",
				changeOrigin: true,
			},
		},
	},
	plugins: [react()],
});
