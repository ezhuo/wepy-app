import wepy from 'wepy';

import * as cart from '../data/cart';

export default class CaseMixin extends wepy.mixin {
  getCartList = cart.getCartList;

  addCart = cart.addCart;

  removeCart = cart.removeCart;
}
