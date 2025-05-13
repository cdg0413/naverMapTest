// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import detect from 'detect-port';

const basePort = 8080;

export default defineConfig(async () => {
    const availablePort = await findAvailablePort(basePort);

    return {
        plugins: [vue()],
        server: {
            port: availablePort,
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
    };
});

// 포트 사용 가능할 때까지 하나씩 증가
async function findAvailablePort(start) {
    let port = start;
    while (true) {
        const available = await detect(port);
        if (available === port) return port;
        port++;
    }
}
