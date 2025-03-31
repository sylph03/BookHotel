import React from "react";
import './TopbarAdmin.css'

const TopbarAdmin = () => {
    return (
        <div className="topbar rounded-0 border-0" style={{background: "#fff"}}>
            <div className="with-verical">
                <div className="navbar navbar-expand-lg px-lg-0 px-3 py-0">
                    <div className="d-none d-lg-block">
                        <div className="brand-logo d-flex align-items-center justify-content-between">
                            <a href="/admin" className="text-nowrap logo-img d-flex align-items-center gap-2">
                                <span className="logo-text">
                                    <img width={"228px"} src="http://localhost:3001/logo.png" alt="" className="dark-logo ps-2"/>
                                </span>
                            </a>
                        </div>
                    </div>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <div className="d-flex align-items-center justify-content-between py-2 py-lg-0">
                            <ul className="navbar-nav gap-2 flex-row ms-auto align-items-center justify-content-center">
                                <li className="nav-item hover-dd dropdown nav-icon-hover-bg ">
                                    <a className="nav-lik nav-icon-hover waves-effect waves-dark" href="#">
                                        <i className="color-highlight fa-solid fa-bell"></i>
                                        <div className="notify">
                                            <span className="heartbit"></span>
                                            <span className="point"></span>
                                        </div>
                                    </a>
                                </li>
                                <li className="nav-item hover-dd dropdown">
                                    <a className="nav-lik nav-icon-hover" href="#">
                                        <img src="https://fagopet.vn/storage/in/r5/inr5f4qalj068szn2bs34qmv28r2_phoi-giong-meo-munchkin.webp" alt="user" className="profile-pic rounded-circle round-30"/>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopbarAdmin