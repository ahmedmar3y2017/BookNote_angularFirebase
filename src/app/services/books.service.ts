import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { mapChildrenIntoArray } from '@angular/router/src/url_tree';
// import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Observable';
import { map } from "rxjs/operators";
import { Book } from '../Entities/book';
@Injectable({
  providedIn: 'root'
})
export class BooksService {
  books: Observable<Book[]>;

  private dbPath = 'books';

  BooksRef: AngularFireList<Book> = null;

  constructor(private db: AngularFireDatabase) {

    this.BooksRef = db.list(this.dbPath);


  }
  createBook(book: Book): void {
    this.BooksRef.push(JSON.parse(JSON.stringify(book)));
  }

  updateBook(key: string, value: any): void {
    this.BooksRef.update(key, value).catch(error => this.handleError(error));
  }

  deleteBook(key: string): void {
    this.BooksRef.remove(key).catch(error => this.handleError(error));
  }

  getBooksList(): AngularFireList<Book> {
    return this.BooksRef;
  }
  getBookDetails(id: any) {
    return this.db.object('/books/' + id);
  }

  deleteAll(): void {
    this.BooksRef.remove().catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
  }
  // getAll(): Observable<Book[]> {

  //   // get all database 
  //   return this.db.list('/books');


  // }

  // getUnreadedBook(): AngularFireList<any> {


  //   return this.db.list('/books');


  // }


}
