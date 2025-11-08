import { Component } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Log-in';
  loginInput = {
    // username: 'userxten', //ทดสอบusername
    // password: 'x10tech', //ทดสอบpassword
    username: '',
    password: '',
  };
  private getUrl = 'http://alpha-xten.com:8080/api/v1/test_login';

  private httpOp = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }), //ตั้งค่าheaderให้ตรงกับAPI
  };

  constructor(private http: HttpClient) {}

  login(): void {
    const reqBody = {
      username: this.loginInput.username,
      password: this.loginInput.password,
    };
    // if (!reqBody.username || !reqBody.password) {
    //   alert('กรุณาตรวจสอบUsernameและPassword');
    //   return;
    // } //กรณีไม่ดักค่าจะทำให้เกิดRESPONSEที่3
    this.http.post<any>(this.getUrl, reqBody, this.httpOp).subscribe({
      next: (response) => {
        const responseData = response.meta?.response_data;
        const responseDesc = response.meta?.response_desc;
        const responseCode = response.meta?.response_code;
        const responseDatetime = response.meta?.response_datetime;
        if (!responseData) {
          //RESPONSEที่3ไม่มีresponse_data
          alert(`${responseDatetime}:\n ${responseDesc}:\n ${responseCode}`);
        } //ในกรณีที่มีการตรวจสอบค่าusername,password
        else
          alert(
            `${responseDatetime}:\n ${responseDesc}:\n ${responseCode}:\n ${responseData}`
          );
      },
      error: (error) => {
        alert(`${error}`);
      },
    });
  }
}
