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
    OrderData.orderId = orderCommandObj.orderId;
    OrderData.createTime = new Date(orderCommandObj.createTime);
    OrderData.memberNo = userItme.memberNo;
    OrderData.memberName = userItme.memberName;
    OrderData.memberPoints = userItme.memberPoints;
    OrderData.oldMemberType = userItme.oldMemberType;
    OrderData.payments = orderCommandObj.payments;
    
    // 获取产品信息
    let orderItems = orderCommandObj.items;
    OrderData.totalPrice = this.getOriginalTotalPrice(orderItems).toFixed(2);

    // 获取产品优惠信息
    let productDiscounts = this.getProductDiscounts(orderItems);
    OrderData.totalDiscountPrice = productDiscounts.totalDiscountPrice;
    OrderData.discounts = productDiscounts.discounts;
    OrderData.orderItems = productDiscounts.orderItemsList;
    OrderData.discountCards = productDiscounts.discountCardList;
    OrderData.receivables = OrderData.totalPrice - productDiscounts.totalDiscountPrice;
    console.log('===HYZ==OrderData==' + JSON.stringify(OrderData));
    return OrderData.totalDiscountPrice;
    // return (new OrderRepresentation(OrderData)).toString();
  }

  getOriginalTotalPrice(orderItems) {
    let orderTotalPrice = 0;
    for (let i = 0; i < orderItems.length; i++) {
      let productItme = new ProductItmes(orderItems[i].product);
      let productPrice = productItme.price;
      // 产品数量
      let amount = (orderItems[i].amount);
      orderTotalPrice+= productPrice * amount;
    }
    return orderTotalPrice;
  }

  getProductDiscounts(orderItems) {
    let productDiscounts = {};
    let totalDiscountPrice = 0;
    let discounts = [];
    let orderItemsList = [];
    let discountCardList = [];
    for (let i = 0; i < orderItems.length; i++) {
      
      let productItme = new ProductItmes(orderItems[i].product);
      let discountItem = {};
      let orderItem = {};
      let discount = 0;
      let prodTotalPrice = productItme.price * orderItems[i].amount;
      let discountActive = productItme.discountActive || 0;
      console.log('===HYZ==产品代码=' + productItme.productNo);
      console.log('===HYZ==总价=' + prodTotalPrice);
      console.log('===HYZ==优惠活动=' + discountActive);
      if ('每满3000元减350, 每满2000减30，每满1000减10' === discountActive ) {
        if (prodTotalPrice >= 3000) {
             discount = 350;
        } else if (prodTotalPrice >= 2000) {
             discount = 30;
        } else if (prodTotalPrice >= 1000) {
             discount = 10;
        }
      } else if ('每满2000减30，每满1000减10' === discountActive) {
        if (prodTotalPrice >= 2000) {
          discount = 30;
        } else if (prodTotalPrice >= 1000) {
          discount = 10;
        }
      } else if ('第3件半价，满3送1' === discountActive) {
        if (orderItems[i].amount >= 4) {
          discount = productItme.price;
        } else if (orderItems[i].amount === 3) {
          discount = productItme.price / 2;
        }
      }

      console.log('===HYZ===优惠金额==' + discount);
      let discountCard = 0;
      let discountCards = productItme.discountCards;
      if ('9折券' === discountCards) {
        discountCardList.push(discountCards);
        discountCard = Math.ceil(prodTotalPrice * (1-0.9));
      } else if ('===HYZ==95折券' === discountCards) {
        discountCardList.push(discountCards);
        discountCard = Math.ceil(prodTotalPrice * (1-0.95));
      }

      console.log('===HYZ=折=' + discountCard);
      let discountCost = discountCard > discount ? discountCard : discount;
      totalDiscountPrice+= discountCost;
      discountItem.totalDiscountPrice = discountCost;
      discountItem.productNo = productItme.productNo;
      discountItem.productName = productItme.productName;
      discounts.push(discountItem);

      orderItem.productNo = productItme.productNo;
      orderItem.productName = productItme.productName;
      orderItem.price = productItme.price;
      orderItem.amount = orderItems[i].amount;
      orderItem.subTotal = prodTotalPrice;
      orderItemsList.push(orderItem);

    }
    productDiscounts.totalDiscountPrice = totalDiscountPrice; // 总优惠金额
    productDiscounts.discounts = discounts; // 优惠明细
    productDiscounts.orderItemsList = orderItemsList; // 订单明细
    productDiscounts.discountCardList = discountCardList;
    return productDiscounts;
  }

  getActiveDiscountTotalPrice() {

  } 
  getDiscountCardsTotalPrice() {

  }
}
