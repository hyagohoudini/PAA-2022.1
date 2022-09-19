import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import arquivo from "../../g1.json";
import toast from "react-hot-toast";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [feed, setFeed] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmar = () => {
    if (feed === "" || feed.length < 10) {
      toast.error("Insira um feed real");
      return;
    }
    try {
      const instance = axios.create({
        baseURL: `http://localhost:3000`,
      });

      toast.promise(
        instance.post(`/api/parse`, { url: feed }).then((response) => {
          console.log(response);
        }),
        {
          loading: "To tentando aqui",
          success: "Deu certo",
          error: "Tente outro feed",
        }
      );
    } catch (e) {
      console.log(e);
    }
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Alterar feed
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Feed do G1</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para alterar o feed RSS utilizado na plataforma, basta selecionar
            algum feed desta{" "}
            <a
              href="https://g1.globo.com/tecnologia/noticia/2012/11/siga-o-g1-por-rss.html"
              target="blank"
            >
              fonte
            </a>{" "}
            e colar no campo correspondente
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Inserir RSS do G1"
            type="url"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setFeed(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleConfirmar}>Alterar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
