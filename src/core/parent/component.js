import wepy from 'wepy';

import IndexMixin from '../mixins/index';
import CaseMixin from '../mixins/case';

export default class parentComponent extends wepy.component {
  mixins = [IndexMixin, CaseMixin];
}
