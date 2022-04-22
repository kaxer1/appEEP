import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DataCentralService } from '../../../libs/data-central.service';

@Component({
  selector: 'app-uploadfiles',
  templateUrl: './uploadfiles.component.html',
  styles: [
  ]
})
export class UploadfilesComponent implements OnInit {

  @Input() metodo: string = '';

  @ViewChild('fileInput') fileInput: ElementRef;

  @Output() onUploadSuccess: EventEmitter<any> = new EventEmitter();

  public FileForm: FormGroup
  
  public selectedFiles: File;

  constructor(private formBuilder: FormBuilder, private dcentral: DataCentralService) { }

  ngOnInit(): void {
    this.FileForm = this.formBuilder.group({
      file: ['', Validators.required],
    })
  }

  selectFile(event) {
    this.selectedFiles = event.target.files[0];
    this.FileForm.get('file').setValue(this.selectedFiles);
  }

  EnviarArchivo() {

    const formData = new FormData();
    formData.append('file', this.selectedFiles);

    this.dcentral.SubirArchivo(formData, this.metodo).subscribe(resp => {
      this.Limpiar();
      this.onUploadSuccess.emit();
    })
    
  }

  Limpiar() {
    this.fileInput.nativeElement.value = '';
  }

}
