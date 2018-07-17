import { Component, OnInit } from '@angular/core';
import { Book } from '../../Entities/book';
import { BooksService } from '../../services/books.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  book: Book = new Book();
  isRead: Boolean = false;
  constructor(private bookService: BooksService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }
  public updateDateAdded(dateAdded) {

    this.book.dateadded = dateAdded;

  }
  public updateDateRead(dateRead) {

    this.book.dateread = dateRead;
    this.isRead = true;
    console.log(this.isRead);

  }
  submitAdd() {

    this.bookService.createBook(this.book);
    this.router.navigate(['books']);

  }

}
