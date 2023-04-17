// import { Plugin, Component } from 'vue';
// type SFCWithInstall = Component & Plugin;
// export default function (comp: Component) {
//   (comp as SFCWithInstall).install = function (app) {
//     const { name } = comp as { name: string };
//     app.component(name, comp);
//   };
//   return comp;
// }

import { Component, Plugin } from 'vue'
export type SFCWithInstall<T> = T & Plugin
export function withInstall<T>(comp: T) {
  ;(comp as SFCWithInstall<T>).install = function (app) {
    const { name } = comp as unknown as { name: string }
    app.component(name, comp as Component) // 将组件注册成全局的组件
  }
  return comp as SFCWithInstall<T>
}
