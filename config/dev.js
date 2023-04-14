import { rootBase } from "./proxy";

export const env = {
  NODE_ENV: '"development"'
};
export const defineConstants = {};
export const mini = {};
export const h5 = {
  devServer: {
    host: 'localhost',
    port: 10086,
    proxy: {
      '/': {
        target: rootBase, // 服务端地址
        changeOrigin: true,
      },
    },
  },
};
