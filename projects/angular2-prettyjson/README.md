# @talentia/angular2-prettyjson

An Angular module to pretty print JSON objects.
Contains a pipe similar to [JsonPipe](https://angular.io/docs/ts/latest/api/common/index/JsonPipe-class.html) but adds support for spacing and handling of circular structures.  
Also contains a component that outputs any object with syntax highlight.  
**Warning**: just as the `JsonPipe`, this is an impure pipe and should be used only for debugging purposes.

## Install

```bash
npm i @talentia/angular2-prettyjson
```

## Usage

Import PrettyJsonModule to have access to the component and pipes

```ts
import { PrettyJsonModule } from '@talentia/angular2-prettyjson';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrettyJsonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Safe Pipe

The `SafeJsonPipe` aims to override the `JsonPipe` and so uses the same name "json". It also accepts an optional argument `spaces=2` for the JSON stringify spacing.

```ts
@Component({
  ....
  template: `
    <pre>
    {{ circularObj | safejson }}
    {{ circularObj | safejson:4 }}
    </pre>
  ` // make sure to use a surrounding element with white-space: pre; for best results
  })
  ...
```

outputs

2 spaces (default):

![2 spaces](https://cloud.githubusercontent.com/assets/487758/15599442/d163cf2a-2415-11e6-8097-f1f9f62fd3ce.png)

4 spaces:

![4 spaces](https://cloud.githubusercontent.com/assets/487758/15599411/a6815a8e-2415-11e6-8f1f-e68db77885a2.png)

### Pretty (and safe) Pipe

The `PrettyJsonPipe` stringifies the object and then adds spans around properties, `null`, arrays etc. You can bind it to the innerHtml of other elements.

```ts
@Component({
  ....
  template: `
    <pre [innerHtml]="circularObj | prettyjson:3"></pre>
  `
  })
  ...
```

 A good set of styles to use is

 ```css
    pre span {white-space: normal;}
    .string { color: green; }
    .number { color: darkorange; }
    .boolean { color: blue; }
    .null { color: magenta; }
    .key { color: red; }
 ```

 If you wish to use the `styles` property of the parent component, please prefix each class selector with `:host /deep/`
 e.g.

 ```ts
@Component({
  ....
  template: `
    <pre [innerHtml]="circularObj | prettyjson:3"></pre>
  `,
  styles: [
    `pre {outline: 1px solid #ccc; padding: 5px; margin: 5px; }
    :host ::ng-deep span {white-space: normal;}
    :host ::ng-deep .string { color: green; }
    :host ::ng-deep .number { color: darkorange; }
    :host ::ng-deep .boolean { color: blue; }
    :host ::ng-deep .null { color: magenta; }
    :host ::ng-deep .key { color: red; }`
  ]
})
  ...
```

 See output under component below.

### Component

 Creates a `pre` element into which the Pretty Json pipe'd object is dumped as HTML. Takes care of styling.

 Takes an input `[obj]` that can be data bound to any object.

 Make sure `PrettyJsonModule` is imported in your own module.

```ts
@Component({
  ....
  template: `
    <prettyjson [obj]="theForm.value"></prettyjson>
  `
  })
  export class MyComponent {
    ngOnInit() {
      this.theForm = this.formBuilder.group({
       ...
```

## Further help

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.14.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Reference

This project is forked from [matiboy/angular2-prettyjson](https://github.com/matiboy/angular2-prettyjson).