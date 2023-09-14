/*
 * @Description: language component
 * @Author: lllomh
 * @Contact: admin@lllomh.com
 * @Date: 2023-09-14 13:43:04
 */

// Import the 'createI18n' function from 'vue-i18n' library.
import { createI18n } from 'vue-i18n'

// Import the 'messages' object from the './index' file.
import messages from './index'

// Create an instance of the 'i18n' object using 'createI18n' function.
const i18n = createI18n({
  // Set the 'legacy' option to 'false' to use the new Vue 3 composition API.
  legacy: false,

  // Set the 'locale' to the value stored in 'localStorage.getItem('lang')',
  // or use 'zhCN' as the default locale if the stored value is not found.
  locale: localStorage.getItem('lang') || 'zhCN',

  // Provide the 'messages' object containing translations for different languages.
  messages,
})

// Export the 'i18n' instance to be used in the Vue application.
export default i18n
