import {Login} from '../../api/login.js'

const login = {
    namespaced: true,
    actions: {
        login(content, requestData) {
            return new Promise((resolve, reject) => {
                Login(requestData).then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
            })
        }
    }
}

export default login;