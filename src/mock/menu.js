export default [
  {
    "redirect": null,
    "path": "/elder",
    "component": "Layouts/RouteView",
    "route": "1",
    "children": [
      {
        "path": "/elder/list",
        "component": "elder/ElderList",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "title": "老人列表"
        },
        "name": "elder-list",
        "id": "8r915b2769fc80648e92d04e84ca059d"
      },
      {
        "path": "/elder/approve",
        "component": "elder/ElderList",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "title": "入驻审批"
        },
        "name": "elder-approve",
        "id": "8r915b2769fc80648e92d04e84ca059d"
      }
    ],
    "meta": {
      "keepAlive": false,
      "icon": "setting",
      "title": "老人管理"
    },
    "name": "customer",
    "id": "87d6e2e4e2934f2c9385a623fd98c6f3"
  },
  {
    "redirect": null,
    "path": "/enterprise",
    "component": "Layouts/RouteView",
    "route": "1",
    "children": [
      {
        "path": "/enterprise/list",
        "component": "enterprise/EnterpriseList",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "title": "机构列表"
        },
        "name": "enterprise-list",
        "id": "4r915b2769fc80648e92d04e84ca059d"
      }
    ],
    "meta": {
      "keepAlive": false,
      "icon": "setting",
      "title": "机构管理"
    },
    "name": "enterprise",
    "id": "o7d6e2e4e2934f2c9385a623fd98c6f3"
  }
]
