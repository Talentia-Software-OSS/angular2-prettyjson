import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
  standalone: false,
  selector: 'prettyjson',
  // The highlighted spans are injected via [innerHtml], so emulated encapsulation
  // cannot reach them: styles are global but scoped by the `prettyjson` host class.
  encapsulation: ViewEncapsulation.None,
  host: { class: 'prettyjson' },
  styles: [
    `.prettyjson pre {outline: 1px solid #ccc; padding: 5px; margin: 5px; }
    .prettyjson span {white-space: normal;}
    .prettyjson .string { color: green; }
    .prettyjson .number { color: darkorange; }
    .prettyjson .boolean { color: blue; }
    .prettyjson .null { color: magenta; }
    .prettyjson .key { color: red; }`
  ],
  template: `
    <pre [innerHtml]="obj | prettyjson"></pre>
  `,
})
export class PrettyJsonComponent {
  @Input() public obj: any;
}
