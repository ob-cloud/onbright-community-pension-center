export default [
  {
    "redirect": "/customer/list",
    "path": "/customer",
    "component": "Layouts/RouteView",
    "route": "1",
    "children": [
      {
        "path": "/customer/list",
        "component": "customer/CustomerList",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "title": "客户列表"
        },
        "name": "customer-list",
        "id": "8r915b2769fc80648e92d04e84ca059d"
      },
      {
        "path": "/customer/list/detail",
        "component": "customer/modules/CustomerModal",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "title": "客户详情",
          "hidden": true
        },
        "hidden": true,
        "name": "customer-list-detail",
        "id": "33915b2769fc80648e92d04e84ca059d"
      }
    ],
    "meta": {
      "keepAlive": false,
      "icon": "setting",
      "title": "客户管理"
    },
    "name": "customer",
    "id": "87d6e2e4e2934f2c9385a623fd98c6f3"
  },
  {
    "redirect": null,
    "path": "/package",
    "component": "Layouts/RouteView",
    "route": "1",
    "children": [
      {
        "path": "/package/list",
        "component": "package/PackageList",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "title": "套餐列表"
        },
        "name": "package-list",
        "id": "4r915b2769fc80648e92d04e84ca059d"
      }
    ],
    "meta": {
      "keepAlive": false,
      "icon": "setting",
      "title": "套餐管理"
    },
    "name": "package",
    "id": "o7d6e2e4e2934f2c9385a623fd98c6f3"
  }
]
