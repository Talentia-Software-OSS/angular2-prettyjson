import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrettyJsonModule } from '@talentia/angular2-prettyjson';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  styles: [
    `pre {outline: 1px solid #ccc; padding: 5px; margin: 5px; }
    :host ::ng-deep span {white-space: normal;}
    :host ::ng-deep .string { color: green; }
    :host ::ng-deep .number { color: darkorange; }
    :host ::ng-deep .boolean { color: blue; }
    :host ::ng-deep .null { color: magenta; }
    :host ::ng-deep .key { color: red; }`
  ],
  imports: [PrettyJsonModule, RouterOutlet],
})
export class AppComponent {
  title = 'Talentia Pretty JSON';
  jsonData = { foo: 'bar', baz: { a: 1, b: [1, 2, 3], c: { d: true } } };
}
