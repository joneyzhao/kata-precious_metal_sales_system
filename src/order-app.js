/* eslint-disable no-console */
import OrderRepresentation from './output/order-representation';
import UserItems from './output/user-items';
import ProductItmes from './output/product-items';

export default class OrderApp {
  
  checkout(orderCommand) {
    let OrderData = {};
    let orderCommandObj = JSON.parse(orderCommand);
    // 获取用户信息
    let userItme = new UserItems(orderCommandObj.memberId);
    console.log('===HYZ==用户信息=' + JSON.stringify(userItme));
    OrderData.orderId = orderCommandObj.orderId;
    OrderData.createTime = new Date(orderCommandObj.createTime);
    OrderData.memberNo = userItme.memberNo;
    OrderData.memberName = userItme.memberName;
    OrderData.memberPoints = userItme.memberPoints;
    OrderData.oldMemberType = userItme.oldMemberType;
    OrderData.payments = orderCommandObj.payments;
    
    // 获取产品信息
    let orderItems = orderCommandObj.items;
    OrderData.orderItems = orderItems;
    OrderData.totalPrice = this.getOriginalTotalPrice(orderItems).toFixed(2);

    console.log('===OrderData==' + JSON.stringify(OrderData));
    return OrderData.totalPrice;
    // return (new OrderRepresentation(OrderData)).toString();
  }

  getOriginalTotalPrice(orderItems) {
    let orderTotalPrice = 0;
    for (let i = 0; i < orderItems.length; i++) {
      let productItme = new ProductItmes(orderItems[i].product);
      console.log('===HYZ==productNo==' + orderItems[i].product + '==productItme==' + JSON.stringify(productItme));
      let productPrice = productItme.price;
      // 产品数量
      let amount = (orderItems[i].amount);
      orderTotalPrice+= productPrice * amount;
      console.log('===HYZ=产品数量=' + amount);
    }
    return orderTotalPrice;
  }
}
