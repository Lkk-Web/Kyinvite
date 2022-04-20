/**
 * Created by Fred(qq:24242811) on 2018/8/18.
 */
import create from 'zustand';
import { IModel } from './Idva16';
import Taro from '@tarojs/taro';

/* 参考dva接口绑定 */
const config: { printLog?: boolean } = {}
const store = {};

const wrapPromise = (promise: any) => {
  let status: string = 'pending';
  let result: any;
  let suspender = promise.then(
    (r: any) => {
      status = 'success';
      result = r;
    },
    (e: any) => {
      status = 'error';
      result = e;
    },
  );
  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    },
  };
};
export function initDva(models, { printLog = false, useImmer = true } = {}) {
  Object.assign(config, { printLog, useImmer });
  for (let { namespace, state, reducers, effects } of models) {
    bindModel({ namespace, state, reducers, effects });
  }
}
export function bindModel({ namespace, state, reducers, effects }:IModel) {
  let vo: any = { suspense: {}, reducers, effects };
  const exec = (set, get) => {
    vo.set = set;
    vo.get = get;
    return {
      ...state,
      suspense: (type, pendingWithoutPromise = true) => {
        config.printLog && console.log('[suspense]', namespace, type);
        if (vo.suspense[type]) {
          vo.suspense[type].read();
        } else if (pendingWithoutPromise) {
          throw new Promise((res) => res).then();
        }
      },
    };
  };
  vo.zustand = create(exec)
  console.log('vo: ', vo);
  store[namespace] = vo;
}
export function useStore(namespace: string) {
  console.log('store', { store, namespace, });
  return store[namespace] ? { ...store[namespace].zustand() } : null;
}
export function dispatch(namespace: any, type: any, payload: any) {
  config.printLog && console.log('[dispatch]', namespace, type, payload);
  let { reducers, effects } = store[namespace];
  if (reducers[type]) {
    reducer(namespace, type, payload);
  } else if (effects[type]) {
    effect(namespace, type, payload);
  } else {
    console.error(
      `dispatch[${type}] function not exsits in models[${namespace}]`,
    );
  }
}
export function reducer(namespace: string, type: any, payload: any) {
  let { set, get, reducers } = store[namespace];
  if (reducers[type]) {
    set(() => reducers[type](get(), { payload }));
  } else {
    console.error(
      `reducers[${type}] function not exsits in models[${namespace}]`,
    );
  }
}
export function effect(
  namespace: string,
  type: any,
  payload: any | null | object,
  callback: any | null | object = null,
) {
  config.printLog && console.log('[effect]', namespace, type, payload);
  let { set, get, reducers, effects, suspense } = store[namespace];
  if (effects[type]) {
    suspense[type] = wrapPromise(
      effects[type](
        { payload, callback },
        {
          reducer: (action, payload, ns?) => {
            reducer(ns || namespace, action, payload)
          },
          effect: (action, payload, ns?) => {
            effect(ns || namespace, action, payload)
          },
          select: (ns) => store[ns || namespace].get(),
        }
      ),
    );
  } else {
    console.error(
      `effects[${type}] function not exsits in models[${namespace}]`,
    );
  }
}

/* restful + json + jwt基本网络库 */
const requstParams: any = { serverHome: null, errorHanlder: null, extraHeaders: {} };
export function initRequest(serverHome: any, errorHanlder: any) {
  if (requstParams) {
    requstParams.serverHome = serverHome;
    requstParams.errorHanlder = errorHanlder;
  }
}
export function bindHeader(key: string | number, value: any) {
  requstParams.extraHeaders[key] = value;
}
export function bindJWTToken(token: string): void {
  localStorage.setItem('token', token)
  requstParams.extraHeaders['Authorization'] = token
    ? `Bearer ${token}`
    : undefined;
}
export function requestGet(url: string, body: any) {
  return request(url, { method: 'GET', body });
}
export function requestDelete(url: any, body: any) {
  return request(url, { method: 'DELETE', body });
}
export function requestPost(url: string, body: any) {
  return request(url, { method: 'POST', body });
}
export function requestPatch(url: any, body: any) {
  return request(url, { method: 'PATCH', body });
}
export function requestPut(url: any, body: any) {
  return request(url, { method: 'PUT', body });
}
export function requestFile(url: any, file: string | Blob) {
  let body = new FormData();
  body.append('file', file);
  return request(url, { method: 'POST', body }, 'application/form-data');
}

function request(url: string, options: { method: any; body: any }, ContentType: string | null | undefined = null, loadingTip?: string
) {
  // return new Promise((resolve, reject) => {
  let { method, body } = options;
  // 添加url前缀
  if (url.indexOf('https://') === -1 && url.indexOf('http://') === -1) {
    url = requstParams.serverHome + (url.indexOf('/') === 0 ? url.substr(1) : url);
  }
  let option: any = {
    method,
    url,
    headers: {
      Accept: 'application/json',
      Pragma: 'no-cache',
      'Cache-Control': 'no-cache',
      Expires: 0,
      'Content-Type': ContentType || 'application/json; charset=utf-8',
      ...requstParams.extraHeaders,
    },
  };
  let token = Taro.getStorageSync('token')
  if (token) {
    option.header = option.header || {}
    option.header.Authorization = `Bearer ${token}`
  }
  // 参数赋值
  switch (method) {
    case 'GET':
    case 'DELETE':
      option.params = body || {};
      break;
    case 'POST':
    case 'PATCH':
    case 'PUT':
      option.data = body || {};
      break;
  }
  return new Promise((resolve, reject) => {
    loadingTip && Taro.showLoading({ title: loadingTip, mask: true })
    Taro.request({
      ...option,
      success: (res) => {
        const { statusCode, errMsg, data } = res
        if (statusCode >= 200 && statusCode < 300 && !data.error) {
          resolve(data)
        } else {
          reject(data)
          switch (statusCode) {
            default:
              // 400提示
              setTimeout(() => {
                Taro.showToast({
                  title: data.message,
                  icon: 'none',
                  mask: true,
                })
              }, 100)
          }
        }
      },
      complete: (res) => {
        loadingTip && Taro.hideLoading()
      },
    })
  })
  // axios(option)
  //   .then(({ data }: any) => {
  //     config.printLog && console.log('[res]', method, url, data);
  //     resolve(data?.data || data);
  //   })
  //   .catch((e: any) => {
  //     config.printLog && console.error('[catch]', e);
  //     if (e.response) {
  //       let { status, data } = e.response;
  //       requstParams.errorHanlder(status, data);
  //     } else {
  //       requstParams.errorHanlder(e);
  //     }
  //   });
  // });
}
