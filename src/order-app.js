import OrderRepresentation from './output/order-representation';
import UserItems from './output/user-items';
export default class OrderApp {
  
  checkout(orderCommand) {
    let userItme = new UserItems(JSON.parse(orderCommand).memberId);
    console.log('===HYZ==用户信息=' + JSON.stringify(userItme));
    
    return (new OrderRepresentation({})).toString();
  }
}
