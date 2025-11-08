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
    username: 'userxten',
    password: 'x10tech',
  };
  private getUrl = 'http://alpha-xten.com:8080/api/v1/test_login';

  private httpOp = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  login(): void {
    const reqBody = {
      username: this.loginInput.username,
      password: this.loginInput.password,
    };
    this.http.post<any>(this.getUrl, reqBody, this.httpOp).subscribe({
      next: (response) => {
        const responseData = response.meta?.response_data;
        const responseDesc = response.meta?.response_desc;
        const responseCode = response.meta?.response_code;
        const responseDatetime = response.meta?.response_datetime;
        alert(
          `${responseDatetime}:\n ${responseDesc}:\n ${responseCode}:\n ${responseData}`
        );
      },
      error: (error) => {
        const errorResponse = error.error?.meta?.response_data;
      },
    });
  }
}
