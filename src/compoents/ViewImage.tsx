import { useRef, useState } from "react";
import Img from "../assets/data.webp";

import { Paper, Typography, Grid } from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ViewImage = () => {
  const consentRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const data = {
    name: "John Doe",
    fatherName: "Michael Doe",
    email: "johndoe@example.com",
    phoneNumber: "123-456-7890",
    address1: "123 Main St",
    address2: "Apt 101",
  };

  const downloadPdf = () => {
    setLoading(true);
    if (consentRef.current) {
      const imageElement = consentRef.current.querySelector("img");
      if (imageElement) {
        imageElement.style.display = "block";
      }
      html2canvas(consentRef.current).then((canvas) => {
        const pdf = new jsPDF({
          orientation: "portrait",
        });

        const pageHeight = pdf.internal.pageSize.getHeight();
        const scaleFactor = pageHeight / canvas.height;

        const resizedWidth = canvas.width * scaleFactor;
        const resizedHeight = canvas.height * scaleFactor;

        const xPos = (pdf.internal.pageSize.getWidth() - resizedWidth) / 2;
        const yPos = (pdf.internal.pageSize.getHeight() - resizedHeight) / 2;

        pdf.addImage(
          canvas.toDataURL("image/png"),
          "PNG",
          xPos,
          yPos,
          resizedWidth,
          resizedHeight
        );
        try {
          pdf.save("consent_form.pdf");
          setLoading(false);
        } catch (err) {
          console.log("err", err);
        } finally {
          setLoading(false);
        }

        if (imageElement) {
          imageElement.style.display = "none";
        }
      });
    }
  };

  return (
    <>
      <button onClick={downloadPdf} disabled={loading}>
        Download Pdf
      </button>
      <div ref={consentRef}>
        <img src={Img} alt="" />
        <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
          <Typography variant="h5" gutterBottom>
            View Data
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Name: {data.name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                Father's Name: {data.fatherName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Email: {data.email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                Phone Number: {data.phoneNumber}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                Address Line 1: {data.address1}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                Address Line 2: {data.address2}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  );
};

export default ViewImage;
