import wepy from 'wepy';

import index from '../mixins/index';
import user from '../mixins/user';
import cart from '../mixins/cart';

export default class parentPage extends wepy.page {
  mixins = [index, user, cart];
}
