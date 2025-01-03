import { useEffect, useRef, useState } from "react";
import {
  DefaultSize,
  ExtendedSettings,
  FixedCropper,
  FixedCropperRef,
  FixedCropperSettings,
  ImageRestriction,
  RectangleStencil,
  StencilSize,
} from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { PiCameraPlus } from "react-icons/pi";

import { config } from "shared/config";

import { Portal } from "widgets/ui";

import styles from "./styles.module.css";
import { Wrapper } from "./wrapper/wrapper";

interface Props {
  shopId: number;
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
    width: (visibleArea || imageSize).width * 2,
    height: (visibleArea || imageSize).height,
  };
};

const stencilSize: StencilSize<ExtendedSettings<FixedCropperSettings>> = ({ boundary }) => {
  return {
    width: boundary.height * 2 - 80,
    height: boundary.height - 80,
  };
};

export const EditBanner = ({ shopId, image, onLoad }: Props) => {
  const [editorImage, setEditorImage] = useState<string | null>(null);
  const [imageState, setImageState] = useState<string | undefined>(undefined);
  const fileRef = useRef<HTMLInputElement>(null);
  const cropperRef = useRef<FixedCropperRef>(null);
  const [isShowEditor, setIsShowEditor] = useState(false);

  useEffect(() => {
    if (image?.length) {
      setImageState(`${config.apiDomain}/static/shops/${shopId}/${image}`);
      setEditorImage(null);
    } else {
      setImageState(undefined);
      setEditorImage(null);
    }
  }, [image]);

  const handleUpload = () => {
    const canvas = cropperRef.current?.getCanvas();
    if (canvas) {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            onLoad(blob);
            blobToBase64(blob).then((base64) => {
              setEditorImage(base64 as string);
            });
            setIsShowEditor(false);
          }
        },
        "image/jpeg",
        1
      );
    }
  };

  const handleFileInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target?.files?.[0];
    if (file) {
      file2Base64(file).then((base64) => {
        setEditorImage(base64);
        setIsShowEditor(true);
      });
    }
  };

  const handleAvatarClick = () => {
    fileRef.current?.click();
  };

  const handleClose = () => {
    setIsShowEditor(false);
    setEditorImage(null);
  };

  return (
    <div className={styles.wrapper}>
      <div
        onClick={handleAvatarClick}
        className="cursor-pointer min-w-40 min-h-20 w-40 h-20 rounded-xl bg-background flex items-center justify-center overflow-hidden"
      >
        {!isShowEditor && (
          <>
            {imageState?.length || editorImage ? (
              <img src={editorImage || imageState} alt="Avatar" className={styles.bannerImg} />
            ) : (
              <PiCameraPlus className="text-primary text-3xl" />
            )}
            <input
              type="file"
              style={{ visibility: "hidden", position: "absolute" }}
              onChange={handleFileInputChange}
              accept="image/png,image/jpeg"
              ref={fileRef}
            />
          </>
        )}
      </div>
      {isShowEditor && (
        <Portal id="portal">
          <div className={styles.editor}>
            <FixedCropper
              ref={cropperRef}
              src={editorImage}
              stencilSize={stencilSize}
              defaultSize={defaultSize}
              className={styles.cropper}
              imageRestriction={ImageRestriction.stencil}
              stencilComponent={RectangleStencil}
              wrapperComponent={(cropper) => (
                <Wrapper {...cropper} onAccept={handleUpload} onClose={handleClose} />
              )}
              stencilProps={{
                previewClassName: styles.preview,
                overlayClassName: styles.overlayRect,
                aspectRatio: 16 / 8,
                handlers: false,
                lines: false,
                movable: false,
                resizable: false,
              }}
            />
          </div>
        </Portal>
      )}
    </div>
  );
};
