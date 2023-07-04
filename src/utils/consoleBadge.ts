/**
 * 在控制台输出类似github README中的badge徽章
 * @param label string 标签
 * @param value string 标签内容
 * @param bgColor1 string 背景颜色1
 * @param bgColor2 string 背景颜色2
 *
 * @example
 * showBadge("Environment", "production", "#606060", "RGB(66,192,46)")
 * showBadge("Platform", "shakespeare", "#606060", "RGB(20,117,178)")
 * showBadge("Version ", "1.1.0", "#606060", "RGB(20,117,178)")
 * showBadge("Build Date", "2020-08-26T02:44:50.105Z", "#606060", "RGB(20,117,178)")
 */
export function showBadge(label: string, value: string, bgColor1: string, bgColor2: string): void {
  console.log(
    '%c '.concat(label, ' %c ').concat(value, ' '),
    'padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: '.concat(bgColor1, ';'),
    'padding: 1px; border-radius: 0 3px 3px 0; color: #fff; background: '.concat(bgColor2, ';')
  )
}
