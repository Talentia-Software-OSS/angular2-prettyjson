import { NgModule } from '@angular/core';
import { SafeJsonPipe } from './prettyjson-safe.pipe';
import { PrettyJsonPipe } from './prettyjson.pipe';
import { PrettyJsonComponent } from './prettyjson.component';

@NgModule({
    declarations: [
        PrettyJsonPipe,
        SafeJsonPipe,
        PrettyJsonComponent
    ],
    exports: [
        PrettyJsonPipe,
        SafeJsonPipe,
        PrettyJsonComponent
    ]
})
export class PrettyJsonModule { }
