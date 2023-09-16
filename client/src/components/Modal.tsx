import * as React from "react";
import {
  Modal,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Button,
} from "@mui/material";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "450px",
  backgroundColor: "#FFFFFF",
  boxShadow: "0px 2px 10px rgba(17, 25, 69, 0.1)",
  borderRadius: "18px",
  padding: "40px 32px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

type ModalProps = {
  description: string;
  children: JSX.Element;
  isOpen: boolean;
  handleClose: () => void;
  onSubmit: (dataSubmitted: any) => any;
};

export function AppModal({
  description,
  children,
  isOpen,
  handleClose,
  onSubmit,
}: ModalProps) {
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={styleModal}>
          <CardHeader
            id="modal-modal-title"
            title={description}
            component="h4"
            sx={{ fontWeight: "bold" }}
          />
          <CardContent id="modal-modal-description">{children}</CardContent>
          <CardActions sx={{ padding: 0, justifyContent: "flex-end" }}>
            <Button
              variant={"outlined"}
              color={"primary"}
              size={"large"}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant={"contained"}
              color={"primary"}
              size={"large"}
              onClick={onSubmit}
              sx={{ marginLeft: "12px" }}
            >
              Submit
            </Button>
          </CardActions>
        </Card>
      </Modal>
    </div>
  );
}
