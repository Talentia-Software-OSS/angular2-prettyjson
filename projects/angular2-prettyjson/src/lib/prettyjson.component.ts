import {Component, Input} from "@angular/core";

@Component({
  selector: "prettyjson",
  styles: [
    `pre {outline: 1px solid #ccc; padding: 5px; margin: 5px; }
    :host ::ng-deep span {white-space: normal;}
    :host ::ng-deep .string { color: green; }
    :host ::ng-deep .number { color: darkorange; }
    :host ::ng-deep .boolean { color: blue; }
    :host ::ng-deep .null { color: magenta; }
    :host ::ng-deep .key { color: red; }`
  ],
  template: `
    <pre [innerHtml]="obj | prettyjson">
    </pre>
  `,
})
export class PrettyJsonComponent {
  @Input() public obj: any;
}
