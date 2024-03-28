import { FC } from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { BaseSelectProps } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

interface ISelectOption {
  id: string;
  value: string;
  label: string;
}

interface ICoreSelectProps extends BaseSelectProps {
  inputLabelText: string;
  labelId: string;
  selectId: string;
  options: ISelectOption[];
}

const CoreSelect: FC<ICoreSelectProps> = (props) => {
  const { inputLabelText, selectId, options, value, labelId, ...rest } = props;

  return (
    <FormControl fullWidth>
      <InputLabel id={labelId}>{inputLabelText}</InputLabel>

      <Select labelId={labelId} value={value} label={inputLabelText} {...rest}>
        {options.map((option) => (
          <MenuItem key={option.id} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CoreSelect;

