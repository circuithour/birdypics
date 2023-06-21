// vite.config.js
const { resolve } = require('path')
module.exports = {
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                admin: resolve(__dirname, 'admin/index.html'),
                privacy: resolve(__dirname, 'privacy/index.html')
            }
        }
    }
}