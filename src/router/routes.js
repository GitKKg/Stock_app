
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') }
    ]
  },
  {
    path: '/scan_overall',
    component: () => import('layouts/scan_overall')

  },
  {
    path: '/rectangle',
    component: ()=> import('layouts/scan_overall')

  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
