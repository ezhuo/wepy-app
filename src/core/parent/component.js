import wepy from 'wepy';

import index from '../mixins/index';

export default class parentComponent extends wepy.component {
  mixins = [index];
}
