import { useEffect, useRef, useState } from "react";
import {
  CircleStencil,
  DefaultSize,
  ExtendedSettings,
  FixedCropper,
  FixedCropperRef,
  FixedCropperSettings,
  ImageRestriction,
  StencilSize,
} from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

import { config } from "shared/config";

import styles from "./styles.module.css";
import { Wrapper } from "./wrapper/wrapper";

interface Props {
  image?: string;
  onLoad: (image: Blob) => void;
}

const file2Base64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() || "");
    reader.onerror = (error) => reject(error);
  });
};

const blobToBase64 = (blob: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
    reader.onerror = (error) => reject(error);
  });
};

const defaultSize: DefaultSize<ExtendedSettings<FixedCropperSettings>> = ({
  imageSize,
  visibleArea,
}) => {
  return {
    width: (visibleArea || imageSize).width,
    height: (visibleArea || imageSize).height,
  };
};

const stencilSize: StencilSize<ExtendedSettings<FixedCropperSettings>> = ({ boundary }) => {
  return {
    width: boundary.height - 80,
    height: boundary.height - 80,
  };
};

export const EditImage = ({ image, onLoad }: Props) => {
  const [imageState, setImageState] = useState<string | undefined>(
    image ? `${config.apiDomain}/static/${image}` : undefined
  );
  const fileRef = useRef<HTMLInputElement>(null);
  const cropperRef = useRef<FixedCropperRef>(null);
  const [isShowEditor, setIsShowEditor] = useState(false);

  useEffect(() => {
    if (isShowEditor) {
      Telegram.WebApp.MainButton.hide();
    } else {
      Telegram.WebApp.MainButton.show();
    }
  }, [isShowEditor]);

  const handleUpload = () => {
    const canvas = cropperRef.current?.getCanvas();
    if (canvas) {
      canvas.toBlob((blob) => {
        if (blob) {
          onLoad(blob);
          blobToBase64(blob).then((base64) => {
            setImageState(base64 as string);
          });
          setIsShowEditor(false);
        }
      }, "image/jpeg");
    }
  };

  const handleFileInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target?.files?.[0];
    if (file) {
      file2Base64(file).then((base64) => {
        setImageState(base64);
        setIsShowEditor(true);
      });
    }
  };

  const handleAvatarClick = () => {
    fileRef.current?.click();
  };

  const handleClose = () => {
    setIsShowEditor(false);
    setImageState(undefined);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.avatar} onClick={handleAvatarClick}>
        {!isShowEditor && (
          <>
            <img
              src={imageState ?? "/empty.png"}
              width={100}
              height={100}
              alt="Avatar"
              style={{ cursor: "pointer" }}
            />
            <input
              type="file"
              style={{ visibility: "hidden" }}
              onChange={handleFileInputChange}
              accept="image/png,image/jpeg"
              ref={fileRef}
            />
          </>
        )}
      </div>
      {isShowEditor && (
        <div className={styles.editor}>
          <FixedCropper
            ref={cropperRef}
            src={imageState}
            stencilSize={stencilSize}
            defaultSize={defaultSize}
            className={styles.cropper}
            imageRestriction={ImageRestriction.stencil}
            stencilComponent={CircleStencil}
            wrapperComponent={(cropper) => (
              <Wrapper {...cropper} onAccept={handleUpload} onClose={handleClose} />
            )}
            stencilProps={{
              previewClassName: styles.previewCircle,
              overlayClassName: styles.overlay,
              handlers: false,
              lines: false,
              movable: false,
              resizable: false,
            }}
          />
        </div>
      )}
    </div>
  );
};
