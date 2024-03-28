import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import OutlinedInput, { OutlinedInputProps } from "@mui/material/OutlinedInput";
import { FC } from "react";

interface ICoreInputProps extends OutlinedInputProps {
  helperText?: string;
}

// interface ICoreInputFormControl extends FormControlProps {

// }

const CoreInput: FC<ICoreInputProps> = (props) => {
  const { value, helperText, ...rest } = props;

  return (
    <FormControl variant="outlined">
      <OutlinedInput value={value} {...rest} />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default CoreInput;
