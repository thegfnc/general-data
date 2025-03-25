import type {
  ActiveToolLayoutProps,
  LayoutProps,
  NavbarProps,
  StudioComponentsPluginOptions,
  ToolMenuProps,
} from 'sanity'

type Studio = {
  components: StudioComponentsPluginOptions
}

const ActiveToolLayout = (props: ActiveToolLayoutProps) => {
  return <>{props.renderDefault(props)}</>
}

const Layout = (props: LayoutProps) => {
  return <>{props.renderDefault(props)}</>
}

const Navbar = (props: NavbarProps) => {
  return <>{props.renderDefault(props)}</>
}

const ToolMenu = (props: ToolMenuProps) => {
  return <>{props.renderDefault(props)}</>
}

export const studio: Studio = {
  components: {
    activeToolLayout: ActiveToolLayout,
    layout: Layout,
    navbar: Navbar,
    toolMenu: ToolMenu,
  },
}
