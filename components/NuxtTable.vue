<template>
  <a-table :columns="columns" :data-source="data" :pagination="false" bordered class="tables" size="middle">
    <nuxt-link :to="'/money/' + record.key.toLowerCase() + '-cny.html'" slot="name" slot-scope="text, record" @click.native="handleClick(record)">{{ text }}</nuxt-link>
  </a-table>
</template>
<script>
export default {
  name: 'NuxtTable',
  props: {
    data: {
      require: false,
      type: Array,
      default: () => []
    },
    columns: {
      require: false,
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleClick(record) {
      localStorage.setItem('fromCode', record.key)
      localStorage.setItem('toCode', 'CNY')
      localStorage.setItem('fromCodeName', record.name)
      localStorage.setItem('toCodeName', '人民币')
    }
  }
}
</script>
<style lang="less" scoped>
.tables {
  margin: 3px;
}
</style>
