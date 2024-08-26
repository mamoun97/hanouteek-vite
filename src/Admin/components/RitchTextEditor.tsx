import React, { useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { useTheme } from 'next-themes';
// import { Jodit } from 'jodit';
import toast from 'react-hot-toast';

interface RitchTextEditorProps {
  setValue: (data: string) => void;
  initialValue: string;
}

const RitchTextEditor: React.FC<RitchTextEditorProps> = ({ setValue, initialValue }) => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const editor = useRef<any>(null);

  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch('https://api.risecart.net/api/v1/upload-image', {
        method: 'POST',
        body: formData,
      });
      const data = await response.text();

      if (data) {
        const imageUrl = `https://api.risecart.net/${data.replace(/"/g, '')}`;
        return imageUrl;
      } else {
        console.error('No valid URL returned from the upload API');
        return null;
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const imageUpload = (editor: any) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async function () {
      const imageFile = input?.files![0];

      if (!imageFile) {
        return;
      }
      if (!imageFile.name.match(/\.(jpg|jpeg|png|webp|gif)$/)) {
        toast.error('Unsupported file format. Please upload an image file (jpg, jpeg, png ,webp).');
        return;
      }
      const imageUrl = await uploadImage(imageFile);
      if (imageUrl) {
        insertImage(editor, imageUrl);
      } else {
        toast.error('Error uploading image. Please try again later.');
      }
    };
  };

  useEffect(() => {
    const uploadImageButton = () => {
      // Jodit.defaultOptions.controls.uploadImage = {
      //   name: 'Upload',
      //   exec: async (editor: any) => {
      //     await imageUpload(editor);
      //   },
      //   iconURL: '', // Remove the icon
      //   tooltip: 'Upload', // Set the tooltip text
      // };
    };
    uploadImageButton();
  }, []);

  const insertImage = (editor: any, url: any) => {
    const image = editor.selection.j.createInside.element('img');
    image.setAttribute('src', url);
    editor.selection.insertNode(image);
  };

  const config = useMemo(() => ({
    readonly: false,
    height: '400px',
    width: '100%',
    enableDragAndDropFileToEditor: true,
    placeholder: 'Write something awesome ...',
    beautyHTML: true,
    buttons: [
      'source', '|', 'bold', 'italic', 'underline', '|', 'ul', 'ol', '|',
      'font', 'fontsize', 'brush', 'paragraph', '|', 'table', 'link', '|',
      'left', 'center', 'right', 'justify', '|', 'undo', 'redo', '|', 'hr', 'eraser', 'fullsize', 'uploadImage',"link","video" 
    ],
    removeButtons: ['brush', 'file'],
    showXPathInStatusbar: false,
    showCharsCounter: false,
    showWordsCounter: false,
    toolbarAdaptive: true,
    toolbarSticky: true,
    style: {
      buttons:{
        background:"#F00"
      }
      // background: currentTheme === 'dark' ? '#27272a' : '#fff',
      // color: currentTheme === 'dark' ? '#fff' : 'black',
    },
  }), [currentTheme]);

  return (
    <>
      <JoditEditor
        config={config}
        value={initialValue}
        ref={editor}
        className="editor dark:bg-black"
        onChange={(content: string) => setValue(content)}
      />
    </>
  );
};

export default RitchTextEditor;