export const SPACING = {
    EXTRA_SMALL: 4,
    SMALL: 8,
    MEDIUM: 16,
    LARGE: 24,
    EXTRA_LARGE: 32,
    HUGE: 40
} as const;

export const FONT_SIZES = {
    EXTRA_SMALL: 12,
    SMALL: 14,
    MEDIUM: 16,
    LARGE: 20,
    EXTRA_LARGE: 24,
    HUGE: 32
} as const;

export const FONT_WEIGHTS = {
    EXTRA_LIGHT: '100',
    LIGHT: '300',
    NORMAL: '400',
    MEDIUM: '500',
    SEMIBOLD: '600',
    BOLD: '700',
    HEAVY: '800'
} as const;

export const FONT_WEIGHT = FONT_WEIGHTS;