import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Shift {
  employeeName: string;
  role: string;
  startTime: string;
  endTime: string;
  breakTime: number;
  storeLocation: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})

export class AppComponent {
  shift: Shift = {
    employeeName: '',
    role: '',
    startTime: '',
    endTime: '',
    breakTime: 0,
    storeLocation: '',
    status: '仮',
    createdAt: '',
    updatedAt: ''
  };

  constructor(private firestore: AngularFirestore) {}

  // シフトデータをFirestoreに追加する
  addShift() {
    const timestamp = new Date().toISOString(); // 現在時刻を ISO 8601 形式で取得
    const newShift: Shift = {
      employeeName: this.shift.employeeName,
      role: this.shift.role,
      startTime: this.shift.startTime,
      endTime: this.shift.endTime,
      breakTime: this.shift.breakTime,
      storeLocation: this.shift.storeLocation,
      status: this.shift.status,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    this.firestore.collection('shifts').add(newShift).then(() => {
      console.log('シフトが保存されました');
      // フォームのリセット
      this.shift = {
        employeeName: '',
        role: '',
        startTime: '',
        endTime: '',
        breakTime: 0,
        storeLocation: '',
        status: '仮',
        createdAt: '',
        updatedAt: ''
      };
    }).catch((error: any) => {
      console.error('シフトの保存に失敗しました:', error);
    });
  }
}
