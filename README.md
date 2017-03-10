Notice
=========
`Записи в первую очередь для себя, осваиваю работу с protractor, описываю рабочие моменты, рвано, но достаточно что бы вспомнить. В общем с простых вещей`

### Установка `protractor` на `Ubuntu 16.04`

Нужен `nodejs`, в репозитории `ubuntu` присутвует 4х, версия. На сегодня актуальна `v6.10.0 LTS`.

```shell
$ cd ~
$ curl -sL https://deb.nodesource.com/setup_6.x -o nodesource_setup.sh

$ sudo bash nodesource_setup.sh
$ sudo apt-get install nodejs
```
Нужен `npm`, у меня он вместе с nodejs. Проверить установлен npm: 

```shell
npm -v
```
команда вернет версию установленного пакета и соотв скажет что такого пакета нет если npm не установлен

Если не установлен, устанавливаем 

```shell
sudo apt-get install npm
```

`Устанавить protractor`

```shell
$ sudo npm install -g protractor
```
Ставится глобально, не очень хорошо если проектов несколько, в дальнейшем этот момент требуется уточнить.
Так же ставится без ошибок только из под sudo, что тоже не очень хорошо на мой взгляд.

По желанию создать симлинк папки с тестами в домашнюю директорию, что бы не путешествовать по дебрям

```shell
$ sudo ln -s /usr/lib/node_modules/protractor/ /home/username/
```

Что бы править js не из под root, установить полный доступ на папку example и все файлы в ней

```shell
$ cd /home/username/protractor
$ sudo chmod 777 -R example
```
Для удобного запуска и работы с `Selenium server` в protractor есть тул,- `webdriver-manager`, после свежей становки делается обновление

```shell
webdriver-manager update
``` 
webdriver-manager скачивает Selenium Server ставит нужные права, скачивает драйвера. 

запуск Selenium server происходит тоже через webdriver-manager.

```shell
$ webdriver-manager start
```
Здоровая остановка сервера?- по комбинации CTRL-C. Если случайно был оставнолен грубо, процесс selenium будет висеть в памяти и заново запустить сервер не получится, точнее при старте будет выдаваться длинный лог и ошибка в итоге. 
Требуется найти PID запущенного процесса.

```shell 
ps aux | grep selenium
```
смотрим номер PID, этот номер в сл команду.

```shell
sudo kill -9 PID
```
###Запуск тестов

Пример тестового сценария лежит в папке example

Запуск 

```shell
$ cd \home\username\protractor\example
$ protractor conf.js
```
Если звезды сошлись, откроется chrome (он должен быть установлен), и запустится тестовый сценарий с открытие странички.

###conf.js

Конфигурационный файл.
Тут обозначается файл с тестом/тестами который будет запущен при прогоне, по умолчанию там это
```javascript
  specs: ['example_spec.js'],
```
именно example_spec.js и есть тестовый сценарий.
Свой сценарий можно добавить через запятую, либо прописать вот так

```javascript
  specs: ['*.js'],
```
тогда будет запущены все сценарии найденный в папке.

###Структура сценария

Весь код простейшего сценария выглядит так

```javascript
  describe('login', function() {

  var el = {
    login: element(by.css('input[data-test-id="input-login-form-login"]')),
    pass: element(by.css('input[data-test-id="input-login-form-password"]')),
    button: element(by.css('button[data-test-id="button-login-form-signin"]'))
  },
      userField = element(by.css('div[data-test-id="application-top-panel-user-menu"]')),
      userName = 'Dmitry',
      title = 'Home';
  //эта секция выполнится до начала собственно тестирования,     
  beforeEach(function() {
    browser.ignoreSynchronization = true; //если тестируем сайт не на Angular то что бы не получить ошибку отключаем обнаружение ангуляра
    browser.get('http://test/login'); //идем на стартовую страницу
  });

  it('see control and fields', function() { //первый сценарий
    
    for(key in el) //в цикле проверяется наличие элементов на странице
    {
      expect(el[key].isPresent()).toBe(true);
    }

    el.login.sendKeys(userName); //вводим нужные данные
    el.pass.sendKeys('123456');
    el.button.click(); 
    
    //ждем пока появится элемент на странице
    browser.wait(function() {
      return userField.isPresent();
    }, 15000);
	
	//проверка title 
    expect(browser.getTitle()).toEqual(title);
    проверка имени пользователя пользователя
    expect(userField.getText()).toEqual(userName);
  });
 
});
```
























