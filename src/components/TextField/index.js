import { TextField, withStyles } from "@material-ui/core";
import { themeColors } from "utils/constants";

export const MyTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: themeColors.primary
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: themeColors.primary,
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: themeColors.primary,
        },
        '&:hover fieldset': {
          borderColor: themeColors.primary,
        },
        '&.Mui-focused fieldset': {
          borderColor: themeColors.primary,
        },
      },
    },
  })(TextField);