import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Book } from '../../Entities/book';
@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css']
})
export class DeleteBookComponent implements OnInit {
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

  removeBook() {
    this.booksService.deleteBook(this.id);
    this.router.navigate(['']);


  }

}
