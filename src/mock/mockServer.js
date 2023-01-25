// 引入Mock
import Mock from 'mockjs'
// 引入json文件数据
// json格式的文件没有暴露但是可以引入使用
// 因为webpack默认对外暴露的格式有：图片格式、json格式
import banner from './banner.json'
import floor from './floor.json'

//mock数据：第一个参数为请求地址， 第二个参数为请求数据
Mock.mock('/mock/banner', { code: 200, data: banner }) //模拟轮播图的数据
Mock.mock('/mock/floor', { code: 200, data: floor })