// import LabResultTable from "./tabs/LabResultTable";
// import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
// import { useContext, useEffect, useState } from "react";
// import { UploadResult } from "../../../../Services/ApiSerrvices/LabResult"; // Assuming UploadResult is the function to upload the file
// import * as XLSX from "xlsx";
// import { UserContext } from "../../../store/user-context";

// const LabResultMange = () => {
//   const [excelData, setExcelData] = useState({ data: [], loading: false });
//   const [uploadCompleted, setUploadCompleted] = useState(false);
//   const { openSnackBar } = useContext(UserContext);

//   const readUploadedFile = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const sheet = workbook.Sheets[workbook.SheetNames[0]];
//       const parsedData = XLSX.utils.sheet_to_json(sheet);
//       setExcelData({ data: parsedData, loading: false });
//       setUploadCompleted(false);
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   useEffect(() => {
//     if (excelData.data.length > 0 && !excelData.loading && !uploadCompleted) {
//       const sendDataToApi = async () => {
//         setExcelData((prevExcelData) => ({ ...prevExcelData, loading: true }));
//         try {
//           const res = await UploadResult({ Results: excelData.data });
//           console.log("Response from API:", res);
//           if (res.IsSuccess) {
//             openSnackBar?.({
//               State: true,
//               Type: "success",
//               Msg: "File Uploaded Successfully",
//             });
//             setUploadCompleted(true);
//           }
//         } catch (error) {
//           console.error("Error while uploading data to API:", error);
//           openSnackBar?.({
//             State: true,
//             Type: "error",
//             Msg: "An error occurred while uploading data to the server",
//           });
//         } finally {
//           setExcelData((prevExcelData) => ({
//             ...prevExcelData,
//             loading: false,
//           }));
//         }
//       };
//       sendDataToApi();
//     }
//   }, [excelData, uploadCompleted, openSnackBar]);

//   return (
//     <>
//       <div className="page-title-custom">
//         <h1>Lab Result</h1>
//         <div style={{ marginBlock: "10px" }}>
//           <label
//             htmlFor="fileInput"
//             style={{
//               cursor: excelData.loading ? "not-allowed" : "pointer",
//               display: "flex",
//               alignItems: "center",
//               gap: 10,
//             }}
//           >
//             <input
//               type="file"
//               accept=".xlsx, .xls, .csv"
//               id="fileInput"
//               style={{ display: "none" }}
//               onChange={readUploadedFile}
//               disabled={excelData.loading}
//             />
//             <DriveFolderUploadIcon fontSize="large" />{" "}
//             <span
//               style={{
//                 fontSize: "20px",
//                 padding: "8px",
//                 borderRadius: "5px",
//                 fontWeight: "500",
//                 backgroundColor: "lightgray",
//               }}
//             >
//               {excelData.loading ? "Please Wait" : "Upload Test Result"}
//             </span>
//           </label>
//         </div>
//       </div>
//       <LabResultTable />
//     </>
//   );
// };

// export default LabResultMange;
