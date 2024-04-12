import fileDownload from "js-file-download";
import Pdf from "../assets/pdf/ID-259434-1.pdf"; // Assuming Pdf variable holds the URL of the PDF file

const Download = () => {
  const handleDownloadPdf = async () => {
    try {
      fileDownload(Pdf, "ID-259434-1.pdf");
    } catch (err) {
      console.log({ Error: err });
    }
  };
  return (
    <div>
      <button
        onClick={() => handleDownloadPdf()}
        key="3"
        style={{ backgroundColor: "gray" }}
      >
        Download
      </button>
      <a href={Pdf} download="Resume">
        Download
      </a>
    </div>
  );
};

export default Download;
