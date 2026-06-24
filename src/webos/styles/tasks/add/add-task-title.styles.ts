import baseStyles from '../addtask.styles';
import { COLORS } from '../../../../shared/styles/colors.styles';
import { FONT_SIZES, FONT_WEIGHT, SPACING } from '../../../../shared/styles/spacing.styles';

const styles = {
  titleInput: baseStyles.titleInput,
  titleInputEdit: {
    fontSize: FONT_SIZES.EXTRA_LARGE,
    fontWeight: FONT_WEIGHT.BOLD,
    color: COLORS.WHITE,
    paddingHorizontal: SPACING.EXTRA_SMALL,
  },
  descriptionInput: baseStyles.descriptionInput,
  descriptionInputEdit: {
    fontSize: FONT_SIZES.MEDIUM,
    paddingHorizontal: SPACING.EXTRA_SMALL,
    marginTop: SPACING.EXTRA_SMALL,
  },
};

export default styles;
