import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@environments/environment.development';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen',
  standalone: true
})
export class ImagenPipe implements PipeTransform {
  transform(img: string, tipo: string = 'files'): any {
    let url = base_url + '/files/user';

    if (!img) {
      // return base_url + '/files/user' + '/no-image.png';
      return 'assets/img/no-image.png';
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }

    switch (tipo) {
      case 'files':
        url += '/' + img;
        break;

      default:
        url += '/xxxxx';
    }

    return url;
  }
}
