import React from "react";
import MyHeader from "../../components/Header/MyHeader"
import MyBreadCrumbs from "../../components/BreadCrumbs/MyBreadCrumbs";
import MyCart from "../../components/Cart/MyCart"
import MyFoodter from "../../components/Footer/MyFooter"
import MyCopyRight from "../../components/Copyright/MyCopyright"

const Cart = () => {
    return (
        <div>
            <MyHeader/>
            <MyBreadCrumbs mb="mb-0"/>
            <MyCart/>
            <MyFoodter/>
            <MyCopyRight/>
        </div>
    )
}

export default Cart