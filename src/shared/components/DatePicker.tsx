import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { COLORS } from '../styles/colors.styles';
import {
  DatePickerProps,
  DatePreset,
  FIRST_DAY_OF_WEEK,
  WeekdayIndex,
} from './datepicker.interface';
import styles from './datepicker.styles';

const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const pad = (value: number): string => String(value).padStart(2, '0');

const toIsoDate = (date: Date): string => {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

const parseIsoDate = (raw: string): Date | null => {
  const trimmed = raw.trim();
  const match = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;

  const parsed = new Date(`${trimmed}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return null;
  if (toIsoDate(parsed) !== trimmed) return null;

  return parsed;
};

const toMonthLabel = (date: Date): string => {
  return date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
};

const getCalendarGrid = (monthDate: Date): Array<Date | null> => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const startOffset = (firstDay.getDay() - FIRST_DAY_OF_WEEK + 7) % 7;
  const cells: Array<Date | null> = Array(startOffset).fill(null);

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(year, month, day));
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return cells;
};

const getStartOfNextWeek = (fromDate: Date, firstDayOfWeek: WeekdayIndex): Date => {
  const currentDay = fromDate.getDay();
  const daysUntilThisWeekStart = (currentDay - firstDayOfWeek + 7) % 7;
  const thisWeekStart = new Date(fromDate);
  thisWeekStart.setDate(fromDate.getDate() - daysUntilThisWeekStart);

  const nextWeekStart = new Date(thisWeekStart);
  nextWeekStart.setDate(thisWeekStart.getDate() + 7);
  return nextWeekStart;
};

const getNextWeekendStart = (fromDate: Date): Date => {
  const nextSaturday = new Date(fromDate);
  const day = nextSaturday.getDay();
  let daysToSaturday = (6 - day + 7) % 7;
  if (daysToSaturday === 0) {
    daysToSaturday = 7;
  }
  nextSaturday.setDate(nextSaturday.getDate() + daysToSaturday);
  return nextSaturday;
};

const resolvePresetDate = (preset: DatePreset): Date => {
  const baseDate = new Date();

  if (preset === 'tomorrow') {
    baseDate.setDate(baseDate.getDate() + 1);
  }

  if (preset === 'nextWeek') {
    return getStartOfNextWeek(baseDate, FIRST_DAY_OF_WEEK);
  }

  if (preset === 'nextWeekend') {
    return getNextWeekendStart(baseDate);
  }

  return baseDate;
};

const formatDayLabel = (date: Date): string => {
  return date.toLocaleDateString(undefined, { weekday: 'short' });
};

const formatShortDate = (date: Date): string => {
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
};

const getWeekdayLabels = (firstDayOfWeek: WeekdayIndex): string[] => {
  return [...WEEKDAY_LABELS.slice(firstDayOfWeek), ...WEEKDAY_LABELS.slice(0, firstDayOfWeek)];
};

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onChange, onRequestClose }) => {
  const [inputValue, setInputValue] = React.useState(selectedDate);
  const [currentMonth, setCurrentMonth] = React.useState<Date>(() => {
    const parsed = parseIsoDate(selectedDate);
    return parsed ?? new Date();
  });

  React.useEffect(() => {
    setInputValue(selectedDate);
    const parsed = parseIsoDate(selectedDate);
    if (parsed) {
      setCurrentMonth(new Date(parsed.getFullYear(), parsed.getMonth(), 1));
    }
  }, [selectedDate]);

  const calendarGrid = React.useMemo(() => getCalendarGrid(currentMonth), [currentMonth]);
  const weekdayLabels = React.useMemo(() => getWeekdayLabels(FIRST_DAY_OF_WEEK), []);

  const applyDate = (date: Date) => {
    const isoDate = toIsoDate(date);
    setInputValue(isoDate);
    onChange(isoDate);
    setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
  };

  const handleInputChange = (nextValue: string) => {
    setInputValue(nextValue);
    const parsed = parseIsoDate(nextValue);
    if (!parsed) return;

    onChange(toIsoDate(parsed));
    setCurrentMonth(new Date(parsed.getFullYear(), parsed.getMonth(), 1));
  };

  const quickOptions: Array<{
    key: DatePreset;
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    iconColor: string;
    metaText: string;
  }> = [
    {
      key: 'today',
      label: 'Today',
      icon: 'today-outline',
      iconColor: COLORS.GREEN,
      metaText: formatDayLabel(resolvePresetDate('today')),
    },
    {
      key: 'tomorrow',
      label: 'Tomorrow',
      icon: 'sunny-outline',
      iconColor: COLORS.YELLOW,
      metaText: formatDayLabel(resolvePresetDate('tomorrow')),
    },
    {
      key: 'nextWeek',
      label: 'Next week',
      icon: 'calendar-outline',
      iconColor: COLORS.RED_TOMATO,
      metaText: formatShortDate(resolvePresetDate('nextWeek')),
    },
    {
      key: 'nextWeekend',
      label: 'Next weekend',
      icon: 'calendar-clear-outline',
      iconColor: COLORS.PURPLE,
      metaText: formatShortDate(resolvePresetDate('nextWeekend')),
    },
  ];

  return (
    <View style={styles.wrapper}>
      <Pressable style={styles.backdrop} onPress={onRequestClose} />

      <View style={styles.panel}>
        <TextInput
          style={styles.manualDateInput}
          value={inputValue}
          onChangeText={handleInputChange}
          placeholder="Type a date (YYYY-MM-DD)"
          placeholderTextColor={COLORS.OFF_WHITE}
        />

        <View style={styles.dateQuickList}>
          {quickOptions.map((quickOption) => (
            <Pressable
              key={quickOption.key}
              style={styles.dateQuickRow}
              onPress={() => applyDate(resolvePresetDate(quickOption.key))}
            >
              <View style={styles.dateQuickLeft}>
                <Ionicons name={quickOption.icon} size={16} color={quickOption.iconColor} />
                <Text style={styles.dateQuickText}>{quickOption.label}</Text>
              </View>
              <Text style={styles.dateQuickMeta}>{quickOption.metaText}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.calendarHeader}>
          <Text style={styles.calendarMonthText}>{toMonthLabel(currentMonth)}</Text>
          <View style={styles.calendarHeaderActions}>
            <Pressable
              onPress={() =>
                setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
              }
            >
              <Ionicons name="chevron-back-outline" size={16} color={COLORS.OFF_WHITE} />
            </Pressable>
            <Pressable
              onPress={() =>
                setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
              }
            >
              <Ionicons name="chevron-forward-outline" size={16} color={COLORS.OFF_WHITE} />
            </Pressable>
          </View>
        </View>

        <View style={styles.calendarWeekdays}>
          {weekdayLabels.map((weekday) => (
            <Text key={weekday} style={styles.calendarWeekdayText}>
              {weekday}
            </Text>
          ))}
        </View>

        <View style={styles.calendarGrid}>
          {calendarGrid.map((dateCell, index) => {
            if (!dateCell) {
              return <View key={`empty-${index}`} style={styles.calendarCell} />;
            }

            const isoDate = toIsoDate(dateCell);
            const isSelected = selectedDate === isoDate;

            return (
              <Pressable
                key={isoDate}
                style={[styles.calendarCell, isSelected && styles.calendarCellSelected]}
                onPress={() => applyDate(dateCell)}
              >
                <Text style={[styles.calendarCellText, isSelected && styles.calendarCellTextSelected]}>
                  {dateCell.getDate()}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default DatePicker;
