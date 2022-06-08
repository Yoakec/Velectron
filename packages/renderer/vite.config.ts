/*
 * @Author: Yoakec 1602491057@qq.com
 * @Date: 2022-06-08 00:25:08
 * @LastEditors: Yoakec 1602491057@qq.com
 * @LastEditTime: 2022-06-08 14:57:43
 * @FilePath: \myelectron\packages\renderer\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import resolve, { lib2esm } from 'vite-plugin-resolve'
import electron from 'vite-plugin-electron/renderer'
import pkg from '../../package.json'

import Unocss from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  mode: process.env.NODE_ENV,
  root: __dirname,
  resolve:{
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    }
  },
  plugins: [
    vue(),
    electron(),
    Unocss({
      presets: [
          presetUno(), 
          presetAttributify(), 
          presetIcons()],
    }),
    AutoImport({
      imports: [
        'vue',
        // 'vue/macros',
        // 'vue-router',
        '@vueuse/core',
      ],
      dts:'src/auto-import.d.ts',
    }),
    Components({
      // 指定组件位置，默认是src/components
      dirs: ['src/components'],
      // ui库解析器
      // resolvers: [ElementPlusResolver()],
      extensions: ['vue'],
      // 配置文件生成位置
      dts: 'src/components.d.ts'
    }),
    resolve(
      /**
       * Here you can specify other modules
       * 🚧 You have to make sure that your module is in `dependencies` and not in the` devDependencies`,
       *    which will ensure that the electron-builder can package it correctly
       */
      {
        // If you use the following modules, the following configuration will work
        // What they have in common is that they will return - ESM format code snippets

        // ESM format string
        'electron-store': 'export default require("electron-store");',
        // Use lib2esm() to easy to convert ESM
        // Equivalent to
        /**
         * sqlite3: () => `
         * const _M_ = require('sqlite3');
         * const _D_ = _M_.default || _M_;
         * export { _D_ as default }
         * `
         */
        sqlite3: lib2esm('sqlite3', { format: 'cjs' }),
        serialport: lib2esm(
          // CJS lib name
          'serialport',
          // export memebers
          [
            'SerialPort',
            'SerialPortMock',
          ],
          { format: 'cjs' },
        ),
      }
    ),
  ],
  base: './',
  build: {
    outDir: '../../dist/renderer',
    emptyOutDir: true,
    sourcemap: true,
  },
  server: {
    host: pkg.env.VITE_DEV_SERVER_HOST,
    port: pkg.env.VITE_DEV_SERVER_PORT,
  },
})
