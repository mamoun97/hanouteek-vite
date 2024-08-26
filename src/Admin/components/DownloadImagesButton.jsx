// import React from 'react';
// import Archiver from 'archiver';
// import StreamSaver from 'streamsaver';


// export default function DownloadImagesButton({ name, urls }) {
//   const handleDownload = async () => {
//     try {
//       const zipStream = StreamSaver.createWriteStream(`${name}.zip`);
//       const archive = Archiver('zip', { zlib: { level: 9 } });

//       archive.pipe(zipStream);

//       await Promise.all(
//         urls.map(async (url, index) => {
//           const response = await fetch(url);
//           const blob = await response.blob();
//           const filename = `image${index + 1}.jpg`; // You can customize the image name

//           archive.append(blob.stream(), { name: `${name}/${filename}` });
//         })
//       );

//       archive.finalize();
//     } catch (err) {
//       console.log(err)
//     }
//   };

//   return (
//     <button
//       onClick={handleDownload}
//       className="bg-blue-500 text-white px-4 py-2 rounded"
//     >
//       Download Images
//     </button>
//   );
// };


