import { Component, OnInit } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }
  public sendEmail(e: Event) {
    e.preventDefault();
    emailjs.sendForm('service_riwhcl5', 'template_feoibrx', e.target as HTMLFormElement, '-1UeLsflTTiD1-et2')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }
  ngOnInit(): void {
  }

}
