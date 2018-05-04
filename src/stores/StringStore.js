import {observable, action, computed} from 'mobx';
import I18n from '../internationalization/i18n';

export default class StringStore {


    @action footerMessage() {
        return I18n.t('footer');
    }

    @action titleMessage() {
        return I18n.t('title');
    }
}