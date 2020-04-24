import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/service.index';
import { Hospital } from 'src/app/models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ],
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  cargando: boolean = true;
  totalRegistros: number = 0;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this._modalUploadService.notificacion
        .subscribe(() => this.cargarHospitales());
  }

  buscarHospital(termino: string) {
      if (termino.length <= 0) {
        this.cargarHospitales();
        return;
      }
      this.cargando =  true;

      this._hospitalService.buscarHospital(termino)
          .subscribe((hospitales: Hospital[]) => {
             this.hospitales = hospitales;
             this.cargando = false;
          });
  }

  cargarHospitales() {

    this.cargando = true;

    this._hospitalService.cargarHospitales()
          .subscribe((resp: any) => {
            this.totalRegistros = this._hospitalService.totalHospitales;
            this.hospitales = resp;
            this.cargando = false;

          });

  }

  guardarHospital(hospital: Hospital){

    this._hospitalService.actualizarHospital(hospital)
        .subscribe();

  }


  borrarHospital(hospital: Hospital){

    this._hospitalService.borrarHospital(hospital._id)
          .subscribe(resp => this.cargarHospitales());
  }

  crearHospital(){

    swal({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del Hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then( (valor: string) => {
        if (!valor || valor.length === 0) {
          return;
        }

        this._hospitalService.crearHospital( valor)
            .subscribe(() => this.cargarHospitales());
    });

  }

  actualizarImagen(hospital: Hospital){

    this._modalUploadService.mostrartModal('hospitales', hospital._id);

  }


}
