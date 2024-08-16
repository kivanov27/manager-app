// examples
export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

export interface DiaryEntry {
    id: number;
    date: string;
    weather: Weather;
    comment: string;
}
