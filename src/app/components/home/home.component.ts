import { Component, OnInit, NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
// custom services 
import { BooksService } from '../../services/books.service';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Book } from '../../Entities/book';
import { AngularFireAuth } from "angularfire2/auth";

import * as firebase from "firebase/app";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
@NgModule({
  imports: [MatButtonModule, MatCheckboxModule],
  exports: [MatButtonModule, MatCheckboxModule],
})
export class HomeComponent implements OnInit {

  allBooks: Observable<Book[]>;
  FavBooks: Observable<Book[]>;
  unReadBooks: Observable<Book[]>;

  // allBooks: any;


  // auth user 
  user: Observable<firebase.User>;
  authenticated: boolean = false;
  constructor(private booksService: BooksService,
    private auth: AngularFireAuth , 
  ) {

    this.auth.authState.subscribe((aa) => {
      if (aa != null) {

        this.user = this.auth.authState;
        this.authenticated = true;
        this.getAll();
        this.getFav();
        this.getUnRead();
      } 


    });

    // this.items = this.booksService.getAll().subscribe(books => {

    //   this.allBooks = books;
    //   console.log(this.allBooks);


    // });
    // this.booksService.getUnreadedBook().snapshotChanges().pipe(map(changes => {
    //   return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    // })).subscribe(customers => {
    //   this.allBooks = customers;
    // });
    // this.allBooks = this.booksService.getAll();

  }
  getAll() {

    // get all database 
    this.booksService.getBooksList().snapshotChanges().pipe(map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    })).subscribe(books => {
      this.allBooks = books as any;

    });

  }

  getFav() {
    // get all database 
    this.booksService.getBooksList().snapshotChanges().pipe(map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    })).subscribe(books => {
      const topReate = books.filter(book => book.rate > 4);
      this.FavBooks = topReate as any;

    });

  }
  getUnRead() {
    // get all database 
    this.booksService.getBooksList().snapshotChanges().pipe(map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    })).subscribe(books => {
      const unRead = books.filter(book => book.dateread == null);
      this.unReadBooks = unRead as any;

    });

  }


  ngOnInit() {


  }

}
