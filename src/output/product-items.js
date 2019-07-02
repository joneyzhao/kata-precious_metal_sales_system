
const productItmes = {
    '001001': {
      'productName': '世园会五十国钱币册',
      'productNo': '001001',
      'price': '998.00'
    },
    '001002': {
      'productName': '2019北京世园会纪念银章大全40g',
      'productNo': '001002',
      'price': '1380.00',
      'discountCards': '9折券'
    },
    '003001': {
      'productName': '招财进宝',
      'productNo': '003001',
      'price': '1580.00',
      'discountCards': '95折券'
    },
    '003002': {
      'productName': '水晶之恋',
      'productNo': '003002',
      'price': '980.00',
      'discountActive': '第3件半价，满3送1'
    },
    '002002': {
      'productName': '中国经典钱币套装',
      'productNo': '002002',
      'price': '998.00',
      'discountActive': '每满2000减30，每满1000减10'
    },
    '002001': {
      'productName': '守扩之羽比翼双飞4.8g',
      'productNo': '002001',
      'price': '1080.00',
      'discountCards': '95折券'
    },
    '002003': {
      'productName': '中国银象棋12g',
      'productNo': '002003',
      'price': '698.00',
      'discountActive': '每满3000元减350, 每满2000减30，每满1000减10',
      'discountCards': '9折券'
    }
  };
  
  export default class ProductItmes {
  
    constructor(productNo) {
      this.productNo = productNo || 0;
      return productItmes[this.productNo];
    }
  }
  