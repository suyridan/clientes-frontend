import { Component, OnInit } from "@angular/core";
import { Cliente } from "./cliente";
import { ClientesService } from "./clientes.service";
import { Router, ActivatedRoute } from "@angular/router";
import swal from "sweetalert2";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html"
})
export class FormComponent implements OnInit {
  public cliente: Cliente = new Cliente();
  public titulo: String = "Crear Cliente";
  constructor(
    private ClientesService: ClientesService,
    private router: Router,
    private ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarCliente();
  }

  public cargarCliente(): void {
    this.ActivatedRoute.params.subscribe(params => {
      let id = params["id"];
      if (id) {
        this.ClientesService.getCliente(id).subscribe(cliente => {
          this.cliente = cliente;
        });
      }
    });
  }

  public create(): void {
    this.ClientesService.create(this.cliente).subscribe(response => {
      this.router.navigate(["/clientes"]);
      swal.fire(
        "Nuevo cliente",
        `Cliente ${this.cliente.nombre} creado con exito!`,
        "success"
      );
    });
  }

  public update(): void {
    this.ClientesService.updateCliente(this.cliente).subscribe(cliente => {
      this.router.navigate(["/clientes"]);
      swal.fire(
        "Cliente actualizado",
        `Cliente ${this.cliente.nombre} actualizado!`,
        "success"
      );
    });
  }
}
