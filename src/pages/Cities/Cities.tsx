import React, {useEffect, useState} from 'react';
import s from './Cities.module.scss';
import CityCard from "../../components/CityCard/CityCard";
import CustomBtn from "../../components/CustomBtn/CustomBtn";
import Api from "../../api/api";
import ModalAddCity from "../../components/ModalAddCity/ModalAddCity";
import ModalChangeCity from "../../components/ModalChangeCity/ModalChangeCity";
import {Navigate} from "react-router-dom";
import ModalAddUser from "../../components/ModalAddUser/ModalAddUser";

const Cities = (props: any) => {
        if (!props.isAuth) {
            return <Navigate to={'/'}/>
        }


        const [cities, setSities] = useState([]);
        const [modalActive, setModalActive] = useState(false);
        const [modalChangeActive, setModalChangeActive] = useState(false);
        const [modalUser, setModalUser] = useState(false);

        useEffect(() => {
            if (cities.length === 0) {
                Api.getTowns().then(res => {
                    setSities(res.data)
                })
            }
        }, [setSities])

        const [currentCity, setCurrentCity] = useState({});


        const CityItems = cities.map(c => <CityCard name={c.name} country={c.country} id={c._id} key={c._id}
                                                    setCity={setCurrentCity} setCities={setSities}
                                                    setActive={setModalChangeActive}/>);

        return (
            <div className={s.cities}>
                {modalActive && <ModalAddCity setActive={setModalActive} setSities={setSities}/>}
                {modalUser && <ModalAddUser setActive={setModalUser} setCurrentCity={setCurrentCity} currentCity={currentCity} />}
                {modalChangeActive && <ModalChangeCity setActive={setModalChangeActive} currentCity={currentCity} setSities={setSities}/>}
                <h3 className={s.title}>Города</h3>
                <div className={s.cityCont}>
                    {cities.length == 0 ? <span>Городов нет</span> : CityItems}
                </div>
                <div className={s.btnCont}>
                    <CustomBtn setActive={setModalActive} title={'Добавить город'}/>
                </div>
                <div className={s.btnCont}>
                    <CustomBtn setActive={setModalUser} title={'Добавить пользователя'}/>
                </div>

            </div>
        );
    }
;


export default Cities;