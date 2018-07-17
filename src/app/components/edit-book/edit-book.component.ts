import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Book } from '../../Entities/book';
@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  book: Book = new Book();
  id: any;

  constructor(private booksService: BooksService,
    private router: Router,
    private route: ActivatedRoute) {


  }

  ngOnInit() {
    // get id parameter
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);

    this.booksService.getBookDetails(this.id).valueChanges().subscribe(book => {

      // console.log(JSON.stringify(book));
      this.book = book as Book;

    });
  }
  public updateDateAdded(dateAdded) {

    this.book.dateadded = dateAdded;

  }
  public updateDateRead(dateRead) {

    this.book.dateread = dateRead;


  }
  submitEdit() {
    this.booksService.updateBook(this.id, this.book);
    this.router.navigate(['books']);

  }

}
