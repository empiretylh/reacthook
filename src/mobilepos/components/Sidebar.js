/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { Link as NavLink } from "react-router-dom";
import { PICTURE } from "../../assets/assets";
const Sidebar = () => {
  const [active, setActive] = useState("home");

  const UpdateActive = (link) => {
    setActive(link);
  };

  return (
    <div
      className="sidebar"
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#010101" backgroundColor="#f0f0f0">
        <CDBSidebarHeader
          style={{ padding: 0, margin: 0 }}
          prefix={<i className="fa fa-bars fa-large"></i>}
        >
          <img src={PICTURE.logo} style={{ width: "30px", height: "30px" }} />
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit", marginLeft: 5 }}
          >
            MobilePOS
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu className="sidebar-menu">
            <NavLink to="/" onClick={() => UpdateActive("home")}>
              <CDBSidebarMenuItem
                icon="columns"
                className={
                  active === "home"
                    ? "sidebar-menu-item active"
                    : "sidebar-menu-item"
                }
              >
                Dashboard
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/tables" onClick={() => UpdateActive("sales")}>
              <CDBSidebarMenuItem
                icon="table"
                className={
                  active === "sales"
                    ? "sidebar-menu-item active"
                    : "sidebar-menu-item"
                }
              >
                Sales
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/profile" onClick={() => UpdateActive("products")}>
              <CDBSidebarMenuItem
                icon="user"
                className={
                  active === "products"
                    ? "sidebar-menu-item active"
                    : "sidebar-menu-item"
                }
              >
                Products
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              to="/analytics"
              onClick={() => UpdateActive("expense")}
              className={
                active === "expense"
                  ? "sidebar-menu-item active"
                  : "sidebar-menu-item"
              }
            >
              <CDBSidebarMenuItem
                icon="chart-line"
                className="sidebar-menu-item"
              >
                Expense
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink t to="/hero404" target="_blank">
              <CDBSidebarMenuItem icon="exclamation-circle">
                404 page
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "20px 5px",
            }}
          >
            Copyright 2022
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
