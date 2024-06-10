import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UsuariosService } from '@app/services/usuarios.service';
import { AutenticacionService } from '@app/services/autenticacion.service';
import { RolesService } from '@app/services/roles.service';
import { FacultadesServicioService } from '@app/services/facultades-servicio.service';
import { ProgramasService } from '@app/services/programas.service';
import { PopupCrearEditarComponent } from '@app/shared/popup-crear-editar/popup-crear-editar.component';
import { PopupEliminarComponent } from '@app/shared/popup-eliminar/popup-eliminar.component';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent {

  usuarios: any[] = [];
  displayedColumns: string[] = ['nombre','apellido','email', 'username', 'rol', 'facultad', 'enabled', 'acciones'];
  listadoFacultades:any[] = [];
  listadoProgramas:any[] = [];
  listadoRoles:any[] = [];
  form!: FormGroup;
  p: number = 1;
  searchText: string = '';
  filteredUsuarios: any[] = [];

  constructor(private usuariosService: UsuariosService,
              private autenticacionService: AutenticacionService,
              private rolesService: RolesService,
              private facultadesService: FacultadesServicioService,
              private programasService: ProgramasService,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.obtenerUsuarios();
    this.obtenerRoles();
    this.obtenerFacultades();
  }


  obtenerUsuarios() {
    this.usuariosService.getUsuarios().subscribe(
      (result) => {
        console.log(result);
        this.usuarios = result;
        this.applyFilter();
      },
      (error) => {
        console.error('Error al obtener los departamentos:', error);
      }
    );
  }

  obtenerRoles()
  {
    this.rolesService.getRoles().subscribe((result) => {
      console.log(result);
        this.listadoRoles = result;
    })
  }
  obtenerFacultades()
  {
    this.facultadesService.getFacultades().subscribe((result) => {
      console.log(result);
        this.listadoFacultades = result;
    })
  }
  obtenerProgramas()
  {
    this.programasService.getProgramas().subscribe((result) => {
      console.log(result);
        this.listadoProgramas = result;
    })
  }

  applyFilter() {
    if (this.searchText) {
      this.filteredUsuarios = this.usuarios.filter(usuario =>
        usuario.nombre.toLowerCase().includes(this.searchText.toLowerCase()) ||
        usuario.apellido.toLowerCase().includes(this.searchText.toLowerCase()) ||
        usuario.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
        usuario.rol.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredUsuarios = this.usuarios;
    }
  }

  crearUsuario(nombre: string, apellido: string, email:string, idRol:number, idFacultad: number) {
    try {
      console.log(nombre);
      console.log(apellido);
      const params = {
        nombre: nombre,
        apellido: apellido,
        email:email,
        idRol: idRol,
        idFacultad:idFacultad
      };
      console.log(params);
      this.autenticacionService.registrarUsuario(params).subscribe((result: any) => {
        console.log(result);
        if (result !== null) {
          console.log("Usuario guardado");
          this.obtenerUsuarios();
        }
      });
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  }

  editarUsuario(idUsuario:string, nombre:string, apellido:string, email:string, idRol: number, 
    idFacultad: number)
  {
    try
    {
      console.log(idUsuario)
      console.log(nombre);
      console.log(apellido);
      console.log(email);
      const params =
      {
        nombre: nombre,
        apellido: apellido,
        email: email
      }
      console.log(params);
      this.usuariosService.editDatosBasicosUsuario(idUsuario, nombre, apellido, email, idRol, idFacultad).subscribe((result:any) => {
        console.log(result);
        if (result = "OK")
        {
          console.log("Usuario editado");
          this.obtenerUsuarios();
        }

      });
    }
    catch(error)
      {

      }

  }

  openCreateDialog(modulo:string, usuario?: any): void {
    console.log(usuario);

    const dialogRef = this.dialog.open(PopupCrearEditarComponent , {
      width:'350px',
      data: {
              modulo:modulo,
              nombre: usuario ? usuario.nombre : '',
              apellido: usuario ? usuario.apellido : '',
              email: usuario ? usuario.email : '',
              listaRoles: this.listadoRoles,
              listaFacultades: this.listadoFacultades,
              listaProgramas: this.listadoProgramas,
              isEdit: !!usuario,
            }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró');
      console.log('Resultado:', result);
      if (result) {
        if (usuario) {
          console.log("Edita Usuario");
          this.editarUsuario(usuario.id, result.nombre, result.apellido, result.email, result.rol, result.entidadPerteneciente);
        } else {
          console.log("Crea usuario");
          this.crearUsuario(result.nombre, result.apellido, result.email, result.rol, result.entidadPerteneciente);
        }
      }

    });
  }

  desactivarUsuario(username:string)
  {
    try 
    {
      this.usuariosService.desactivarUsuario(username).subscribe((result:any) => {
        console.log(result);
        if (result != null)
          {
            console.log("Usuario desactivado");
            this.obtenerUsuarios();
          }
      }
    )
    }
    catch (error)
    {
      
    }
  }

  activarUsuario(username:string)
  {
    try 
    {
      this.usuariosService.activarUsuario(username).subscribe((result:any) => {
        console.log(result);
        if (result != null)
          {
            console.log("Usuario activado");
            this.obtenerUsuarios();
          }
      }
    )
    }
    catch (error)
    {
      
    }
  }


}
