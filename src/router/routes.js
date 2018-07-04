
export default [
  {
    path: '/',
    name: 'default',
    component: () => import('layouts/default'),

    children: [
      { path: '', component: () => import('pages/index') }
    ]
  },
  {
    path: '/scan_route',
    name: 'scan_route',
    component: () => import('layouts/scan_route'),
    meta: {
      keepAlive: true // keep data ,actually no need since global gv introduced
    },
    children: [
      {
        path: '',
        name: 'scan_overall',
        component: () => import('layouts/scan_overall'),
        meta: {
          keepAlive: true // keep data
        }
      },
      {
        path: 'rectangle',
        name: 'scan_rectangle',
        component: () => import('layouts/scan_rectangle'),
        meta: {
          keepAlive: true // keep data
        }
      }

    ]

  },
  {
    path: '/triangle1',
    name: 'scan_triangle1',
    component: () => import('layouts/scan_rectangle'),
    meta: {
      keepAlive: false
    }

  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
