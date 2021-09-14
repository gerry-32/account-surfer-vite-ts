import reactRefresh from '@vitejs/plugin-react-refresh'
import { UserConfig, ConfigEnv } from 'vite'
import { join } from 'path'

const srcRoot = join(__dirname, 'src')
const sharedConfig = {
  plugins: [reactRefresh()],
  build: {
    outDir: join(srcRoot, '/out'),
    emptyOutDir: true,
    rollupOptions: {}
  },
  server: {
    port: process.env.PORT === undefined ? 3000 : +process.env.PORT
  },
  optimizeDeps: {
    exclude: ['path']
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }]
  }
}

export default ({ command }: ConfigEnv): UserConfig => {
  // DEV
  if (command === 'serve') {
    return {
      ...sharedConfig
    }
  }
  // PROD
  else {
    return {
      ...sharedConfig,
      base: './' // do not change: replaces index.html path to "C://..."
    }
  }
}
