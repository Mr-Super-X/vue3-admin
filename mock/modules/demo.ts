import { IMockItem } from '../index'
/**
 * 使用方法：
 *    1. import request from '@request/index'
 *    2. request({
          url: '/demo/tokens'
        }).then(({data}: any) => {
          return data.data;
        }).then(d => {
          console.log(d)
        })
 */

const mockList: Array<IMockItem> = [
  // getToken
  {
    url: '/auth/oauth/token',
    method: 'get',
    response () {
      return {
        code: 200,
        msg: '成功',
        data: {
          name: 'test get token'
        }
      }
    }
  }
]

export default mockList
