
<template>
  <!-- eslint-disable vue/require-component-is -->
  <component v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>


export default {
  props: {
    to: {
      type: String,
      required: true
    },
    item: {
      type: Object,
    }
  },
  methods: {
    linkProps(url) {
      if (this.item && this.item && this.item.renderTarget && this.item.renderTarget == '_blank' && this.item.pageLocation.startsWith('http')) {
        return {
          is: 'a',
          href: this.item.pageLocation,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        is: 'router-link',
        to: url
      }
    }
  }
}
</script>
