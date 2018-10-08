import { validateURL } from '@/utils/validate.js'

/* 数字*/
export function numberType(rule, value, callback) {
  if (value !== '') {
    if (isNaN(value)) {
      callback(new Error('请输入整数'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}
/* url*/
export function urlType(rule, value, callback) {
  const result = validateURL(value)
  if (!result) {
    callback(new Error('请输入合法的URL地址'))
  } else {
    callback()
  }
}
/* 限制输入 icon 的 sort*/
export function maxIcon(rule, value, callback) {
  const result = validateURL(value)
  const mapList = [1, 2, 3, 4, 5, 6]
  const index = mapList.indexOf(value)
  console.log(index)
  if (!result) {
    callback(new Error('排序必须小于6'))
  } else {
    callback()
  }
}
