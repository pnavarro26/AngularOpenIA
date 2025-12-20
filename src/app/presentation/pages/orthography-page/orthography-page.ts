import { Component } from '@angular/core';
import {
  GptMessage,
  MyMessage,
  TextMessageBox,
  TextMessageBoxFile,
  TextMessageBoxFileForm,
  TypingLoader,
} from '@components/index';

@Component({
  selector: 'app-orthography-page',
  imports: [
    GptMessage,
    MyMessage,
    TypingLoader,
    TextMessageBox,
    TextMessageBoxFile,
  ],
  templateUrl: './orthography-page.html',
  styles: ``,
})
export default class OrthographyPage {
  handleMessage(promt: TextMessageBoxFileForm) {
    console.log({ promt });
  }
}
