function deleteCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
  }
export default deleteCookie;