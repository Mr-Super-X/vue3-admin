/**
 * 该文件用于管理导出一些不需要权限就可访问的路由name，如login、error等页面
 * 注意：此处添加的路由name对打包也就是生产环境也会生效，而whitelist中的配置只在npm run dev:debug模式下生效
 */
export default ['login']
