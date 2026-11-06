const FilePreview = ({ file }) => {
  if (file.type === "image") {
    return <img src={file.url} width="150" alt={file.originalName} />;
  }
  if (file.type === "video") {
    return <video src={file.url} width="250" controls />;
  }
  return (
    <a href={file.url} target="_blank" rel="noreferrer">
      {file.originalName || "Download file"}
    </a>
  );
};

export default FilePreview;
