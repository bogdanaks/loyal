export interface WorkingHours {
  common: WorkingTimeWithDays;
  by_days: {
    [day: string]: WorkingTimeDay;
  };
}

interface WorkingTimeWithDays extends WorkingTimeDay {
  days: string[];
}

interface WorkingTimeDay {
  opening_time: string;
  closing_time: string;
  breaks_time_from: string;
  breaks_time_to: string;
}
