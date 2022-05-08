/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
 import { extend } from 'umi-request';
 import { notification, message } from 'antd';
 import CryptoJS from './crypto-js.js';
//  import * as Cookies from 'js-cookie';

const AES_KEY = "qq3217834abcdefg"; //16位
const AES_IV = "1234567890123456"; //16位
// function aes_encrypt(plainText) {
// 	var encrypted = CryptoJS.AES.encrypt(plainText, CryptoJS.enc.Utf8.parse(AES_KEY), {
// 		iv: CryptoJS.enc.Utf8.parse(AES_IV)
// 	});
// 	return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
// }

function aes_decrypt(ciphertext:any) {
	var decrypted = CryptoJS.AES.decrypt(ciphertext, CryptoJS.enc.Utf8.parse(AES_KEY), {
		iv: CryptoJS.enc.Utf8.parse(AES_IV)
	});
	return decrypted.toString(CryptoJS.enc.Utf8);
}

 const codeMessage = {
   200: '服务器成功返回请求的数据。',
   201: '新建或修改数据成功。',
   202: '一个请求已经进入后台排队（异步任务）。',
   204: '删除数据成功。',
   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
   401: '用户没有权限（令牌、用户名、密码错误）。',
   403: '用户得到授权，但是访问是被禁止的。',
   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
   406: '请求的格式不可得。',
   410: '请求的资源被永久删除，且不会再得到的。',
   422: '当创建一个对象时，发生一个验证错误。',
   500: '服务器发生错误，请检查服务器。',
   502: '网关错误。',
   503: '服务不可用，服务器暂时过载或维护。',
   504: '网关超时。',
 };

 /**
  * 异常处理程序
  */
 const errorHandler = (error: { response: Response }): Response => {
   const { response } = error;
   console.log(response,'response')
   if (response && response.status) {
     const errorText = codeMessage[response.status] || response.statusText;
     const { status, url } = response;

     if (status === 403) {
       // router.push('/403');
       // message.error('接口权限校验失败')
     }
     // if (status === 404) {
     //   router.push('/404');
     // }
     // notification.error({
     //   message: `请求错误 ${status}: ${url}`,
     //   description: errorText,
     // });
   } else if (!response) {
     notification.error({
       description: '您的网络发生异常，无法连接服务器',
       message: '网络异常',
     });
   }
   return response;
 };

 /**
  * 配置request请求时的默认参数
  */

 const request = extend({
  //  prefix: '/v1/api/',
   errorHandler, // 默认错误处理
  //  credentials: 'include', // 默认请求是否带上cookie
 });

//  request.interceptors.request.use((url, options) => {
//    const auth = Cookies.get('header_auth_token');
//    if (auth) {
//      options.headers = {
//        Authorization: `Bearer ${auth}`,
//      };
//    }

//    return (
//      {
//        options: { ...options, interceptors: true },
//      }
//    );
//  });

 request.interceptors.response.use(async response => {
  const _data = JSON.parse(aes_decrypt(await response.text()))
  console.log(_data,'_data')
  return _data;
 });

 export default request;
