import * as React from "react";
import Box from "@mui/material/Box";
import { Button, FormControl, TextField } from "@mui/material";
import "./style.css";
import OfficeImage from "../../assets/images/office.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { API } from "../../services/api";
import { dispatch } from "../../redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Auth = () => {
  const navigate = useNavigate();
  interface FormData {
    key: string;
    secret: string;
    name: string;
    email: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { mutate } = useMutation<any, unknown, FormData>(
    async (payload: FormData) => {
      try {
        const res = await API.login(payload);
        if (res.data?.isOk) {
          navigate("/books");
        }
        localStorage.setItem("token", res.data);
        dispatch.auth.login(res.data);
      } catch (error) {
        console.log("Auth dispatch error", error);
        toast.error("This user is already registered or an error occurred!");
      }
    }
  );

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await mutate({ ...data });
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        background: " #EDF3FA",
      }}>
      <div className="auth-page">
        <h2>Регистрация</h2>
        <p>Для продолжения введите номер телефона</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="auth-list">
            <FormControl id="outlined-search">
              <TextField
                sx={{ width: "400px", margin: "15px 0" }}
                id="outlined-search"
                label="Email"
                type="email"
                fullWidth
                {...register("email", { required: true })}
              />
            </FormControl>
            <FormControl id="outlined-search">
              <TextField
                sx={{ width: "400px", margin: "15px 0" }}
                id="outlined-search"
                label="Name"
                type="name"
                fullWidth
                {...register("name", { required: true })}
              />
            </FormControl>
            <FormControl id="outlined-search">
              <TextField
                sx={{ width: "400px", margin: "15px 0" }}
                id="outlined-search"
                label="Username"
                type="name"
                fullWidth
                {...register("key", { required: true })}
              />
            </FormControl>
            <FormControl id="outlined-search">
              <TextField
                sx={{ width: "400px", margin: "15px 0" }}
                id="outlined-search"
                label="Password"
                type="password"
                fullWidth
                {...register("secret", { required: true })}
              />
            </FormControl>
            <Button
              type="submit"
              sx={{ width: "400px", height: "45px" }}
              variant="contained">
              Sign In
            </Button>
          </div>
        </form>
      </div>
      <Box sx={{ width: "60%" }}>
        <img className="auth-image" src={OfficeImage} alt="Office Image" />
      </Box>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Box>
  );
};

export default Auth;
