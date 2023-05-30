import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import React from "react";
// import md5 from "md5";

var CryptoJS = require("crypto-js/md5");
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

type LoginPage = {
  id?: number | string;
  isbn?: string;
  status: number;
  text?: string;
  key?: string;
  secret?: string;
};

const ModalCreate = () => {
  const [value, setValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const authData = useSelector((store: any) => store.auth.token.data);
  const key = authData?.key;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPage>();

  const { mutate } = useMutation<any, unknown, LoginPage>(
    async (payload: LoginPage) => {
      const sign = `POST/books{"isbn":"${payload?.isbn}"}${key}`;

      try {
        const res = await axios({
          method: "POST",
          url: "https://no23.lavina.tech/books",
          data: payload,
          headers: {
            Key: key,
            Sign: CryptoJS(sign),
          },
        });
        if (res.status === 200) {
          toast.success("Data successfully!");
          handleClose();
        } else {
          // toast.error("This user is already registered or an error occurred!");
        }
      } catch (error) {
        console.log("Auth dispatch error", error);
        // toast.error("This user is already registered or an error occurred!");
      }
    }
  );

  const onSubmit: SubmitHandler<LoginPage> = async (data: LoginPage) => {
    await mutate(data);
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Button variant="contained" onClick={handleOpen}>
        Open modal
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Book
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              sx={{ marginTop: "25px" }}
              fullWidth
              label="ISBN"
              id="fullWidth"
              {...register("isbn", { required: true })}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue(e.target.value)
              }
            />
            <Button
              type="submit"
              sx={{ width: "435px", height: "45px", marginTop: "50px" }}
              variant="contained">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalCreate;
