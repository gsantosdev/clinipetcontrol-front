import ApiService from "../apiservice";


class ConfigService extends ApiService {

    constructor() {
        super('/api/config')
    }

    alterar(config) {
        return this.put('/', config)
    }

    getConfig() {
        return this.get('/')
    }

}

export default ConfigService