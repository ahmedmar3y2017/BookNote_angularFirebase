import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
// custom services 
import { BooksService } from '../../services/books.service';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Book } from '../../Entities/book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  allBooks: Observable<Book[]>;
  FavBooks: Observable<Book[]>;
  unReadBooks: Observable<Book[]>;

  // allBooks: any;

  constructor(private booksService: BooksService) {


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
    this.getAll();

  }
  getAll() {

    // get all database 
    this.booksService.getBooksList().snapshotChanges().pipe(map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    })).subscribe(books => {
      this.allBooks = books as any;

    });

  }



  ngOnInit() {


  }

}
