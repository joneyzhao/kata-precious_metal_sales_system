/* eslint-disable no-console */
import OrderRepresentation from './output/order-representation';
import UserItems from './output/user-items';
import ProductItmes from './output/product-items';

export default class OrderApp {
  
  checkout(orderCommand) {
    let orderCommandObj = JSON.parse(orderCommand);
    // 获取用户信息
    let userItme = new UserItems(orderCommandObj.memberId);
    console.log('===HYZ==用户信息=' + JSON.stringify(userItme));
    
    // 获取产品信息
    let orderItems = orderCommandObj.items;
    for (let i = 0; i < orderItems.length; i++) {
      let productItme = new ProductItmes(orderItems[i].product);
      console.log('===HYZ==productNo==' + orderItems[i].product + '==productItme==' + JSON.stringify(productItme));
      // 产品数量
      let amount = (orderItems[i].amount);
      console.log('===HYZ=产品数量=' + amount);
    }
    
    return (new OrderRepresentation({})).toString();
  }
}
