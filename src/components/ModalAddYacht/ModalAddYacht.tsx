import React, {useRef, useState} from 'react';
import s from './ModalAddYacht.module.scss'
import CustomInput from "../CustomInput/CustomInput";
import Api from "../../api/api";
import axios from "axios";
import {useCookies} from "react-cookie";

const ModalAddYacht = (props: any) => {
    const [file, setFile] = useState([]);
    const [model, setModel] = useState();
    const [name, setName] = useState();
    const [classing, setClassing] = useState();
    const [maker, setMaker] = useState();
    const [verf, setVerf] = useState();
    const [year, setYear] = useState();
    const [engine, setEngine] = useState();
    const [length, setLength] = useState();
    const [wide, setWide] = useState();
    const [osadka, setOsadka] = useState();
    const [speed, setSpeed] = useState();
    const [count, setCount] = useState();
    const [guys, setGuys] = useState();
    const [desc, setDesc] = useState();
    const [price, setPrice] = useState();
    const [cookies] = useCookies();
    const data = [
        {text: 'Модель', type: 'text', setValue: setModel, value: model},
        {text: 'Название', type: 'text', setValue: setName, value: name},
        {text: 'Класс', type: 'text', setValue: setClassing, value: classing},
        {text: 'Производитель', type: 'text', setValue: setMaker, value: maker},
        {text: 'Верфь', type: 'text', setValue: setVerf, value: verf},
        {text: 'Год постройки', type: 'number', setValue: setYear, value: year},
        {text: 'Двигатель', type: 'text', setValue: setEngine, value: engine},
        {text: 'Длина', type: 'number', setValue: setLength, value: length},
        {text: 'Ширина', type: 'number', setValue: setWide, value: wide},
        {text: 'Осадка', type: 'number', setValue: setOsadka, value: osadka},
        {text: 'Скорость', type: 'number', setValue: setSpeed, value: speed},
        {text: 'Цена', type: 'number', setValue: setPrice, value: price},
        {text: 'Количество кают', type: 'number', setValue: setCount, value: count},
        {text: 'Пассажировместимость', type: 'number', setValue: setGuys, value: guys},
        {text: 'Описание', type: 'text', setValue: setDesc, value: desc},
    ];
    const photos = file.map(p => <PhotoItem img={p}/>)
    const ref = useRef();
    const inputItems = data.map(i => <CustomInput text={i.text} type={i.type} setValue={i.setValue} value={i.value}/>)
    const onChangeInput = (e) => {
        let data = new FormData();
        data.append('file', e.target.files[0])
        axios.post('http://62.113.104.182:80/img', data).then(res => {
            setFile(prev => [...prev, res.data.urlfile])
        })
    };
    const createYacht = () => {
        const token = cookies.token;
        const data = {
            town: props.city.name,
            imageUrls: file,
            model: model,
            name: name,
            manufacturer: maker,
            clas: classing,
            shipyard: verf,
            year: year,
            engine: engine,
            width: wide,
            length: length,
            draught: osadka,
            spead: speed,
            number_of_cabins: count,
            passenger_capacity: guys,
            description: desc,
            price: price
        }

        Api.addYachts(data, token).then(res => {
            props.setActive(false);
            Api.getTown(props.townId).then(res => {
                props.setCity(res.data)
            })
        })
    }

    return (
        <div className={s.modal} onClick={() => props.setActive(false)}>
            <div className={s.modalInner} onClick={(e) => e.stopPropagation()}>
                <form className={s.inpCont}>
                    <div>
                        {inputItems}
                        <input ref={ref} onChange={(e) => onChangeInput(e)} type={'file'}
                               style={{display: 'none'}}/>
                        <div className={s.photoCont}>
                            {photos}
                        </div>
                    </div>
                </form>
                <button onClick={() => ref.current.click()} className={s.btn}
                        style={{width: '150px', marginBottom: '10px'}}>
                    {file.length !== 0 ? 'Добавить еще фото' : 'Добавить фото'}
                </button>
                <button onClick={createYacht} className={s.btn}>Добавить</button>
            </div>
        </div>
    );


}

export const PhotoItem = (props) => {
    return (
        <div className={s.photo}>
            <img src={props.img} alt="image"/>
        </div>
    )
}


export default ModalAddYacht;