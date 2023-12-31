import axios from "axios";


let instance = axios.create({baseURL: 'http://45.130.42.157:4001/api/'});

let Api = {
    login(email, password) {
        return instance.post('login', {email, password})
    },
    getTowns() {
        return instance.get('town')
    },
    addTown(name, country, token) {
        return instance.post(`town?token=${token}`, {name, country})
    },
    deleteTown(id, token) {
        return instance.delete(`town?token=${token}`, {data: {id: id}})
    },
    changeTown(id, name, country, token) {
        return instance.post(`town/change?token=${token}`, {id: id, name: name, country: country})
    },
    getTown(id) {
        return instance.get(`all-info?id=${id}`);
    },
    deleteYacht(id, token) {
        return instance.delete(`yachts?token=${token}`, {data: {id: id}})
    },
    addYachts(data, token) {
        return instance.post(`yachts?token=${token}`, data)
    },
    setInfoService(town, name) {
        return instance.get(`services?town=${town}&name=${name}`)
    },
    changeService(token, imgUrl, des, id) {
        return instance.post(`services?token=${token}`, {imageUrl: imgUrl, des: des, id: id})
    },
    getFaq(city) {
        return instance.get(`faq?town=${city}`)
    },
    createFaq(token, town, question, answer) {
        return instance.post(`faq?token=${token}`, {town: town, question: question, answer: answer})
    },
    deleteFaq(token, id) {
        return instance.delete(`faq?token=${token}`, {data: {id: id}})
    },
    changeAbout(token, text, id) {
        return instance.patch(`about?token=${token}`, {text: text, id: id})
    },
    createUser(email, password) {
        return instance.post('register', {email: email, password: password})
    },
    changeCatering(id, pages) {
        return instance.post('services/catering', {id, pages})
    },
    getCatering(town) {
        return instance.get(`services/catering?town=${town}`)
    },
    changeYacht(data,token){
        return instance.post(`yachts/change?token=${token}`, {...data})
    },
    getYacht(id){
        return instance.get(`yachts/id?id=${id}`);
    },
    getYachts(){
        return instance.get('yachts')
    }

}

export default Api;