import { useDialog } from './dialog-context';
import { ImagePreviewDialog } from './image-preview-dialog';

interface ImagePreviewService {
  preview: (src: string, alt: string) => void,
}

export default function useImagePreview(): ImagePreviewService {
  const dialog = useDialog();

  const preview = (src: string, alt: string): void => {
    dialog.openDialog(<ImagePreviewDialog src={src} alt={alt} />);
  };

  return { preview };
}
