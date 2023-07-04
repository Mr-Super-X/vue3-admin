/**
 * vue3项目中，如果不用ts这样使用是没问题的
 * const { proxy } = getCurrentInstance()
 *
 * 在ts中使用会报错：报错：类型“ComponentInternalInstance | null”上不存在属性“proxy”
 * 项目中一般会用到很多getCurrentInstance()方法，直接封装一下
 */
import { getCurrentInstance } from 'vue' // 导入getCurrentInstance方法
import type { ComponentInternalInstance } from 'vue' // 导入相应的ts类型

/**
 * 封装vue getCurrentInstance对象
 * @description 解决const { proxy } = getCurrentInstance()在ts中报错
 * @returns object 返回封装后的proxy
 * @example
 * import useCurrentInstance from "@/utils/hooks/useCurrentInstance"
 *
 * const { proxy } = useCurrentInstance()
 */
export default function useCurrentInstance() {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance
  const proxy = appContext.config.globalProperties
  return {
    proxy,
  }
}
