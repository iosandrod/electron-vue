import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { getSystem } from './system'

export class myHttp {
  private instance
  private loading: any
  private options = { loading: true, message: true, clearValidateError: true }
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors()
  }
  //只有两个 get和post
  public async post(url: any, data: any, config?: AxiosRequestConfig) {
    return await this.instance.post(url, data, config)
  }
  public async get(url: any, config?: AxiosRequestConfig) {
    return await this.instance.get(url, config)
  }
  public getSystem() {
    const system = getSystem()
    return system
  }
  //
  public async request<T>(config: AxiosRequestConfig, options?: any) {
    this.options = Object.assign(this.options, options ?? {})
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.instance.request<T>(config)
        resolve(response.data)
      } catch (error) {
        reject(error)
      }
    }) as Promise<T>
  }
  public async login(userName?: string, password?: string, companyId?: string) {
    const body = {
      UUID: '1377c7ce-9b4b-4fb2-b871-47cd96123cde',
      companyId: getSystem().systemConfig.companyConfig.companyId,
      password: password || 'zkaps#1',
      userName: userName || 'admin',
      verificationCode: '1'
    }
    const url = '/api/user/login'
    const headers = {}
    const data = await this.post('/entity/postZkapsApi', { body, url, headers })
    const { data: _data } = data
    const token = _data.token
    const system = this.getSystem()
    system.localStorage.token = token
    return token
  }
  async postZkapsApi(url: string, body?: any, headers?: any) {
    const _body: any = {
      url, body: body || {},
    }
    const _url = '/entity/postZkapsApi'
    const system = this.getSystem()
    const token = system.localStorage.token
    const _headers = headers || {}
    _body.headers = Object.assign(_headers, { Authorization: `Bearer ${token}` })
    const data = await this.post(_url, _body)
    return data
  }
  async getTableData(url: string, body?: any, headers?: any) {
    const _body: any = {
      url, body: body || {},
    }
    const _url = '/entity/zkGetTableData'
    const system = this.getSystem()
    const token = system.localStorage.token
    const _headers = headers || {}
    _body.headers = Object.assign(_headers, { Authorization: `Bearer ${token}` })
    const data = await this.post(_url, _body)
    return data
  }
  async getTableInfo(entityName: string) {
    const url = `/entity/zkGetTableInfo`
    const body = { tableName: entityName }
    const data = await this.post(url, body)
    return data
  }
  private interceptors() {
    this.interceptorsRequest()
    this.interceptorsResponse()
  }

  private interceptorsRequest() {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        //请求前处理
        return config
      },
      (error: any) => {
        return Promise.reject(error)
      },
    )
  }
  private interceptorsResponse() {
    this.instance.interceptors.response.use(
      (response) => {
        if (this.loading) {
          this.loading.close()
          this.loading = undefined
        }
        let data = response.data || {}
        let _data = data?.data || data
        return _data
      },
      (error) => {
        return Promise.reject(error)
      },
    )
  }
}
export const http = new myHttp({
  baseURL: 'http://127.0.0.1:9000/api',
  headers: {
    'Content-Type': "application/json"
  }
})

setTimeout(() => {
  http.login()
}, 500);