/**
 * 生成嵌套菜单树
 * @description 注意菜单每一项的path必须有嵌套关系
 * @param routes 扁平的路由一维数组
 * @returns 处理好的路由树
 */
export function buildRoutesToTree(routes) {
  const map = {}
  const roots = []

  routes.forEach(item => {
    map[item.path] = { ...item, children: [] }
  })

  routes.forEach(item => {
    const parent = map[item.path.split('/').slice(0, -1).join('/')]
    if (parent) {
      parent.children.push(map[item.path])
    } else {
      roots.push(map[item.path])
    }
  })

  return roots
}
