import { ref, watch } from 'vue'
import { PAGE_SIZE } from '@/constant/pagination'
import { ElMessage } from 'element-plus'
import type { OptionsType } from './useList.d'

/**
 * 获取列表通用hook
 * @description 页面不复杂时使用该hook能极大提升效率
 * @param listRequestFn 请求列表的api方法
 * @param options 参数信息，参考OptionsType说明
 * @returns object
 * @example
 * import { useList } from '/@/utils/hooks/useList'
 *
 * const form = ref({ // 必须用ref定义
 *	  xxx: xxx
 * })
 *
 * const {
 *	  loading,
 *	  page,
 *	  pageSize,
 *	  list,
 *	  total,
 *	  loadListData
 * } = useList(protectApi.getList, {
 *	  filterOption: form,
 * })
 */
export const useList = <T extends (...args: any) => Promise<any>>(listRequestFn: T, options: OptionsType = {}) => {
  // 获取options参数
  const { filterOption, transformResFn } = options
  // 加载状态
  const loading = ref(false)
  // 当前页
  const page = ref(1)
  // 分页规格
  const pageSize = ref(PAGE_SIZE)
  // 总数量
  const total = ref(0)
  // 数据
  const list = ref([])
  // 是否调用重置
  const isReset = ref(false)
  // loadListData接收的查询参数
  const loadListQuery = ref({})

  // 获取列表数据 query用于参数覆盖
  const loadListData = async (query = {}) => {
    // 将query缓存起来，切换分页器时传入参数，防止参数丢失
    loadListQuery.value = query
    // 开始加载状态
    loading.value = true
    try {
      // 创建查询参数
      const queryParams = Object.assign({}, filterOption ? filterOption.value : {}, {
        page: page.value,
        size: pageSize.value,
        ...query, // 参数覆盖
      })

      // 获取响应数据
      const res = await listRequestFn(queryParams)
      const data = transformResFn ? transformResFn(res?.data || {}) : res?.data || {}

      // 赋值
      const resList = data?.list || []
      const resTotal = parseInt(data?.total)
      list.value = resList
      total.value = resTotal

      // 返回处理好的数据
      return {
        list: resList,
        total: resTotal,
      }
    } catch (error: any) {
      ElMessage.error('请求出错了，', error)
      return {
        list: [],
        total: 0,
      }
    } finally {
      // 无论成功或失败都关闭加载状态
      loading.value = false
      // 每次加载完数据后重置状态置为false，防止调用重置方法后切换分页不能正确加载数据
      isReset.value = false
    }
  }

  // 重置分页器
  const resetPagination = (p = 1, size = PAGE_SIZE) => {
    page.value = p
    pageSize.value = size
    // 调用重置方法时打开开关，防止重复请求
    isReset.value = true
  }

  // 监听到分页变化时重新请求数据
  watch([page, pageSize], async () => {
    // 解决在第n页时重置page为1会导致double请求
    if (isReset.value) {
      return
    }
    try {
      const data = await loadListData(loadListQuery.value)
      // 赋值
      list.value = data.list
      total.value = data.total
    } catch (error: any) {
      ElMessage.error('请求出错了，', error)
    }
  })

  // 返回结果
  return {
    loading,
    page,
    pageSize,
    list,
    total,
    loadListData,
    resetPagination,
  }
}
