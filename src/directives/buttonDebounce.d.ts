// 给event对象扩展新的属性，要先继承原有的HTMLElement定义，然后再添加新属性
export interface ElHTMLElement extends HTMLElement {
  _BUTTON?: any
}
