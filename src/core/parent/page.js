import wepy from 'wepy';

import IndexMixin from '../mixins/index';
import CaseMixin from '../mixins/case';

export default class parentPage extends wepy.page {
  mixins = [IndexMixin, CaseMixin];
}
