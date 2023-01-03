// 1.方式一: 手动的切换不同的环境(不推荐)
// const BASE_URL = 'http://coderwhy.org/dev'
// const BASE_NAME = 'coderwhy'

// const BASE_URL = 'http://coderwhy.org/prod'
// const BASE_NAME = 'kobe'

// const BASE_URL = 'http://coderwhy.org/test'
// const BASE_NAME = 'james'

// 2.根据process.env.NODE_ENV区分
// 开发环境: development
// 生成环境: production
// 测试环境: test

let BASE_URL = ''
let BASE_DOMAIN = ''
let BASE_COMNAME = ''
let BASE_TO_HREF = ''
const TIME_OUT = 10000

console.log('process.env.NODE_ENV', process.env.NODE_ENV)

if (process.env.NODE_ENV === 'development') {
  // BASE_URL = 'http://www.paytunnel.cn/carRentalServerRH'
  BASE_URL = 'https://www.paytunnel.cn/venueReservationServerRH'
  BASE_DOMAIN = 'https://www.paytunnel.cn'
  BASE_COMNAME = '广州睿颢软件技术有限公司'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'https://www.paytunnel.cn/venueReservationServerRH'
  BASE_DOMAIN = 'https://www.paytunnel.cn'
  BASE_TO_HREF = 'https://www.paytunnel.cn/venueReservationAdmin'
  BASE_COMNAME = '广州睿颢软件技术有限公司'

  // 生产环境
  // BASE_URL = 'http://www.gxgscloud.cn/venueReservationServerRH'
  // BASE_DOMAIN = 'http://www.gxgscloud.cn'
  // BASE_TO_HREF = 'http://www.gxgscloud.cn/venueReservationAdmin'
} else {
  BASE_URL = 'http://www.paytunnel.cn/carRentalServerRH'
  BASE_DOMAIN = 'http://www.paytunnel.cn'
  BASE_COMNAME = '广州睿颢软件技术有限公司'
}

console.log('BASE_URL', BASE_URL)

export { BASE_URL, BASE_DOMAIN, BASE_COMNAME, BASE_TO_HREF, TIME_OUT }
