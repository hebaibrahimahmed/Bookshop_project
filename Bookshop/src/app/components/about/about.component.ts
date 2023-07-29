import { Component } from "@angular/core";
import { interval } from "rxjs";
import { take, startWith, map } from "rxjs/operators";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent {
  source = interval(25);
  counter1$ = this.source.pipe(
    take(73),
    map((value) => value + 1)
  );

  counter2$ = this.source.pipe(
    take(90),
    map((value) => value + 1)
  );

  counter3$ = this.source.pipe(
    take(61),
    map((value) => value + 1)
  );

  counter4$ = this.source.pipe(
    take(82),
    map((value) => value + 1)
  );

  onClick(msg: string) {
    alert(msg);
  }
}
