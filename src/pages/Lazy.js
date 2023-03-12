const FoodsMore = React.lazy(() => import('./foods_more/FoodsMore'))
const Main = React.lazy(() => import('./main/Main'))

export const LayoutPages = {
  FoodsMore,
  Main
}

