import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Admin.css';

const Admin = () => {
    return (
        <div>
            {/* preloader */}
            <div className="preloader d-none">
                <div className="lds-ripple">
                    <div className="lds-pos"></div>
                    <div className="lds-pos"></div>
                </div>
            </div>
            <div id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="absolute" data-header-position="absolute" data-boxed-layout="full">
                <div className="topbar" data-navbarbg="skin6">
                    <div className="navbar top-navbar navbar-expand-md navbar-light">
                        <div className="navbar-header" data-logobg="skin6">
                            <a href="/admin" className="navbar-brand">
                                <span className="logo-text">
                                    <img className="dark-logo" src="https://cdn1872.cdn-template-4s.com/media/logo/logo_1.png" alt="CÔNG TY TNHH PHẦN MỀM NHÂN HÒA"/>
                                </span>
                            </a>
                        </div>
                        <div className="navbar-collapse collapse" id="navbarSupportedCotent" data-navbarbg="skin5">
                            <ul className="navbar-nav me-auto mt-md-0"></ul>
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle text-muted waves-effect waves-dark" href="" id="navbarDropdown">
                                        <img src="https://thuvienmeme.com/wp-content/uploads/2024/05/meme-gay-su-cho-trang-gio-tinh-sao.jpg" alt="user" className="profile-pic me-2"/>
                                        Markarn Doe
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="left-sidebar" data-sidebarbg="skin6">
                    <div className="scroll-sidebar">
                        <div className="sidebar-nav">
                            <ul id="sidebarnav" className="in">
                                <li className="sidebar-item selected">
                                    <a className="sidebar-link waves-effect waves-dark sidebar-link active" href="">
                                        <i className="me-2 fa-solid fa-gauge"></i>
                                        <span className="hide-menu">Quản lý phòng</span>
                                    </a>
                                </li>
                                <li className="sidebar-item">
                                    <a className="sidebar-link waves-effect waves-dark sidebar-link" href="">
                                        <i className="me-2 fa-solid fa-user"></i>
                                        <span className="hide-menu">Quản lý tài khoản</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="page-wrapper">
                    <div className="page-breadcrumb">
                        <Row className="align-items-center">
                            <Col className="col-md-6 col-8 align-self-center">
                                <h3 className="page-title mb-0 p-0">Dashboard</h3>
                            </Col>
                            <Col className="col-md-6 col-4 align-self-center"></Col>
                        </Row>
                    </div>
                    <div className="container-fluid">
                        <Row>
                            <div className="col-sm-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Basic Table</h4>
                                        <h6 className="card-subtitle">
                                            Add Class&nbsp;
                                            <code>.table</code>
                                        </h6>
                                        <div className="table-responsive">
                                            <table className="table user-table">
                                                <thead>
                                                    <tr>
                                                        <th className="border-top-0">#</th>
                                                        <th className="border-top-0">First Name</th>
                                                        <th className="border-top-0">Last Name</th>
                                                        <th className="border-top-0">Username</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>Deshmukh</td>
                                                        <td>Prohaska</td>
                                                        <td>@Genelia</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
