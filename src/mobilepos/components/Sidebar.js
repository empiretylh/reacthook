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
    console.log(link)
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
                iconSize="lg"
                className={
                  active === "home"
                    ? "sidebar-menu-item active"
                    : "sidebar-menu-item"
                }
              >
                Dashboard
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/sales" onClick={() => UpdateActive("sales")}>
              <CDBSidebarMenuItem
                icon="shopping-cart"
                iconSize="lg"
                iconClassName={'salesicon'}
                className={
                  active === "sales"
                    ? "sidebar-menu-item active"
                    : "sidebar-menu-item"
                }
              >
                Sales
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/category" onClick={() => UpdateActive("category")}>
              <CDBSidebarMenuItem
                iconSize="lg"
                icon="boxes"
                className={
                  active === "category"
                    ? "sidebar-menu-item active"
                    : "sidebar-menu-item"
                }
              >
                Category
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/product" onClick={() => UpdateActive("products")}>
              <CDBSidebarMenuItem
                iconSize="lg"
                icon="shopping-bag"
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
              to="/expense"
              onClick={() => UpdateActive("expense")}
              
            >
              <CDBSidebarMenuItem
                iconSize="lg"
                icon="wallet"
                className={
                  active === "expense"
                    ? "sidebar-menu-item active"
                    : "sidebar-menu-item"
                }
              >
                Expense
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              to="/otherincome"
              onClick={() => UpdateActive("otherincome")}
             
            >
              <CDBSidebarMenuItem
                icon="hand-holding-usd"
                className={
                  active === "otherincome"
                    ? "sidebar-menu-item active"
                    : "sidebar-menu-item"
                }
                iconSize="lg"

              >
                Other Income
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              to="/purchase"
              onClick={() => UpdateActive("purchase")}
              
            >
              <CDBSidebarMenuItem
                icon="box"
                className={
                  active === "purchase"
                    ? "sidebar-menu-item active"
                    : "sidebar-menu-item"
                }
                iconSize='lg'
              >
                Purchase
              </CDBSidebarMenuItem>
            </NavLink>

            <div className="divider"/>
            <NavLink
              to="/report"
              onClick={() => UpdateActive("report")}
              
            >
              <CDBSidebarMenuItem
                icon="chart-line"
                className={
                  active === "report"
                    ? "sidebar-menu-item active"
                    : "sidebar-menu-item"
                }
                iconSize='lg'
              >
                Report
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => UpdateActive("contact")}
             
            >
              <CDBSidebarMenuItem
                icon="address-card"
                className={
                  active === "contact"
                    ? "sidebar-menu-item active"
                    : "sidebar-menu-item"
                }
                iconSize='lg'
              >
                Customer & Supplier List
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              to="/voucher"
              onClick={() => UpdateActive("voucher")}
             
            >
              <CDBSidebarMenuItem
                icon="scroll"
                className={
                  active === "voucher"
                    ? "sidebar-menu-item active"
                    : "sidebar-menu-item"
                }
                iconSize='lg'
              >
                Voucher
              </CDBSidebarMenuItem>
            </NavLink>
            <div className="divider"/>
            <NavLink
              to="/setting"
              onClick={() => UpdateActive("setting")}
             
            >
              <CDBSidebarMenuItem
                icon="cogs"
                className={
                  active === "setting"
                    ? "sidebar-menu-item active"
                    : "sidebar-menu-item"
                }
                iconSize='lg'
              >
                Settings
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
