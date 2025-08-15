// priority.enum.ts
export enum Priority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

// day-of-week.enum.ts
export enum DayOfWeek {
  MON = 'MON',
  TUE = 'TUE',
  WED = 'WED',
  THU = 'THU',
  FRI = 'FRI',
  SAT = 'SAT',
  SUN = 'SUN',
}

export const priorityKoToEn: Record<string, Priority> = {
  중요: Priority.HIGH,
  보통: Priority.MEDIUM,
  낮음: Priority.LOW,
};

export const dayKoToEn: Record<string, DayOfWeek> = {
  월: DayOfWeek.MON,
  화: DayOfWeek.TUE,
  수: DayOfWeek.WED,
  목: DayOfWeek.THU,
  금: DayOfWeek.FRI,
  토: DayOfWeek.SAT,
  일: DayOfWeek.SUN,
};

export const priorityEnToKo: Record<Priority, string> = {
  [Priority.HIGH]: '중요',
  [Priority.MEDIUM]: '보통',
  [Priority.LOW]: '낮음',
};

export const dayEnToKo: Record<DayOfWeek, string> = {
  [DayOfWeek.MON]: '월',
  [DayOfWeek.TUE]: '화',
  [DayOfWeek.WED]: '수',
  [DayOfWeek.THU]: '목',
  [DayOfWeek.FRI]: '금',
  [DayOfWeek.SAT]: '토',
  [DayOfWeek.SUN]: '일',
};
