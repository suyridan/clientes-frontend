import { Component } from "@angular/core";

@Component({
  selector: "app-directiva",
  templateUrl: "./directiva.component.html",
  styleUrls: ["./directiva.component.css"]
})
export class DirectivaComponent {
  listaCurso: string[] = ["Typescript", "JavaScript", "Java SE", "C#", "PHP"];
  habilitar: boolean = false;

  setHabilitar(): void {
    this.habilitar = !this.habilitar;
  }
}
