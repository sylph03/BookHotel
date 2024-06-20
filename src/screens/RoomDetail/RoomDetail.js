import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MyHeader from '../../components/Header/MyHeader'
import MyBreadCrumbs from '../../components/BreadCrumbs/MyBreadCrumbs'
import MyFooter from "../../components/Footer/MyFooter";
import MyCopyright from "../../components/Copyright/MyCopyright";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import MyRooms from "../../components/Rooms/MyRooms"

const RoomDetail = () => {

    const { id } = useParams();
    const [room, setRoom] = useState([]);
    const [otherRooms, setOtherRooms] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/rooms/${id}?limit=7`)
            .then(response => {
                setRoom(response.data.room);
                setOtherRooms(response.data.otherRooms);
            })
            .catch(error => {
                console.error('Đã xảy ra lỗi khi tìm nạp dữ liệu!', error);
            });
    }, [id]);

    return (
        <div>
            <MyHeader/>
            <MyBreadCrumbs room={room}/>
            <ProductDetail room={room}/>
            <MyRooms room={otherRooms} title={"Các phòng khác"} bg_white={"bg-white"} pt_0={"pt-0"}/>
            <MyFooter/>
            <MyCopyright/>
        </div>
    )
}

export default RoomDetail