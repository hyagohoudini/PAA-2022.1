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

export default function ClearLikes() {
  const [open, setOpen] = React.useState(false);
  const [feed, setFeed] = React.useState("");
  const [refresh, setRefresh] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmar = () => {
    localStorage.setItem("news", "");
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="warning" onClick={handleClickOpen}>
        Limpar Likes
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Limpar histórico de curtidas?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Na próxima vez que entrar na plataforma, os seus likes não contarão
            para a recomendação
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button color="error" onClick={handleConfirmar}>
            APAGAR
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
