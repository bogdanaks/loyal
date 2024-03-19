import { getAbsoluteZoom, getZoomFactor } from "advanced-cropper/extensions/absolute-zoom";
import classNames from "classnames";
import { CSSProperties } from "react";
import { CropperFade, CropperRef } from "react-advanced-cropper";

import { Header } from "../header/header";
import { Navigation } from "../navigation/navigation";
import "./styles.scss";

interface Props {
  cropper: CropperRef;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  onClose: () => void;
  onAccept: () => void;
}

export const Wrapper = ({ cropper, children, className, onClose, onAccept }: Props) => {
  const state = cropper.getState();

  const settings = cropper.getSettings();

  const absoluteZoom = getAbsoluteZoom(state, settings);

  const navigationWidth = state ? Math.min(state.boundary.height, state.boundary.width) - 40 : 0;

  const onZoom = (value: number, transitions?: boolean) => {
    if (cropper) {
      cropper.zoomImage(getZoomFactor(state, settings, value), {
        transitions: !!transitions,
      });
    }
  };

  return (
    <CropperFade
      className={classNames("fixed-cropper-wrapper", className)}
      visible={state && cropper.isLoaded()}
    >
      <div className="fixed-cropper-wrapper__header" style={{ width: navigationWidth }}>
        <Header onClose={onClose} onAccept={onAccept} />
      </div>
      <div className="fixed-cropper-wrapper__content">{children}</div>
      <div className="fixed-cropper-wrapper__navigation" style={{ width: navigationWidth }}>
        <Navigation zoom={absoluteZoom} onZoom={onZoom} />
      </div>
    </CropperFade>
  );
};
