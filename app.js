const TelegramBot = require('node-telegram-bot-api');

const ogs = require('open-graph-scraper');
const firebase = require('firebase');
const token = '590500197:AAF-pV4OnXa6PaWEKRMzDkB4dAI1nDxgUTE';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {
  polling: true
});
//подключение датабазы
const app = firebase.initializeApp({
  apiKey: "AIzaSyC_aoGquIPhligWtRFc3kTN8CVRgBPvlg8",
  authDomain: "teleg-db63d.firebaseapp.com",
  databaseURL: "https://teleg-db63d.firebaseio.com",
  projectId: "teleg-db63d",
  storageBucket: "teleg-db63d.appspot.com",
  messagingSenderId: "954367231091",
  appId: "1:954367231091:web:1ef72a1a538d4641"
});
const ref = firebase.database().ref();

const orderRef = ref.child('order');
var start=0;
function objStandart(category, message) {
  this.category = category;
  this.message = message;
}
var canMainMenu=true;
function objInlineKeybord(text, callback_data) {
  this.text = text;
  this.callback_data = data;
}
//заполняем  заказ
let siteUrl;
bot.on('message', (msg) => {

  var order = '/start';
  if (msg.text.toString().toLowerCase().indexOf(order) === 0 && canMainMenu ) {
 
    bot.sendMessage(msg.chat.id, 'Здравствуйте '+ msg.from.first_name +' выберите интересующий вас пункт меню',  {
      reply_markup: {
        inline_keyboard: [
          [
{
  text: 'Каталог',
  callback_data: 'catalog'

},
{
  text: 'Прайс-лист',
  callback_data: 'pricelist'
}
          ],
          [{
            text: 'Контакты',
            callback_data: 'contacts'
          },
            {
              
                text: 'Оформить заказ',
                callback_data: 'confirm'
              
            },
          ],
          [
         /*   {
            text: 'Просмотр заказов',
            callback_data: 'development'
          },*/
           {
            text: 'Удалить заказ',
            callback_data: 'delete'
          },  ]
        ]
      }
    })
  
    bot.on("callback_query", (callbackQuery) => {
      const mainlastnameRef = ref.child(callbackQuery.from.last_name);

      const message = callbackQuery.message;
      const userRef = mainlastnameRef.child(callbackQuery.data);
var canAdd=true;
var canMessage=true;


      var array = [];
      //Блок с контактами 
      switch (callbackQuery.data) {
        case 'contacts':{
          bot.sendMessage(msg.chat.id, 'Пожалуйста выберите подходящий отдел', {
            reply_markup: {
              inline_keyboard: [
                [{
                  text: 'Юр. информация',
                  callback_data: 'linfo'
                }, {
                  text: 'Приемная директора',
                  callback_data: 'directorContact'
                }, ],
                [{
                  text: 'Отдел продаж',
                  callback_data: 'salesDepartment'
                }, {
                  text: 'Отдел маркетинга ',
                  callback_data: 'marketingDepartment'
                }],
                [{
                  text: 'Отдел кадров',
                  callback_data: 'hrDepartment'
                }, {
                  text: 'Отдел транспорта',
                  callback_data: 'transportDepartment'
                }],
                [{
                  text:'Местоположение',
                  callback_data:'location'
                }]
              ]
            }
          });
        }
        break;
        case 'contacts1':{
          bot.sendMessage(msg.chat.id, 'Пожалуйста выберите подходящий отдел', {
            reply_markup: {
              inline_keyboard: [
                [{
                  text: 'Юр. информация',
                  callback_data: 'linfo'
                }, {
                  text: 'Приемная директора',
                  callback_data: 'directorContact'
                }, ],
                [{
                  text: 'Отдел продаж',
                  callback_data: 'salesDepartment'
                }, {
                  text: 'Отдел маркетинга ',
                  callback_data: 'marketingDepartment'
                }],
                [{
                  text: 'Отдел кадров',
                  callback_data: 'hrDepartment'
                }, {
                  text: 'Отдел транспорта',
                  callback_data: 'transportDepartment'
                }],
                [{
                  text:'Местоположение',
                  callback_data:'location'
                }]
              ]
            }
          });
        }
        break;
        case 'location':{
          bot.sendLocation(msg.chat.id, 53.90523, 27.59494);
    bot.sendMessage(msg.chat.id, "Мы находимся здесь");

        }
        break;
  
        case 'linfo': {
          bot.sendMessage(message.chat.id, '   ОАО «Минский маргариновый завод» 220037, Республика Беларусь,    г. Минск, ул. Козлова, 27 р/с BY65BAPB30122708900170000000 в ОАО  «Белагропромбанк» Региональная дирекция по г.Минску, БИК BAPBBY2X адрес банка: г.Минск, пр.Жукова, 3 УНН 100185236, ОКПО 00333635 Директор: Шатило Александр Викентьевич ');
  
        }break;
        case 'directorContact':
          bot.sendMessage(message.chat.id, 'т.: (+375 17) 294-10-15т/ф.: (+375 17) 294-56-45Режим работы: пн.-чт. с 8-00 до 17-00; пт. с 8-00 до 15-45 (обед: 12-00 до 12-45) ');
    
    
    
          break;
        case 'salesDepartment': {
          bot.sendMessage(message.chat.id, 'Начальник - Рабушко Павел Иванович т.: (+375 17) 294-00-25, 294-10-25 т/ф.: (+375 17) 294-49-43');
    
        }
        break;
        case 'marketingDepartment': {
          bot.sendMessage(message.chat.id, 'т/ф.: (+375 17) 294-10-50;  e-mail: marketing@Маргарин.by');
    
        }
        break;
        case 'hrDepartment': {
          bot.sendMessage(message.chat.id, 'т.: (+375 17) 294-89-05; e-mail: mail@Маргарин.by');
        }
        break;
        case 'transportDepartment': {
          bot.sendMessage(message.chat.id, 'Начальник - Бакунович Адам Нестерович; т.: (+375 17) 294-74-48');
        }
        break;
// конец блока с контактами

case 'catalog':{
  bot.sendDocument(msg.chat.id,'https://i.imgur.com/zX2bh8z.jpg');
 // bot.sendMessage(msg.chat.id, "Маргарин.by/downloads/Zolotaya_kaplya_2015.pdf");
}

        break;
        case 'pricelist':{
         
          bot.sendMessage(msg.chat.id, "http://www.Маргарин.by/files/price.zip");
        }
        break;
        case 'confirm':  {
          bot.sendMessage(msg.chat.id, 'Выберите категорию товара?', {
            reply_markup: {
              inline_keyboard: [
                [{
                  text: 'Масло растительное',
                  callback_data: 'Масло растительное'
                }],[ {
                  text: 'Маргарин',
                  callback_data: 'Маргарин'
                }, {
                  text: 'Майонез',
                  callback_data: 'Майонез'
                }]
              ]
            }
          })
         }
        break;
        case 'confirm1':  {
          bot.sendMessage(msg.chat.id, 'Выберите категорию товара?', {
            reply_markup: {
              inline_keyboard: [
                [{
                  text: 'Масло растительное',
                  callback_data: 'Масло растительное'
                }],[ {
                  text: 'Маргарин',
                  callback_data: 'Маргарин'
                }, {
                  text: 'Майонез',
                  callback_data: 'Майонез'
                }]
              ]
            }
          })
         }
        break;

        case 'no':{
bot.sendMessage(message.chat.id,'приятного дня');
bot.off();
        }break;
      case 'ordermenu': {
        bot.sendMessage(msg.chat.id, 'Выберите категорию?', {
          reply_markup: {
            inline_keyboard: [
              [{
                text: 'Просмотреть заказы',
                callback_data: 'development'
              }, {
                text: 'удалить заказы',
                callback_data: 'delete'
              }, {
                text: 'Оформить заказ',
                callback_data: 'order'
              }, {
                text: 'Оформить заказ',
                callback_data: 'confirm'
              }]
            ]
          }
        })
      }
      break;
     
      //проба теста класса
      case 'test': {
        var arr = {
          key: Math.random()
        };
        var test1 = new objStandart(callbackQuery.data, siteUrl);



        {
          userRef.push().set(test1);
          bot.sendMessage(message.chat.id, 'Added new website, but' + JSON.stringify(test1));
          break;
        }
      }
      //
      case 'delete': {
        mainlastnameRef.set(null);
        bot.sendMessage(message.chat.id, 'заказы удалены');
      }
      break;
      case 'delete1': {
        mainlastnameRef.set(null);
        bot.sendMessage(message.chat.id, 'заказы удалены');
      }
      break;
      case 'package12': {
        bot.sendMessage(message.chat.id, 'тест упаковки');
      }
      break;
      case 'package22': {
        bot.sendMessage(message.chat.id, 'Введите количество');
        bot.on("message", (msg) => {


          userRef.push().set({
            категория: callbackQuery.data,
            заказ: msg.text,
            Имя: msg.from.last_name

          });
          bot.sendMessage(message.chat.id, 'Благодарим вас за оформление заказа');
        })
      }
      break;

      case 'development': {
        var a=msg.from.last_name;
        bot.sendMessage(message.chat.id, 'text '+firebase.database().ref(a));
      }
      
      break;
      case 'development1': {
        bot.sendMessage(message.chat.id, 'text '+mainlastnameRef.toJSON().toString());
      }
      
      break;
      case 'Масло растительное': {
        bot.sendMessage(message.chat.id, 'введите подходяшую упаковку', {
          reply_markup: {
            inline_keyboard: [
              [{
                text: 'Стекляная бутылка',
                callback_data: 'стекляная бутылка'
              }, {
                text: 'Полимерная бутылка',
                callback_data: 'Полимерная бутылка'
              }, ]
            ]
          }
        });

        bot.on("callback_query", (callbackQuery) => {
          const upakov = userRef.child(callbackQuery.data);

          {
            while(canMessage){
            bot.sendMessage(message.chat.id, 'Введите количество');
            bot.on("message", (msg) => {
              while(canAdd){

              upakov.push().set({
                категория: callbackQuery.data,
                заказ: msg.text,
                Имя: msg.from.last_name

              });


              bot.sendMessage(message.chat.id, 'Благодарим вас за оформление заказа');
              bot.sendMessage(message.chat.id, 'Чем я могу вам еще помочь', {
                reply_markup: {
                  inline_keyboard: [
                    [
          {
            text: 'Каталог',
            callback_data: 'catalog'
          
          },
          {
            text: 'Прайс-лист',
            callback_data: 'pricelist'
          }
                    ],
                    [{
                      text: 'Контакты',
                      callback_data: 'contacts1'
                    },
                      {
                        
                          text: 'Оформить заказ',
                          callback_data: 'confirm1'
                        
                      },
                    ],
                    [
                    /*  {
                      text: 'Просмотр заказов',
                      callback_data: 'development1'
                    },*/
                     {
                      text: 'Удалить заказ',
                      callback_data: 'delete1'
                    },  ]
                  ]
                }
              })
             
              canAdd=false; // bot.removeAllListeners();
            }
            })
            canMessage=false;
          }  
        }
    
      })
      
      }

      break;

      case 'Маргарин': {
    
        bot.sendMessage(message.chat.id, 'введите подходяшую упаковку', {
          reply_markup: {
            inline_keyboard: [
              [{
                text: 'Брусок завёрнутый в фольгу',
                callback_data: 'Брусок завёрнутый в фольгу'
              }, {
                text: 'Коробка из полимерных материалов',
                callback_data: 'Коробка из полимерных материалов'
              }, ]
            ]
          }
        });

        bot.on("callback_query", (callbackQuery) => {
          const upakov = userRef.child(callbackQuery.data);

          {
            while(canMessage){
            bot.sendMessage(message.chat.id, 'Введите количество');
            bot.on("message", (msg) => {
              while(canAdd){

              upakov.push().set({
                категория: callbackQuery.data,
                заказ: msg.text,
                Имя: msg.from.last_name

              });


              bot.sendMessage(message.chat.id, 'Благодарим вас за оформление заказа');
              bot.sendMessage(message.chat.id, 'Чем я могу вам еще помочь', {
                reply_markup: {
                  inline_keyboard: [
                    [
          {
            text: 'Каталог',
            callback_data: 'catalog'
          
          },
          {
            text: 'Прайс-лист',
            callback_data: 'pricelist'
          }
                    ],
                    [{
                      text: 'Контакты',
                      callback_data: 'contacts1'
                    },
                      {
                        
                          text: 'Оформить заказ',
                          callback_data: 'confirm1'
                        
                      },
                    ],
                    [{
                      text: 'Просмотр заказов',
                      callback_data: 'development1'
                    }, {
                      text: 'Удалить заказ',
                      callback_data: 'delete1'
                    },  ]
                  ]
                }
              })
             
              canAdd=false; // bot.removeAllListeners();
            }
            })
            canMessage=false;
          }  
        }
    
      })
      
      }

      break;
      case 'Майонез': {
    
        bot.sendMessage(message.chat.id, 'введите подходяшую упаковку', {
          reply_markup: {
            inline_keyboard: [
              [{
                text: 'Упаковка Дойпак ',
                callback_data: 'Дойпак'
              }, {
                text: 'Упаковка подушка 2',
                callback_data: 'Подушка'
              }, ]
            ]
          }
        });

        bot.on("callback_query", (callbackQuery) => {
          const upakov = userRef.child(callbackQuery.data);

          {
            while(canMessage){
            bot.sendMessage(message.chat.id, 'Введите количество');
            bot.on("message", (msg) => {
              while(canAdd){

              upakov.push().set({
                категория: callbackQuery.data,
                заказ: msg.text,
                Имя: msg.from.last_name

              });


              bot.sendMessage(message.chat.id, 'Благодарим вас за оформление заказа');
              setTimeout((  bot.sendMessage(message.chat.id, 'Чем я могу вам еще помочь', {
                reply_markup: {
                  inline_keyboard: [
                    [
          {
            text: 'Каталог',
            callback_data: 'catalog'
          
          },
          {
            text: 'Прайс-лист',
            callback_data: 'pricelist'
          }
                    ],
                    [{
                      text: 'Контакты',
                      callback_data: 'contacts1'
                    },
                      {
                        
                          text: 'Оформить заказ',
                          callback_data: 'confirm1'
                        
                      },
                    ],
                    [
                      {                      text: 'Просмотр заказов',
                      callback_data: 'development1'
                    }, {
                      text: 'Удалить заказ',
                      callback_data: 'delete1'
                    },  ]
                  ]
                }
              })),5000);
            
             
              canAdd=false; // bot.removeAllListeners();
            }
            })
            canMessage=false;
          }  
        }
    
      })
      
      }

      break;


      }

    });
    canMainMenu=false;
  }

  canMainMenu=true;
}

);


