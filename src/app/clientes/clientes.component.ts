import { Component, OnInit } from "@angular/core";
import { Cliente } from "./cliente";
import { ClientesService } from "./clientes.service";
import swal from "sweetalert2";

@Component({
  selector: "app-clientes",
  templateUrl: "./clientes.component.html",
  styleUrls: ["./clientes.component.css"]
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];

  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {
    this.clientesService
      .getClientes()
      .subscribe(clientes => (this.clientes = clientes));
  }

  public delete(cliente: Cliente): void {
    swal
      .fire({
        title: "Esta seguro de eliminar",
        text: `Esta seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar"
      })
      .then(result => {
        if (result.value) {
          this.clientesService.delete(cliente.id).subscribe(response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente);
            swal.fire(
              "Eliminado!",
              `Cliente: ${cliente.nombre} eliminado`,
              "success"
            );
          });
        }
      });
  }
}
