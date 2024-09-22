import { useRef, useState } from 'react';
import UploadApi from '../../Api/UploadApi';
import imgSrc from '../../utils/imgSrc';
import { ActionIcon, Loader } from 'rizzui';
import { MdDelete } from 'react-icons/md';
import alertError from '../../hoock/alertError';
import { FaImage } from 'react-icons/fa';

const UploadImages = ({
  data, setData
}: SubFormProps) => {
  const dropzoneRef = useRef<HTMLDivElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false)
  const handleFileChange = (e: any) => {

    const target = e.target as HTMLInputElement;
    const files = Array.from(target.files || []);
  
    upload(files)
  };


  const handleDragOver = (e: any) => {
    e.preventDefault();
    dropzoneRef.current?.classList.add('border-primary');
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    dropzoneRef.current?.classList.remove('border-primary');
  };

  const handleDrop = (e: any) => {
    
    e.preventDefault();
    dropzoneRef.current?.classList.remove('border-primary');
    const files = Array.from(e.dataTransfer?.files || []);
    upload(files as File[]);
  };

  const upload = (files: File[]) => {
    console.log(files)
    setLoading(true)
    UploadApi.uploadImages(files).then(res => {
      setData({
        ...data,
        images: [res, ...data.images]
      })
      setLoading(false)
    }).catch(err => {
      alertError(err)
      setLoading(false)
    })
  }


  return (
    <div
      className="w-full relative border-2 border-gray-300 border-dashed rounded-lg p-6 hover:border-primary"
      id="dropzone"
      ref={dropzoneRef}
    >
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 z-50"
        ref={inputFileRef}
        onChange={handleFileChange}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        multiple
      />
      <div className="text-center opacity-50">
      <FaImage className="mx-auto h-12 w-12 "/>
        <h3 className="mt-2 text-sm font-medium ">
          <label htmlFor="file-upload" className="relative cursor-pointer">
            <span>Drag and drop</span>
            <span className="text-primary"> or browse</span>
            <span> to upload</span>
            <input id="file-upload" name="file-upload" type="file" className="sr-only" ref={inputFileRef} multiple />
          </label>
        </h3>
        <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
      </div>
      <div className="mt-4 grid grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-3 max-[470px]:grid-cols-2 gap-2 relative z-[60]">
        {
          loading && <div className='relative pt-[100%] overflow-hidden rounded-xl ' >
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
              <Loader size='lg' />
            </div>
          </div>
        }
        {data.images.map((src, index) => (
          <div className='relative pt-[100%] overflow-hidden rounded-xl shadow-xl ' key={index}>
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-no-repeat bg-center" style={{
              backgroundImage: "url('" + imgSrc(src, true) + "')"
            }}></div>
            <ActionIcon size='sm' color="danger" rounded='full' className='absolute  top-4 right-4' onClick={() => {
              setData({
                ...data,
                images: data.images.filter((_, i) => i !== index)
              })
            }}>
              <MdDelete className="w-5 h-5" />
            </ActionIcon>

          </div>

        ))}

      </div>
    </div>
  );
};

export default UploadImages;
