import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeJsonPipe } from './prettyjson-safe.pipe';
import { PrettyJsonPipe } from './prettyjson.pipe';
import { PrettyJsonComponent } from './prettyjson.component';

@NgModule({
    imports: [CommonModule],
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
