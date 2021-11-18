/** DayJs **/
dayjs.extend(window.dayjs_plugin_customParseFormat);
dayjs.extend(window.dayjs_plugin_relativeTime);

const app = new Vue({
  el: '#app',
  data: {
    contacts: [
      {
          name: 'Michele',
          avatar: '_1',
          visible: true,
          messages: [{
              date: '10/01/2020 15:30:55',
              message: 'Hai portato a spasso il cane?',
              status: 'sent'
          },
              {
                  date: '10/01/2020 15:50:00',
                  message: 'Ricordati di dargli da mangiare',
                  status: 'sent'
              },
              {
                  date: '10/01/2020 16:15:22',
                  message: 'Tutto fatto!',
                  status: 'received'
              }
          ],
      },
      {
          name: 'Fabio',
          avatar: '_2',
          visible: true,
          messages: [{
              date: '20/03/2020 16:30:00',
              message: 'Ciao come stai?',
              status: 'sent'
          },
              {
                  date: '20/03/2020 16:30:55',
                  message: 'Bene grazie! Stasera ci vediamo?',
                  status: 'received'
              },
              {
                  date: '20/03/2020 16:35:00',
                  message: 'Mi piacerebbe ma devo andare a fare la spesa. ',
                  status: 'received'
              }
          ],
      },
      {
          name: 'Samuele',
          avatar: '_3',
          visible: true,
          messages: [{
              date: '28/03/2020 10:10:40',
              message: 'La Marianna va in campagna',
              status: 'received'
          },
              {
                  date: '28/03/2020 10:20:10',
                  message: 'Sicuro di non aver sbagliato chat?',
                  status: 'sent'
              },
              {
                  date: '28/03/2020 16:15:22',
                  message: 'Ah scusa!',
                  status: 'received'
              }
          ],
      },
      {
          name: 'Giuseppe',
          avatar: '_4',
          visible: true,
          messages: [{
              date: '10/01/2020 15:30:55',
              message: 'Lo sai che ha aperto una nuova pizzeria?',
              status: 'sent'
          },
              {
                  date: '10/01/2020 15:50:00',
                  message: 'Si, ma preferirei andare al cinema',
                  status: 'received'
              }
          ],
      },
      {
          name: 'Giorgio',
          avatar: '_5',
          visible: true,
          messages: [{
              date: '10/01/2020 15:30:55',
              message: 'Lo sai che ha aperto una nuova pizzeria?',
              status: 'sent'
          },
              {
                  date: '10/01/2020 15:50:00',
                  message: 'Si, ma preferirei andare al cinema',
                  status: 'received'
              }
          ],
      },
      {
          name: 'Francesca',
          avatar: '_6',
          visible: true,
          messages: [{
              date: '10/01/2020 15:30:55',
              message: 'Lo sai che ha aperto una nuova pizzeria?',
              status: 'sent'
          },
              {
                  date: '10/01/2020 15:50:00',
                  message: 'Si, ma preferirei andare al cinema',
                  status: 'received'
              }
          ],
      },
      {
          name: 'Tommaso',
          avatar: '_7',
          visible: true,
          messages: [{
              date: '10/01/2020 15:30:55',
              message: 'Lo sai che ha aperto una nuova pizzeria?',
              status: 'sent'
          },
              {
                  date: '10/01/2020 15:50:00',
                  message: 'Si, ma preferirei andare al cinema',
                  status: 'received'
              }
          ],
      },
      {
          name: 'Gianluca',
          avatar: '_8',
          visible: true,
          messages: [{
              date: '10/01/2020 15:30:55',
              message: 'Lo sai che ha aperto una nuova pizzeria?',
              status: 'sent'
          },
              {
                  date: '10/01/2020 15:50:00',
                  message: 'Si, ma preferirei andare al cinema',
                  status: 'received'
              }
          ],
      },
      
  ],

  activeChat: null,

  activeMessage: null,

  optionActive: false,

  searchingWord: '',

  visibleContact:[],

  invisibleContact: [],

  newText: '',

  },

  

  methods:{

    getImage(id){
      return 'img/avatar'+id+'.jpg' ;
    },

    isVisible(array, index){
      for(element in array){
        array[element].visible = true;
      }
      if(array[index].visible === true){
        array[index].visible = false;
      }
      else array[index].visible = true;
    },

    lastMessage(array){
      let lastM = array.slice(-1)[0].message;
      if(lastM.length > 30){
        console.log('ultimo messaggio è troppo lungo!!');
        lastM = lastM.substr(0, 30) + '...';
      }
      return lastM;
    },

    isActive(element){
      this.newText = '';
      this.activeChat = element;
    },

    sendMessage(activeChat){
      newMessage = {
        date: dayjs().format("DD/MM/YYYY HH:mm:ss"),
        message: this.newText,
        status: 'sent'
      };
      newReceivedMessage = {
        date: dayjs().format("DD/MM/YYYY HH:mm:ss"),
        message: 'ok',
        status: 'received'
      }
      console.log('messaggio inviato: ', this.newText);
      activeChat.messages.push(newMessage);
      this.newText = '';

      //answer
      function answer(){
        return activeChat.messages.push(newReceivedMessage);
      }
      const newAnswerMessage = setInterval(answer(), 1000);
      clearInterval(newAnswerMessage);

    },

    searchFunction(){
      console.log(this.searchingWord);
      for(contact of this.contacts){
        console.log(contact.name);
        const name = contact.name.toLowerCase();
        const search = this.searchingWord.toLowerCase();
        if(name.includes(search)){
          console.log('contiene!!')
          contact.visible = true;
        }
        else{
          console.log('non contiene!');
          contact.visible = false;
        }
      }
      
      
    },

    isClicked(message){
      this.activeMessage = message;
      console.log(this.activeMessage);
    },

    deleteMessages(array, index){
      console.log('array selezionato:', array);
      console.log('indice dell\'elemento selezionato', index);
      array.splice(index, 1);
      if(array.length === 0){
        console.log('lunghezza array', array.length);
        array[0] = {
          date: dayjs().format("DD/MM/YYYY HH:mm:ss"),
          message: '',
          status: ''
        }
      }
      
    },

  }

  
})