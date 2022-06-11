<template>
  <div class="tabs-container">
    <!-- <el-tabs v-model="editableTabsValue" type="card" editable class="demo-tabs" @edit="handleTabsEdit">
      <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
        {{ item.content }}
      </el-tab-pane>
    </el-tabs> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    let tabIndex = 2
    const editableTabsValue = ref('2')
    const editableTabs = ref([
      {
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content'
      },
      {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content'
      }
    ])

    const handleTabsEdit = (targetName: string, action: 'remove' | 'add') => {
      if (action === 'add') {
        const newTabName = `${++tabIndex}`
        editableTabs.value.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        })
        editableTabsValue.value = newTabName
      } else if (action === 'remove') {
        const tabs = editableTabs.value
        let activeName = editableTabsValue.value
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              const nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.name
              }
            }
          })
        }

        editableTabsValue.value = activeName
        editableTabs.value = tabs.filter(tab => tab.name !== targetName)
      }
    }

    return {
      editableTabsValue,
      editableTabs,
      handleTabsEdit
    }
  }
})
</script>

<style scoped lang="scss">
.tabs-container {
  display: flex;
  align-items: center;
  height: 30px;
  padding: 0 20px;
  border-bottom: 1px solid #f1f1f1;
}
</style>
