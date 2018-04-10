import wepy from 'wepy';

import IndexMixin from '../mixins';

export default class parentComponent extends wepy.component {
  mixins = [IndexMixin];
}
