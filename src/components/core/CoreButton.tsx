import { FC } from "react";

import Button, { ButtonProps }  from "@mui/material/Button";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    //se pot adauga si alte denumiri custom pentru proprietatea "variant"
    dashed: true;
  }
}

interface ICoreButtonProps extends ButtonProps {
  //se pot adauga alte proprietati custom
}

const CoreButton:FC<ICoreButtonProps> = (props: ICoreButtonProps) => {
  const { children, ...rest } = props;

  return (
    <Button {...rest}>
      {children}
    </Button>
  );
};

export default CoreButton;


