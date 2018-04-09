import fetch from 'js/fetch.js'
import url from 'js/api.js'


class Address{
    static list() {
        return fetch(url.addressList)
    }

    static add(data) {
        return fetch(url.addressAdd,{
            data
        })
    }

    static remove(id) {
        return fetch(url.addressRemove,{
            id
        })
    }

    static update(data){
        return fetch(url.addressUptate,{
            data
        })
    }

    static setDefault(id) {
        return fetch(url.addressDefault,{
            id
        })
    }
}


export default Address