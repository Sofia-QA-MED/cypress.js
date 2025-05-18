import * as data from "../helpers/default_data.json"
import * as login from "../locators/poke_login.json"
import * as main from "../locators/poke_main.json"
import * as trainer from "../locators/poke_trainer.json"
import * as trainers from "../locators/poke_trainers.json"
import * as payment from "../locators/poke_payment.json"
import * as verify from "../locators/poke_verify.json"
import * as success from "../locators/poke_success.json"

describe('Проверка покупки нового аватара', function () {
    it('e2e тест на покупку нового аватара для тренера', function () {
         cy.visit(data.avatar_url);
         cy.get(login.email).type('YOUR_LOGIN');                   // вводим логин
         cy.get(login.password).type('YOUR_PASSWORD');               // вводим пароль
         cy.get(login.enter).click();                // нажимаем кнопку Подтвердить
         cy.wait(2000);
         cy.get(main.trainer).click();            // Клик в шапке на аву тренера
         cy.wait(2000);
         cy.get(trainer.change_ava).click(); // нажимаем кнопку Смена аватара
         cy.get(trainers.buy).first().click();   // кликаем Купить у первого доступного аватара
         cy.get(payment.number).type(data.avatar_cardnumber);                     // вводим номер карты
         cy.get(payment.csv).type(data.avatar_csv);                             // вводим CVV карты
         cy.get(payment.date).type(data.avatar_date);                           // вводим срок действия карты
         cy.get(payment.name).type(data.avatar_name);                           // вводим имя владельца карты
         cy.get(payment.pay).click();     // нажимаем кнопку Оплатить
         cy.get(verify.push).type(data.avatar_push);                            // вводим код подтверждения СМС
         cy.get(verify.pay).click();   // нажимаем кнопку Оплатить
         cy.get(success.title).should('be.visible');     // проверяем наличие и видимость сообщения об успешной покупке
         cy.get(success.title).contains('Покупка прошла успешно');     // проверяем соответствие надписи

     });
 });