import { Box } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteModal from "../../components/DeleteModal";
import EditModal from "../../components/EditModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}



var CryptoJS = require("crypto-js/md5");
function Book() {
  const [dataId, setDataId] = useState("");
  const authData = useSelector((store: any) => store.auth.token.data);
  const key = authData?.key;

  const { data } = useQuery<any>("books", async () => {
    const sign = `GET/books${key}`;
    try {
      const res = await axios({
        method: "GET",
        url: "https://no23.lavina.tech/books",
        headers: {
          Key: key,
          Sign: CryptoJS(sign),
        },
      });

      return res?.data?.data;
    } catch (error) {
      console.log("Book Get error", error);
      throw error;
    }
  });

  return (
    <TableContainer sx={{ marginTop: "25px" }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Book Data</TableCell>
            <TableCell align="right">Delete</TableCell>
            <TableCell align="right">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row: any) => (
            <TableRow
              key={row?.book?.isbn}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row?.book?.isbn}
              </TableCell>
              <TableCell onClick={() => setDataId(row.book.id)} align="right">
                <DeleteModal dataId={row.book.id} />
              </TableCell>
              <TableCell onClick={() => setDataId(row.book.id)} align="right">
                <EditModal dataId={row.book.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
    </TableContainer>
  );
}

export default Book;
