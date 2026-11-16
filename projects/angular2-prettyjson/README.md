# @talentia/angular2-prettyjson

An Angular module to pretty print JSON objects.
Contains a pipe similar to [JsonPipe](https://angular.dev/api/common/JsonPipe) but adds support for spacing and handling of circular structures.  
Also contains a component that outputs any object with syntax highlight.  
**Warning**: just as the `JsonPipe`, this is an impure pipe and should be used only for debugging purposes.

## Compatibility

| @talentia/angular2-prettyjson | Angular |
| ----------------------------- | ------- |
| 3.0.13                        | 21.x    |
| 3.0.12                        | 20.x    |
| 3.0.9 - 3.0.11                | 19.x    |
| 3.0.7 - 3.0.8                 | 18.x    |
| 3.0.6                         | 17.x    |
| 3.0.4 - 3.0.5                 | 16.x    |
| 3.0.2 - 3.0.3                 | 15.x    |

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

The `SafeJsonPipe` (pipe name `safejson`) works like the `JsonPipe` but also handles circular structures. It also accepts an optional argument `spaces=2` for the JSON stringify spacing.

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

 The spans are injected via `[innerHtml]`, so Angular's emulated view encapsulation does not apply to them:
 component `styles` will not reach them (unless using the discouraged `::ng-deep`).
 Put the styles in a global stylesheet (e.g. `styles.css`). A good set of styles to use is

 ```css
    pre span {white-space: normal;}
    .string { color: green; }
    .number { color: darkorange; }
    .boolean { color: blue; }
    .null { color: magenta; }
    .key { color: red; }
 ```

 To keep them scoped, wrap the `pre` in an element with your own class and prefix the selectors, e.g.

 ```ts
@Component({
  ....
  template: `
    <div class="my-json">
      <pre [innerHtml]="circularObj | prettyjson:3"></pre>
    </div>
  `
})
  ...
```

 ```css
    /* styles.css */
    .my-json span {white-space: normal;}
    .my-json .string { color: green; }
    .my-json .number { color: darkorange; }
    .my-json .boolean { color: blue; }
    .my-json .null { color: magenta; }
    .my-json .key { color: red; }
 ```

 See output under component below.

### Component

 Creates a `pre` element into which the Pretty Json pipe'd object is dumped as HTML. Takes care of styling.

 The component host gets the `prettyjson` CSS class and its styles are scoped by it
 (`.prettyjson .string`, `.prettyjson .key`, ...): to customize the colors, override those selectors
 in a global stylesheet.

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

This project currently uses [Angular CLI](https://github.com/angular/angular-cli) version 21.2.25.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Reference

This project is forked from [matiboy/angular2-prettyjson](https://github.com/matiboy/angular2-prettyjson).