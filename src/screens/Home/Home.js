import React, { useEffect, useState } from "react";
import axios from 'axios';
import MyFooter from '../../components/Footer/MyFooter'
import MyCopyright from '../../components/Copyright/MyCopyright'
import MyUtilitiesHotel from '../../components/UtilitiesHotel/MyUtilitiesHotel'
import MyBanner from '../../components/Banner/MyBanner'
import MyOffers from '../../components/Offers/MyOffers'
import MyGutters from '../../components/Gutters/MyGutters'
import MyRooms from '../../components/Rooms/MyRooms'
import MyIntroduce from '../../components/Introduce/MyIntroduce'
import MyWelcome from '../../components/Welcome/MyWelcome'
import MyFormBookingHome from '../../components/FormBookingHome/MyFormBookingHome'
import MyHomeMain from '../../components/HomeMain/MyHomeMain'
import MyHeader from '../../components/Header/MyHeader'

const Home = () => {

    const [dataRooms, setDataRooms] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/rooms?sortBy=&limit=7')
        .then(response => {
            setDataRooms(response.data)
        })
        .catch(error => {
            console.error('Đã xảy ra lỗi khi tìm nạp dữ liệu!', error);
        });
    }, []);

    return (
        <div>
            <MyHeader/>
            <MyHomeMain/>
            <MyFormBookingHome/>
            <MyWelcome/>
            <MyIntroduce/>
            <MyRooms room={dataRooms} title={"Phòng của chúng tôi"} text={"Khách sạn gồm 311 phòng được chia thành các hạng phòng từ tiêu chuẩn đến cao cấp. Mang cảm hứng từ hình ảnh hoa sen - biểu tượng văn hóa Việt Nam"}/>
            <MyGutters/>
            <MyOffers/>
            <MyBanner/>
            <MyUtilitiesHotel/>
            <MyFooter/>
            <MyCopyright/>
        </div>
    )
}

export default Home
