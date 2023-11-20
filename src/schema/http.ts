import router from '@/plugins/router'
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
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
        // const message = response.data?.success ?? response.data?.success
        // if (message && this.options.message) {
        //   ElMessage({
        //     type: 'success',
        //     message,
        //     grouping: true,
        //     duration: 2000,
        //   })
        // }
        this.options = { loading: true, message: true, clearValidateError: true }
        return response
      },
      (error) => {
        if (this.loading) {
          this.loading.close()
          this.loading = undefined
        }
        this.options = { loading: true, message: true, clearValidateError: true }
        const {
          response: { status, data },
        } = error
        const message = data.error ?? data.message

        switch (status) {
          // case HttpCodeEnum.UNAUTHORIZED:
          //   storage.remove(CacheEnum.TOKEN_NAME)
          //   router.push({ name: RouteEnum.LOGIN })
          //   break
          // case HttpCodeEnum.UNPROCESSABLE_ENTITY:
          //   useErrorStore().setErrors(error.response.data.errors ?? error.response.data)
          //   break
          // case HttpCodeEnum.FORBIDDEN:
          //   ElMessage({ type: 'error', message: message ?? '没有操作权限' })
          //   break
          // case HttpCodeEnum.NOT_FOUND:
          //   ElMessage.error('请求资源不存在')
          //   router.push({ name: RouteEnum.HOME })
          //   break
          // case HttpCodeEnum.TOO_MANY_REQUESTS:
          //   ElMessage({ type: 'error', message: '请求过于频繁，请稍候再试' })
          //   break
          // default:
          //   if (message) {
          //     ElMessage({ type: 'error', message: message ?? '服务器错误' })
          //   }
        }
        return Promise.reject(error)
      },
    )
  }
}
export const http = new Axios({
  baseURL: 'localhost:9000/api',
  headers: {
    'Content-Type': "application/json"
  }
})