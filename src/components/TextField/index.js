import { TextField, withStyles } from "@material-ui/core";
import { themeColors } from "utils/constants";

export const MyTextField = withStyles({
    root: {
      '& label.MuiInputLabel-shrink': {
        color: themeColors.darkPrimary,
        fontWeight: 600,
        fontSize: 17
      },
      '& label.Mui-focused': {
        color: themeColors.primary
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: themeColors.primary,
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: themeColors.primary,
          borderWidth: 1.9
        },
        '&:hover fieldset': {
          borderColor: themeColors.primary,
          borderWidth: 2.5
        },
        '&.Mui-focused fieldset': {
          borderColor: themeColors.primary,
          borderWidth: 3
        },
      },
      '& .MuiInputBase-input ': {
        fontWeight: 500,
        fontSize: 16
      },
    },
  })(TextField);