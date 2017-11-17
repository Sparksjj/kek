import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {chatDemoData} from "./chat.demo";
import * as _ from 'lodash';
import * as moment from 'moment';
import {fadeInAnimation} from "../../../route.animation";

@Component({
  selector: 'ms-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [ fadeInAnimation ]
})
export class ChatComponent implements OnInit {

  chats: any[];
  activeChat: any;
  newMessage: string;

  constructor() { }

  ngOnInit() {
    this.chats = _.sortBy(chatDemoData, 'lastMessageTime').reverse();
    this.activeChat = this.chats[0];
  }

  setActiveChat(chat) {
    this.activeChat = chat;
  }

  send() {
    if (this.newMessage) {
      this.chats[0].messages.push({
        message: this.newMessage,
        when: moment(),
        who: 'me'
      });

      this.newMessage = '';
    }
  }

  clearMessages(activeChat) {
    activeChat.messages.length = 0;
  }
}
