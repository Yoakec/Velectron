/*
 * @Author: Yoakec 1602491057@qq.com
 * @Date: 2022-06-08 00:25:08
 * @LastEditors: Yoakec 1602491057@qq.com
 * @LastEditTime: 2022-06-08 14:12:40
 * @FilePath: \myelectron\packages\renderer\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import App from './App.vue'
import './samples/node-api'

import 'uno.css'

createApp(App)
  .mount('#app')
  .$nextTick(window.removeLoading)
