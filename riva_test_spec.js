describe('login', function() {

  var el = {
    login: element(by.css('input[data-test-id="input-login-form-login"]')),
    pass: element(by.css('input[data-test-id="input-login-form-password"]')),
    button: element(by.css('button[data-test-id="button-login-form-signin"]'))
  },
      userField = element(by.css('div[data-test-id="application-top-panel-user-menu"]')),
      userName = 'Dmitry',
      title = 'Rivasense Discovery - Home';
      
  beforeEach(function() {
    browser.ignoreSynchronization = true;
    browser.get('http://test2.lab.riva/login');
  });

  it('see control and fields', function() {
    
    for(key in el)
    {
      expect(el[key].isPresent()).toBe(true);
    }

    el.login.sendKeys(userName);
    el.pass.sendKeys('123456');
    el.button.click(); 
    
    browser.wait(function() {
      return userField.isPresent();
    }, 15000);

    expect(browser.getTitle()).toEqual(title);
    expect(userField.getText()).toEqual(userName);
  });
 
});