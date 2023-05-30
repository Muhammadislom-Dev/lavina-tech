import React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

var CryptoJS = require("crypto-js/md5");
type DeleteModalProps = {
  dataId: string;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 150,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const DeleteModal: React.FC<DeleteModalProps> = (props) => {
  const authData = useSelector((store: any) => store.auth.token.data);
  const key = authData?.key;
  const id = props.dataId;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { mutate } = useMutation<any, unknown>(async () => {
    const sign = `DELETE/books/${id}${key}`;

    try {
      const res = await axios({
        method: "DELETE",
        url: `https://no23.lavina.tech/books/${id}`,
        headers: {
          Key: key,
          Sign: CryptoJS(sign),
        },
      });

      if (res.status === 200) {
        toast.error("Deleted successfully!");
        handleClose();
      } else {
        toast.error("This user is already registered or an error occurred!");
      }
    } catch (error) {
      console.log("Auth dispatch error", error);
      toast.error("This user is already registered or an error occurred!");
    }
  });

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Button variant="contained" onClick={handleOpen}>
        Delete Book
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Do you want to delete this book?
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "25px",
              marginTop: "30px",
              justifyContent: "center",
            }}>
            <Button onClick={() => handleClose()} variant="contained">
              Close
            </Button>
            <Button variant="contained" onClick={() => mutate()}>
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteModal;
