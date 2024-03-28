import CoreButton from "./core/CoreButton";
import { toggleLayersButtons, buttons } from "utils/constants/sideButtons";

import mapStore from "store/Map";

import { useLocation } from "react-router";

import { observer } from "mobx-react";

const SideButtons = () => {
  const location = useLocation();

  const handleClickButtons = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const selectedSublayer = mapStore.visibleSublayers.find(
      (sublayer) => sublayer.id === +event.currentTarget.id
    );

    if (selectedSublayer) {
      selectedSublayer.visible = !selectedSublayer.visible;
    }
  };

  const sideButtons =
    location.pathname === "/toggle-sublayers" ? (
      toggleLayersButtons.map((btn) => (
        <CoreButton
          key={btn.id}
          id={btn.id}
          variant={"contained"}
          onClick={handleClickButtons}
        >
          {btn.title}
        </CoreButton>
      ))
    ) : (
      <>
        {buttons.map((btn) => (
          <CoreButton
            key={btn.id}
            variant={btn.variant}
            onClick={btn.onBtnClick}
          >
            {btn.title}
          </CoreButton>
        ))}
      </>
    );
    
  return <>{sideButtons}</>;
};

export default observer(SideButtons);
