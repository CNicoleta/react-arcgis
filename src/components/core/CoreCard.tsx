import { FC } from "react";

import Card, { CardProps } from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";

interface ICoreCardProps extends CardProps {
  imageUrl?: string;
  imageDesc?: string;
  cardContent?: React.ReactNode;
  cardActions?: React.ReactNode;
}

const CoreCard: FC<ICoreCardProps> = (props) => {
  const { children, imageUrl, imageDesc, cardActions, ...rest } = props;

  return (
    <Card
      {...rest}
      sx={{
        ".MuiCardMedia-root.MuiCardMedia-media.MuiCardMedia-img": {
          bgcolor: "orange",
        },
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height={140}
          image={imageUrl}
          alt={imageDesc}
          style={{ borderColor: "blue" }}
        />

        <CardContent>{children}</CardContent>
      </CardActionArea>

      <CardActions>{cardActions}</CardActions>
    </Card>
  );
};

export default CoreCard;
