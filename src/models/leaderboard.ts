import { Question } from './game';

export interface Leaderboard {
  items: LeaderboardItem[];
}

export type LeaderboardItem = { id: string; username: string; points: number };

export type LeaderboardData = {
  points: number;
  username: string;
};
