import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Shift {
  employeeName: string;
  role: string;
  startTime: string;  // datetime-local フォーマット
  endTime: string;    // datetime-local フォーマット
  breakTime: number;  // 休憩時間（分）
  storeLocation: string;
  status: string;     // 状態（確定、仮、キャンセル）
  createdAt: string;  // ISO 8601 日時
  updatedAt: string;  // ISO 8601 日時
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  shift: Shift = {
    employeeName: '',
    role: '',
    startTime: '',
    endTime: '',
    breakTime: 0,
    storeLocation: '',
    status: '仮', // 初期状態は「仮」
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
        status: '仮',  // 初期値に戻す
        createdAt: '',
        updatedAt: ''
      };
    }).catch(error => {
      console.error('シフトの保存に失敗しました:', error);
    });
  }
}
