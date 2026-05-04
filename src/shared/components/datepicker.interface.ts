export interface DatePickerProps {
  selectedDate: string;
  onChange: (dateValue: string) => void;
  onRequestClose: () => void;
}

export type WeekdayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

// 0 = Sunday, 1 = Monday, ... 6 = Saturday.
export const FIRST_DAY_OF_WEEK: WeekdayIndex = 1;

export type DatePreset = 'today' | 'tomorrow' | 'nextWeek' | 'nextWeekend';
