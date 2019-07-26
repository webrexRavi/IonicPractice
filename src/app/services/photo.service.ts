import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/File/ngx';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photos: Photo[] = [];

  constructor(private camera: Camera, private storage: Storage, private file: File) { }

  takePicture(sourceType: number) {
    let base64ImageData;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType,
    }

    this.camera.getPicture(options).then((imageData) => {
      base64ImageData = 'data:image/jpeg;base64,' + imageData;
      // Add new photo to gallery
      this.photos.unshift({
        data: 'data:image/jpeg;base64,' + imageData
      });

      this.writeFile(base64ImageData, 'IonicTestApp', 'sample.jpeg');
      // this.file.writeFile(this.file.externalRootDirectory + 'IonicTestApp', 'sample.jpeg', tmpImage, { replace: true });
      // Save all photos for later viewing
      this.storage.set('photos', this.photos);
    }, (err) => {
      // Handle error
      console.log("Camera issue: " + err);
    });

  }

  public writeFile(base64Data: any, folderName: string, fileName: any) {
    console.log(base64Data, folderName, fileName);
    let contentType = this.getContentType(base64Data);
    let DataBlob = this.base64toBlob(base64Data, contentType);
    // here iam mentioned this line this.file.externalRootDirectory is a native pre-defined file path storage. You can change a file path whatever pre-defined method.  
    let filePath = this.file.externalRootDirectory + folderName;

    this.file.writeFile(filePath, fileName, DataBlob, contentType).then((success) => {
      console.log("File Writed Successfully", success);
    }).catch((err) => {
      console.log("Error Occured While Writing File", err);
    })
  }
  //here is the method is used to get content type of an bas64 data  
  public getContentType(base64Data: any) {
    let block = base64Data.split(";");
    let contentType = block[0].split(":")[1];
    return contentType;
  }
  //here is the method is used to convert base64 data to blob data  
  public base64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    let sliceSize = 512;
    let tempB64 = b64Data.split(',')[1];
    console.log(tempB64);
    let byteCharacters = atob(tempB64);
    let byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);
      let byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    let blob = new Blob(byteArrays, {
      type: contentType
    });
    return blob;
  }

  loadSaved() {
    console.log(this.storage);
    console.log(this.file.listDir(this.file.externalRootDirectory, 'IonicTestApp'));
    this.storage.get('photos').then((photos) => {
      this.photos = photos || [];
    });
  }

}

class Photo {
  data: any;
}
