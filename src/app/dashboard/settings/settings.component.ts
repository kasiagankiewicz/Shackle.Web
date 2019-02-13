import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlockModel } from 'src/app/shared/models/block-model';
import { BlockchainService } from 'src/app/shared/blockchain.service';
import { BlockchainModel } from 'src/app/shared/models/blockchain-model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    lastBlock = new BlockModel;
    blockchain = new BlockchainModel;
    blockWithDifficulty: BlockModel;
    blockWithDifficultyExist: boolean;
    isModalActive = false;
    difficulty: number;
    currentDifficulty: number;
    mylastBlock: BlockModel;


    time: number;
    number = 0;
    chartDifficulty: number;
    timesWithDifficulty1 = new Array<Number>();
    timesWithDifficulty2 = new Array<Number>();
    timesWithDifficulty3 = new Array<Number>();
    timesWithDifficulty4 = new Array<Number>();

    chartOptions = {
      responsive: true
    };

    chartData = [
      { data: [0], label: 1 },
      { data: [0], label: 2 },
      { data: [0], label: 3 },
      { data: [0], label: 4 },
    ];
    chartLabels = [this.number++]; // oś x

  constructor(
    private blockchainService: BlockchainService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit() {
      this.getCurrentDifficulty();
  }

  addDataToChart(time) {
    if (this.chartDifficulty === 1) {
      this.timesWithDifficulty1.push(time);
    }

    if (this.chartDifficulty === 2) {
      this.timesWithDifficulty2.push(time);
    }

    if (this.chartDifficulty === 3) {
      this.timesWithDifficulty3.push(time);
    }

    if (this.chartDifficulty === 4) {
      this.timesWithDifficulty4.push(time);
    }
  }



  addDataAndLabel(data, label) {
    this.chartData.forEach((dataset, index) => {
      if (!this.chartData[index]) {
        return;
      }
      this.chartData[index] = Object.assign({}, this.chartData[index], {
        data: [...this.chartData[index].data, data[index]]
      });
    });
    this.chartLabels = [...this.chartLabels, label];
  }

  onChartClick(event) {
    console.log(event);
  }

  getBlockWithDifficuly() {
    this.blockchainService.getLastBlock().subscribe(block => {
      this.blockWithDifficulty = block;
      this.time = this.blockWithDifficulty.miningTime;
      this.addDataToChart(this.time);
    });
  }















  chooseDifficulty(difficulty: number) {
    this.difficulty = difficulty;
  }

  mine() {
    if (this.difficulty === this.currentDifficulty) {
      this.toastr.warning('This is your current difficulty. Choose a different value');
      return;
    }
    const miningTime = 1500 * this.difficulty;
    this.isModalActive = !this.isModalActive;
    setTimeout(() => {
      this.isModalActive = !this.isModalActive;
      this.blockWithDifficultyExist = true;
      this.getBlockWithDifficuly();
      this.toastr.success('Block was successfully mined!');
      this.currentDifficulty = this.difficulty;
      }, miningTime);
    this.setDifficulty();
  }

  getCurrentDifficulty() {
    this.blockchainService.getDifficulty().subscribe(number => {
      this.currentDifficulty = number;
      this.difficulty = this.currentDifficulty;
    });
  }

  setDifficulty() {
    this.chartDifficulty = this.difficulty;
    this.blockchainService.setDifficulty(this.difficulty).subscribe(() => {
    });
  }

  navigateToDashboard() {
    this.router.navigate(['/main']);
  }

  navigateToSettings() {
    this.router.navigate(['/settings']);
  }
}

