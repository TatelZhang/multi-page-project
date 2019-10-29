<script>
export default {
  name: 'SideMenuItem',
  props: {
    menu: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: '/'
    }
  },
  render(h) {
    const menu = this.menu
    const { meta, name, path, children } = menu
    const text = h('span', meta ? meta.title || name : name)
    if (!children || children.length < 1) { // 叶子节点
      const indexPath = `${this.basePath}/${path}`
      return h('el-menu-item', {
        props: {
          index: indexPath
        }
      }, [text])
    }
    // let menuNode
    const childrenNodeList = [h('div', { slot: 'title' }, [text])]
    for (const child of children) {
      childrenNodeList.push(
        h('side-menu-item', { props: { menu: child, basePath: path }})
      )
    }
    // menuNode = h('el-submenu', { props: { index: path }}, childrenNodeList)
    // return menuNode
    return h('el-submenu', { props: { index: path }}, childrenNodeList)
  }
}
</script>
