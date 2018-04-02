import axios from 'axios'

//对axios封装
function fetch(url,data) {  //返回一个Promise对象
    return new Promise((resolve,reject) => {
        axios.post(url,data).then(res => {
            let status = res.data.status
            if(status === 200) {
                resolve(res)
            }
            // if(status === 300) {
            //     location.href = "login.html"
            //     resolve(res)
            // }
            reject(res)
        }).catch(error => {
            reject(error)
        })
    })
}

export default fetch