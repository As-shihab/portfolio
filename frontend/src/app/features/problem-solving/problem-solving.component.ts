import { Component } from '@angular/core';

@Component({
  selector: 'app-problem-solving',
  standalone: true,
  imports: [],
  templateUrl: './problem-solving.component.html',
  styleUrl: './problem-solving.component.css'
})
export class ProblemSolvingComponent {
  profiles = [
    {
      name: 'LeetCode',
      username: '@arafatcse2',
      url: 'https://leetcode.com/arafatcse2',
      icon: 'leetcode',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      stats: [
        { label: 'Solved', value: '150+' },
        { label: 'Ranking', value: 'Top 15%' },
        { label: 'Streaks', value: '50 Days' }
      ]
    },
    {
      name: 'HackerRank',
      username: '@arafatcse2',
      url: 'https://www.hackerrank.com/profile/arafatcse2',
      icon: 'hackerrank',
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      stats: [
        { label: 'Badges', value: '5 Gold' },
        { label: 'Points', value: '1200+' },
        { label: 'Stars', value: '5 Stars' }
      ]
    },
    {
      name: 'CodeChef',
      username: '@arafatcse2',
      url: 'https://www.codechef.com/users/arafatcse2',
      icon: 'codechef',
      color: 'text-brown-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      stats: [
        { label: 'Rating', value: '1600' },
        { label: 'Division', value: 'Div 2' },
        { label: 'Contests', value: '25+' }
      ]
    }
  ];
}
