/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Question from "views/Question.js";
import TableList from "views/TableList.js";
import Lesson from "views/Lesson";
import Icons from "views/Icons.js";
//import Maps from "views/Maps.js";
import Exam from "views/Exam.js"
import Notifications from "views/Notifications.js";
import Login from "views/Login"
import Upgrade from "views/Upgrade.js";

const dashboardRoutes = [
  // {
  //   upgrade: true,
  //   path: "/login",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-alien-33",
  //   component: Login,
  //   layout: "/admin",
  // },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  // {
  //   path: "/user",
  //   name: "Manager User",
  //   icon: "nc-icon nc-notes",
  //   component: UserProfile,
  //   layout: "/admin",
  // },
  {
    path: "/managerUser",
    name: "Manager User",
    icon: "nc-icon nc-circle-09",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/question",
    name: "Question",
    icon: "nc-icon nc-circle-09",
    component: Question,
    layout: "/admin",
  },
  {
    path: "/lesson",
    name: "Lesson",
    icon: "nc-icon nc-paper-2",
    component: Lesson,
    layout: "/admin",
  },
  {
    path: "/contest",
    name: "Contest",
    icon: "nc-icon nc-atom",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/exam",
    name: "Exam",
    icon: "nc-icon nc-pin-3",
    component: Exam,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin",
  },
];

export default dashboardRoutes;
