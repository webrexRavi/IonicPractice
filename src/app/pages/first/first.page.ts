import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { PhotoService } from 'src/app/services/photo.service';
import { File } from '@ionic-native/File/ngx';



@Component({
  selector: 'app-first',
  templateUrl: './first.page.html',
  styleUrls: ['./first.page.scss'],
})
export class FirstPage implements OnInit {
  currentImage: any;
  public photos: any = [1, 2, 3];

  constructor(private photoLibrary: PhotoLibrary, private camera: Camera, public photoService: PhotoService, private file: File) { }

  ngOnInit() {
    this.file.createDir(this.file.externalRootDirectory, 'IonicTestApp', true);

    this.photoService.loadSaved();

  }


}
