import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms'
import { QuoteService } from 'src/app/services/quote.service';
import { Quote } from 'src/app/domain/quote.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  quote: Quote = {
    pic:'/assets/img/1.jpg',
    cn: '天生我才必有用',
    en: 'All things in their being are good for something.'
  };
  constructor(private fb:FormBuilder, private quoteService$: QuoteService) { 
    this.quoteService$.getQuote().subscribe(q=>this.quote = q);
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['yan@gmail.com',Validators.compose([Validators.required, Validators.email, this.validate])],
      password: ['',Validators.required]
    })
   
  }

  onSubmit({value, valid},ev: Event){ 
    ev.preventDefault();
    console.log(JSON.stringify(value));
    console.log(valid);
  }

  validate(c: FormControl): {[key: string]: any} {
    if(!c.value){
      return null;
    }
    const pattern = /^yan+/;
    if(pattern.test(c.value)){
      return null;
    }
    return{
      emailNotValid: 'the email must start with Yan'
    }
  }
}
