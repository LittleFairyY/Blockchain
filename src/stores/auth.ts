import { observable, action } from 'mobx';
import i18n, { I18nLanguages } from '../i18n';

class Auth {
  @observable openMenu: boolean = false;
  @observable language: I18nLanguages =
    i18n.language === I18nLanguages.Chinese
      ? I18nLanguages.Chinese
      : I18nLanguages.English;
  @action.bound
  setOpenMenu(bool: boolean) {
    this.openMenu = bool;
  }
  @action.bound
  changeLanguage(lang: I18nLanguages) {
    i18n.changeLanguage(lang);
    this.language = lang;
  }

}

export default Auth;
export type IAuthStore = Auth;
