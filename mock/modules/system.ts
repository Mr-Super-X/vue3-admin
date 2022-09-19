import type { IMockItem } from '../index.d'

export const mockList: Array<IMockItem> = [
  // 获取左侧菜单栏数据
  {
    url: '/system/menu',
    method: 'get',
    response() {
      return {
        code: 200,
        msg: '成功',
        data: {
          // 属性list的值是一个数组，其中含有10-20个元素
          'list|10-20': [
            {
              // 属性 id 是随机id
              id: '@id',
              // 属性 icon是一个#icon-search
              icon: 'search',
              // 属性path是一个5位随机码
              'path|5': '',
              // 属性componentName是一个5位随机码
              'componentName|5': '',
              // 属性children是一个数组，其中含有1-10个元素
              'children|1-10': [
                {
                  id: '@id',
                  // 属性 icon是一个#icon-search
                  icon: '',
                  // 属性path是一个5位随机码
                  'path|5': '',
                  // 属性componentName是一个5位随机码
                  'componentName|5': '',
                },
              ],
            },
          ],
        },
      }
    },
  },
]

export const mockTest: Array<IMockItem> = [
  // 获取左侧菜单栏数据
  {
    url: '/system/test',
    method: 'post',
    response() {
      return {
        code: 200,
        msg: '成功',
        data: {
          // 属性list的值是一个数组，其中含有10-20个元素
          'list|10-20': [
            {
              // 属性 id 是随机id
              id: '@id',
              // 属性componentName是一个5位随机码
              'componentName|5': '',
              // 属性children是一个数组，其中含有1-10个元素
              'children|1-10': [
                {
                  id: '@id',
                  // 属性componentName是一个5位随机码
                  'componentName|5': '',
                },
              ],
            },
          ],
        },
      }
    },
  },
]
