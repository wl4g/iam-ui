import it from "element-ui/src/locale/lang/it";
import {
  store
} from '../../utils/'

export default {
  name: 'left-menu',
  data () {
    return {
      menu_list: [],
      win_size: {
        height: ''
      },
    }
  },
  methods: {

    getMenuName(item){
      return this.$i18n.locale=='en_US'?item.name:item.displayName;
    },

    setSize () {
      //this.win_size.height = (this.$$lib_$(window).height()) + 'px'
      this.win_size.height = '100%'
    },
    toggleMenu () {
      this.$store.dispatch(this.$store.state.leftmenu.menu_flag ? 'set_menu_close' : 'set_menu_open')
    },
    updateCurMenu (route) {
      route = route || this.$route
      if (route.matched.length) {
        var rootPath = route.matched[0].path
        var fullPath = route.path
        this.$store.dispatch('set_cur_route', {
          rootPath,
          fullPath
        });

        var routes = store.get('routList')
        for (var i = 0; i < routes.length; i++) {
          if (routes[i].path === rootPath && !routes[i].hidden) {
            this.menu_list = routes[i].children
            break
          }
        }

        // 跳转第一个有效路由
        // if(this.menu_list.length) {
        //   let target = this.menu_list[0];
        //   while (target.children){
        //     target = target.children
        //   }
        //   this.$router.push({ path: target.path});
        // }
      } else {
        //this.$router.push('/404')
      }
    },
    routerGo(route){
      if(this.isExternal(route)){
        window.location.href = route;
      }else{
        let base = this.$route.matched[0].path;
        //this.$router.push({path: base + '/' + route})
        this.$router.push({path: route})
      }
    },

    isExternal(path) {
      return /^(https?:|mailto:|tel:)/.test(path)
    },
  },
  created () {
    this.setSize()
    this.$$lib_$(window).resize(() => {
      this.setSize()
    })
    this.updateCurMenu();
  },
  mounted () {

  },
  watch: {
    $route (to, from) {
      this.updateCurMenu(to)
    }
  }
}
