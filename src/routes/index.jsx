import React from 'react'
import { Route, Routes as Switch } from 'react-router-dom'
import { Routers } from '../pages'
import { Apps } from '../services/path'

function Routes() {
  return (
    <React.Fragment>
      <React.Suspense fallback={''}>
        <Switch>
          <Route path={Apps.main} element={<Routers.LayoutRoutes />} />
          <Route path={Apps.foodsMore} element={<Routers.FoodsMore />} />
        </Switch>
      </React.Suspense>
    </React.Fragment>
  )
}

export default Routes