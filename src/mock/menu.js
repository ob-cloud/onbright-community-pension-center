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
  },
  {
    "redirect": null,
    "path": "/service",
    "component": "Layouts/RouteView",
    "route": "1",
    "children": [
      {
        "path": "/service/content",
        "component": "service/ServiceContent",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "title": "服务内容"
        },
        "name": "service-content",
        "id": "4r915b2769fc80648e92d04e84ca059d"
      },
      {
        "path": "/service/record",
        "component": "service/ServiceRecord",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "title": "服务记录"
        },
        "name": "service-record",
        "id": "4r915b2769fc80648e92d04e84ca059d"
      },
      {
        "path": "/service/record/detail",
        "component": "service/ServiceRecordDetail",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "title": "服务详情"
        },
        "hidden": true,
        "name": "service-record-detail",
        "id": "4r915b2769fc80648e92d04e84ca059d"
      },
      {
        "path": "/service/approval",
        "component": "service/ServiceApproval",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "title": "服务审批"
        },
        "name": "service-approval",
        "id": "4r915b2769fc80648e92d04e84ca059d"
      },
      {
        "path": "/service/approval/detail",
        "component": "service/ServiceApprovalDetail",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "title": "审批详情"
        },
        "hidden": true,
        "name": "service-approval-detail",
        "id": "4r915b2769fc80648e92d04e84ca059d"
      }
    ],
    "meta": {
      "keepAlive": false,
      "icon": "setting",
      "title": "服务管理"
    },
    "name": "service",
    "id": "o7d6e2e4e2934f2c9385a623fd98c6f3"
  },
  {
    "redirect": null,
    "path": "/finance",
    "component": "Layouts/RouteView",
    "route": "1",
    "children": [
      {
        "path": "/finance/revenue",
        "component": "finance/FinanceRevenue",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "title": "营收总额"
        },
        "name": "finance-revenue",
        "id": "4r915b2769fc80648e92d04e84ca059d"
      },
      {
        "path": "/finance/record",
        "component": "finance/FinanceRecord",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "title": "营收记录"
        },
        "name": "finance-record",
        "id": "4r915b2769fc80648e92d04e84ca059d"
      },
      {
        "path": "/finance/arrears",
        "component": "finance/FinanceArrears",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "title": "欠费记录"
        },
        "name": "finance-arrears",
        "id": "4r915b2769fc80648e92d04e84ca059d"
      }
    ],
    "meta": {
      "keepAlive": false,
      "icon": "setting",
      "title": "财务管理"
    },
    "name": "finance",
    "id": "o7d6e2e4e2934f2c9385a623fd98c6f3"
  },
  {
    "redirect": null,
    "path": "/report",
    "component": "Layouts/RouteView",
    "route": "1",
    "children": [
      {
        "path": "/report/revenue",
        "component": "report/ReportRevenue",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "title": "营收报表"
        },
        "name": "report-revenue",
        "id": "4r915b2769fc80648e92d04e84ca059d"
      },
      {
        "path": "/report/fiance",
        "component": "report/ReportFinance",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "title": "财务明细"
        },
        "name": "report-fiance",
        "id": "4r915b2769fc80648e92d04e84ca059d"
      },
      {
        "path": "/report/fiancesum",
        "component": "report/ReportFinanceSummary",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "title": "财务汇总"
        },
        "name": "report-fiancesum",
        "id": "4r915b2769fc80648e92d04e84ca059d"
      }
    ],
    "meta": {
      "keepAlive": false,
      "icon": "setting",
      "title": "报表管理"
    },
    "name": "report",
    "id": "o7d6e2e4e2934f2c9385a623fd98c6f3"
  },
  {
    "redirect": null,
    "path": "/building",
    "component": "Layouts/RouteView",
    "route": "1",
    "children": [
      {
        "path": "/building/list",
        "component": "building/BuildingList",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "title": "楼宇信息"
        },
        "name": "building-list",
        "id": "4r915b2769fc80648e92d04e84ca059d"
      }
    ],
    "meta": {
      "keepAlive": false,
      "icon": "setting",
      "title": "楼宇管理"
    },
    "name": "building",
    "id": "o7d6e2e4e2934f2c9385a623fd98c6f3"
  },
  {
    "redirect": null,
    "path": "/message",
    "component": "Layouts/RouteView",
    "route": "1",
    "children": [
      {
        "path": "/message/advice",
        "component": "message/MessageAdvice",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "title": "反馈建议"
        },
        "name": "message-advice",
        "id": "4r915b2769fc80648e92d04e84ca059d"
      }
    ],
    "meta": {
      "keepAlive": false,
      "icon": "setting",
      "title": "消息管理"
    },
    "name": "message",
    "id": "o7d6e2e4e2934f2c9385a623fd98c6f3"
  }
]
