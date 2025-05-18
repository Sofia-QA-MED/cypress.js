import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as recovery_page from "c:/Users/sophy/OneDrive/Desktop/new_cypress-main/cypress/locators/recovery_password_page.json"
import * as result_page from "c:/Users/sophy/OneDrive/Desktop/new_cypress-main/cypress/locators/result_page.json"

describe('Проверка форы логина и пароля', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/'); // посетить сайт
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
        }); // проверить цвет кнопки восстановления пароля

        afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible');
        });  // проверить наличие крестика

    it('1 Позитивный кейс авторизации', function () {
         cy.get(main_page.email).type(data.login); // Ввести правильный логин
         cy.get(main_page.password).type(data.password); // ввести правильный пароль
         cy.get(main_page.login_button).click(); // нажать кнопку войти
         cy.get(result_page.title).contains('Авторизация прошла успешно'); // проверить текст об успешной авторизации
         cy.get(result_page.title).should('be.visible'); // проверить что текст виден
     })
     it('2 Логика восстановления пароля', function () {
        cy.get(main_page.fogot_pass_btn).click(); // нажать "забыли пароль"
        cy.get(recovery_page.email).type(data.restore_login) // Ввести любой имейл
        cy.get(recovery_page.send_button).click(); // нажать кнопку отправить код
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // проверить текст об отправке кода восстановления
        cy.get(result_page.title).should('be.visible'); // проверить что текст виден
    })
    it('3 Негативный кейс авторизации пароль', function () {
        cy.get(main_page.email).type(data.login); // Ввести правильный логин
        cy.get(main_page.password).type(data.wrong_password); // ввести НЕправильный пароль
        cy.get(main_page.login_button).click(); // нажать кнопку войти
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // проверить текст об успешной авторизации
        cy.get(result_page.title).should('be.visible'); // проверить что текст виден
     }) 
    it('4 Негативный кейс авторизации логин', function () {
        cy.get(main_page.email).type(data.wrong_login); // Ввести НЕправильный логин
        cy.get(main_page.password).type(data.password); // ввести правильный пароль
        cy.get(main_page.login_button).click(); // нажать кнопку войти
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // проверить текст об успешной авторизации
        cy.get(result_page.title).should('be.visible'); // проверить что текст виден
     }) 
    it('5 Негативный кейс валидации', function () {
        cy.get(main_page.email).type(data.valid_at_login); // Ввести логин без @
        cy.get(main_page.password).type(data.password); // ввести правильный пароль
        cy.get(main_page.login_button).click(); // нажать кнопку войти
        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // проверить текст об успешной авторизации
        cy.get(result_page.title).should('be.visible'); // проверить что текст виден
     }) 
     it('6 Приведение к строчным буквам в логине', function () {
        cy.get(main_page.email).type(data.valid_werbs_login); // Ввести логин с заглавными буквами
        cy.get(main_page.password).type(data.password); // ввести правильный пароль
        cy.get(main_page.login_button).click(); // нажать кнопку войти
        cy.get(result_page.title).contains('Авторизация прошла успешно'); // проверить текст об успешной авторизации
        cy.get(result_page.title).should('be.visible'); // проверить что текст виден
     })
})

