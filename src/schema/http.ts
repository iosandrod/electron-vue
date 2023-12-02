import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
interface IOptions {
  loading?: boolean
  message?: boolean
  clearValidateError?: boolean
}
export class Axios {
  private instance
  private loading: any
  private options: IOptions = { loading: true, message: true, clearValidateError: true }
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors()
  }
  public async post(url: any, data: any, config?: AxiosRequestConfig) {
    return await this.instance.post(url, data, config)
  }
  public async get(url: any, config?: AxiosRequestConfig) {
    return await this.instance.get(url, config)
  }

  public async request<T>(config: AxiosRequestConfig, options?: IOptions) {
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
        // if (this.loading) {
        //   this.loading.close()
        //   this.loading = undefined
        // }
        // this.options = { loading: true, message: true, clearValidateError: true }
        // const {
        //   response: { status, data },
        // } = error
        // const message = data.error ?? data.message
        return Promise.reject(error)
      },
    )
  }
}
export const http = new Axios({
  baseURL: 'http://127.0.0.1:9000/api',
  headers: {
    'Content-Type': "application/json"
  }
})