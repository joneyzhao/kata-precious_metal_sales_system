const userInfoMap = {
  '6236609999': {
    'memberName': '马丁',
    'oldMemberType': '普卡',
    'memberNo': '6236609999',
    'memberPoints': '9860'
  },
  '6630009999': {
    'memberName': '王立',
    'oldMemberType': '金卡',
    'memberNo': '6630009999',
    'memberPoints': '48860'
  },
  '8230009999': {
    'memberName': '李想',
    'oldMemberType': '白金卡',
    'memberNo': '8230009999',
    'memberPoints': '98860'
  },
  '9230009999': {
    'memberName': '张三',
    'oldMemberType': '钻石卡',
    'memberNo': '9230009999',
    'memberPoints': '198860'
  }
};

export default class UserItmes {

  /**
   * @param memberName     会员姓名
   * @param oldMemberType  原会员等级
   * @param memberNo       卡号
   * @param memberPoints   会员最新的积分
   * 
   */
  constructor(memberNo) {
    this.memberNo = memberNo || 0;
    return userInfoMap[memberNo];
  }
}





